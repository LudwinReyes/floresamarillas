"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import FloatingParticles from "@/components/FloatingParticles";
import IntroMoment from "@/components/IntroMoment";
import GardenGrowthMoment from "@/components/GardenGrowthMoment";
import TulipFocusMoment from "@/components/TulipFocusMoment";
import LetterMoment from "@/components/LetterMoment";
import FinalGardenMoment from "@/components/FinalGardenMoment";

const pageVariants: Variants = {
  initial: {
    opacity: 0,
    filter: "blur(6px)",
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 1.2,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    filter: "blur(8px)",
    scale: 1.02,
    transition: {
      duration: 0.9,
      ease: "easeIn",
    },
  },
};

export default function Home() {
  const [moment, setMoment] = useState<1 | 2 | 3 | 4 | 5>(1);

  return (
    <main className="relative min-h-[100dvh] w-full bg-[#0A0D0A] overflow-hidden">
      {/* Global floating golden pollen & fireflies */}
      <FloatingParticles
        density={moment === 1 ? 25 : moment === 5 ? 55 : 38}
        speed={moment === 1 ? 0.4 : 0.65}
      />

      {/* Cinematic Single-Story Progression */}
      <AnimatePresence mode="wait">
        {moment === 1 && (
          <motion.div
            key="moment-1"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
          >
            <IntroMoment onEnter={() => setMoment(2)} />
          </motion.div>
        )}

        {moment === 2 && (
          <motion.div
            key="moment-2"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
          >
            <GardenGrowthMoment onNext={() => setMoment(3)} />
          </motion.div>
        )}

        {moment === 3 && (
          <motion.div
            key="moment-3"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
          >
            <TulipFocusMoment onNext={() => setMoment(4)} />
          </motion.div>
        )}

        {moment === 4 && (
          <motion.div
            key="moment-4"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
          >
            <LetterMoment onNext={() => setMoment(5)} />
          </motion.div>
        )}

        {moment === 5 && (
          <motion.div
            key="moment-5"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
          >
            <FinalGardenMoment onRestart={() => setMoment(1)} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
