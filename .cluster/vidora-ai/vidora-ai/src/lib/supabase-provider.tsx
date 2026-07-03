"use client";

// ---------------------------------------------------------------------------
// Vidora AI — Supabase Auth Provider
// Wraps the app and exposes auth state.
// Falls back to mock/demo mode when Supabase env vars are not set.
// ---------------------------------------------------------------------------

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  supabase,
  isSupabaseConfigured,
  signUp as supabaseSignUp,
  signIn as supabaseSignIn,
  signOut as supabaseSignOut,
  getCurrentUser,
  type AuthUser,
} from "./supabase";

// ---------------------------------------------------------------------------
// Context Types
// ---------------------------------------------------------------------------

interface SupabaseContextValue {
  user: AuthUser | null;
  loading: boolean;
  isMockMode: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (
    email: string,
    password: string,
    metadata?: Record<string, unknown>,
  ) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const SupabaseContext = createContext<SupabaseContextValue | undefined>(undefined);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function SupabaseAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize — restore session or set mock user
  useEffect(() => {
    let mounted = true;

    async function init() {
      if (!isSupabaseConfigured || !supabase) {
        // Mock mode — check localStorage for a persisted mock user
        const stored = typeof window !== "undefined"
          ? localStorage.getItem("vidora-mock-user")
          : null;
        if (stored) {
          try {
            if (mounted) setUser(JSON.parse(stored));
          } catch {
            // ignore parse errors
          }
        }
        if (mounted) setLoading(false);
        return;
      }

      // Real Supabase mode — restore session
      const currentUser = await getCurrentUser();
      if (mounted) {
        setUser(currentUser);
        setLoading(false);
      }

      // Subscribe to auth changes
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          if (!mounted) return;
          if (session?.user) {
            const u: AuthUser = {
              id: session.user.id,
              email: session.user.email || "",
              name: (session.user.user_metadata?.name as string) ||
                session.user.email?.split("@")[0] ||
                "User",
              role: (session.user.user_metadata?.role as string) || "user",
              plan: (session.user.user_metadata?.plan as string) || "free",
            };
            setUser(u);
          } else {
            setUser(null);
          }
        },
      );

      return () => {
        authListener?.subscription.unsubscribe();
      };
    }

    init();
    return () => {
      mounted = false;
    };
  }, []);

  // ---- signIn ----
  const signIn = useCallback(
    async (email: string, password: string): Promise<{ error: string | null }> => {
      const { user: signedInUser, error } = await supabaseSignIn(email, password);
      if (error) return { error };

      if (!isSupabaseConfigured && signedInUser) {
        // Persist mock user
        localStorage.setItem("vidora-mock-user", JSON.stringify(signedInUser));
      }

      setUser(signedInUser);
      return { error: null };
    },
    [],
  );

  // ---- signUp ----
  const signUp = useCallback(
    async (
      email: string,
      password: string,
      metadata?: Record<string, unknown>,
    ): Promise<{ error: string | null }> => {
      const { user: newUser, error } = await supabaseSignUp(email, password, metadata);
      if (error) return { error };

      if (!isSupabaseConfigured && newUser) {
        // Persist mock user
        localStorage.setItem("vidora-mock-user", JSON.stringify(newUser));
      }

      setUser(newUser);
      return { error: null };
    },
    [],
  );

  // ---- signOut ----
  const signOut = useCallback(async () => {
    await supabaseSignOut();

    if (!isSupabaseConfigured) {
      localStorage.removeItem("vidora-mock-user");
    }

    setUser(null);
  }, []);

  const value: SupabaseContextValue = {
    user,
    loading,
    isMockMode: !isSupabaseConfigured,
    signIn,
    signUp,
    signOut,
  };

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useSupabaseAuth(): SupabaseContextValue {
  const ctx = useContext(SupabaseContext);
  if (!ctx) {
    throw new Error("useSupabaseAuth must be used within a SupabaseAuthProvider");
  }
  return ctx;
}
