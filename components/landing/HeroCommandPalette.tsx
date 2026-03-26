"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroCommandPalette() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div style={{ perspective: "1000px" }}>
      <motion.div
        initial={{ opacity: 0, y: 80, rotateX: 15, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 mt-16 mx-auto w-full max-w-[640px] rounded-2xl border border-white/10 bg-[#0d0d0d]/80 backdrop-blur-xl shadow-2xl overflow-hidden"
      >
        <div className="flex items-center px-4 py-4 border-b border-white/10">
          <Search className="w-5 h-5 text-neutral-400 mr-3" />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex-1"
          >
            <input 
              type="text" 
              placeholder="Search for apps and commands..." 
              className="bg-transparent border-none text-white text-[15px] outline-none w-full placeholder:text-neutral-500 font-medium"
              value="Toggle System Appearance"
              readOnly
            />
          </motion.div>
          <div className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded flex items-center justify-center text-[10px] text-white/50 border border-white/10 shadow-[0_1px_1px_rgba(0,0,0,0.5)]">↵</kbd>
          </div>
        </div>
        
        <div className="p-2 space-y-1">
          <div className="px-3 py-2 text-xs font-semibold text-white/30 uppercase tracking-[0.05em]">Suggestions</div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/10 text-white cursor-default"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-gradient-to-b from-[#ff8c8c] to-[#ff4d4d] flex items-center justify-center text-[16px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                <span className="text-white drop-shadow-md">🌓</span>
              </div>
              <span className="font-medium text-[14px]">Toggle System Appearance</span>
            </div>
            <span className="text-white/40 text-[13px]">System</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 text-neutral-300 cursor-default transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-gradient-to-b from-[#6b9dff] to-[#3b7cff] flex items-center justify-center text-[16px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                <span className="text-white drop-shadow-md">📅</span>
              </div>
              <span className="font-medium text-[14px] text-white/90">My Schedule</span>
            </div>
            <span className="text-white/40 text-[13px]">Calendar</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 text-neutral-300 cursor-default transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-gradient-to-b from-[#6be09d] to-[#3bc07c] flex items-center justify-center text-[16px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                <span className="text-white drop-shadow-md">✓</span>
              </div>
              <span className="font-medium text-[14px] text-white/90">Create Todo</span>
            </div>
            <span className="text-white/40 text-[13px]">Reminders</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
