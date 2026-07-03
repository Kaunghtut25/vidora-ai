import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Vendora — AI Video Production Studio",
  description: "4 AI agents analyze, script, cut, and render your videos. Open source. Free forever. No API keys.",
  keywords: ["AI video editor", "CrewAI", "video production", "open source", "FFmpeg", "Ollama"],
  openGraph: {
    title: "Vendora — AI Video Production Studio",
    description: "4 AI agents collaborate to create cinematic videos. Free forever.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#0B0F19] text-white antialiased font-sans min-h-screen selection:bg-violet-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
