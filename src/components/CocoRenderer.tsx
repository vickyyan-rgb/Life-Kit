import React from 'react';

interface CocoRendererProps {
  size?: number;
  pose?: 'sitting' | 'waving' | 'cheering' | 'thinking';
  speechBubble?: string;
  className?: string;
}

export const CocoRenderer: React.FC<CocoRendererProps> = ({
  size = 72,
  pose = 'sitting',
  speechBubble,
  className = '',
}) => {
  return (
    <div
      className={`relative inline-flex flex-col items-center select-none ${className}`}
      style={{ minWidth: size }}
    >
      {/* Optional Speech Bubble */}
      {speechBubble && (
        <div className="mb-2 max-w-[200px] sm:max-w-[240px] px-3 py-1.5 rounded-2xl bg-white border-2 border-[#7928ca] text-slate-800 font-cartoon font-bold text-xs shadow-[0_4px_12px_rgba(121,40,202,0.2)] relative z-20 text-center animate-bounce duration-1000">
          <span>{speechBubble}</span>
          {/* Bubble beak pointing down */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b-2 border-r-2 border-[#7928ca] rotate-45" />
        </div>
      )}

      {/* Toy-like Capybara SVG */}
      <svg
        viewBox="0 0 100 100"
        className="overflow-visible filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]"
        style={{ width: size, height: size }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Warm Toy Gradient for Capybara fur */}
          <linearGradient id="cocoFur" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c48a58" />
            <stop offset="60%" stopColor="#aa703e" />
            <stop offset="100%" stopColor="#8c5828" />
          </linearGradient>

          {/* Snout gradient */}
          <linearGradient id="cocoSnout" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#804e22" />
            <stop offset="100%" stopColor="#5d3412" />
          </linearGradient>

          {/* Citrus / Orange highlight on head */}
          <linearGradient id="yuzuOrange" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffb300" />
            <stop offset="100%" stopColor="#ff6f00" />
          </linearGradient>

          {/* Belly gradient */}
          <linearGradient id="cocoBelly" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#dfa773" />
            <stop offset="100%" stopColor="#c68c58" />
          </linearGradient>
        </defs>

        {/* Soft ground shadow */}
        <ellipse cx="50" cy="94" rx="34" ry="6" fill="#000000" opacity="0.3" />

        {/* Chunky Body */}
        <ellipse
          cx="50"
          cy="66"
          rx="32"
          ry="26"
          fill="url(#cocoFur)"
          stroke="#3d2008"
          strokeWidth="3"
        />

        {/* Belly highlight */}
        <ellipse cx="50" cy="72" rx="20" ry="16" fill="url(#cocoBelly)" />

        {/* Chunky Toy Feet */}
        {/* Left Foot */}
        <ellipse
          cx="28"
          cy="88"
          rx="9"
          ry="6"
          fill="#8c5828"
          stroke="#3d2008"
          strokeWidth="2.5"
        />
        {/* Right Foot */}
        <ellipse
          cx="72"
          cy="88"
          rx="9"
          ry="6"
          fill="#8c5828"
          stroke="#3d2008"
          strokeWidth="2.5"
        />

        {/* Round Chunky Head */}
        <ellipse
          cx="50"
          cy="42"
          rx="24"
          ry="22"
          fill="url(#cocoFur)"
          stroke="#3d2008"
          strokeWidth="3"
        />

        {/* Ears */}
        {/* Left Ear */}
        <circle
          cx="29"
          cy="28"
          r="6.5"
          fill="#8c5828"
          stroke="#3d2008"
          strokeWidth="2.5"
        />
        <circle cx="29" cy="28" r="3.5" fill="#e89e9e" />

        {/* Right Ear */}
        <circle
          cx="71"
          cy="28"
          r="6.5"
          fill="#8c5828"
          stroke="#3d2008"
          strokeWidth="2.5"
        />
        <circle cx="71" cy="28" r="3.5" fill="#e89e9e" />

        {/* Distinctive Capybara Wide Snout */}
        <rect
          x="36"
          y="42"
          width="28"
          height="19"
          rx="9"
          fill="url(#cocoSnout)"
          stroke="#3d2008"
          strokeWidth="2.5"
        />

        {/* Nostrils */}
        <ellipse cx="44" cy="50" rx="2.5" ry="1.8" fill="#1c0d03" />
        <ellipse cx="56" cy="50" rx="2.5" ry="1.8" fill="#1c0d03" />

        {/* Cute Sleepy / Calm Capybara Eyes */}
        <path
          d="M 36 37 Q 40 33 44 37"
          stroke="#200d02"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 56 37 Q 60 33 64 37"
          stroke="#200d02"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Rosy cheeks */}
        <circle cx="31" cy="46" r="4.5" fill="#ff7f7f" opacity="0.6" />
        <circle cx="69" cy="46" r="4.5" fill="#ff7f7f" opacity="0.6" />

        {/* Tiny front paws / hands */}
        {pose === 'waving' ? (
          <>
            <ellipse cx="38" cy="74" rx="6" ry="7" fill="#8c5828" stroke="#3d2008" strokeWidth="2" />
            {/* Waving Paw up */}
            <g transform="translate(64, 48) rotate(-25)">
              <ellipse cx="0" cy="0" rx="6" ry="8" fill="#8c5828" stroke="#3d2008" strokeWidth="2" />
              <circle cx="0" cy="-6" r="3" fill="#dfa773" />
            </g>
          </>
        ) : pose === 'cheering' ? (
          <>
            {/* Both paws raised cheering */}
            <g transform="translate(24, 52) rotate(25)">
              <ellipse cx="0" cy="0" rx="6" ry="8" fill="#8c5828" stroke="#3d2008" strokeWidth="2" />
            </g>
            <g transform="translate(76, 52) rotate(-25)">
              <ellipse cx="0" cy="0" rx="6" ry="8" fill="#8c5828" stroke="#3d2008" strokeWidth="2" />
            </g>
          </>
        ) : (
          <>
            {/* Little resting paws */}
            <ellipse cx="42" cy="75" rx="6" ry="7" fill="#8c5828" stroke="#3d2008" strokeWidth="2" />
            <ellipse cx="58" cy="75" rx="6" ry="7" fill="#8c5828" stroke="#3d2008" strokeWidth="2" />
          </>
        )}

        {/* Signature Yuzu / Orange on Coco's Head */}
        <g transform="translate(50, 18)">
          {/* Orange fruit */}
          <circle cx="0" cy="0" r="9" fill="url(#yuzuOrange)" stroke="#bf4b00" strokeWidth="2" />
          <circle cx="-2.5" cy="-3" r="2" fill="#ffe082" opacity="0.7" />
          {/* Stem & green leaf */}
          <path d="M 0 -9 Q 1 -13 3 -14" stroke="#4e342e" strokeWidth="2" fill="none" strokeLinecap="round" />
          <ellipse cx="5" cy="-12" rx="4.5" ry="2.5" fill="#39ff14" stroke="#1b5e20" strokeWidth="1.5" transform="rotate(-15 5 -12)" />
        </g>
      </svg>
    </div>
  );
};
