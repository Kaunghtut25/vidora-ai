import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Vidora — AI Video Production Studio",
  description: "4 AI agents edit your videos — HKUDS analyzes, FireRed scripts, video-use cuts, LTX renders. Open source. Free forever. No API keys.",
  keywords: ["AI video editor", "automatic video editing", "CrewAI video agent", "open source video AI", "FFmpeg AI", "free video production"],
  openGraph: {
    title: "Vidora — AI Video Production Studio",
    description: "4 AI agents edit your videos. Open source. Free forever.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#0a0a0a] text-white antialiased font-sans min-h-screen selection:bg-[#FF6B35]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
