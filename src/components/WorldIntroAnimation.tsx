import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Compass, ArrowRight, Zap, Star } from 'lucide-react';
import { sound } from '../utils/audio';

interface WorldIntroAnimationProps {
  onEnterMirror: () => void;
}

export const WorldIntroAnimation: React.FC<WorldIntroAnimationProps> = ({ onEnterMirror }) => {
  const [step, setStep] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    sound.playMirrorResonance();
    const t1 = setTimeout(() => setStep(1), 1000);
    const t2 = setTimeout(() => setStep(2), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleStepForward = () => {
    sound.playTap();
    sound.playKnowledgeUnlock();
    onEnterMirror();
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0b0c1b] flex flex-col items-center justify-between p-6 overflow-hidden select-none font-sans">
      {/* Cartoon Neon Space & Grid */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Neon Glow orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#00f0ff]/25 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-[#ff007f]/25 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-[#ffe600]/20 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Retro Neon Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff18_1.5px,transparent_1.5px),linear-gradient(to_bottom,#00f0ff18_1.5px,transparent_1.5px)] bg-[size:3.5rem_3.5rem]" />

        {/* Floating Cartoon Stars */}
        <div className="absolute top-20 left-12 text-[#ffe600] animate-bounce duration-700">★</div>
        <div className="absolute top-36 right-16 text-[#00f0ff] animate-bounce duration-1000">✦</div>
        <div className="absolute bottom-40 left-16 text-[#ff007f] animate-spin duration-3000">✶</div>
        <div className="absolute bottom-28 right-24 text-[#39ff14] animate-bounce duration-500">★</div>
      </div>

      {/* Top Brand Banner */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-auto flex items-center justify-between pt-3"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-[#ffe600] border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#000]">
            <Compass className="w-5 h-5 text-black animate-spin duration-3000" />
          </div>
          <div>
            <h1 className="text-xl font-cartoon font-bold text-white tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              TERRANOVA
            </h1>
            <p className="text-[11px] font-bold text-[#00f0ff] tracking-wide uppercase">
              ★ Cartoon Life Sandbox ★
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff007f] border-2 border-black text-xs font-cartoon font-bold text-white shadow-[2px_2px_0px_#000]">
          <Zap className="w-3.5 h-3.5 text-[#ffe600] fill-current" />
          <span>Ages 14–21</span>
        </div>
      </motion.header>

      {/* Center Cartoon Portal */}
      <div className="relative z-10 w-full max-w-md mx-auto my-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.6, rotate: -5, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
          className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center my-4"
        >
          {/* Neon Rainbow Rings */}
          <div className="absolute inset-0 rounded-full border-4 border-dashed border-[#00f0ff] animate-spin duration-6000" />
          <div className="absolute inset-3 rounded-full border-4 border-dotted border-[#ff007f] animate-spin duration-4000" />
          <div className="absolute inset-6 rounded-full bg-gradient-to-br from-[#1b1035] via-[#0b0c1b] to-[#041a2e] border-4 border-black shadow-[8px_8px_0px_#000] flex flex-col items-center justify-center p-6 overflow-hidden">
            {/* Cartoon Glowing Mirror Symbol */}
            <div className="w-20 h-28 rounded-t-full border-3 border-black bg-gradient-to-b from-[#00f0ff] to-[#ff007f] shadow-inner flex flex-col items-center justify-center relative group">
              <div className="w-12 h-18 rounded-t-full bg-white/30 backdrop-blur-xs flex items-center justify-center border-2 border-white/60">
                <Sparkles className="w-8 h-8 text-[#ffe600] animate-spin duration-3000 filter drop-shadow-[0_0_8px_#ffe600]" />
              </div>
            </div>

            <div className="mt-2 px-3 py-0.5 rounded-full bg-[#ffe600] border-2 border-black text-[11px] font-cartoon font-bold text-black uppercase tracking-wider shadow-[2px_2px_0px_#000]">
              Mirror of Identity
            </div>
          </div>
        </motion.div>

        {/* Narrative Headline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="space-y-2.5 px-4"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#39ff14] border-2 border-black text-xs font-cartoon font-bold text-black shadow-[2px_2px_0px_#000]">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Real-World Skills School Never Taught!</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-cartoon font-bold text-white tracking-tight leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
            Step Into The Ultimate Life Skills Sandbox
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
            Taxes, rent agreements, credit card APR hacks, and bank accounts turned into a vibrant cartoon open world!
          </p>
        </motion.div>
      </div>

      {/* Bottom CTA (Thumb Zone) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="relative z-10 w-full max-w-md mx-auto pb-4"
      >
        <button
          onClick={handleStepForward}
          className="w-full h-14 rounded-2xl bg-[#ffe600] hover:bg-[#fff04d] text-black font-cartoon font-bold text-base flex items-center justify-center gap-2 border-3 border-black shadow-[4px_4px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer"
        >
          <span>Walk to the Mirror of Identity</span>
          <ArrowRight className="w-5 h-5 text-black stroke-[3]" />
        </button>

        <p className="text-center text-[11px] font-semibold text-[#00f0ff] mt-2">
          Tap to explore your reflection and claim your explorer badge!
        </p>
      </motion.div>
    </div>
  );
};
