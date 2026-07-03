import { create } from 'zustand';
import { Project, VoiceSettings, VideoLength, VideoStyle, GenerationStage, ContentInputType, BrandKit } from '@/types';

interface AppState {
  // Projects
  projects: Project[];
  currentProject: Project | null;
  setProjects: (projects: Project[]) => void;
  setCurrentProject: (project: Project | null) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;

  // Wizard state
  wizardStep: number;
  setWizardStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  // Content input
  contentInput: ContentInputType;
  contentSource: string;
  setContentInput: (type: ContentInputType) => void;
  setContentSource: (source: string) => void;

  // Customization
  videoLength: VideoLength;
  setVideoLength: (length: VideoLength) => void;
  voiceSettings: VoiceSettings;
  setVoiceSettings: (settings: Partial<VoiceSettings>) => void;
  videoStyle: VideoStyle;
  setVideoStyle: (style: VideoStyle) => void;
  projectLanguage: 'English' | 'Burmese' | 'Bilingual';
  setProjectLanguage: (lang: 'English' | 'Burmese' | 'Bilingual') => void;
  deepResearch: boolean;
  setDeepResearch: (enabled: boolean) => void;

  // Generation
  generationStages: GenerationStage[];
  setGenerationStages: (stages: GenerationStage[]) => void;
  updateStage: (id: string, updates: Partial<GenerationStage>) => void;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;

  // Brand kit
  brandKit: BrandKit;
  setBrandKit: (kit: Partial<BrandKit>) => void;

  // UI
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  notifications: Array<{ id: string; message: string; type: 'success' | 'error' | 'info' }>;
  addNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeNotification: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  projects: [],
  currentProject: null,
  setProjects: (projects) => set({ projects }),
  setCurrentProject: (project) => set({ currentProject: project }),
  addProject: (project) => set((s) => ({ projects: [project, ...s.projects] })),
  updateProject: (id, updates) => set((s) => ({
    projects: s.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    currentProject: s.currentProject?.id === id ? { ...s.currentProject, ...updates } : s.currentProject,
  })),

  wizardStep: 0,
  setWizardStep: (step) => set({ wizardStep: step }),
  nextStep: () => set((s) => ({ wizardStep: Math.min(s.wizardStep + 1, 3) })),
  prevStep: () => set((s) => ({ wizardStep: Math.max(s.wizardStep - 1, 0) })),

  contentInput: 'url',
  contentSource: '',
  setContentInput: (type) => set({ contentInput: type }),
  setContentSource: (source) => set({ contentSource: source }),

  videoLength: 10,
  setVideoLength: (length) => set({ videoLength: length }),
  voiceSettings: { voiceId: 'sophia', speed: 1.0, emotion: 'Neutral', pitch: 0 },
  setVoiceSettings: (settings) => set((s) => ({ voiceSettings: { ...s.voiceSettings, ...settings } })),
  videoStyle: 'Educational',
  setVideoStyle: (style) => set({ videoStyle: style }),
  projectLanguage: 'English',
  setProjectLanguage: (lang) => set({ projectLanguage: lang }),
  deepResearch: false,
  setDeepResearch: (enabled) => set({ deepResearch: enabled }),

  generationStages: [],
  setGenerationStages: (stages) => set({ generationStages: stages }),
  updateStage: (id, updates) => set((s) => ({
    generationStages: s.generationStages.map((st) => (st.id === id ? { ...st, ...updates } : st)),
  })),
  isGenerating: false,
  setIsGenerating: (generating) => set({ isGenerating: generating }),

  brandKit: { primaryColor: '#8B5CF6', secondaryColor: '#06B6D4', font: 'Inter', watermark: false },
  setBrandKit: (kit) => set((s) => ({ brandKit: { ...s.brandKit, ...kit } })),

  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  notifications: [],
  addNotification: (message, type = 'info') => set((s) => ({
    notifications: [...s.notifications, { id: Date.now().toString(), message, type }],
  })),
  removeNotification: (id) => set((s) => ({
    notifications: s.notifications.filter((n) => n.id !== id),
  })),
}));
