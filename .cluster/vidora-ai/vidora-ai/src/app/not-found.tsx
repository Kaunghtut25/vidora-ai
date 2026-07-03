"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] rounded-2xl p-10 md:p-14 text-center max-w-md">
          <h1 className="text-[8rem] md:text-[10rem] leading-none font-extrabold bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent select-none">
            404
          </h1>
          <p className="mt-4 text-lg text-white/60 font-medium">
            Page not found
          </p>
          <p className="mt-1 text-sm text-white/30">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-block mt-8 px-6 py-2.5 rounded-xl bg-white/10 border border-white/[0.08] text-white/80 font-medium text-sm hover:bg-white/15 hover:text-white transition-colors duration-200"
          >
            Go back home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
