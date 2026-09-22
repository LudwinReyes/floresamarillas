"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export interface TulipProps {
  id?: string;
  delay?: number;
  scale?: number;
  tilt?: number; // Initial tilt angle (-15 to 15)
  height?: number; // Stem length adjustment
  swayDuration?: number;
  hueVariation?: number; // Slight tint shift
  isHero?: boolean;
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
  easterEggText?: string;
}

export default function Tulip({
  id = "tulip",
  delay = 0,
  scale = 1,
  tilt = 0,
  height = 300,
  swayDuration = 5.5,
  hueVariation = 0,
  isHero = false,
  interactive = true,
  onClick,
  className = "",
  easterEggText,
}: TulipProps) {
  const [isTapped, setIsTapped] = useState(false);
  const [showWhisper, setShowWhisper] = useState(false);

  // Dynamic unique IDs for SVG gradients to prevent ID collisions
  const gradStem = `stem-grad-${id}`;
  const gradLeaf1 = `leaf1-grad-${id}`;
  const gradLeaf2 = `leaf2-grad-${id}`;
  const gradPetalCenter = `petal-center-${id}`;
  const gradPetalLeft = `petal-left-${id}`;
  const gradPetalRight = `petal-right-${id}`;
  const gradPetalBack = `petal-back-${id}`;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!interactive) return;

    setIsTapped(true);
    setTimeout(() => setIsTapped(false), 800);

    if (easterEggText) {
      setShowWhisper(true);
      setTimeout(() => setShowWhisper(false), 3200);
    }

    if (onClick) {
      onClick();
    }
  };

  // Proportional SVG sizing: width and height scale harmoniously without squishing
  const svgWidth = 140 * scale;
  const svgHeight = height * scale;

  return (
    <div
      className={`relative inline-block select-none overflow-visible ${
        interactive ? "cursor-pointer" : ""
      } ${className}`}
      onClick={handleClick}
      style={{
        transformOrigin: "bottom center",
      }}
    >
      {/* Interactive whisper tooltip */}
      {showWhisper && easterEggText && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.85 }}
          animate={{ opacity: 1, y: -20, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.9 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="absolute -top-16 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap px-3.5 py-1.5 rounded-full bg-[#1F221E]/90 border border-[#F6C945]/40 text-[#FFE98A] text-xs font-serif shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-md pointer-events-none"
        >
          {easterEggText}
        </motion.div>
      )}

      {/* Gentle wind swaying container */}
      <motion.div
        animate={
          isTapped
            ? {
                rotate: [tilt, tilt - 8, tilt + 6, tilt - 3, tilt],
                scale: [scale, scale * 1.08, scale * 0.98, scale],
                transition: { duration: 0.8, ease: "easeInOut" },
              }
            : {
                rotate: [tilt - 2.5, tilt + 3, tilt - 2.5],
                transition: {
                  duration: swayDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (delay * 0.5) % 2,
                },
              }
        }
        className="overflow-visible"
        style={{
          transformOrigin: "bottom center",
          filter: isHero
            ? "drop-shadow(0 0 30px rgba(246, 201, 69, 0.55)) drop-shadow(0 8px 20px rgba(0,0,0,0.3))"
            : "drop-shadow(0 4px 12px rgba(0,0,0,0.25))",
        }}
      >
        <svg
          width={svgWidth}
          height={svgHeight}
          viewBox="-20 -15 190 350"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
          style={{ overflow: "visible" }}
        >
          <defs>
            {/* Stem Gradient */}
            <linearGradient id={gradStem} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#263A29" />
              <stop offset="40%" stopColor="#3B5930" />
              <stop offset="85%" stopColor="#567D46" />
              <stop offset="100%" stopColor="#6C9757" />
            </linearGradient>

            {/* Left Leaf Gradient */}
            <linearGradient id={gradLeaf1} x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#263A29" />
              <stop offset="60%" stopColor="#4A713C" />
              <stop offset="100%" stopColor="#679453" />
            </linearGradient>

            {/* Right Leaf Gradient */}
            <linearGradient id={gradLeaf2} x1="1" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#1E2F20" />
              <stop offset="50%" stopColor="#416434" />
              <stop offset="100%" stopColor="#5E894C" />
            </linearGradient>

            {/* Tulip Back Petal Gradient */}
            <linearGradient id={gradPetalBack} x1="0.5" y1="1" x2="0.5" y2="0">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="50%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#FACC15" />
            </linearGradient>

            {/* Tulip Left Petal Gradient */}
            <linearGradient id={gradPetalLeft} x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#CA8A04" />
              <stop offset="40%" stopColor="#F6C945" />
              <stop offset="85%" stopColor="#FFE98A" />
              <stop offset="100%" stopColor="#FFF4BE" />
            </linearGradient>

            {/* Tulip Right Petal Gradient */}
            <linearGradient id={gradPetalRight} x1="1" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#B45309" />
              <stop offset="35%" stopColor="#EAB308" />
              <stop offset="80%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#FEF08A" />
            </linearGradient>

            {/* Tulip Center Front Petal Gradient */}
            <linearGradient id={gradPetalCenter} x1="0.5" y1="1" x2="0.5" y2="0">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="30%" stopColor="#F6C945" />
              <stop offset="70%" stopColor="#FFE98A" />
              <stop offset="100%" stopColor="#FFF9E0" />
            </linearGradient>

            {/* Soft inner glow */}
            <radialGradient id={`glow-${id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF4B8" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#F6C945" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#F6C945" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ================= 1. ORGANIC STEM ================= */}
          <motion.path
            d="M 75 320 C 73 240, 78 180, 75 95"
            stroke={`url(#${gradStem})`}
            strokeWidth="5.5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 1.6, delay: delay, ease: "easeOut" },
              opacity: { duration: 0.3, delay: delay },
            }}
          />

          {/* ================= 2. LEFT CURVING LEAF ================= */}
          <motion.path
            d="M 74 270 C 50 240, 25 210, 22 165 C 38 185, 58 205, 74 235 Z"
            fill={`url(#${gradLeaf1})`}
            initial={{ scaleY: 0, scaleX: 0, opacity: 0 }}
            animate={{ scaleY: 1, scaleX: 1, opacity: 1 }}
            style={{ transformOrigin: "74px 270px" }}
            transition={{
              duration: 1.4,
              delay: delay + 0.5,
              ease: "easeOut",
            }}
          />

          {/* ================= 3. RIGHT LANCEOLATE LEAF ================= */}
          <motion.path
            d="M 76 250 C 95 220, 122 195, 128 145 C 114 175, 96 195, 75 220 Z"
            fill={`url(#${gradLeaf2})`}
            initial={{ scaleY: 0, scaleX: 0, opacity: 0 }}
            animate={{ scaleY: 1, scaleX: 1, opacity: 1 }}
            style={{ transformOrigin: "76px 250px" }}
            transition={{
              duration: 1.5,
              delay: delay + 0.7,
              ease: "easeOut",
            }}
          />

          {/* ================= 4. TULIP BLOSSOM CUP ================= */}
          <motion.g
            initial={{ scale: 0, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            style={{ transformOrigin: "75px 95px" }}
            transition={{
              duration: 1.5,
              delay: delay + 1.1,
              ease: "backOut",
            }}
          >
            {/* Subtle backlight aura */}
            <circle cx="75" cy="70" r="42" fill={`url(#glow-${id})`} />

            {/* Back central petal (depth) */}
            <path
              d="M 75 92 C 60 85, 52 50, 75 22 C 98 50, 90 85, 75 92 Z"
              fill={`url(#${gradPetalBack})`}
              opacity="0.9"
            />

            {/* Left background petal fold */}
            <path
              d="M 75 92 C 55 90, 42 62, 54 36 C 65 52, 72 70, 75 92 Z"
              fill={`url(#${gradPetalBack})`}
              opacity="0.75"
            />

            {/* Right background petal fold */}
            <path
              d="M 75 92 C 95 90, 108 62, 96 36 C 85 52, 78 70, 75 92 Z"
              fill={`url(#${gradPetalBack})`}
              opacity="0.75"
            />

            {/* Left main curved petal */}
            <path
              d="M 74 94 C 52 92, 40 68, 48 38 C 58 35, 68 50, 74 72 Z"
              fill={`url(#${gradPetalLeft})`}
            />

            {/* Right main curved petal */}
            <path
              d="M 76 94 C 98 92, 110 68, 102 38 C 92 35, 82 50, 76 72 Z"
              fill={`url(#${gradPetalRight})`}
            />

            {/* Center front dominant petal with silky highlights */}
            <path
              d="M 75 96 C 58 92, 54 58, 75 30 C 96 58, 92 92, 75 96 Z"
              fill={`url(#${gradPetalCenter})`}
            />

            {/* Delicate front specular shine */}
            <path
              d="M 75 42 C 72 54, 72 72, 75 84 C 76 72, 76 54, 75 42 Z"
              fill="#FFFFFF"
              opacity="0.45"
            />
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
}
