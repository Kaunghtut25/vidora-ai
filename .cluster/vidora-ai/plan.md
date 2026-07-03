# S2 — Vidora AI Plan: Worker Decomposition

## Overview
50+ workers organized into 6 rounds. Core infrastructure done inline.

## Round 1: Layout & Shared UI (8 workers)
| # | Worker | Task | Output |
|---|--------|------|--------|
| 1 | layout-setup | Root layout with providers, theme, fonts | layout.tsx |
| 2 | navbar | Premium navbar with nav links, CTA | components/layout/Navbar.tsx |
| 3 | sidebar | Dashboard sidebar navigation | components/layout/Sidebar.tsx |
| 4 | notifications | Toast notification system | components/ui/notifications.tsx |
| 5 | voice-player | Voice preview audio player component | components/voice/VoicePlayer.tsx |
| 6 | progress-stages | Generation progress stages component | components/generation/ProgressStages.tsx |
| 7 | empty-state | Reusable empty state component | components/ui/EmptyState.tsx |
| 8 | modals | Export modal, confirm modal components | components/ui/Modals.tsx |

## Round 2: Landing Page (6 workers)
| 9 | hero-section | Hero with CTA, animated background | components/landing/Hero.tsx |
| 10 | features-section | Feature highlights grid | components/landing/Features.tsx |
| 11 | how-it-works | 3-step process | components/landing/HowItWorks.tsx |
| 12 | testimonials | Testimonial cards | components/landing/Testimonials.tsx |
| 13 | pricing | Free/Pro/Enterprise pricing | components/landing/Pricing.tsx |
| 14 | landing-page | Landing page assembly | app/page.tsx |

## Round 3: Dashboard (4 workers)
| 15 | project-card | Project card component | components/dashboard/ProjectCard.tsx |
| 16 | project-grid | Project grid with filters | components/dashboard/ProjectGrid.tsx |
| 17 | dashboard-actions | Create new, search, filter bar | components/dashboard/DashboardActions.tsx |
| 18 | dashboard-page | Dashboard page assembly | app/dashboard/page.tsx |

## Round 4: Create Wizard Steps 1-2 (8 workers)
| 19 | content-input | URL, file upload, script, prompt inputs | components/wizard/ContentInput.tsx |
| 20 | deep-research-toggle | Deep research mode toggle | components/wizard/DeepResearchToggle.tsx |
| 21 | wizard-step1 | Step 1 page assembly | app/create/step1/page.tsx |
| 22 | video-length-selector | Length pills + custom slider | components/wizard/VideoLengthSelector.tsx |
| 23 | voice-selector-grid | 12-voice grid with preview buttons | components/wizard/VoiceSelectorGrid.tsx |
| 24 | voice-controls | Speed, emotion, pitch controls | components/wizard/VoiceControls.tsx |
| 25 | style-language-selector | Style + language selector | components/wizard/StyleLanguageSelector.tsx |
| 26 | wizard-step2 | Step 2 page assembly | app/create/step2/page.tsx |

## Round 5: Create Wizard Steps 3-4 + Orchestration (8 workers)
| 27 | generation-screen | Loading screen with stages | components/wizard/GenerationScreen.tsx |
| 28 | wizard-step3 | Step 3 page assembly | app/create/step3/page.tsx |
| 29 | video-preview | Video player with controls | components/wizard/VideoPreview.tsx |
| 30 | transcript-editor | Descript-style transcript editor | components/editor/TranscriptEditor.tsx |
| 31 | regenerate-panel | Regenerate buttons (voice, visuals, length, research) | components/wizard/RegeneratePanel.tsx |
| 32 | wizard-step4 | Step 4 page assembly | app/create/step4/page.tsx |
| 33 | wizard-stepper | Step indicator/progress | components/wizard/WizardStepper.tsx |
| 34 | create-layout | Wizard layout wrapper | app/create/layout.tsx |

## Round 6: Editor, Settings, Final Assembly (8 workers)
| 35 | editor-layout | Split view editor layout | components/editor/EditorLayout.tsx |
| 36 | editor-panels | Right panel (voice, music, captions, brand) | components/editor/EditorPanels.tsx |
| 37 | editor-timeline | Bottom timeline with chapters | components/editor/EditorTimeline.tsx |
| 38 | editor-page | Editor page assembly | app/editor/[id]/page.tsx |
| 39 | settings-brand | Brand kit settings | components/settings/BrandKit.tsx |
| 40 | settings-page | Settings page assembly | app/settings/page.tsx |
| 41 | globals-css | Global styles, theme, animations | globals.css |
| 42 | build-verify | Build and test | build log |

## Dependencies
- Round 1 → Round 2-6 (all depend on layout)
- Round 2 (landing) is independent
- Round 3 (dashboard) needs Round 1
- Round 4 (wizard 1-2) needs Round 1
- Round 5 (wizard 3-4) needs Round 4
- Round 6 (editor, settings) needs Round 1
