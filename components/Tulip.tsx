"use client";

import React, { useState, useCallback } from "react";

export interface TulipProps {
  id?: string;
  delay?: number;
  scale?: number;
  tilt?: number;
  height?: number;
  swayDuration?: number;
  isHero?: boolean;
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
  easterEggText?: string;
}

export default function Tulip({
  id = "t",
  delay = 0,
  scale = 1,
  tilt = 0,
  height = 290,
  swayDuration = 5.5,
  isHero = false,
  interactive = true,
  onClick,
  className = "",
  easterEggText,
}: TulipProps) {
  const [tapped, setTapped] = useState(false);
  const [whisper, setWhisper] = useState(false);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!interactive) return;
      setTapped(true);
      setTimeout(() => setTapped(false), 650);
      if (easterEggText) {
        setWhisper(true);
        setTimeout(() => setWhisper(false), 2800);
      }
      onClick?.();
    },
    [interactive, easterEggText, onClick]
  );

  const breezeClass =
    parseInt(id.replace(/\D/g, "") || "0", 10) % 2 === 0 ? "breeze-a" : "breeze-b";

  const svgW = 140 * scale;
  const svgH = height * scale;
  const G = id; // gradient namespace

  return (
    <div
      className={`relative inline-block overflow-visible select-none ${
        interactive ? "cursor-pointer" : ""
      } ${className}`}
      style={{ transformOrigin: "bottom center" }}
      onClick={handleClick}
    >
      {/* Whisper toast — CSS only, no physics */}
      {whisper && easterEggText && (
        <div
          className="anim-scale-in absolute -top-14 left-1/2 z-50 pointer-events-none rounded-full border border-[#F6C945]/40 bg-[#1F221E]/95 px-4 py-1.5 text-xs text-[#FFE98A] font-serif whitespace-nowrap shadow-md"
          style={{ transform: "translateX(-50%)", "--dl": "0s" } as React.CSSProperties}
        >
          {easterEggText}
        </div>
      )}

      {/* Breeze: pure CSS @keyframes, no JS */}
      <div
        className={`tulip-root ${tapped ? "tapped" : breezeClass} overflow-visible`}
        style={
          {
            "--t": `${tilt}deg`,
            "--dur": `${swayDuration}s`,
            "--dly": `${(delay * 0.4) % 2.4}s`,
          } as React.CSSProperties
        }
      >
        {/* Growth: scaleY from bottom (transform = compositor-only on Metal) */}
        <div
          className="tulip-grow overflow-visible"
          style={
            {
              "--grow-dur": "0.85s",
              "--grow-delay": `${delay * 0.32}s`,
            } as React.CSSProperties
          }
        >
          <svg
            width={svgW}
            height={svgH}
            viewBox="-20 -15 190 350"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: "visible", display: "block" }}
          >
            <defs>
              <linearGradient id={`s${G}`} x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#263A29" />
                <stop offset="45%" stopColor="#3B5930" />
                <stop offset="85%" stopColor="#567D46" />
                <stop offset="100%" stopColor="#6C9757" />
              </linearGradient>
              <linearGradient id={`l1${G}`} x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#263A29" />
                <stop offset="60%" stopColor="#4A713C" />
                <stop offset="100%" stopColor="#679453" />
              </linearGradient>
              <linearGradient id={`l2${G}`} x1="1" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#1E2F20" />
                <stop offset="55%" stopColor="#416434" />
                <stop offset="100%" stopColor="#5E894C" />
              </linearGradient>
              <linearGradient id={`pb${G}`} x1=".5" y1="1" x2=".5" y2="0">
                <stop offset="0%" stopColor="#D97706" />
                <stop offset="50%" stopColor="#EAB308" />
                <stop offset="100%" stopColor="#FACC15" />
              </linearGradient>
              <linearGradient id={`pl${G}`} x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#CA8A04" />
                <stop offset="45%" stopColor="#F6C945" />
                <stop offset="85%" stopColor="#FFE98A" />
                <stop offset="100%" stopColor="#FFF4BE" />
              </linearGradient>
              <linearGradient id={`pr${G}`} x1="1" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#B45309" />
                <stop offset="35%" stopColor="#EAB308" />
                <stop offset="80%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#FEF08A" />
              </linearGradient>
              <linearGradient id={`pc${G}`} x1=".5" y1="1" x2=".5" y2="0">
                <stop offset="0%" stopColor="#D97706" />
                <stop offset="30%" stopColor="#F6C945" />
                <stop offset="70%" stopColor="#FFE98A" />
                <stop offset="100%" stopColor="#FFF9E0" />
              </linearGradient>
              <radialGradient id={`gw${G}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFF4B8" stopOpacity={isHero ? ".9" : ".65"} />
                <stop offset="65%" stopColor="#F6C945" stopOpacity=".2" />
                <stop offset="100%" stopColor="#F6C945" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Stem */}
            <path d="M75 320 C73 240 78 180 75 95" stroke={`url(#s${G})`} strokeWidth="5.5" strokeLinecap="round" fill="none" />

            {/* Leaves */}
            <path d="M74 270 C50 240 25 210 22 165 C38 185 58 205 74 235Z" fill={`url(#l1${G})`} />
            <path d="M76 250 C95 220 122 195 128 145 C114 175 96 195 75 220Z" fill={`url(#l2${G})`} />

            {/* Glow aura */}
            <circle cx="75" cy="70" r={isHero ? "50" : "38"} fill={`url(#gw${G})`} />

            {/* Back petals */}
            <path d="M75 92 C60 85 52 50 75 22 C98 50 90 85 75 92Z" fill={`url(#pb${G})`} opacity=".9" />
            <path d="M75 92 C55 90 42 62 54 36 C65 52 72 70 75 92Z" fill={`url(#pb${G})`} opacity=".75" />
            <path d="M75 92 C95 90 108 62 96 36 C85 52 78 70 75 92Z" fill={`url(#pb${G})`} opacity=".75" />

            {/* Side petals */}
            <path d="M74 94 C52 92 40 68 48 38 C58 35 68 50 74 72Z" fill={`url(#pl${G})`} />
            <path d="M76 94 C98 92 110 68 102 38 C92 35 82 50 76 72Z" fill={`url(#pr${G})`} />

            {/* Front petal */}
            <path d="M75 96 C58 92 54 58 75 30 C96 58 92 92 75 96Z" fill={`url(#pc${G})`} />

            {/* Specular shine */}
            <path d="M75 42 C72 54 72 72 75 84 C76 72 76 54 75 42Z" fill="#FFF" opacity=".38" />
          </svg>
        </div>
      </div>
    </div>
  );
}
