import React, { useState } from 'react';
import { motion } from 'motion/react';
import { sound } from '../utils/audio';

interface NeonSwordIntroProps {
  onStart: () => void;
}

export const NeonSwordIntro: React.FC<NeonSwordIntroProps> = ({ onStart }) => {
  const [isZooming, setIsZooming] = useState(false);

  const handleClickSword = () => {
    if (isZooming) return;
    sound.playFanfare();
    setIsZooming(true);

    // Zooming transition into the knife, then next page
    setTimeout(() => {
      onStart();
    }, 750);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-6 overflow-hidden select-none font-sans">
      {/* Subtle glowing neon ambient lines on white */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00f0ff]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff007f]/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Main Container with zoom-in effect on click */}
      <motion.div
        animate={
          isZooming
            ? {
                scale: 18,
                opacity: [1, 1, 0],
                rotate: 20,
              }
            : { scale: 1, opacity: 1, rotate: 0 }
        }
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center justify-center origin-center"
      >
        {/* Title: ONLY "LIFEKIT" in neon colours */}
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-cartoon font-extrabold tracking-widest uppercase mb-6 sm:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#ff007f] via-[#7928ca] to-[#00f0ff] filter drop-shadow-[0_0_20px_rgba(255,0,127,0.5)] drop-shadow-[0_0_35px_rgba(0,240,255,0.6)]">
          LIFEKIT
        </h1>

        {/* RGB Neon Sword Button */}
        <motion.button
          onClick={handleClickSword}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative group p-2 cursor-pointer focus:outline-none transition-transform"
          title="Click the RGB Sword to Begin"
        >
          {/* Neon Rainbow Aura */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00f0ff] via-[#ff007f] to-[#ffe600] rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity animate-pulse" />

          {/* SVG RGB Sword */}
          <svg
            width="260"
            height="100"
            viewBox="0 0 260 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-56 sm:w-72 md:w-80 h-auto overflow-visible relative z-10 filter drop-shadow-[0_0_12px_#00f0ff]"
          >
            <defs>
              {/* RGB Gradient for the blade */}
              <linearGradient id="rgbBlade" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff007f" />
                <stop offset="35%" stopColor="#7928ca" />
                <stop offset="70%" stopColor="#00f0ff" />
                <stop offset="100%" stopColor="#39ff14" />
              </linearGradient>

              {/* Glowing neon edge */}
              <linearGradient id="neonEdge" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffe600" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#00f0ff" />
              </linearGradient>

              <filter id="swordGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#00f0ff" />
                <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#ff007f" />
              </filter>
            </defs>

            {/* Sword Blade (Pointing Right) */}
            <path
              d="M75 42 L220 42 L250 50 L220 58 L75 58 Z"
              fill="url(#rgbBlade)"
              stroke="url(#neonEdge)"
              strokeWidth="3.5"
              filter="url(#swordGlow)"
            />

            {/* Center fuller/plasma laser core line */}
            <line
              x1="80"
              y1="50"
              x2="235"
              y2="50"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="animate-pulse"
            />

            {/* Crossguard with glowing neon lines */}
            <path
              d="M70 20 L80 20 L76 80 L66 80 Z"
              fill="#000000"
              stroke="#00f0ff"
              strokeWidth="3"
            />
            {/* Crossguard Neon Wings */}
            <polygon points="68,18 78,12 80,24" fill="#ff007f" stroke="#000000" strokeWidth="1.5" />
            <polygon points="64,82 74,88 76,76" fill="#ff007f" stroke="#000000" strokeWidth="1.5" />

            {/* Grip / Hilt with RGB wrap */}
            <rect
              x="30"
              y="44"
              width="38"
              height="12"
              rx="3"
              fill="#121324"
              stroke="#ffe600"
              strokeWidth="2.5"
            />
            {/* Wrap bands */}
            <line x1="40" y1="44" x2="40" y2="56" stroke="#00f0ff" strokeWidth="2.5" />
            <line x1="50" y1="44" x2="50" y2="56" stroke="#ff007f" strokeWidth="2.5" />
            <line x1="60" y1="44" x2="60" y2="56" stroke="#39ff14" strokeWidth="2.5" />

            {/* Pommel with radiant neon gem */}
            <circle cx="22" cy="50" r="10" fill="#000000" stroke="#00f0ff" strokeWidth="3" />
            <circle cx="22" cy="50" r="6" fill="#ffe600" className="animate-ping duration-1000" />
            <circle cx="22" cy="50" r="5" fill="#ff007f" />
          </svg>
        </motion.button>

        {/* Text below the sword: "start here" with same neon style */}
        <motion.p
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={handleClickSword}
          className="mt-4 sm:mt-6 text-xl sm:text-2xl md:text-3xl font-cartoon font-extrabold tracking-widest uppercase cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#ffe600] to-[#ff007f] filter drop-shadow-[0_0_12px_rgba(0,240,255,0.8)] drop-shadow-[0_0_20px_rgba(255,0,127,0.7)]"
        >
          start here
        </motion.p>
      </motion.div>
    </div>
  );
};
