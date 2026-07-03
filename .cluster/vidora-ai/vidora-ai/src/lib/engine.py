# Vidora AI — Open-Source AI Video Engine

"""
Production-ready backend engine for Vidora AI.
Connects Ollama (LLM), FFmpeg (video), yt-dlp (download), 
Notion (project mgmt), and MoviePy (rendering).

Usage:
    from engine import VidoraEngine
    engine = VidoraEngine()
    
    # AI Script Generation
    script = engine.generate_script("AI Revolution 2026", style="Educational", length=15)
    
    # Video Processing
    engine.extract_audio("input.mp4", "output.wav")
    engine.add_subtitles("video.mp4", "subs.srt", "output.mp4")
    
    # Notion Sync
    engine.sync_to_notion(project_data, notion_token="...", database_id="...")
"""

import os
import json
import subprocess
import tempfile
from pathlib import Path
from typing import Optional, Literal
from dataclasses import dataclass, asdict
import shutil

# ============================================================
# Data Models
# ============================================================

@dataclass
class ScriptResult:
    title: str
    script: str
    chapters: list[dict]
    citations: list[str]
    estimated_duration_min: int
    word_count: int

@dataclass 
class VideoTask:
    input_path: str
    output_path: str
    operation: Literal["extract_audio", "add_subtitles", "trim", "concat", "convert", "add_music", "burn_captions"]
    params: dict

@dataclass
class ProjectData:
    title: str
    status: str
    video_length_min: int
    voice: str
    language: str
    script_preview: str
    created_at: str


# ============================================================
# 1. OLLAMA — Local LLM Engine
# ============================================================

class OllamaEngine:
    """Local AI engine using Ollama for script generation and research."""
    
    def __init__(self, model: str = "qwen2.5-coder:7b", host: str = "http://localhost:11434"):
        self.model = model
        self.host = host
    
    def _call(self, prompt: str, system: str = "") -> str:
        """Call Ollama API."""
        result = subprocess.run(
            ["ollama", "run", self.model],
            input=prompt,
            capture_output=True,
            text=True,
            timeout=300
        )
        if result.returncode != 0:
            raise RuntimeError(f"Ollama error: {result.stderr}")
        return result.stdout.strip()
    
    def generate_script(
        self, 
        topic: str, 
        style: str = "Educational", 
        length_min: int = 15,
        language: str = "English",
        deep_research: bool = False
    ) -> ScriptResult:
        """Generate a full video script using local LLM."""
        
        prompt = f"""You are a professional video script writer for Vidora AI.

TOPIC: {topic}
STYLE: {style}
TARGET DURATION: {length_min} minutes
LANGUAGE: {language}

Create a complete video script with the following structure:

1. TITLE: A catchy, SEO-friendly title
2. HOOK (30 sec): Grab attention immediately  
3. INTRODUCTION (1-2 min): Set up the topic
4. MAIN CONTENT (split into chapters):
   For each chapter, include:
   - [CHAPTER: Chapter Title]
   - Narration text (150-200 words per minute of video)
   - [VISUAL: Description of B-roll or visual to show]
5. CONCLUSION (1-2 min): Summarize key points
6. CALL TO ACTION (30 sec): What should viewers do next

Important:
- Write natural, conversational narration (like a YouTuber, not an essay)
- Each paragraph should be 2-3 sentences max
- Include [PAUSE] markers for dramatic effect
- Mark emphasis words with *asterisks*
- Total script should fill approximately {length_min} minutes
  (about {length_min * 150} words total)
- Add 2-3 relevant statistics or facts with [SOURCE: ...] markers

SCRIPT:"""

        response = self._call(prompt)
        
        # Parse chapters
        chapters = []
        for line in response.split("\n"):
            if line.strip().startswith("[CHAPTER:"):
                title = line.replace("[CHAPTER:", "").replace("]", "").strip()
                chapters.append({"title": title, "timestamp": "00:00"})
        
        # Extract citations
        citations = []
        for line in response.split("\n"):
            if "[SOURCE:" in line:
                src = line.split("[SOURCE:")[1].split("]")[0].strip()
                citations.append(src)
        
        word_count = len(response.split())
        
        return ScriptResult(
            title=topic,
            script=response,
            chapters=chapters,
            citations=citations,
            estimated_duration_min=length_min,
            word_count=word_count
        )
    
    def research_topic(self, topic: str, depth: int = 3) -> str:
        """Deep research on a topic using local LLM."""
        prompt = f"""Research the following topic in depth. Provide:
1. Key facts and statistics
2. Recent developments (2024-2026)
3. Expert opinions and analysis
4. Common misconceptions
5. Interesting angles for a video

TOPIC: {topic}

Format as a structured research brief with citations where possible."""

        return self._call(prompt)
    
    def enhance_script(self, script: str, instructions: str) -> str:
        """Enhance/rewrite a script section."""
        prompt = f"""Improve the following video script section according to these instructions:

INSTRUCTIONS: {instructions}

ORIGINAL SCRIPT:
{script}

IMPROVED SCRIPT:"""
        
        return self._call(prompt)
    
    def suggest_broll(self, script_section: str) -> list[str]:
        """Suggest B-roll footage for a script section."""
        prompt = f"""For this video script section, suggest 5 B-roll/visual ideas.
Each suggestion should be a specific, searchable description.

SCRIPT:
{script_section}

B-ROLL SUGGESTIONS (one per line, numbered):"""
        
        response = self._call(prompt)
        suggestions = [l.strip() for l in response.split("\n") if l.strip() and l[0].isdigit()]
        return suggestions


# ============================================================
# 2. FFMPEG — Video Processing Engine
# ============================================================

class FFmpegEngine:
    """Video processing using FFmpeg."""
    
    @staticmethod
    def extract_audio(video_path: str, output_path: str, format: str = "wav") -> str:
        """Extract audio from video."""
        cmd = [
            "ffmpeg", "-i", video_path, "-vn",
            "-acodec", "pcm_s16le" if format == "wav" else "libmp3lame",
            "-ar", "44100", "-ac", "2",
            "-y", output_path
        ]
        subprocess.run(cmd, capture_output=True, check=True)
        return output_path
    
    @staticmethod
    def add_subtitles(video_path: str, srt_path: str, output_path: str) -> str:
        """Burn subtitles into video."""
        # Escape the path for FFmpeg
        escaped_srt = srt_path.replace(":", "\\:").replace("'", "\\'")
        cmd = [
            "ffmpeg", "-i", video_path,
            "-vf", f"subtitles={escaped_srt}",
            "-c:a", "copy", "-y", output_path
        ]
        subprocess.run(cmd, capture_output=True, check=True)
        return output_path
    
    @staticmethod
    def trim_video(input_path: str, output_path: str, start: str, duration: str) -> str:
        """Trim a video segment."""
        cmd = [
            "ffmpeg", "-i", input_path,
            "-ss", start, "-t", duration,
            "-c", "copy", "-y", output_path
        ]
        subprocess.run(cmd, capture_output=True, check=True)
        return output_path
    
    @staticmethod
    def concat_videos(file_list_path: str, output_path: str) -> str:
        """Concatenate multiple videos."""
        cmd = [
            "ffmpeg", "-f", "concat", "-safe", "0",
            "-i", file_list_path, "-c", "copy", "-y", output_path
        ]
        subprocess.run(cmd, capture_output=True, check=True)
        return output_path
    
    @staticmethod
    def convert_format(input_path: str, output_path: str, 
                       codec: str = "libx264", preset: str = "medium") -> str:
        """Convert video format/codec."""
        cmd = [
            "ffmpeg", "-i", input_path,
            "-c:v", codec, "-preset", preset,
            "-c:a", "aac", "-y", output_path
        ]
        subprocess.run(cmd, capture_output=True, check=True)
        return output_path
    
    @staticmethod
    def add_background_music(video_path: str, music_path: str, output_path: str,
                             music_volume: float = 0.3) -> str:
        """Add background music to video, ducking original audio."""
        cmd = [
            "ffmpeg", "-i", video_path, "-i", music_path,
            "-filter_complex",
            f"[1:a]volume={music_volume}[bgm];[0:a][bgm]amix=inputs=2:duration=first",
            "-c:v", "copy", "-y", output_path
        ]
        subprocess.run(cmd, capture_output=True, check=True)
        return output_path
    
    @staticmethod
    def generate_waveform(video_path: str, output_path: str, 
                          resolution: str = "1920x200") -> str:
        """Generate waveform visualization for a video."""
        cmd = [
            "ffmpeg", "-i", video_path,
            "-filter_complex",
            f"showwavespic=s={resolution}:colors=#8B5CF6|#06B6D4:split_channels=1",
            "-frames:v", "1", "-y", output_path
        ]
        subprocess.run(cmd, capture_output=True, check=True)
        return output_path
    
    @staticmethod
    def get_video_info(video_path: str) -> dict:
        """Get video metadata."""
        cmd = [
            "ffprobe", "-v", "quiet", "-print_format", "json",
            "-show_format", "-show_streams", video_path
        ]
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        return json.loads(result.stdout)


# ============================================================
# 3. YT-DLP — Video Download Engine
# ============================================================

class YTDLPEngine:
    """Download videos from YouTube and other platforms."""
    
    @staticmethod
    def download_video(url: str, output_dir: str = "./downloads", 
                       format: str = "mp4", quality: str = "best") -> str:
        """Download a video."""
        os.makedirs(output_dir, exist_ok=True)
        output_template = os.path.join(output_dir, "%(title)s.%(ext)s")
        
        cmd = [
            "yt-dlp",
            "-f", f"bestvideo[ext={format}]+bestaudio[ext=m4a]/best[ext={format}]/best",
            "-o", output_template,
            "--no-playlist",
            url
        ]
        subprocess.run(cmd, capture_output=True, check=True)
        
        # Find the downloaded file
        files = sorted(Path(output_dir).glob(f"*.{format}"), key=os.path.getmtime, reverse=True)
        return str(files[0]) if files else ""
    
    @staticmethod
    def download_audio(url: str, output_dir: str = "./downloads") -> str:
        """Download audio only."""
        os.makedirs(output_dir, exist_ok=True)
        output_template = os.path.join(output_dir, "%(title)s.%(ext)s")
        
        cmd = [
            "yt-dlp",
            "-f", "bestaudio",
            "--extract-audio",
            "--audio-format", "mp3",
            "-o", output_template,
            "--no-playlist",
            url
        ]
        subprocess.run(cmd, capture_output=True, check=True)
        
        files = sorted(Path(output_dir).glob("*.mp3"), key=os.path.getmtime, reverse=True)
        return str(files[0]) if files else ""
    
    @staticmethod
    def get_subtitles(url: str, output_dir: str = "./downloads", lang: str = "en") -> str:
        """Download subtitles from a video."""
        os.makedirs(output_dir, exist_ok=True)
        
        cmd = [
            "yt-dlp",
            "--write-subs", "--write-auto-subs",
            "--sub-lang", lang,
            "--convert-subs", "srt",
            "--skip-download",
            "-o", os.path.join(output_dir, "%(title)s.%(ext)s"),
            url
        ]
        subprocess.run(cmd, capture_output=True, check=True)
        
        files = sorted(Path(output_dir).glob("*.srt"), key=os.path.getmtime, reverse=True)
        return str(files[0]) if files else ""


# ============================================================
# 4. MOVIEPY — Programmatic Video Rendering
# ============================================================

class MoviePyEngine:
    """Programmatic video creation with MoviePy."""
    
    @staticmethod
    def create_title_card(text: str, output_path: str, 
                          duration: float = 3.0,
                          bg_color: tuple = (10, 10, 15),
                          text_color: str = "white",
                          size: tuple = (1920, 1080)) -> str:
        """Create an animated title card."""
        import moviepy.editor as mp
        import moviepy.video.fx as vfx
        
        # Create gradient background
        gradient = mp.ColorClip(size=size, color=bg_color, duration=duration)
        
        # Add text
        txt = mp.TextClip(
            text, 
            fontsize=80, 
            color=text_color, 
            font="Arial-Bold",
            size=(size[0] - 200, None),
            method="caption"
        )
        txt = txt.set_position("center").set_duration(duration)
        txt = txt.crossfadein(0.5).crossfadeout(0.5)
        
        final = mp.CompositeVideoClip([gradient, txt])
        final.write_videofile(output_path, fps=24, codec="libx264", audio=False, logger=None)
        return output_path
    
    @staticmethod
    def create_image_slideshow(image_paths: list[str], output_path: str,
                               duration_per_image: float = 5.0,
                               transition: float = 1.0) -> str:
        """Create a slideshow from images with transitions."""
        import moviepy.editor as mp
        
        clips = []
        for img_path in image_paths:
            clip = mp.ImageClip(img_path, duration=duration_per_image)
            clip = clip.resize(height=1080)
            clip = clip.crossfadein(transition).crossfadeout(transition)
            clips.append(clip)
        
        final = mp.concatenate_videoclips(clips, method="compose")
        final.write_videofile(output_path, fps=24, codec="libx264", logger=None)
        return output_path
    
    @staticmethod
    def add_text_overlay(video_path: str, text: str, output_path: str,
                         position: tuple = ("center", "bottom"),
                         font_size: int = 40) -> str:
        """Add text overlay to video."""
        import moviepy.editor as mp
        
        video = mp.VideoFileClip(video_path)
        txt = mp.TextClip(
            text,
            fontsize=font_size,
            color="white",
            font="Arial",
            stroke_color="black",
            stroke_width=2
        )
        txt = txt.set_position(position).set_duration(video.duration)
        
        final = mp.CompositeVideoClip([video, txt])
        final.write_videofile(output_path, codec="libx264", logger=None)
        return output_path


# ============================================================
# 5. NOTION — Project Management Integration
# ============================================================

class NotionEngine:
    """Sync Vidora AI projects to Notion."""
    
    def __init__(self, token: Optional[str] = None):
        self.token = token or os.getenv("NOTION_TOKEN", "")
        self.client = None
    
    def _get_client(self):
        if not self.client and self.token:
            from notion_client import Client
            self.client = Client(auth=self.token)
        return self.client
    
    def create_project_page(self, database_id: str, project: ProjectData,
                            parent_page_id: Optional[str] = None) -> dict:
        """Create a Notion page for a Vidora AI project."""
        client = self._get_client()
        if not client:
            raise RuntimeError("Notion token not configured")
        
        properties = {
            "Name": {"title": [{"text": {"content": project.title}}]},
            "Status": {"select": {"name": project.status}},
            "Video Length": {"number": project.video_length_min},
            "Voice": {"rich_text": [{"text": {"content": project.voice}}]},
            "Language": {"select": {"name": project.language}},
            "Created": {"date": {"start": project.created_at}},
        }
        
        parent = {"database_id": database_id}
        if parent_page_id:
            parent = {"page_id": parent_page_id}
        
        response = client.pages.create(
            parent=parent,
            properties=properties,
            children=[
                {
                    "object": "block",
                    "type": "paragraph",
                    "paragraph": {
                        "rich_text": [{"type": "text", "text": {"content": f"Script Preview:\n{project.script_preview}"}}]
                    }
                }
            ]
        )
        return response
    
    def update_project_status(self, page_id: str, status: str) -> dict:
        """Update a project's status in Notion."""
        client = self._get_client()
        return client.pages.update(
            page_id=page_id,
            properties={"Status": {"select": {"name": status}}}
        )
    
    def add_comment(self, page_id: str, comment: str) -> dict:
        """Add a comment to a Notion page."""
        client = self._get_client()
        return client.comments.create(
            parent={"page_id": page_id},
            rich_text=[{"type": "text", "text": {"content": comment}}]
        )


# ============================================================
# 6. MAIN ENGINE — Unified API
# ============================================================

class VidoraEngine:
    """Unified Vidora AI video creation engine."""
    
    def __init__(self, ollama_model: str = "qwen2.5-coder:7b"):
        self.llm = OllamaEngine(model=ollama_model)
        self.ffmpeg = FFmpegEngine()
        self.ytdlp = YTDLPEngine()
        self.moviepy = MoviePyEngine()
        self.notion = NotionEngine()
        self.workspace = Path.home() / ".vidora"
        self.workspace.mkdir(exist_ok=True)
    
    def generate_script(self, topic: str, **kwargs) -> ScriptResult:
        """Generate a video script using local LLM."""
        return self.llm.generate_script(topic, **kwargs)
    
    def research(self, topic: str) -> str:
        """Research a topic."""
        return self.llm.research_topic(topic)
    
    def download_source(self, url: str, audio_only: bool = False) -> str:
        """Download source video/audio."""
        if audio_only:
            return self.ytdlp.download_audio(url, str(self.workspace / "downloads"))
        return self.ytdlp.download_video(url, str(self.workspace / "downloads"))
    
    def process_video(self, task: VideoTask) -> str:
        """Process a video with FFmpeg."""
        ops = {
            "extract_audio": lambda: self.ffmpeg.extract_audio(task.input_path, task.output_path),
            "add_subtitles": lambda: self.ffmpeg.add_subtitles(task.input_path, task.params.get("srt", ""), task.output_path),
            "trim": lambda: self.ffmpeg.trim_video(task.input_path, task.output_path, task.params["start"], task.params["duration"]),
            "concat": lambda: self.ffmpeg.concat_videos(task.input_path, task.output_path),
            "convert": lambda: self.ffmpeg.convert_format(task.input_path, task.output_path),
            "add_music": lambda: self.ffmpeg.add_background_music(task.input_path, task.params.get("music", ""), task.output_path),
            "burn_captions": lambda: self.ffmpeg.add_subtitles(task.input_path, task.params.get("srt", ""), task.output_path),
        }
        return ops[task.operation]()
    
    def sync_to_notion(self, project: ProjectData, database_id: str):
        """Sync project to Notion."""
        return self.notion.create_project_page(database_id, project)
    
    def full_pipeline(self, topic: str, source_url: Optional[str] = None,
                      style: str = "Educational", length: int = 15,
                      language: str = "English") -> dict:
        """Run the full Vidora AI pipeline."""
        results = {}
        
        # Step 1: Download source if URL provided
        if source_url:
            results["downloaded"] = self.download_source(source_url)
        
        # Step 2: Generate script
        results["script"] = self.generate_script(topic, style=style, length_min=length, language=language)
        
        # Step 3: Research if needed
        results["research"] = self.research(topic)
        
        return results


# ============================================================
# CLI Entry Point
# ============================================================

if __name__ == "__main__":
    import sys
    
    engine = VidoraEngine()
    
    if len(sys.argv) < 2:
        print("Vidora AI Engine CLI")
        print("  python engine.py script 'Your Topic' --style Educational --length 15")
        print("  python engine.py research 'Topic to research'")
        print("  python engine.py download 'https://youtube.com/watch?v=...'")
        print("  python engine.py pipeline 'Topic' --url 'https://...'")
        sys.exit(0)
    
    command = sys.argv[1]
    
    if command == "script":
        topic = sys.argv[2] if len(sys.argv) > 2 else "AI Technology"
        result = engine.generate_script(topic)
        print(f"# {result.title}\n")
        print(f"Word count: {result.word_count}")
        print(f"Chapters: {len(result.chapters)}")
        print(f"Citations: {len(result.citations)}\n")
        print(result.script)
    
    elif command == "research":
        topic = sys.argv[2] if len(sys.argv) > 2 else "AI Technology"
        print(engine.research(topic))
    
    elif command == "download":
        url = sys.argv[2]
        path = engine.download_source(url)
        print(f"Downloaded: {path}")
    
    elif command == "pipeline":
        topic = sys.argv[2] if len(sys.argv) > 2 else "AI Technology"
        results = engine.full_pipeline(topic)
        print(json.dumps({
            "title": results["script"].title,
            "word_count": results["script"].word_count,
            "chapters": len(results["script"].chapters),
            "research_length": len(results["research"])
        }, indent=2))
    
    else:
        print(f"Unknown command: {command}")
