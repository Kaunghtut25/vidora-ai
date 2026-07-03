// POST /api/crew — Vidora Multi-Agent Video Editing (CrewAI)
import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const CREW_SCRIPT = 'src/lib/vidora-crew.py';
const VENV_PYTHON = '/Users/kaung/.openclaw-autoclaw/workspace/.venv-agents-py312/bin/python3';

export async function POST(request: NextRequest) {
  try {
    const { action, video_path, transcript, user_prompt, mode } = await request.json();

    let script = `
import sys
sys.path.insert(0, '.')
from src.lib.vidora_crew import vidora_crew
import json

`;

    if (action === 'analyze') {
      script += `
result = vidora_crew.analyze_only("${video_path}")
print(json.dumps(result))
`;
    } else if (action === 'quick_edit') {
      const cuts = await request.json().then(d => d.cuts);
      script += `
cuts = ${JSON.stringify(cuts)}
result = vidora_crew.quick_edit("${video_path}", cuts)
print(json.dumps({"status": "complete", "output": result}))
`;
    } else {
      // Full pipeline
      script += `
result = vidora_crew.full_pipeline(
    video_path="${video_path || ''}",
    transcript="""${(transcript || '').replace(/"/g, '\\"')}""",
    user_prompt="""${(user_prompt || 'Create a polished edit').replace(/"/g, '\\"')}"""
)
print(json.dumps(result))
`;
    }

    // Write temp script and execute
    const tmpScript = `/tmp/vidora_crew_${Date.now()}.py`;
    const { execSync } = require('child_process');
    const fs = require('fs');
    fs.writeFileSync(tmpScript, script);

    const { stdout, stderr } = await execAsync(
      `${VENV_PYTHON} ${tmpScript}`,
      { timeout: 300000, maxBuffer: 10 * 1024 * 1024 }
    );

    return NextResponse.json({
      success: true,
      result: stdout.trim(),
      stderr: stderr || ''
    });

  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message,
      stderr: err.stderr || ''
    }, { status: 500 });
  }
}

// GET — check crew status
export async function GET() {
  try {
    const { stdout } = await execAsync(
      `${VENV_PYTHON} -c "from src.lib.vidora_crew import vidora_crew; print('CrewAI ready —', len(vidora_crew.output_dir), 'agents')"`,
      { timeout: 10000 }
    );
    return NextResponse.json({ status: 'online', message: stdout.trim() });
  } catch (err: any) {
    return NextResponse.json({ status: 'error', message: err.message });
  }
}
