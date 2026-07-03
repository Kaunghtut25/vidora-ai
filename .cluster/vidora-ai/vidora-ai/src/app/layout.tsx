import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const metadata: Metadata = {
  title: "Vendora — AI Video Production Studio | Thailand 🇹🇭",
  description: "4 AI agents analyze, script, cut, and render your videos. Free forever — ฿0 THB / 0 Ks MMK. Built for creators in Thailand, Myanmar & worldwide.",
  keywords: ["AI video editor Thailand", "video production Myanmar", "CrewAI", "open source video AI", "FFmpeg", "Ollama", "free video editor"],
  openGraph: {
    title: "Vendora — AI Video Production Studio",
    description: "4 AI agents edit your videos. ฿0 THB. Free forever.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="bg-[#06080D] text-white antialiased font-sans min-h-screen selection:bg-violet-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
