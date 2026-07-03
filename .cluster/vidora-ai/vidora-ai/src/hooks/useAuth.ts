'use client';

import { useAuthStore } from '@/store/auth';
import type { User } from '@/store/auth';

/**
 * Convenience hook that re-exports auth state and actions.
 */
export function useAuth() {
  const store = useAuthStore();

  return {
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    login: store.login,
    signup: store.signup,
    logout: store.logout,
    loginWithOAuth: store.loginWithOAuth,
    updateProfile: store.updateProfile,
    resetPassword: store.resetPassword,
  };
}

/** Shortcut to grab just the current user. */
export function useCurrentUser(): User | null {
  return useAuthStore((s) => s.user);
}

/** Shortcut to check authentication status. */
export function useIsAuthenticated(): boolean {
  return useAuthStore((s) => s.isAuthenticated);
}

/** Shortcut for loading state during login/signup/OAuth. */
export function useAuthLoading(): boolean {
  return useAuthStore((s) => s.isLoading);
}
