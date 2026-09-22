"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { audioSynthesizer } from "@/lib/audioSynthesizer";

interface AudioToggleProps {
  className?: string;
}

export default function AudioToggle({ className = "" }: AudioToggleProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      audioSynthesizer?.stop();
    };
  }, []);

  const handleToggle = () => {
    if (!audioSynthesizer) return;
    const active = audioSynthesizer.toggle();
    setIsPlaying(active);
  };

  return (
    <button
      onClick={handleToggle}
      className={`group relative z-50 flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 backdrop-blur-md border ${
        isPlaying
          ? "bg-[#F6C945]/15 border-[#F6C945]/40 text-[#FFE98A] shadow-[0_0_15px_rgba(246,201,69,0.2)]"
          : "bg-[#1F221E]/60 border-white/10 text-[#FFF8E7]/70 hover:text-[#FFF8E7] hover:border-white/20"
      } ${className}`}
      title={isPlaying ? "Silenciar música" : "Activar música suave"}
      aria-label="Control de música"
    >
      {isPlaying ? (
        <>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F6C945] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F6C945]"></span>
          </span>
          <Volume2 className="w-4 h-4 text-[#F6C945] transition-transform group-hover:scale-110" />
          <span className="tracking-wide">Música activa</span>
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
          <span className="tracking-wide">Activar música 🔊</span>
        </>
      )}
    </button>
  );
}
