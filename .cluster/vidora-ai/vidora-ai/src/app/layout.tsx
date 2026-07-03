import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Vendora — AI-Powered Video Editing Platform | Thailand 🇹🇭",
  description: "4 AI agents analyze, script, cut, and render your videos. Free forever — ฿0 THB / 0 Ks MMK. Open source video production for creators everywhere.",
  keywords: ["AI video editor", "video production", "CrewAI", "open source", "FFmpeg", "Ollama", "Thailand", "Myanmar"],
  openGraph: { title: "Vendora — AI-Powered Video Editing Platform", description: "4 AI agents edit your videos. Free forever.", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-gray-900 antialiased font-sans min-h-screen selection:bg-purple-100 selection:text-purple-900">
        {children}
      </body>
    </html>
  );
}
