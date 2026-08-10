'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Flame, Skull, ArrowRight, Sparkles, RotateCw, Shuffle, Sun, Compass } from 'lucide-react';

// Deck of Tarot Cards with distinct themes, meanings, and remedies
const TAROT_DECK = [
  {
    id: 'eight-of-cups',
    name: 'Eight of Cups',
    number: 'VIII',
    tag: 'Remediation Arcana',
    insight: 'Walking away from depleted situations to seek higher emotional alignment.',
    action: 'Pivot focus away from sunk costs and execute a strategic departure.'
  },
  {
    id: 'the-tower',
    name: 'The Tower',
    number: 'XVI',
    tag: 'Origin Arcana',
    insight: 'Unforeseen structural breakdown that shattered initial false assumptions.',
    action: 'Embrace the clean slate—stop rebuilding what was meant to fall.'
  },
  {
    id: 'the-fool',
    name: 'The Fool',
    number: '0',
    tag: 'Initiation Arcana',
    insight: 'Standing at the edge of uncertainty with uncalculated potential ahead.',
    action: 'Take the leap without waiting for complete certainty or consensus.'
  },
  {
    id: 'judgement',
    name: 'Judgement',
    number: 'XX',
    tag: 'Reckoning Arcana',
    insight: 'Self-evaluation and the imperative call to forgive past missteps.',
    action: 'Release old self-blame and accept the permanent lessons learned.'
  },
  {
    id: 'wheel-of-fortune',
    name: 'Wheel of Fortune',
    number: 'X',
    tag: 'Cycles Arcana',
    insight: 'Shifting momentum outside direct control; a turning point in circumstances.',
    action: 'Adapt quickly to current momentum rather than fighting current tides.'
  },
  {
    id: 'the-hermit',
    name: 'The Hermit',
    number: 'IX',
    tag: 'Introspection Arcana',
    insight: 'The need for solitary analysis away from external opinions and noise.',
    action: 'Pause external inputs for 48 hours to recalibrate your internal compass.'
  }
];

export default function Home() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const activeCard = TAROT_DECK[currentCardIndex];

  const getNextRandomIndex = () => {
    if (TAROT_DECK.length <= 1) return 0;
    let nextIndex = Math.floor(Math.random() * TAROT_DECK.length);
    while (nextIndex === currentCardIndex) {
      nextIndex = Math.floor(Math.random() * TAROT_DECK.length);
    }
    return nextIndex;
  };

  const handleCardClick = () => {
    if (isAnimating) return;

    if (!isFlipped) {
      const nextIndex = getNextRandomIndex();
      setCurrentCardIndex(nextIndex);
      setIsFlipped(true);
    } else {
      setIsFlipped(false);
    }
  };

  const handleDrawNewCard = (e) => {
    e.stopPropagation();
    if (isAnimating) return;

    setIsAnimating(true);

    if (isFlipped) {
      setIsFlipped(false);

      setTimeout(() => {
        const nextIndex = getNextRandomIndex();
        setCurrentCardIndex(nextIndex);

        setTimeout(() => {
          setIsFlipped(true);
          setIsAnimating(false);
        }, 100);
      }, 600);
    } else {
      const nextIndex = getNextRandomIndex();
      setCurrentCardIndex(nextIndex);
      setIsFlipped(true);
      setIsAnimating(false);
    }
  };

  return (
    <div className="px-4 py-6 md:px-12 md:py-10 relative overflow-hidden">
      {/* Background Ambiance */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#8B0000]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[380px] h-[380px] bg-[#4C1D95]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 md:space-y-16 relative z-10">
        
        {/* ================= HERO SECTION ================= */}
        <section className="relative bg-[#14121A] border border-[#2A2634] rounded-3xl p-8 md:p-14 shadow-2xl overflow-hidden">
          <div className="inline-block">
            <div className="inline-flex items-center gap-2 bg-[#1E1B26] text-[#A78BFA] font-mono text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-[#3B3548] mb-8">
              <Flame className="w-3.5 h-3.5 text-[#FF4D4D]" />
              <span>Regret Metric &amp; Arcana Remediation</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] text-white">
                Quantify your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D4D] via-[#A78BFA] to-[#8B0000]">
                  Regret
                </span>
                . Find the Solution.
              </h1>
              
              <p className="text-base md:text-lg font-normal text-[#94A3B8] max-w-xl leading-relaxed">
                Stuck on a past choice? Orakle measures your regret index and pairs your baseline psychology with your real physical Tarot pull to deliver actionable remedies.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link 
                    className="inline-flex items-center justify-center gap-3 bg-[#8B0000] hover:bg-[#8B0000]/80 text-white font-bold text-base px-8 py-4 rounded-xl border border-[#8B0000] shadow-glow-red hover:shadow-occult transition-all duration-300 w-full sm:w-auto" 
                    href="/divination"
                  >
                    <span>Calculate My Regret</span>
                    <ArrowRight className="w-5 h-5"/>
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <a
                    href="#how-it-works"
                    className="inline-flex items-center justify-center gap-2 bg-[#1A1722] hover:bg-[#231F2E] text-[#E2E8F0] font-semibold text-base px-8 py-4 rounded-xl border border-[#2A2634] transition-all duration-200 w-full sm:w-auto"
                  >
                    <span>How It Works</span>
                  </a>
                </motion.div>
              </div>
            </div>

            {/* RESTORED CLEAN TAROT CARD DESIGN */}
            <div id="tarot-cards" className="lg:col-span-5 flex flex-col items-center justify-center space-y-4">
              
              <div 
                className="w-64 h-[380px] cursor-pointer perspective-1000"
                onClick={handleCardClick}
              >
                <motion.div 
                  className="relative w-full h-full rounded-2xl transform-style-3d"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                >
                  
                  {/* FACE DOWN - Clean Minimalist Dark Card Back */}
                  <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-b from-[#1C1826] to-[#0D0B12] border-2 border-[#3B3548] p-5 flex flex-col justify-between items-center shadow-2xl backface-hidden">
                    <div className="w-full border border-[#3B3548]/50 h-full rounded-xl p-4 flex flex-col justify-between items-center bg-[radial-gradient(#2A2634_1px,transparent_1px)] [background-size:12px_12px]">
                      <div className="text-[10px] font-mono tracking-widest text-[#A78BFA] uppercase">
                        ORAKLE Tarot Cards
                      </div>

                      <div className="w-20 h-20 rounded-full border border-[#A78BFA]/30 flex items-center justify-center bg-[#14121A]">
                        <Sparkles className="w-8 h-8 text-[#A78BFA] animate-pulse" />
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-[#94A3B8] font-mono">
                        <RotateCw className="w-3.5 h-3.5 text-[#FF4D4D]" />
                        <span>Click to Draw</span>
                      </div>
                    </div>
                  </div>

                  {/* FACE UP - Clean Dark Reading Front */}
                  <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-b from-[#1E1220] via-[#14121A] to-[#0A090D] border-2 border-[#8B0000] p-5 flex flex-col justify-between shadow-2xl rotate-y-180 backface-hidden">
                    
                    <div className="flex justify-between items-center text-[#A78BFA] font-mono text-[10px] tracking-widest uppercase">
                      <span>{activeCard.tag}</span>
                      <span>{activeCard.number}</span>
                    </div>

                    <div className="text-center space-y-2 my-auto">
                      <div className="w-12 h-12 mx-auto rounded-full bg-[#8B0000]/20 border border-[#8B0000] flex items-center justify-center text-[#FF4D4D]">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-black text-white tracking-wide uppercase">
                        {activeCard.name}
                      </h3>
                      <p className="text-xs text-[#94A3B8] leading-relaxed px-2">
                        {activeCard.insight}
                      </p>
                    </div>

                    <div className="bg-[#0A090D] p-3 rounded-lg border border-[#2A2634] text-[11px] font-mono">
                      <div className="text-[#FF4D4D] font-bold">Actionable Remedy:</div>
                      <p className="text-[#94A3B8] mt-0.5">
                        &quot;{activeCard.action}&quot;
                      </p>
                    </div>

                  </div>

                </motion.div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleDrawNewCard}
                  disabled={isAnimating}
                  className="inline-flex items-center gap-1.5 bg-[#1E1B26] hover:bg-[#2A2634] text-[#A78BFA] font-mono text-xs px-3.5 py-1.5 rounded-lg border border-[#3B3548] transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Shuffle className="w-3.5 h-3.5 text-[#FF4D4D]" />
                  <span>{isFlipped ? 'Draw Another Card' : 'Shuffle Deck'}</span>
                </button>
              </div>

            </div>

          </div>
        </section>

        {/* ================= FEATURES SECTION ================= */}
        <section id="how-it-works" className="space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              The Remediation Engine
            </h2>
            <p className="text-sm md:text-base text-[#94A3B8]">
              From raw past choices to calibrated solutions in three steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            
            {/* Feature 1 */}
            <motion.div 
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-[#14121A] border border-[#2A2634] rounded-2xl p-7 flex flex-col justify-between space-y-6 hover:border-[#F59E0B]/80 transition-colors duration-200 group shadow-md"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#1E1B26] rounded-xl border border-[#3B3548] flex items-center justify-center transition-colors duration-200 group-hover:bg-[#F59E0B] text-white">
                  <Sun className="w-6 h-6 text-white"/>
                </div>
                <h3 className="text-xl font-bold text-white">Regret Metric Calculation</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Inputs your baseline decision framework against emotional weight to output an accurate Regret Score (0–100%).
                </p>
              </div>
              <div className="pt-2">
                <span className="inline-block font-mono text-xs bg-[#1E1B26] text-[#FFD700] px-3 py-1 rounded-md border border-[#2A2634]">
                  / Step 01: Quantify
                </span>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-[#14121A] border border-[#2A2634] rounded-2xl p-7 flex flex-col justify-between space-y-6 hover:border-[#8B0000]/80 transition-colors duration-200 group shadow-md"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#1E1B26] rounded-xl border border-[#3B3548] flex items-center justify-center transition-colors duration-200 group-hover:bg-[#8B0000] text-white">
                  <Skull className="w-6 h-6 text-white"/>
                </div>
                <h3 className="text-xl font-bold text-white">Real Physical Tarot Input</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Draw your own physical cards and input the 3-card spread (Origin, Friction, Remediation) into the system.
                </p>
              </div>
              <div className="pt-2">
                <span className="inline-block font-mono text-xs bg-[#1E1B26] text-[#FF2A2A] px-3 py-1 rounded-md border border-[#2A2634]">
                  / Step 02: Physical Spread
                </span>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-[#14121A] border border-[#2A2634] rounded-2xl p-7 flex flex-col justify-between space-y-6 hover:border-[#10B981]/80 transition-colors duration-200 group shadow-md"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#1E1B26] rounded-xl border border-[#3B3548] flex items-center justify-center transition-colors duration-200 group-hover:bg-[#10B981] text-white">
                  <Compass className="w-6 h-6 text-white"/>
                </div>
                <h3 className="text-xl font-bold text-white">Arcana Solution Path</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Receive concrete, actionable steps to turn lingering regret into momentum, counteracting past missteps.
                </p>
              </div>
              <div className="pt-2">
                <span className="inline-block font-mono text-xs bg-[#1E1B26] text-[#34D399] px-3 py-1 rounded-md border border-[#2A2634]">
                  / Step 03: Resolve
                </span>
              </div>
            </motion.div>

          </div>
        </section>

      </div>
    </div>
  );
}