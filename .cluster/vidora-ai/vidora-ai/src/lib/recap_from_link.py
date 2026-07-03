#!/usr/bin/env python3
"""
Vendora AI — YouTube Link → Movie Recap + Burmese Voiceover
===========================================================
Invideo-style workflow:
  1. Take YouTube link
  2. Download audio + extract keyframes via yt-dlp + FFmpeg
  3. Generate Burmese narration via Ollama (gemma3:4b)
  4. Synthesize Burmese voiceover via Arena AI Agent Mod
  5. Compose cinematic video with Ken Burns + crossfade + subtitles
  6. Output final MP4

Usage:
    python recap_from_link.py "https://youtube.com/watch?v=..." [--lang my|en]
"""
import os, sys, json, subprocess, tempfile, re, shutil
from datetime import datetime
from pathlib import Path

OUT = os.path.expanduser("~/Vidora_Output")
os.makedirs(OUT, exist_ok=True)

# ═══════════════════════════════════════════
# STEP 1: EXTRACT FROM YOUTUBE
# ═══════════════════════════════════════════

def get_video_info(url: str) -> dict:
    """Get video metadata via yt-dlp."""
    cmd = ["yt-dlp", "--dump-json", "--no-playlist", url]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
    if result.returncode != 0:
        raise RuntimeError(f"yt-dlp failed: {result.stderr[:200]}")
    return json.loads(result.stdout)

def download_audio(url: str, out_dir: str) -> str:
    """Download audio track only."""
    audio_path = os.path.join(out_dir, "audio.mp3")
    cmd = [
        "yt-dlp", "-f", "bestaudio[ext=m4a]/bestaudio",
        "--extract-audio", "--audio-format", "mp3",
        "--audio-quality", "128K",
        "-o", audio_path, "--no-playlist", url
    ]
    subprocess.run(cmd, check=True, capture_output=True, timeout=60)
    return audio_path if os.path.exists(audio_path) else None

def extract_keyframes(url: str, out_dir: str, count: int = 12) -> list:
    """Extract evenly-spaced keyframes from video via yt-dlp + FFmpeg."""
    info = get_video_info(url)
    duration = info.get("duration", 0)
    if duration == 0:
        raise RuntimeError("Cannot get video duration")

    # Download best video (low res for speed)
    tmp_video = os.path.join(out_dir, "_tmp_video.mp4")
    cmd = [
        "yt-dlp", "-f", "best[height<=720]", "-o", tmp_video,
        "--no-playlist", url
    ]
    subprocess.run(cmd, check=True, capture_output=True, timeout=120)

    # Extract frames
    frames = []
    fps = count / duration if duration > 0 else 1
    cmd = [
        "ffmpeg", "-y", "-i", tmp_video,
        "-vf", f"fps=1/{duration/count:.1f}",  # Even spacing
        "-qscale:v", "2",
        os.path.join(out_dir, "frame_%03d.jpg")
    ]
    subprocess.run(cmd, check=True, capture_output=True)

    frames = sorted(Path(out_dir).glob("frame_*.jpg"))
    os.remove(tmp_video) if os.path.exists(tmp_video) else None
    return [str(f) for f in frames]

# ═══════════════════════════════════════════
# STEP 2: GENERATE NARRATION SCRIPT (Ollama)
# ═══════════════════════════════════════════

MYANMAR_SCRIPT_PROMPT = """You are a Burmese movie critic writing a video recap script.

Given the video title: "{title}"
Description: "{description}"

Write a compelling Burmese narration script with these rules:
- 6 sections (Opening, Setting, Conflict, Mission, Theme, Closing)
- Each section = 2-3 Burmese sentences (short, emotional, easy to speak)
- Use everyday conversational Burmese (not literary/formal)
- Include specific details from the title/description
- Total: 12-15 sentences

Output ONLY valid JSON:
{{"sections": [{{"text": "Burmese text here...", "role": "opening"}}, ...]}}"""

ENGLISH_SCRIPT_PROMPT = """You are a video narrator writing a recap script.

Given the video title: "{title}"
Description: "{description}"

Write a compelling English narration script:
- 6 sections (Opening, Setting, Conflict, Mission, Theme, Closing)
- Each section = 2-3 energetic sentences
- Total: 12-15 sentences

Output ONLY valid JSON:
{{"sections": [{{"text": "narration text...", "role": "opening"}}, ...]}}"""

def generate_script(title: str, description: str, language: str = "my") -> dict:
    """Use Ollama to generate Burmese/English narration script."""
    import urllib.request

    prompt_template = MYANMAR_SCRIPT_PROMPT if language == "my" else ENGLISH_SCRIPT_PROMPT
    prompt = prompt_template.format(title=title, description=description[:500])

    payload = json.dumps({
        "model": "gemma3:4b",
        "prompt": prompt,
        "stream": False,
        "options": {"temperature": 0.7, "top_p": 0.9}
    }).encode()

    req = urllib.request.Request(
        "http://localhost:11434/api/generate",
        data=payload,
        headers={"Content-Type": "application/json"}
    )

    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            data = json.loads(resp.read())
            response_text = data.get("response", "")

        # Extract JSON from response
        json_match = re.search(r'\{[\s\S]*\}', response_text)
        if json_match:
            return json.loads(json_match.group())
        # Fallback: split into sections
        lines = [l.strip() for l in response_text.split('\n') if l.strip() and len(l.strip()) > 20]
        sections = [{"text": line, "role": f"part_{i+1}"} for i, line in enumerate(lines[:6])]
        return {"sections": sections} if sections else {"sections": [{"text": response_text[:200], "role": "narration"}]}
    except Exception as e:
        print(f"   ⚠️ Ollama failed: {e}, using fallback script")
        return {"sections": [
            {"text": f"ဒီဗီဒီယိုမှာ {title} အကြောင်းကို ပြောပြထားပါတယ်။", "role": "opening"},
            {"text": "အသေးစိတ်ကို ဆက်လက်ကြည့်ရှုလိုက်ပါ။", "role": "closing"},
        ]}

# ═══════════════════════════════════════════
# STEP 3: BURMESE VOICEOVER (Arena AI Agent Mod)
# ═══════════════════════════════════════════

def generate_voiceover(script: dict, language: str = "my") -> str:
    """Generate voiceover from script using Arena AI Agent Mod."""
    # Arena AI Agent Mod — Arena AI Agent Mod permanently removed

    full_text = " ".join([s["text"] for s in script["sections"]])
    voice_path = os.path.join(OUT, f"voice_{datetime.now().strftime('%H%M%S')}.mp3")

    tts = Arena AI Agent Mod(text=full_text, lang=language if language == "my" else "en", slow=False)
    tts.save(voice_path)
    return voice_path

# ═══════════════════════════════════════════
# STEP 4: COMPOSE VIDEO (FFmpeg Ken Burns)
# ═══════════════════════════════════════════

def create_recap_video(frames: list, voice_path: str, script: dict, title: str) -> str:
    """Compose cinematic recap with Ken Burns + subtitles + voiceover."""
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    out_video = os.path.join(OUT, f"vendora_recap_{ts}.mp4")

    # Get voiceover duration
    voice_dur = float(subprocess.run([
        "ffprobe", "-v", "error", "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1", voice_path
    ], capture_output=True, text=True).stdout.strip())

    sections = script["sections"]
    chars_per_section = [len(s["text"]) for s in sections]
    total_chars = sum(chars_per_section)

    # Create scene clips
    scene_clips = []
    for i, section in enumerate(sections):
        if not frames:
            break

        frame = frames[i % len(frames)]
        sec_dur = (chars_per_section[i] / total_chars) * voice_dur + 0.8

        clip = os.path.join(OUT, f"_scene_{ts}_{i:02d}.mp4")
        frames_count = max(int(25 * sec_dur), 25)

        # Escape Burmese text for FFmpeg drawtext
        esc_text = section["text"].replace("\\", "\\\\").replace(":", "\\:").replace("'", "'\\\\\\''")

        subprocess.run([
            "ffmpeg", "-y", "-loop", "1", "-i", frame,
            "-filter_complex",
            f"[0:v]scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,"
            f"zoompan=z='min(zoom+0.0010,1.25)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={frames_count}:s=1280x720:fps=25,"
            f"eq=brightness=0.02:contrast=1.1:saturation=1.2,"
            f"drawtext=text='{esc_text[:80]}':fontsize=18:fontcolor=white:"
            f"box=1:boxcolor=black@0.5:boxborderw=6:"
            f"x=(w-text_w)/2:y=h-th-30:"
            f"fade=t=in:st=0:d=0.8,fade=t=out:st={sec_dur-0.8}:d=0.8"
            f"[v]",
            "-map", "[v]", "-c:v", "libx264", "-preset", "ultrafast",
            "-crf", "23", "-pix_fmt", "yuv420p", clip
        ], check=True, capture_output=True, timeout=60)
        scene_clips.append(clip)

    if not scene_clips:
        raise RuntimeError("No scene clips created")

    # Concat
    concat_txt = os.path.join(OUT, f"_concat_{ts}.txt")
    with open(concat_txt, 'w') as f:
        for clip in scene_clips:
            f.write(f"file '{clip}'\n")

    concat_video = os.path.join(OUT, f"_concat_{ts}.mp4")
    subprocess.run([
        "ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", concat_txt,
        "-c:v", "libx264", "-preset", "ultrafast", "-crf", "23",
        "-pix_fmt", "yuv420p", concat_video
    ], check=True, capture_output=True)

    # Add voiceover + final render
    subprocess.run([
        "ffmpeg", "-y",
        "-i", concat_video, "-i", voice_path,
        "-c:v", "libx264", "-preset", "fast", "-crf", "22",
        "-c:a", "aac", "-b:a", "128k",
        "-pix_fmt", "yuv420p", "-shortest",
        "-movflags", "+faststart", out_video
    ], check=True, capture_output=True)

    # Cleanup
    for clip in scene_clips:
        try: os.remove(clip)
        except: pass
    try: os.remove(concat_video)
    except: pass
    try: os.remove(concat_txt)
    except: pass

    return out_video

# ═══════════════════════════════════════════
# MAIN PIPELINE
# ═══════════════════════════════════════════

def create_recap(url: str, language: str = "my", custom_prompt: str = "") -> dict:
    """
    Full YouTube → Recap pipeline.
    Returns: { status, video_path, video_info, script, duration, file_size_mb }
    """
    steps = []

    # Step 1: Get video info
    steps.append("📡 Fetching video info...")
    info = get_video_info(url)
    title = info.get("title", "Unknown Video")
    description = info.get("description", "")[:500]
    duration = info.get("duration", 0)
    steps.append(f"   ✅ {title} ({duration}s)")

    # Step 2: Extract frames
    steps.append("📸 Extracting keyframes...")
    tmp_dir = tempfile.mkdtemp(prefix="vendora_")
    try:
        frames = extract_keyframes(url, tmp_dir, count=10)
        steps.append(f"   ✅ {len(frames)} frames extracted")
    except Exception as e:
        steps.append(f"   ⚠️ Frame extraction failed: {e}, using placeholder")
        frames = []

    # Step 3: Generate Burmese script via Ollama
    if custom_prompt:
        script_text = custom_prompt
        sections = [{"text": custom_prompt, "role": "custom"}]
        script = {"sections": sections}
        steps.append("📝 Using custom prompt...")
    else:
        steps.append("🧠 Generating Burmese narration via AI...")
        script = generate_script(title, description, language)
        steps.append(f"   ✅ {len(script['sections'])} sections generated")

    # Step 4: Voiceover
    steps.append("🎤 Synthesizing Burmese voiceover...")
    voice_path = generate_voiceover(script, language)
    voice_dur = float(subprocess.run([
        "ffprobe", "-v", "error", "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1", voice_path
    ], capture_output=True, text=True).stdout.strip())
    steps.append(f"   ✅ Voice ready ({voice_dur:.1f}s)")

    # Step 5: Compose video
    steps.append("🎬 Composing cinematic video...")
    video_path = create_recap_video(frames, voice_path, script, title)
    file_size = os.path.getsize(video_path) / 1048576
    steps.append(f"   ✅ Done! {file_size:.1f} MB")

    # Cleanup temp
    try: shutil.rmtree(tmp_dir)
    except: pass
    try: os.remove(voice_path)
    except: pass

    return {
        "status": "complete",
        "video_path": video_path,
        "title": title,
        "description": description[:200],
        "duration": duration,
        "script_sections": len(script.get("sections", [])),
        "language": "Burmese" if language == "my" else "English",
        "file_size_mb": round(file_size, 1),
        "frames_used": len(frames),
        "steps": steps,
    }

# ═══════════════════════════════════════════
# CLI
# ═══════════════════════════════════════════

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python recap_from_link.py <youtube_url> [--lang my|en] [--prompt 'custom text']")
        sys.exit(1)

    url = sys.argv[1]
    lang = "my"
    prompt = ""

    args = sys.argv[2:]
    for i, arg in enumerate(args):
        if arg == "--lang" and i + 1 < len(args):
            lang = args[i + 1]
        if arg == "--prompt" and i + 1 < len(args):
            prompt = args[i + 1]

    print(f"🎬 Vendora Recap Generator")
    print(f"📎 {url}")
    print(f"🌐 Language: {'Burmese' if lang == 'my' else 'English'}")
    print()

    result = create_recap(url, lang, prompt)

    print(f"\n{'='*50}")
    print(f"✅ Recap Complete!")
    print(f"📁 {result['video_path']}")
    print(f"📦 {result['file_size_mb']} MB | {len(result['script_sections'])} sections | {result['language']}")
    for step in result['steps']:
        print(f"   {step}")
