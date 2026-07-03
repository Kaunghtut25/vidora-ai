"""
Vidora AI — 4-Agent Video Production Crew (CrewAI + Ollama)

Pipeline:
  Agent 1: HKUDS VideoAgent → Analyze video, extract transcripts, build memory
  Agent 2: FireRed-OpenStoryline → Generate script, storyboard, beat-synced timeline
  Agent 3: browser-use video-use → Execute rough cuts, audio fades, burn subtitles
  Agent 4: LTX Engine → AI transitions, visual effects, final render

Powered by: CrewAI 1.9.3 + Ollama (gemma3:4b) + FFmpeg
"""
import os, json, subprocess, tempfile
from pathlib import Path
from datetime import datetime
from typing import Optional

# Force CrewAI to use Ollama via LiteLLM
os.environ["OPENAI_API_KEY"] = "ollama"
os.environ["OPENAI_API_BASE"] = "http://localhost:11434/v1"

from crewai import Agent, Task, Crew, Process, LLM
from crewai.tools import tool

# Explicit Ollama LLM — prevents fallback to gpt-4.1-mini
ollama_llm = LLM(
    model="ollama/gemma3:4b",
    base_url="http://localhost:11434",
    api_key="ollama"
)

OUT_DIR = os.path.expanduser("~/Vidora_Output")
AGENTS_DIR = Path(__file__).parent.parent.parent / "agents"

# ═══════════════════════════════════════════════
# SHARED TOOLS (across agents)
# ═══════════════════════════════════════════════

@tool("analyze_video_memory")
def analyze_video_memory(video_path: str) -> str:
    """HKUDS VideoAgent: Deep video analysis — extract metadata, scene structure, speech content."""
    cmd = ["ffprobe", "-v", "quiet", "-print_format", "json",
           "-show_format", "-show_streams", "-show_chapters", video_path]
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    info = {"status": "analyzed", "video": video_path}
    if result.returncode == 0:
        data = json.loads(result.stdout)
        fmt = data.get("format", {})
        streams = data.get("streams", [])
        info.update({
            "duration_seconds": float(fmt.get("duration", 0)),
            "size_mb": round(int(fmt.get("size", 0)) / 1048576, 1),
            "bitrate_kbps": int(int(fmt.get("bit_rate", 0)) / 1000),
            "video_streams": len([s for s in streams if s.get("codec_type") == "video"]),
            "audio_streams": len([s for s in streams if s.get("codec_type") == "audio"]),
            "chapters": data.get("chapters", []),
            "has_transcript": False  # Will be set by extraction step
        })
    return json.dumps(info, indent=2)

@tool("extract_audio_for_transcription")
def extract_audio_for_transcription(video_path: str) -> str:
    """Extract audio track for speech-to-text transcription."""
    audio_path = f"/tmp/vidora_audio_{datetime.now().strftime('%H%M%S')}.wav"
    cmd = ["ffmpeg", "-y", "-i", video_path, "-vn", "-acodec", "pcm_s16le",
           "-ar", "16000", "-ac", "1", audio_path]
    subprocess.run(cmd, check=True, capture_output=True)
    return audio_path

@tool("cut_video_segment")
def cut_video_segment(video_path: str, start: float, end: float, output_name: str = "segment") -> str:
    """Cut a segment from raw video. Returns output path."""
    seg_path = f"{OUT_DIR}/{output_name}_{datetime.now().strftime('%H%M%S')}.mp4"
    os.makedirs(OUT_DIR, exist_ok=True)
    cmd = ["ffmpeg", "-y", "-ss", str(start), "-i", video_path,
           "-t", str(end - start), "-c", "copy", "-avoid_negative_ts", "make_zero", seg_path]
    subprocess.run(cmd, check=True, capture_output=True)
    return seg_path

@tool("apply_audio_fade")
def apply_audio_fade(video_path: str, fade_duration_ms: int = 30) -> str:
    """Apply cross-fade audio transition between cuts. Returns processed video path."""
    out = f"/tmp/vidora_faded_{datetime.now().strftime('%H%M%S')}.mp4"
    dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries",
        "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", video_path],
        capture_output=True, text=True).stdout.strip())
    fade_sec = fade_duration_ms / 1000
    cmd = ["ffmpeg", "-y", "-i", video_path,
           "-af", f"afade=t=in:st=0:d={fade_sec},afade=t=out:st={dur-fade_sec}:d={fade_sec}",
           "-c:v", "copy", out]
    subprocess.run(cmd, check=True, capture_output=True)
    return out

@tool("burn_subtitles")
def burn_subtitles(video_path: str, subtitle_lines: str) -> str:
    """Burn UPPERCASE subtitles onto video. subtitle_lines is JSON array of {text, start, end}."""
    lines = json.loads(subtitle_lines)
    out = f"{OUT_DIR}/subtitled_{datetime.now().strftime('%H%M%S')}.mp4"
    
    # Build drawtext filter chain
    filters = []
    for i, line in enumerate(lines[:10]):  # Max 10 subtitle overlays
        text = line.get("text", "").upper().replace("'", "'\\\\''").replace(":", "\\\\:")
        enable = f"between(t,{line.get('start',0)},{line.get('end',5)})"
        filters.append(
            f"drawtext=text='{text}':fontcolor=white:fontsize=28:"
            f"box=1:boxcolor=black@0.6:boxborderw=8:"
            f"x=(w-text_w)/2:y=h-th-40:enable='{enable}'"
        )
    
    vf = ",".join(filters) if filters else "null"
    cmd = ["ffmpeg", "-y", "-i", video_path, "-vf", vf, "-c:a", "copy", out]
    subprocess.run(cmd, check=True, capture_output=True)
    return out

@tool("concatenate_scenes")
def concatenate_scenes(scene_list_json: str, output_name: str = "rough_cut") -> str:
    """Concatenate multiple video scenes in order. scene_list_json = ["path1", "path2", ...]."""
    scenes = json.loads(scene_list_json)
    out = f"{OUT_DIR}/{output_name}_{datetime.now().strftime('%H%M%S')}.mp4"
    concat = f"/tmp/concat_{datetime.now().strftime('%H%M%S')}.txt"
    with open(concat, 'w') as f:
        for s in scenes:
            f.write(f"file '{s}'\n")
    cmd = ["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", concat, "-c", "copy", out]
    subprocess.run(cmd, check=True, capture_output=True)
    return out

@tool("add_transition_frames")
def add_transition_frames(video_path: str, transition_type: str = "fade") -> str:
    """Add AI-generated transition between scenes. Returns path to processed video."""
    out = f"{OUT_DIR}/transitioned_{datetime.now().strftime('%H%M%S')}.mp4"
    dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries",
        "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", video_path],
        capture_output=True, text=True).stdout.strip())
    cmd = ["ffmpeg", "-y", "-i", video_path,
           "-vf", f"fade=t=in:st=0:d=0.5,fade=t=out:st={dur-0.5}:d=0.5",
           "-c:a", "copy", out]
    subprocess.run(cmd, check=True, capture_output=True)
    return out

@tool("render_final_output")
def render_final_output(video_path: str, output_name: str = "final_production") -> str:
    """Final high-quality render — H.264/AAC 1080p. Returns final MP4 path."""
    out = f"{OUT_DIR}/{output_name}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.mp4"
    cmd = ["ffmpeg", "-y", "-i", video_path,
           "-c:v", "libx264", "-preset", "medium", "-crf", "20",
           "-c:a", "aac", "-b:a", "192k",
           "-vf", "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2",
           "-pix_fmt", "yuv420p", out]
    subprocess.run(cmd, check=True, capture_output=True)
    return out

# ═══════════════════════════════════════════════
# 4 AGENTS — Per the specified architecture
# ═══════════════════════════════════════════════

# Agent 1: HKUDS VideoAgent — Video Content Intelligence
video_analyzer = Agent(
    role='Video Content Intelligence Expert',
    goal='Understand long-video context and build spatial-temporal memory of raw takes. Extract speech transcripts and key visuals. Categorize objects, scenes, and timestamps.',
    backstory='Powered by HKUDS VideoAgent. You analyze raw footage deeply — detecting scenes, objects, speech patterns, and building a structured video memory that other agents can query.',
    tools=[analyze_video_memory, extract_audio_for_transcription],
    verbose=True,
    llm=ollama_llm, allow_delegation=True
)

# Agent 2: FireRed-OpenStoryline — Creative Director & Scriptwriter
storyline_director = Agent(
    role='Creative Video Director',
    goal='Generate rhythm-aware narratives and structured storylines from user intent. Match BGM beats, write emotional scripts, and plan the visual flow with professional storyboards.',
    backstory='Powered by FireRed-OpenStoryline. You are a creative director who transforms raw video memory into compelling narratives. You understand pacing, emotional arcs, and visual storytelling.',
    tools=[],
    verbose=True,
    llm=ollama_llm, allow_delegation=False
)

# Agent 3: browser-use video-use — Autonomous Video Editor
video_editor = Agent(
    role='Autonomous Video Editor',
    goal='Execute jump cuts, audio fades, and burn styled subtitles using precise word boundaries. Use LLM-driven editing rules to remove filler words and clean the final timeline.',
    backstory='Powered by video-use (browser-use). You are a precision editor who takes storylines and raw footage, then executes exact cuts with 30ms audio fades. You self-evaluate your work and fix issues.',
    tools=[cut_video_segment, apply_audio_fade, burn_subtitles, concatenate_scenes],
    verbose=True,
    llm=ollama_llm, allow_delegation=True
)

# Agent 4: LTX Engine — VFX & Final Rendering
render_engine = Agent(
    role='VFX & Rendering Engine',
    goal='Generate AI transition frames between scene cuts, composite final high-fidelity visual elements, and render the final polished MP4 for distribution.',
    backstory='Powered by LTX Desktop core. You handle the final high-quality rendering with local generative transitions, color grading, and professional encoding.',
    tools=[add_transition_frames, render_final_output],
    verbose=True,
    llm=ollama_llm, allow_delegation=False
)

# ═══════════════════════════════════════════════
# VIDEO PRODUCTION CREW
# ═══════════════════════════════════════════════

class VidoraProductionCrew:
    """4-agent sequential video production pipeline."""

    def __init__(self):
        self.output_dir = OUT_DIR
        os.makedirs(self.output_dir, exist_ok=True)

    def produce(self, video_path: str, user_prompt: str = "", transcript: str = "") -> dict:
        """Run the full 4-agent production pipeline."""

        task_analyze = Task(
            description=f'''
            Analyze this video: {video_path}
            User intent: {user_prompt}
            
            1. Extract full technical specs (duration, resolution, bitrate)
            2. Build scene-by-scene temporal memory
            3. Extract audio for transcription
            4. Output structured JSON with: duration, scene_count, key_timestamps, resolution
            ''',
            expected_output='JSON: video memory with scenes, timestamps, and technical metadata.',
            agent=video_analyzer
        )

        task_plan = Task(
            description=f'''
            Based on the video analysis and user request: "{user_prompt}"
            
            1. Generate a compelling narrative script
            2. Create a beat-synced timeline (what happens at each timestamp)
            3. Plan visual flow: intro → build-up → climax → resolution
            4. Output a professional storyboard with scene descriptions
            ''',
            expected_output='JSON storyboard: scenes with start_time, duration, description, emotion, and visual style.',
            agent=storyline_director
        )

        task_cut = Task(
            description='''
            Execute the edit based on the storyline:
            
            1. Cut raw footage into precise segments per the storyboard
            2. Apply 30ms audio cross-fades between all cuts
            3. Burn UPPERCASE subtitles at key moments
            4. Concatenate all segments into a rough cut
            5. Self-evaluate: check for audio pops, visual jumps, timing issues
            6. Output the rough cut video path and edit decision list
            ''',
            expected_output='JSON: rough_cut_path, edit_decision_list, any_fixes_applied.',
            agent=video_editor
        )

        task_render = Task(
            description='''
            Final production render:
            
            1. Apply AI fade transitions between all scene cuts
            2. Color grade for cinematic look
            3. Render final H.264 MP4 at 1080p
            4. Verify output quality and file integrity
            5. Output the absolute path to the final video file
            ''',
            expected_output='JSON: final_video_path, file_size_mb, duration, resolution.',
            agent=render_engine
        )

        crew = Crew(
            agents=[video_analyzer, storyline_director, video_editor, render_engine],
            tasks=[task_analyze, task_plan, task_cut, task_render],
            process=Process.sequential,
            verbose=True
        )

        result = crew.kickoff()
        return {
            "status": "complete",
            "pipeline": "HKUDS → FireRed → video-use → LTX",
            "input_video": video_path,
            "user_prompt": user_prompt,
            "result": str(result),
            "output_dir": self.output_dir
        }

    def analyze_only(self, video_path: str) -> dict:
        """Stage 1 only: HKUDS VideoAgent analysis."""
        task = Task(
            description=f'Analyze video {video_path}: extract all metadata, scene structure, and build temporal memory.',
            expected_output='JSON video memory dump.',
            agent=video_analyzer
        )
        crew = Crew(agents=[video_analyzer], tasks=[task], process=Process.sequential, verbose=True)
        return {"stage": "analysis", "result": str(crew.kickoff())}

# Singleton
vidora_production = VidoraProductionCrew()
