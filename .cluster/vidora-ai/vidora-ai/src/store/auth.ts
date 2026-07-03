'use client';

import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'editor' | 'viewer';
  plan: 'free' | 'pro' | 'enterprise';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loginWithOAuth: (provider: 'google' | 'github' | 'microsoft') => Promise<void>;
  updateProfile: (data: Partial<User>) => void;
  resetPassword: (email: string) => Promise<void>;
}

const DEMO_USER: User = {
  id: 'demo-1',
  name: 'Ko Kaung',
  email: 'ko@vidora.ai',
  role: 'admin',
  plan: 'enterprise',
  createdAt: '2026-07-01',
};

const USER_STORAGE_KEY = 'vidora-auth-user';

function loadUserFromStorage(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

function saveUserToStorage(user: User | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  } catch {
    // swallow — storage unavailable
  }
}

function randomDelay(): number {
  return 1000 + Math.random() * 500; // 1–1.5s
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: loadUserFromStorage(),
  isAuthenticated: loadUserFromStorage() !== null,
  isLoading: false,

  login: async (email: string, _password: string) => {
    set({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, randomDelay()));
      // Demo: admin@vidora.ai / admin123 → admin role
      const isAdmin = email === 'admin@vidora.ai' && _password === 'admin123';
      const user: User = isAdmin
        ? { ...DEMO_USER, email, role: 'admin', plan: 'enterprise', name: 'Admin' }
        : { ...DEMO_USER, email, role: 'viewer', plan: 'free' };
      saveUserToStorage(user);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch {
      set({ isLoading: false });
      throw new Error('Login failed');
    }
  },

  signup: async (name: string, email: string, _password: string) => {
    set({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, randomDelay()));
      const user: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: 'viewer',
        plan: 'free',
        createdAt: new Date().toISOString().slice(0, 10),
      };
      saveUserToStorage(user);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch {
      set({ isLoading: false });
      throw new Error('Signup failed');
    }
  },

  logout: () => {
    saveUserToStorage(null);
    set({ user: null, isAuthenticated: false });
  },

  loginWithOAuth: async (provider: 'google' | 'github' | 'microsoft') => {
    set({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, randomDelay()));
      const user: User = {
        ...DEMO_USER,
        name: `Ko Kaung (${provider})`,
      };
      saveUserToStorage(user);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch {
      set({ isLoading: false });
      throw new Error(`OAuth login via ${provider} failed`);
    }
  },

  updateProfile: (data: Partial<User>) => {
    const current = get().user;
    if (!current) return;
    const updated: User = { ...current, ...data };
    saveUserToStorage(updated);
    set({ user: updated });
  },

  resetPassword: async (_email: string) => {
    await new Promise((resolve) => setTimeout(resolve, randomDelay()));
    // mock — no-op
  },
}));
