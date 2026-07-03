'use client';

// ---------------------------------------------------------------------------
// Vidora AI — Mock API / Export Service
// Simulation helpers for the Vidora AI backend (all demo / mock data).
// ---------------------------------------------------------------------------

// ---- helpers ---------------------------------------------------------------

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ---------------------------------------------------------------------------
// Research
// ---------------------------------------------------------------------------

/**
 * Simulate AI research.
 * Returns well-formatted research text with citations after a 2-5 s delay.
 */
export async function simulateResearch(
  source: string,
  deepMode: boolean,
): Promise<string> {
  const waitMs = rand(2000, 5000);
  const depthLabel = deepMode ? 'Deep Research' : 'Standard Research';
  console.log(`[Vidora AI] Researching "${source}" (${depthLabel}) — ${waitMs}ms`);

  await delay(waitMs);

  const topic = source || 'video content creation';

  return [
    '## Research Summary',
    '',
    `Based on analysis of **${topic}**, here are key findings:`,
    '',
    `1. **Current Trends** — The ${topic} space has grown 340% over the past two years, driven by short-form platforms and AI-assisted production pipelines. [Source: techcrunch.com]`,
    `2. **Audience Behavior** — Viewers spend an average of 52 minutes daily consuming short-form content, with retention peaks at 15-30 second clips. [Source: wyzowl.com]`,
    `3. **Creator Economy** — Independent creators now represent 58% of total video inventory, up from 31% in 2022. [Source: tubefilter.com]`,
    `4. **Technical Innovation** — Real-time rendering and voice synthesis have reduced production costs by 60% for mid-tier creators. [Source: videomaker.com]`,
    `5. **Platform Dynamics** — Algorithmic recommendations drive 73% of viewership, making metadata optimization critical. [Source: buffer.com]`,
    '',
    '## Market Statistics',
    '',
    '- 78% of creators use AI tools for video production workflows',
    '- Video content drives 3× more engagement than static posts',
    '- Global video streaming market projected at $1.1T by 2028',
    '- Average production turnaround dropped from 14 days to 3.2 days with AI assistance',
    '- Brands using video see 49% faster revenue growth year-over-year',
    '',
    '## Competitive Landscape',
    '',
    '| Category       | Market Share | Growth YoY |',
    '| -------------- | ------------ | ---------- |',
    '| Short-form     | 42%          | +28%       |',
    '| Educational    | 23%          | +19%       |',
    '| Entertainment  | 18%          | +12%       |',
    '| Brand/Sponsored| 12%          | +34%       |',
    '| Other          | 5%           | +7%        |',
    '',
    '## Suggested Visuals',
    '',
    `- **B-roll**: Close-up shots of content creation tools, editing timelines, and studio setups`,
    `- **Data visualization**: Animated bar chart showing platform adoption rates over time`,
    `- **Overlay**: Key stats as kinetic typography overlays during narration`,
    `- **Comparison split-screen**: Before/after AI-assisted production workflow${deepMode ? '\n- **Deep-dive diagram**: Architecture flow showing end-to-end AI video pipeline' : ''}`,
    '',
    deepMode
      ? '## Expert Interviews & Citations\n\n' +
        '- *Dr. Sarah Chen*, MIT Media Lab: "Generative video models are entering the steep part of the quality curve." [Source: mit.edu]\n' +
        '- *Marcus Rivera*, Head of Content @ HubSpot: "AI doesn\'t replace creative vision — it amplifies it." [Source: hubspot.com]\n' +
        '- Gartner 2025 Hype Cycle places AI video generation at the "Peak of Inflated Expectations" [Source: gartner.com]\n' +
        '- McKinsey Digital estimates $4.2B invested in generative-video startups in the last 18 months [Source: mckinsey.com]'
      : '> 💡 **Tip**: Enable *Deep Research* for expert interviews, citations, and comprehensive source analysis.',
  ].join('\n');
}

// ---------------------------------------------------------------------------
// Script Generation
// ---------------------------------------------------------------------------

const CHAPTER_STYLES: Record<string, string[]> = {
  documentary: [
    'The Hook',
    'Historical Context',
    'The Turning Point',
    'Expert Analysis',
    'The Human Element',
    'Looking Forward',
  ],
  tutorial: [
    'Introduction & Overview',
    'What You Will Need',
    'Step-by-Step Walkthrough',
    'Common Pitfalls',
    'Advanced Tips',
    'Recap & Next Steps',
  ],
  promotional: [
    'The Problem',
    'The Solution',
    'Why It Works',
    'Proof & Testimonials',
    'Call to Action',
  ],
  storytelling: [
    'The Setup',
    'Meet the Characters',
    'Rising Action',
    'The Climax',
    'Resolution',
    'The Takeaway',
  ],
};

const SAMPLE_SCRIPT_PARAGRAPHS = [
  'In a world where attention spans are shorter than ever, video content has emerged as the single most effective medium for communication. Whether you are a brand, a creator, or an educator, the ability to tell compelling stories through video is no longer optional — it is essential.',
  'What makes video so powerful is its unique combination of visual imagery, sound, and narrative structure. When these elements work in harmony, they create an emotional connection that static text and images simply cannot replicate. Research consistently shows that viewers retain 95% of a message when they watch it in a video, compared to just 10% when reading text.',
  'Let us take a moment to explore what this means in practice. Imagine you are launching a new product. A well-structured video script guides the viewer through a carefully designed journey: first establishing the problem, then introducing your solution, demonstrating its impact, and finally inviting the viewer to take action. Each beat reinforces the message, building momentum toward conversion.',
  'But none of this happens by accident. The best video scripts are meticulously planned, with every word earning its place on the page. Writers must consider pacing, tone, visual accompaniment, and audience context — all while keeping the core message crystal clear. It is a discipline that blends creative writing with strategic thinking.',
  'So how do you get started? Begin with a single, focused idea. What is the one thing you want your audience to remember? Build your script around that central thesis, and let every supporting point serve that goal. Keep your sentences short and your language conversational. Remember: video is a medium of connection, not complexity.',
  'As we reach the final stretch of our exploration, one thing becomes clear: the tools may evolve, but the fundamentals of great storytelling remain constant. Authenticity, clarity, and empathy — these are the qualities that separate a forgettable video from one that resonates, inspires, and compels action.',
];

/**
 * Simulate script generation.
 * Returns a multi-paragraph script with chapter markers after 3-8 s.
 */
export async function simulateScriptGeneration(
  content: string,
  length: number,
  style: string,
): Promise<string> {
  const waitMs = rand(3000, 8000);
  console.log(`[Vidora AI] Generating script (${style}, ${length}min) — ${waitMs}ms`);

  await delay(waitMs);

  const styleKey = style in CHAPTER_STYLES ? style : 'documentary';
  const chapters = CHAPTER_STYLES[styleKey];
  const paragraphCount = Math.min(
    Math.max(Math.floor(length * 1.2), chapters.length),
    SAMPLE_SCRIPT_PARAGRAPHS.length * 2,
  );
  const topic = content || 'the future of content creation';

  const scriptParagraphs: string[] = [];

  // Intro
  scriptParagraphs.push(`[CHAPTER: ${chapters[0]}]`);
  scriptParagraphs.push(
    `Welcome to this ${style} exploration of ${topic}. In the next ${length} minutes, we will take you on a journey through the most important ideas, backed by real-world examples and actionable insights.`,
  );

  // Body chapters
  for (let i = 1; i < chapters.length; i++) {
    scriptParagraphs.push('');
    scriptParagraphs.push(`[CHAPTER: ${chapters[i]}]`);
    const base = SAMPLE_SCRIPT_PARAGRAPHS[i % SAMPLE_SCRIPT_PARAGRAPHS.length];
    scriptParagraphs.push(base);
  }

  // Extra paragraphs for longer scripts
  if (paragraphCount > chapters.length) {
    for (
      let i = chapters.length;
      i < paragraphCount;
      i++
    ) {
      scriptParagraphs.push('');
      const extra = SAMPLE_SCRIPT_PARAGRAPHS[i % SAMPLE_SCRIPT_PARAGRAPHS.length];
      // slightly reword to avoid exact duplicates
      scriptParagraphs.push(extra.replace(/^(\w+)/, 'Moving forward, $1'));
    }
  }

  // Outro
  scriptParagraphs.push('');
  scriptParagraphs.push(
    `[OUTRO] Thank you for joining us on this journey through ${topic}. If you found this valuable, share it with someone who needs to hear it. Until next time — keep creating.`,
  );

  // Tone/vibe note
  scriptParagraphs.push('');
  scriptParagraphs.push(
    `<!-- tone: ${style} | target duration: ${length} min | generated by Vidora AI -->`,
  );

  return scriptParagraphs.join('\n');
}

// ---------------------------------------------------------------------------
// Video Generation — 5-stage pipeline
// ---------------------------------------------------------------------------

const STAGES = [
  { id: 'analyzing',   label: 'Analyzing script & references' },
  { id: 'storyboard',  label: 'Generating storyboard' },
  { id: 'rendering',   label: 'Rendering visual scenes' },
  { id: 'voice',       label: 'Synthesizing voice-over' },
  { id: 'compositing', label: 'Compositing final video' },
];

/**
 * Simulate video generation.
 * Steps through 5 stages with increasing delays, calling onStageUpdate
 * with {stageId, progress} at each step.
 */
export async function simulateVideoGeneration(
  onStageUpdate: (stageId: string, progress: number) => void,
): Promise<void> {
  console.log('[Vidora AI] Starting video generation pipeline');

  for (let i = 0; i < STAGES.length; i++) {
    const stage = STAGES[i];
    const progressBefore = Math.round((i / STAGES.length) * 100);
    const progressAfter = Math.round(((i + 1) / STAGES.length) * 100);

    onStageUpdate(stage.id, progressBefore);

    // Simulate sub-step progress updates within the stage
    const substeps = rand(1, 3);
    const stageDuration = rand(1500, 3000) * (i + 1);
    const stepDelay = Math.floor(stageDuration / (substeps + 1));

    for (let s = 1; s <= substeps; s++) {
      await delay(stepDelay);
      const subProgress = Math.round(
        progressBefore + ((progressAfter - progressBefore) * s) / (substeps + 1),
      );
      onStageUpdate(stage.id, subProgress);
    }

    await delay(stepDelay);
    onStageUpdate(stage.id, progressAfter);
  }

  console.log('[Vidora AI] Video generation complete');
}

// ---------------------------------------------------------------------------
// Voice Preview
// ---------------------------------------------------------------------------

const VOICE_NAMES: Record<string, string> = {
  'nova':     'Nova (warm, British)',
  'echo':     'Echo (deep, American)',
  'sage':     'Sage (calm, Australian)',
  'luna':     'Luna (bright, Japanese-English)',
  'onyx':     'Onyx (authoritative, deep)',
};

/**
 * Simulate a voice preview.
 * Returns after ~0.5 s (audio would play in the real implementation).
 */
export async function simulateVoicePreview(voiceId: string): Promise<void> {
  const waitMs = rand(400, 600);
  const label = VOICE_NAMES[voiceId] ?? voiceId;
  console.log(`[Vidora AI] Playing voice preview: ${label} (${waitMs}ms)`);

  await delay(waitMs);

  console.log(`[Vidora AI] Voice preview complete — ${label}`);
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

/**
 * Simulate exporting the final video.
 * Returns "success" after ~3 s.
 */
export async function simulateExport(format: string): Promise<string> {
  const waitMs = rand(2500, 3500);
  console.log(`[Vidora AI] Exporting video as .${format} — ${waitMs}ms`);

  await delay(waitMs);

  console.log(`[Vidora AI] Export complete — vidora_output.${format}`);
  return 'success';
}
