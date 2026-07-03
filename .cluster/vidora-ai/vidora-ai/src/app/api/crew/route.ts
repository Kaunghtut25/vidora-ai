// POST /api/crew — Vidora 4-Agent Production Pipeline
// Agents: HKUDS → FireRed → video-use → LTX

import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import { writeFileSync, unlinkSync } from 'fs';

const execAsync = promisify(exec);
const VENV_PYTHON = '/Users/kaung/.openclaw-autoclaw/workspace/.venv-agents-py312/bin/python3';

type AgentStage = 'analyze' | 'plan' | 'cut' | 'render';
type JobStatus = 'queued' | 'running' | 'complete' | 'failed';

interface Job {
  id: string;
  status: JobStatus;
  stage: string;
  result?: any;
  error?: string;
  started: string;
  completed?: string;
}

// In-memory job store (resets on server restart)
const jobs = new Map<string, Job>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, video_path, prompt, transcript } = body;

    if (action === 'analyze') {
      // Stage 1 only: HKUDS VideoAgent analysis
      const script = `
import sys, os
sys.path.insert(0, 'src/lib')
from vidora_crew import vidora_production
import json
result = vidora_production.analyze_only("${video_path}")
print(json.dumps(result))
`;
      return await runScript(script);

    } else if (action === 'produce') {
      // Full 4-agent pipeline
      const jobId = `job_${Date.now().toString(36)}`;
      const safePrompt = (prompt || 'Create a polished edit').replace(/"/g, '\\"');
      const safeTranscript = (transcript || '').replace(/"/g, '\\"');

      jobs.set(jobId, { id: jobId, status: 'queued', stage: 'Starting...', started: new Date().toISOString() });
      jobs.set(jobId, { ...jobs.get(jobId)!, status: 'running', stage: '1/4 — HKUDS VideoAgent analyzing...' });

      const script = `
import sys, os
sys.path.insert(0, 'src/lib')
from vidora_crew import vidora_production
import json

result = vidora_production.produce(
    video_path="${video_path}",
    user_prompt="${safePrompt}",
    transcript="""${safeTranscript}"""
)
print(json.dumps(result))
`;
      const result = await runScript(script);
      jobs.set(jobId, { ...jobs.get(jobId)!, status: 'complete', stage: 'Done ✓', result: result, completed: new Date().toISOString() });

      return NextResponse.json({ job_id: jobId, status: 'complete', result, stages_completed: 4 });

    } else if (action === 'quick_cut') {
      // Single-agent quick cut
      const script = `
import sys, os
sys.path.insert(0, 'src/lib')
from vidora_crew import cut_video_segment, concatenate_scenes
import json

segs = []
cuts = ${JSON.stringify(body.cuts || [])}
for i, (s, e) in enumerate(cuts):
    segs.append(cut_video_segment("${video_path}", s, e, f"qcut_{i}"))
final = concatenate_scenes(json.dumps(segs))
print(json.dumps({"status": "complete", "output": final}))
`;
      return await runScript(script);
    }

    return NextResponse.json({ error: 'Unknown action. Use: analyze, produce, quick_cut' }, { status: 400 });

  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// GET /api/crew — agent status & list
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  try {
    if (action === 'agents') {
      // List all 4 agents with capabilities
      return NextResponse.json({
        pipeline: "HKUDS → FireRed → video-use → LTX",
        agents: [
          {
            id: 1, name: "HKUDS VideoAgent", role: "Video Content Intelligence Expert",
            backstory: "Reads raw footage, detects scenes/objects/speech, builds temporal video memory.",
            tools: ["analyze_video_memory", "extract_audio_for_transcription"],
            powered_by: "HKUDS/VideoAgent",
            icon: "🔍"
          },
          {
            id: 2, name: "FireRed-OpenStoryline", role: "Creative Video Director",
            backstory: "Generates rhythm-aware narratives, writes emotional scripts, plans visual flow.",
            tools: ["script_generator", "storyboard_planner"],
            powered_by: "FireRedTeam/FireRed-OpenStoryline",
            icon: "✍️"
          },
          {
            id: 3, name: "video-use (browser-use)", role: "Autonomous Video Editor",
            backstory: "LLM-driven editor: jump cuts, 30ms audio fades, UPPERCASE subtitles. Self-evaluates output.",
            tools: ["cut_video_segment", "apply_audio_fade", "burn_subtitles", "concatenate_scenes"],
            powered_by: "browser-use/video-use",
            icon: "✂️"
          },
          {
            id: 4, name: "LTX Engine", role: "VFX & Rendering Engine",
            backstory: "AI transitions, color grading, final H.264 1080p render.",
            tools: ["add_transition_frames", "render_final_output"],
            powered_by: "Lightricks/LTX-Video",
            icon: "🎨"
          }
        ],
        total_agents: 4,
        process: "sequential",
        llm: "Ollama gemma3:4b",
        output_dir: "~/Vidora_Output"
      });
    } else if (action === 'jobs') {
      return NextResponse.json(Array.from(jobs.values()));
    }

    // Default: health check
    const { stdout } = await execAsync(
      `${VENV_PYTHON} -c "from vidora_crew import video_analyzer, storyline_director, video_editor, render_engine; print('OK')"`,
      { timeout: 10000, cwd: process.cwd() }
    );
    return NextResponse.json({ status: 'online', agents: 4, pipeline: 'HKUDS → FireRed → video-use → LTX' });

  } catch (err: any) {
    return NextResponse.json({ status: 'offline', error: err.message });
  }
}

async function runScript(pyCode: string) {
  const tmpFile = `/tmp/vidora_crew_${Date.now()}.py`;
  writeFileSync(tmpFile, pyCode);
  try {
    const { stdout, stderr } = await execAsync(
      `${VENV_PYTHON} ${tmpFile}`,
      { timeout: 300000, maxBuffer: 10 * 1024 * 1024, cwd: process.cwd() }
    );
    return NextResponse.json({ success: true, output: stdout.trim(), stderr: stderr || '' });
  } finally {
    try { unlinkSync(tmpFile); } catch {}
  }
}
