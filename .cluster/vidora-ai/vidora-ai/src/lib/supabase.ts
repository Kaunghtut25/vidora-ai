// ---------------------------------------------------------------------------
// Vidora AI — Supabase Client & Helpers
// Falls back to mock mode when env vars are not configured.
// ---------------------------------------------------------------------------

import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role?: string;
  plan?: string;
}

export interface ProjectRecord {
  id: string;
  user_id: string;
  title: string;
  status: "draft" | "rendering" | "completed" | "failed";
  duration: number;
  voice_id: string;
  script: string;
  thumbnail: string;
  created_at: string;
  updated_at: string;
}

// ---------------------------------------------------------------------------
// Auth Helpers
// ---------------------------------------------------------------------------

export async function signUp(
  email: string,
  password: string,
  metadata?: Record<string, unknown>,
): Promise<{ user: AuthUser | null; error: string | null }> {
  if (!supabase) {
    // Mock mode
    return {
      user: {
        id: `mock-${Date.now()}`,
        email,
        name: (metadata?.name as string) || email.split("@")[0],
        role: "user",
        plan: "free",
      },
      error: null,
    };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: metadata || {} },
  });

  if (error) return { user: null, error: error.message };

  const user: AuthUser | null = data.user
    ? {
        id: data.user.id,
        email: data.user.email || "",
        name: (metadata?.name as string) || data.user.email?.split("@")[0],
        role: (metadata?.role as string) || "user",
        plan: (metadata?.plan as string) || "free",
      }
    : null;

  return { user, error: null };
}

export async function signIn(
  email: string,
  password: string,
): Promise<{ user: AuthUser | null; error: string | null }> {
  if (!supabase) {
    // Mock mode
    return {
      user: {
        id: `mock-${Date.now()}`,
        email,
        name: email.split("@")[0],
        role: "user",
        plan: "free",
      },
      error: null,
    };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { user: null, error: error.message };

  const user: AuthUser | null = data.user
    ? {
        id: data.user.id,
        email: data.user.email || "",
        name: (data.user.user_metadata?.name as string) || data.user.email?.split("@")[0],
        role: (data.user.user_metadata?.role as string) || "user",
        plan: (data.user.user_metadata?.plan as string) || "free",
      }
    : null;

  return { user, error: null };
}

export async function signOut(): Promise<{ error: string | null }> {
  if (!supabase) return { error: null };
  const { error } = await supabase.auth.signOut();
  return { error: error?.message || null };
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  if (!supabase) return null;

  const { data } = await supabase.auth.getUser();
  if (!data.user) return null;

  return {
    id: data.user.id,
    email: data.user.email || "",
    name: (data.user.user_metadata?.name as string) || data.user.email?.split("@")[0],
    role: (data.user.user_metadata?.role as string) || "user",
    plan: (data.user.user_metadata?.plan as string) || "free",
  };
}

// ---------------------------------------------------------------------------
// Project CRUD Helpers
// ---------------------------------------------------------------------------

export async function createProject(
  data: Omit<ProjectRecord, "id" | "created_at" | "updated_at">,
): Promise<{ project: ProjectRecord | null; error: string | null }> {
  if (!supabase) {
    const now = new Date().toISOString();
    return {
      project: {
        ...data,
        id: `mock-${Date.now()}`,
        created_at: now,
        updated_at: now,
      },
      error: null,
    };
  }

  const { data: row, error } = await supabase
    .from("projects")
    .insert(data)
    .select()
    .single();

  if (error) return { project: null, error: error.message };
  return { project: row as ProjectRecord, error: null };
}

export async function getProjects(
  userId: string,
): Promise<{ projects: ProjectRecord[]; error: string | null }> {
  if (!supabase) return { projects: [], error: null };

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) return { projects: [], error: error.message };
  return { projects: (data || []) as ProjectRecord[], error: null };
}

export async function updateProject(
  id: string,
  updates: Partial<ProjectRecord>,
): Promise<{ project: ProjectRecord | null; error: string | null }> {
  if (!supabase) return { project: null, error: "Supabase not configured" };

  const { data, error } = await supabase
    .from("projects")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) return { project: null, error: error.message };
  return { project: data as ProjectRecord, error: null };
}

export async function deleteProject(
  id: string,
): Promise<{ error: string | null }> {
  if (!supabase) return { error: null };

  const { error } = await supabase.from("projects").delete().eq("id", id);
  return { error: error?.message || null };
}
