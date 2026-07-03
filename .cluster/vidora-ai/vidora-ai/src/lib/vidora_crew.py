#!/usr/bin/env python3
"""
Vidora AI — Multi-Agent Video Editing System (CrewAI)
Agents: Director/Scriptwriter, Audio/Subtitle Engineer, Video Editor (FFmpeg)

Usage:
    from vidora_crew import VidoraCrew
    crew = VidoraCrew()
    result = crew.edit_video(video_path, transcript, user_prompt)
"""

import os, json, subprocess, tempfile
from pathlib import Path
from datetime import datetime
from typing import Optional

# Configure Ollama as LLM provider BEFORE importing crewai
os.environ["OPENAI_API_KEY"] = "ollama"
os.environ["OPENAI_API_BASE"] = "http://localhost:11434/v1"

from crewai import Agent, Task, Crew, Process
from crewai.tools import tool

OUT_DIR = os.path.expanduser("~/Vidora_Output")

# ═══════════════════════════════════════════════
# TOOLS
# ═══════════════════════════════════════════════

@tool("analyze_video")
def analyze_video(video_path: str) -> str:
    """Analyze video: get duration, resolution, codec info using ffprobe."""
    cmd = [
        "ffprobe", "-v", "quiet", "-print_format", "json",
        "-show_format", "-show_streams", video_path
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode == 0:
        data = json.loads(result.stdout)
        streams = data.get("streams", [])
        fmt = data.get("format", {})
        info = {
            "duration": float(fmt.get("duration", 0)),
            "size_mb": int(fmt.get("size", 0)) / 1048576,
            "video_streams": [s for s in streams if s.get("codec_type") == "video"],
            "audio_streams": [s for s in streams if s.get("codec_type") == "audio"]
        }
        return json.dumps(info, indent=2)
    return json.dumps({"error": "Failed to analyze video"})

@tool("cut_video_segment")
def cut_video_segment(video_path: str, start: float, end: float, output_name: str) -> str:
    """Cut a segment from video using FFmpeg. Returns output path."""
    output = f"{OUT_DIR}/{output_name}_{datetime.now().strftime('%H%M%S')}.mp4"
    os.makedirs(OUT_DIR, exist_ok=True)
    duration = end - start
    cmd = [
        "ffmpeg", "-y", "-ss", str(start), "-i", video_path,
        "-t", str(duration), "-c", "copy", "-avoid_negative_ts", "make_zero",
        output
    ]
    subprocess.run(cmd, check=True, capture_output=True)
    return output

@tool("concat_videos")
def concat_videos(segment_paths: str, output_name: str = "final_edit") -> str:
    """Concatenate multiple video segments into one final video. segment_paths is JSON array."""
    paths = json.loads(segment_paths)
    output = f"{OUT_DIR}/{output_name}_{datetime.now().strftime('%H%M%S')}.mp4"
    concat_file = f"/tmp/concat_{datetime.now().strftime('%H%M%S')}.txt"
    with open(concat_file, 'w') as f:
        for p in paths:
            f.write(f"file '{p}'\n")
    cmd = ["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", concat_file, "-c", "copy", output]
    subprocess.run(cmd, check=True, capture_output=True)
    return output

@tool("add_subtitles")
def add_subtitles(video_path: str, subtitle_text: str) -> str:
    """Add burned-in subtitles to video using FFmpeg drawtext."""
    output = f"{OUT_DIR}/subtitled_{datetime.now().strftime('%H%M%S')}.mp4"
    escaped = subtitle_text.replace("'", "'\\\\''").replace(":", "\\\\:")
    cmd = [
        "ffmpeg", "-y", "-i", video_path,
        "-vf", f"drawtext=text='{escaped}':fontcolor=white:fontsize=24:box=1:boxcolor=black@0.5:boxborderw=5:x=(w-text_w)/2:y=h-th-20",
        "-c:a", "copy", output
    ]
    subprocess.run(cmd, check=True, capture_output=True)
    return output

@tool("generate_voiceover")
def generate_voiceover(text: str, language: str = "my") -> str:
    """Generate Burmese voiceover using gTTS. Returns audio file path."""
    from gtts import gTTS
    output = f"/tmp/voiceover_{datetime.now().strftime('%H%M%S')}.mp3"
    tts = gTTS(text=text, lang=language if language == "my" else "en", slow=False)
    tts.save(output)
    return output

# ═══════════════════════════════════════════════
# AGENTS
# ═══════════════════════════════════════════════

director_agent = Agent(
    role='Video Director & Scriptwriter',
    goal='Analyze the video content and transcript, identify key scenes, remove filler/silence, and create a precise cut-list timeline in JSON format.',
    backstory='''You are an expert video director with 20 years of editing experience.
    You analyze raw video footage, read transcripts carefully, identify boring parts,
    filler words, long silences, and map exact timestamps for cutting.
    You output clean JSON timelines that editors can execute precisely.''',
    tools=[analyze_video],
    verbose=True,
    allow_delegation=False
)

audio_agent = Agent(
    role='Audio & Subtitle Engineer',
    goal='Process audio levels, generate clean subtitles as burned-in captions, and prepare voiceover tracks. Output subtitle timing and style specifications.',
    backstory='''You are a professional audio engineer specialized in video post-production.
    You handle background music levels, normalize voice volumes, and design
    readable subtitle overlays. You ensure captions are well-timed and styled
    for maximum viewer engagement.''',
    tools=[generate_voiceover],
    verbose=True,
    allow_delegation=False
)

editor_agent = Agent(
    role='Video Editor',
    goal='Execute precise FFmpeg commands to cut video segments, apply transitions, merge with audio, burn subtitles, and render the final polished MP4.',
    backstory='''You are a master video editor who speaks FFmpeg fluently.
    You take director timelines and audio specifications, then execute
    exact cutting, concatenation, and rendering commands. You ensure
    lossless quality where possible and proper encoding for distribution.''',
    tools=[cut_video_segment, concat_videos, add_subtitles],
    verbose=True,
    allow_delegation=False
)

# ═══════════════════════════════════════════════
# CREW
# ═══════════════════════════════════════════════

class VidoraCrew:
    """Multi-agent video editing crew powered by CrewAI."""

    def __init__(self, model: str = "gemma3:4b"):
        self.model = model
        self.output_dir = OUT_DIR
        os.makedirs(self.output_dir, exist_ok=True)

    def analyze_only(self, video_path: str) -> dict:
        """Stage 1: Analyze video and create cut list."""
        task = Task(
            description=f'''
            Analyze this video: {video_path}
            1. Get its technical specs (duration, resolution, codec)
            2. Create a cut-list timeline identifying:
               - Intro segment (first 10% of video)
               - Key content segments (middle 80%)
               - Outro segment (last 10%)
            3. Output as JSON with start/end timestamps
            ''',
            expected_output='JSON timeline with segments, each having start_time, end_time, and description.',
            agent=director_agent
        )
        crew = Crew(agents=[director_agent], tasks=[task], process=Process.sequential, verbose=True)
        result = crew.kickoff()
        return {"stage": "analysis", "timeline": str(result)}

    def full_pipeline(self, video_path: str, transcript: str = "", user_prompt: str = "") -> dict:
        """Full multi-agent pipeline: analyze → audio → edit → render."""
        
        task1 = Task(
            description=f'''
            Analyze this video for editing: {video_path}
            User request: {user_prompt}
            Transcript: {transcript[:500]}
            
            Create a JSON cut-list with:
            - Segments to keep (with timestamps)
            - Transitions between segments
            - Total target duration
            ''',
            expected_output='JSON format timeline of clean segments with exact timestamps.',
            agent=director_agent
        )

        task2 = Task(
            description='''
            Based on the director's timeline:
            1. Generate subtitle text for each segment
            2. Specify subtitle positioning and styling
            3. If Burmese content, generate Burmese subtitles
            Output as JSON with segment_id, subtitle_text, and style properties.
            ''',
            expected_output='Subtitle overlay specifications in JSON format.',
            agent=audio_agent
        )

        task3 = Task(
            description='''
            Execute the final video assembly:
            1. Cut video segments per the director's timeline
            2. Apply subtitle overlays per audio engineer's specs
            3. Concatenate all segments with clean transitions
            4. Render final MP4 with proper encoding (H.264, AAC)
            Output the path to the final rendered video file.
            ''',
            expected_output='Path to the final rendered video (.mp4).',
            agent=editor_agent
        )

        crew = Crew(
            agents=[director_agent, audio_agent, editor_agent],
            tasks=[task1, task2, task3],
            process=Process.sequential,
            verbose=True
        )

        result = crew.kickoff()
        return {
            "status": "complete",
            "video_path": video_path,
            "result": str(result),
            "output_dir": self.output_dir
        }

    def quick_edit(self, video_path: str, cuts: list) -> str:
        """Quick edit: cut and concatenate segments. cuts = [(start, end), ...]"""
        segments = []
        for i, (start, end) in enumerate(cuts):
            seg = cut_video_segment(video_path, start, end, f"segment_{i}")
            segments.append(seg)
        final = concat_videos(json.dumps(segments), "quick_edit")
        return final

# Singleton
vidora_crew = VidoraCrew()
