import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export const LENGTH_OPTIONS = [
  { value: 10, label: "10 min" },
  { value: 15, label: "15 min" },
  { value: 20, label: "20 min" },
  { value: 30, label: "30 min" },
  { value: 50, label: "50+ min" },
] as const;

export const GENERATION_STAGES = [
  { id: "research", label: "Researching content", duration: [3, 8] },
  { id: "script", label: "Expanding script with deep thinking", duration: [5, 12] },
  { id: "voiceover", label: "Generating voiceover", duration: [8, 20] },
  { id: "visuals", label: "Creating visuals & B-roll", duration: [10, 25] },
  { id: "editing", label: "Editing & polishing", duration: [5, 15] },
];
