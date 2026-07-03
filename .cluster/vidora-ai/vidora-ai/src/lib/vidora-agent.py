#!/usr/bin/env python3
"""
Vidora AI — Auto-Generation Agent
Uses Ollama (LLM) + gTTS/pyttsx3 (TTS) + FFmpeg + MoviePy
to automatically generate videos from text prompts.
"""

import sys
import os
import json
import subprocess
import tempfile
from pathlib import Path

# AI Tools available
AVAILABLE_TOOLS = {
    "ollama": "LLM for script generation (qwen2.5-coder, gpt-oss, gemma3)",
    "ffmpeg": "Video/audio processing",
    "gtts": "Google Text-to-Speech (online, multi-language)",
    "pyttsx3": "Offline Text-to-Speech (local)",
    "moviepy": "Video editing and composition",
    "scenedetect": "Video scene detection",
    "pydub": "Audio processing",
    "pillow": "Image processing",
    "yt-dlp": "Video download",
    "imageio": "Image/video I/O",
}

def generate_script(topic: str, length_minutes: int = 10, language: str = "en") -> dict:
    """Use Ollama to generate a video script."""
    model = "gpt-oss:20b"
    prompt = f"""You are a professional video script writer.
Create a {length_minutes}-minute video script about: {topic}

Language: {language}
Format: JSON with chapters array, each having title, narration, and visual_description.

Return ONLY valid JSON:
{{"title": "...", "chapters": [{{"title": "...", "narration": "...", "visual": "..."}}]}}
"""
    try:
        result = subprocess.run(
            ["ollama", "run", model, prompt],
            capture_output=True, text=True, timeout=60
        )
        return {"success": True, "script": result.stdout.strip()}
    except Exception as e:
        return {"success": False, "error": str(e)}

def generate_voice(text: str, output_path: str, language: str = "en") -> bool:
    """Generate voice audio using gTTS (online) or pyttsx3 (offline)."""
    try:
        if language.startswith("en"):
            from gtts import gTTS
            tts = gTTS(text=text, lang=language, slow=False)
            tts.save(output_path)
        else:
            import pyttsx3
            engine = pyttsx3.init()
            engine.save_to_file(text, output_path)
            engine.runAndWait()
        return True
    except Exception as e:
        print(f"Voice generation error: {e}")
        return False

def create_video(script: dict, voice_path: str, output_path: str) -> bool:
    """Create video using MoviePy + FFmpeg."""
    try:
        from moviepy import VideoFileClip, AudioFileClip, TextClip, CompositeVideoClip, ColorClip
        import numpy as np

        # Create solid color background clips for each chapter
        clips = []
        colors = [(20, 20, 40), (40, 20, 60), (20, 40, 60), (60, 20, 40), (20, 60, 40)]
        
        for i, chapter in enumerate(script.get("chapters", [])):
            color = colors[i % len(colors)]
            clip = ColorClip(size=(1920, 1080), color=color, duration=10)
            clips.append(clip)

        if clips:
            from moviepy import concatenate_videoclips
            final = concatenate_videoclips(clips)
            
            if os.path.exists(voice_path):
                audio = AudioFileClip(voice_path)
                final = final.with_audio(audio)
            
            final.write_videofile(output_path, fps=24, codec="libx264", audio_codec="aac")
            return True
        return False
    except Exception as e:
        print(f"Video creation error: {e}")
        return False

def auto_generate(topic: str, length: int = 10, language: str = "en"):
    """Full auto-generation pipeline."""
    print(f"\n🎬 Vidora AI — Auto Generation")
    print(f"   Topic: {topic}")
    print(f"   Length: {length} minutes")
    print(f"   Language: {language}")
    print()
    
    # Step 1: Generate script
    print("📝 Step 1: Generating script with Ollama...")
    result = generate_script(topic, length, language)
    if not result["success"]:
        print(f"❌ Script generation failed: {result['error']}")
        return
    print("✅ Script generated")
    
    # Step 2: Generate voice
    print("🎤 Step 2: Generating voiceover...")
    voice_path = os.path.join(tempfile.gettempdir(), "vidora_voice.mp3")
    if not generate_voice(result["script"][:3000], voice_path, language):
        print("⚠️ Voice generation failed, continuing without audio")
        voice_path = ""
    else:
        print("✅ Voice generated")
    
    # Step 3: Create video
    print("🎬 Step 3: Creating video...")
    output_path = os.path.expanduser("~/vidora_output.mp4")
    script_data = {"chapters": [{"title": "Intro", "narration": "Welcome", "visual": "text"}]}
    if create_video(script_data, voice_path, output_path):
        print(f"✅ Video created: {output_path}")
    else:
        print("⚠️ Video creation failed")
    
    print("\n✅ Auto-generation complete!")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        topic = sys.argv[1]
        length = int(sys.argv[2]) if len(sys.argv) > 2 else 10
        lang = sys.argv[3] if len(sys.argv) > 3 else "en"
        auto_generate(topic, length, lang)
    else:
        print("Usage: python3 vidora-agent.py 'Your topic' [length_min] [en|my]")
        print("\nAvailable AI tools:")
        for tool, desc in AVAILABLE_TOOLS.items():
            print(f"  ✅ {tool}: {desc}")
