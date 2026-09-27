import React from 'react';
import { AvatarConfig } from '../types';

interface AvatarRendererProps {
  avatar: AvatarConfig;
  size?: number; // width/height in px
  isWalking?: boolean;
  className?: string;
  showCompanion?: boolean;
}

export const AvatarRenderer: React.FC<AvatarRendererProps> = ({
  avatar,
  size = 120,
  isWalking = false,
  className = '',
  showCompanion = true,
}) => {
  const {
    skinColor = '#ffd000', // Default bright cartoon tone
    hairStyle = 'messy',
    hairColor = '#00f0ff', // Default electric neon cyan
    outfit = 'streetwear',
    outfitColor = '#ff007f', // Default neon hot pink
    expression = 'confident',
    accessory = 'headphones',
    companion = 'fox',
  } = avatar || {};

  // Cartoon walking bounce
  const bobClass = isWalking ? 'animate-bounce duration-250' : 'animate-pulse duration-1000';

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)] ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 120"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Cartoon Drop Shadow on Ground */}
        <ellipse cx="50" cy="115" rx="30" ry="7" fill="#000000" opacity="0.4" />
        <ellipse cx="50" cy="115" rx="26" ry="5" fill="#ff007f" opacity="0.3" />

        {/* Legs / Cartoon Pants with bold black outline */}
        <g className={isWalking ? 'transition-transform' : ''}>
          {/* Left Leg */}
          <rect
            x="36"
            y="87"
            width="11"
            height="23"
            rx="5"
            fill="#121324"
            stroke="#000000"
            strokeWidth="2.5"
            transform={isWalking ? 'rotate(-8 36 87)' : ''}
          />
          {/* Right Leg */}
          <rect
            x="53"
            y="87"
            width="11"
            height="23"
            rx="5"
            fill="#121324"
            stroke="#000000"
            strokeWidth="2.5"
            transform={isWalking ? 'rotate(8 53 87)' : ''}
          />
          {/* Neon Sneakers */}
          <rect
            x="33"
            y="105"
            width="16"
            height="8"
            rx="4"
            fill="#39ff14"
            stroke="#000000"
            strokeWidth="2.5"
          />
          <rect
            x="51"
            y="105"
            width="16"
            height="8"
            rx="4"
            fill="#39ff14"
            stroke="#000000"
            strokeWidth="2.5"
          />
          {/* Sneaker white toe cap */}
          <circle cx="46" cy="109" r="2.5" fill="#ffffff" />
          <circle cx="64" cy="109" r="2.5" fill="#ffffff" />
        </g>

        {/* Torso & Head in Cartoon Bobbing Group */}
        <g className={bobClass}>
          {/* Torso Base */}
          {outfit === 'streetwear' && (
            <path
              d="M28 63 C28 56, 72 56, 72 63 L74 91 L26 91 Z"
              fill={outfitColor}
              stroke="#000000"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
          )}
          {outfit === 'scholar' && (
            <>
              <path
                d="M28 63 C28 56, 72 56, 72 63 L74 91 L26 91 Z"
                fill={outfitColor}
                stroke="#000000"
                strokeWidth="2.8"
                strokeLinejoin="round"
              />
              <polygon points="50,65 42,78 58,78" fill="#ffffff" stroke="#000000" strokeWidth="2" />
              <polygon points="50,78 53,88 47,88" fill="#ffe600" stroke="#000000" strokeWidth="1.5" />
            </>
          )}
          {outfit === 'casual' && (
            <path
              d="M30 63 C30 58, 70 58, 70 63 L72 91 L28 91 Z"
              fill={outfitColor}
              stroke="#000000"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
          )}
          {outfit === 'cyberpunk' && (
            <>
              <path
                d="M27 61 L73 61 L71 91 L29 91 Z"
                fill="#0f1026"
                stroke="#000000"
                strokeWidth="2.8"
                strokeLinejoin="round"
              />
              {/* Glowing neon stripes */}
              <line x1="33" y1="63" x2="33" y2="89" stroke={outfitColor} strokeWidth="3.5" strokeLinecap="round" />
              <line x1="67" y1="63" x2="67" y2="89" stroke={outfitColor} strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="50" cy="75" r="4" fill="#00f0ff" stroke="#000000" strokeWidth="1.5" />
            </>
          )}
          {outfit === 'formal' && (
            <>
              <path
                d="M28 63 L72 63 L72 91 L28 91 Z"
                fill="#18182b"
                stroke="#000000"
                strokeWidth="2.8"
                strokeLinejoin="round"
              />
              <polygon points="50,64 42,75 58,75" fill="#ffffff" stroke="#000000" strokeWidth="2" />
              <polygon points="49,75 51,75 53,88 47,88" fill={outfitColor} stroke="#000000" strokeWidth="1.5" />
            </>
          )}

          {/* Arms with bold cartoon outline */}
          <rect
            x="22"
            y="64"
            width="9"
            height="23"
            rx="4.5"
            fill={outfitColor}
            stroke="#000000"
            strokeWidth="2.5"
            transform={isWalking ? 'rotate(15 26 64)' : 'rotate(4 26 64)'}
          />
          <rect
            x="69"
            y="64"
            width="9"
            height="23"
            rx="4.5"
            fill={outfitColor}
            stroke="#000000"
            strokeWidth="2.5"
            transform={isWalking ? 'rotate(-15 74 64)' : 'rotate(-4 74 64)'}
          />

          {/* Cartoon Hands */}
          <circle cx="25" cy="89" r="4.5" fill={skinColor} stroke="#000000" strokeWidth="2.2" />
          <circle cx="75" cy="89" r="4.5" fill={skinColor} stroke="#000000" strokeWidth="2.2" />

          {/* Neck */}
          <rect x="45" y="53" width="10" height="12" rx="3" fill={skinColor} stroke="#000000" strokeWidth="2.5" />

          {/* Big Cute Cartoon Head */}
          <ellipse cx="50" cy="39" rx="21" ry="22" fill={skinColor} stroke="#000000" strokeWidth="2.8" />

          {/* Cute Big Cartoon Ears */}
          <circle cx="29" cy="40" r="4.5" fill={skinColor} stroke="#000000" strokeWidth="2.2" />
          <circle cx="71" cy="40" r="4.5" fill={skinColor} stroke="#000000" strokeWidth="2.2" />
          <circle cx="29" cy="40" r="2" fill="#ff70a6" opacity="0.6" />
          <circle cx="71" cy="40" r="2" fill="#ff70a6" opacity="0.6" />

          {/* Expressive Cartoon Eyes */}
          {expression === 'confident' && (
            <>
              {/* Big Anime Eyes */}
              <ellipse cx="42" cy="38" rx="4" ry="4.5" fill="#000000" />
              <ellipse cx="58" cy="38" rx="4" ry="4.5" fill="#000000" />
              {/* Star / Sparkle Light Reflection in eyes */}
              <circle cx="43.5" cy="36.5" r="1.6" fill="#ffffff" />
              <circle cx="40.5" cy="39.5" r="0.8" fill="#ffffff" />
              <circle cx="59.5" cy="36.5" r="1.6" fill="#ffffff" />
              <circle cx="56.5" cy="39.5" r="0.8" fill="#ffffff" />
              {/* Confident Eyebrows */}
              <path d="M38 31 Q42 32 46 34" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M62 31 Q58 32 54 34" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
              {/* Confident Smirk */}
              <path d="M46 48 Q50 52 56 49" stroke="#000000" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            </>
          )}
          {expression === 'curious' && (
            <>
              <ellipse cx="42" cy="37" rx="4.5" ry="5" fill="#000000" />
              <ellipse cx="58" cy="37" rx="4.5" ry="5" fill="#000000" />
              <circle cx="44" cy="35.5" r="1.8" fill="#ffffff" />
              <circle cx="60" cy="35.5" r="1.8" fill="#ffffff" />
              {/* Arched Curious Eyebrows */}
              <path d="M38 29 Q43 28 46 32" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M54 31 Q57 28 62 29" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
              <ellipse cx="50" cy="48" rx="3" ry="3.5" fill="#000000" />
            </>
          )}
          {expression === 'chill' && (
            <>
              <path d="M38 39 Q42 36 46 39" stroke="#000000" strokeWidth="2.8" fill="none" strokeLinecap="round" />
              <path d="M54 39 Q58 36 62 39" stroke="#000000" strokeWidth="2.8" fill="none" strokeLinecap="round" />
              <path d="M45 48 Q50 51 55 48" stroke="#000000" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            </>
          )}
          {expression === 'cheerful' && (
            <>
              {/* Happy curved eyes ^^ */}
              <path d="M38 38 Q42 33 46 38" stroke="#000000" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M54 38 Q58 33 62 38" stroke="#000000" strokeWidth="3" fill="none" strokeLinecap="round" />
              {/* Open laughing mouth with tongue */}
              <path d="M43 47 Q50 56 57 47 Z" fill="#ff007f" stroke="#000000" strokeWidth="2" />
              <circle cx="50" cy="51" r="2.5" fill="#ff70a6" />
            </>
          )}
          {expression === 'focused' && (
            <>
              <ellipse cx="42" cy="38" rx="3.5" ry="3.5" fill="#000000" />
              <ellipse cx="58" cy="38" rx="3.5" ry="3.5" fill="#000000" />
              <circle cx="43" cy="37" r="1.3" fill="#ffffff" />
              <circle cx="59" cy="37" r="1.3" fill="#ffffff" />
              <line x1="38" y1="32" x2="46" y2="35" stroke="#000000" strokeWidth="2.6" strokeLinecap="round" />
              <line x1="54" y1="35" x2="62" y2="32" stroke="#000000" strokeWidth="2.6" strokeLinecap="round" />
              <line x1="46" y1="48" x2="54" y2="48" stroke="#000000" strokeWidth="2.4" strokeLinecap="round" />
            </>
          )}

          {/* Cute Neon Cheeks / Blushes */}
          <ellipse cx="36" cy="44" rx="4" ry="2.2" fill="#ff007f" opacity="0.65" />
          <ellipse cx="64" cy="44" rx="4" ry="2.2" fill="#ff007f" opacity="0.65" />

          {/* Chunky Cartoon Hairstyles */}
          {hairStyle === 'messy' && (
            <path
              d="M27 35 C25 18, 40 14, 50 14 C60 14, 75 18, 73 35 C70 33, 64 24, 53 25 C42 26, 35 31, 27 35 Z"
              fill={hairColor}
              stroke="#000000"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
          )}
          {hairStyle === 'short' && (
            <path
              d="M28 34 C27 20, 39 16, 50 16 C61 16, 73 20, 72 34 C68 25, 61 20, 50 20 C39 20, 32 25, 28 34 Z"
              fill={hairColor}
              stroke="#000000"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
          )}
          {hairStyle === 'curly' && (
            <g fill={hairColor} stroke="#000000" strokeWidth="2.5">
              <circle cx="33" cy="25" r="9" />
              <circle cx="45" cy="18" r="10" />
              <circle cx="56" cy="18" r="10" />
              <circle cx="67" cy="25" r="9" />
              <circle cx="28" cy="35" r="7" />
              <circle cx="72" cy="35" r="7" />
            </g>
          )}
          {hairStyle === 'ponytail' && (
            <g fill={hairColor} stroke="#000000" strokeWidth="2.8" strokeLinejoin="round">
              <path d="M28 34 C27 20, 39 16, 50 16 C61 16, 73 20, 72 34 C65 23, 35 23, 28 34 Z" />
              {/* Big Anime Ponytail */}
              <path d="M68 23 C82 20, 86 36, 82 50 C78 44, 75 33, 68 27 Z" />
              <circle cx="68" cy="24" r="4" fill="#ffe600" />
            </g>
          )}
          {hairStyle === 'buzz' && (
            <path
              d="M29 33 C29 20, 40 17, 50 17 C60 17, 71 20, 71 33 C68 23, 32 23, 29 33 Z"
              fill={hairColor}
              stroke="#000000"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
          )}
          {hairStyle === 'long' && (
            <g fill={hairColor} stroke="#000000" strokeWidth="2.8" strokeLinejoin="round">
              <path d="M28 34 C27 18, 73 18, 72 34 C67 22, 33 22, 28 34 Z" />
              <path d="M26 32 C24 50, 26 66, 33 72 C31 56, 29 44, 32 32 Z" />
              <path d="M74 32 C76 50, 74 66, 67 72 C69 56, 71 44, 68 32 Z" />
            </g>
          )}
          {hairStyle === 'undercut' && (
            <g fill={hairColor} stroke="#000000" strokeWidth="2.8" strokeLinejoin="round">
              <path d="M29 32 C30 18, 48 14, 70 16 C62 17, 51 18, 35 28 Z" />
              <path d="M70 16 C74 23, 72 32, 71 36 C69 29, 67 23, 62 20 Z" />
            </g>
          )}

          {/* Fun Cartoon Accessories */}
          {accessory === 'earrings' && (
            <g>
              {/* Silver Hoop Earrings */}
              <circle cx="28" cy="45" r="4.5" fill="none" stroke="#e2e8f0" strokeWidth="2.2" />
              <circle cx="72" cy="45" r="4.5" fill="none" stroke="#e2e8f0" strokeWidth="2.2" />
            </g>
          )}
          {accessory === 'glasses' && (
            <g stroke="#000000" strokeWidth="2.5" fill="none">
              <rect x="36" y="32" width="12" height="10" rx="3" fill="rgba(0,240,255,0.3)" />
              <rect x="52" y="32" width="12" height="10" rx="3" fill="rgba(0,240,255,0.3)" />
              <line x1="48" y1="37" x2="52" y2="37" />
              <line x1="36" y1="36" x2="30" y2="37" />
              <line x1="64" y1="36" x2="70" y2="37" />
            </g>
          )}
          {accessory === 'headphones' && (
            <g>
              <path d="M25 40 C25 18, 75 18, 75 40" stroke="#000000" strokeWidth="4" fill="none" strokeLinecap="round" />
              {/* Cat Ear Neon Headphones */}
              <polygon points="32,22 38,12 44,20" fill="#ff007f" stroke="#000000" strokeWidth="2" />
              <polygon points="56,20 62,12 68,22" fill="#ff007f" stroke="#000000" strokeWidth="2" />
              <rect x="23" y="33" width="8" height="16" rx="4" fill="#00f0ff" stroke="#000000" strokeWidth="2.2" />
              <rect x="69" y="33" width="8" height="16" rx="4" fill="#00f0ff" stroke="#000000" strokeWidth="2.2" />
            </g>
          )}
          {accessory === 'cap' && (
            <g>
              <path d="M28 29 C28 17, 72 17, 72 29 Z" fill="#ffe600" stroke="#000000" strokeWidth="2.5" />
              <path d="M30 29 C37 29, 65 29, 78 25 C70 23, 42 25, 30 29 Z" fill="#ff007f" stroke="#000000" strokeWidth="2" />
            </g>
          )}
          {accessory === 'beanie' && (
            <g>
              <path
                d="M27 34 C26 14, 74 14, 73 34 C66 30, 34 30, 27 34 Z"
                fill="#ff7700"
                stroke="#000000"
                strokeWidth="2.8"
              />
              <circle cx="50" cy="13" r="5" fill="#ffe600" stroke="#000000" strokeWidth="2" />
            </g>
          )}
          {accessory === 'backpack' && (
            <g>
              <rect x="19" y="65" width="8" height="20" rx="3" fill="#ffe600" stroke="#000000" strokeWidth="2.2" />
              <line x1="26" y1="67" x2="35" y2="77" stroke="#000000" strokeWidth="2.5" />
            </g>
          )}
        </g>

        {/* Floating Cartoon Companion with Neon Aura */}
        {showCompanion && companion !== 'none' && (
          <g className="animate-bounce duration-500" transform="translate(76, 46)">
            {/* Glowing neon halo */}
            <circle cx="8" cy="12" r="11" fill="#ffe600" opacity="0.3" className="animate-ping duration-1000" />

            {companion === 'fox' && (
              <g stroke="#000000" strokeWidth="2" strokeLinejoin="round">
                <ellipse cx="8" cy="12" rx="7.5" ry="6.5" fill="#ff7700" />
                {/* Ears */}
                <polygon points="1,7 5,0 7,6" fill="#ff007f" />
                <polygon points="9,6 11,0 15,7" fill="#ff007f" />
                {/* Snout */}
                <ellipse cx="8" cy="14" rx="4.5" ry="3" fill="#ffffff" />
                <circle cx="8" cy="13.5" r="1.3" fill="#000000" />
                {/* Big cute eyes */}
                <circle cx="5" cy="11" r="1.2" fill="#000000" />
                <circle cx="11" cy="11" r="1.2" fill="#000000" />
                {/* Tail */}
                <path d="M14 13 C20 10, 21 19, 15 20 Z" fill="#ff7700" />
                <circle cx="18" cy="18" r="2.5" fill="#ffffff" />
              </g>
            )}

            {companion === 'owl' && (
              <g stroke="#000000" strokeWidth="2" strokeLinejoin="round">
                <ellipse cx="8" cy="12" rx="7.5" ry="8.5" fill="#9333ea" />
                {/* Big gold anime eyes */}
                <circle cx="5" cy="9" r="3.2" fill="#ffe600" />
                <circle cx="11" cy="9" r="3.2" fill="#ffe600" />
                <circle cx="5" cy="9" r="1.5" fill="#000000" />
                <circle cx="11" cy="9" r="1.5" fill="#000000" />
                <circle cx="5.5" cy="8.5" r="0.7" fill="#ffffff" />
                <circle cx="11.5" cy="8.5" r="0.7" fill="#ffffff" />
                {/* Beak */}
                <polygon points="7,11 9,11 8,13.5" fill="#ff7700" />
              </g>
            )}

            {companion === 'capybara' && (
              <g stroke="#000000" strokeWidth="2" strokeLinejoin="round">
                {/* Chubby Body */}
                <ellipse cx="8" cy="14" rx="7.5" ry="6" fill="#c68a4c" />
                {/* Snout & Head */}
                <rect x="2" y="8" width="9" height="7" rx="3.5" fill="#a76831" />
                {/* Nose / Mouth */}
                <ellipse cx="3.5" cy="12" rx="2" ry="1.5" fill="#4a2e16" />
                {/* Cute Smiling Eye */}
                <path d="M 6 10 Q 7.5 8.5 9 10" fill="none" stroke="#000000" strokeWidth="1.5" />
                {/* Tiny rounded ears */}
                <circle cx="10" cy="7" r="1.8" fill="#7a461e" />
                {/* Mini Purple Crossbody Bag */}
                <rect x="5.5" y="13" width="5.5" height="4.5" rx="1.5" fill="#7c3aed" />
                <circle cx="8" cy="15" r="0.8" fill="#39ff14" />
                <line x1="3" y1="10" x2="6" y2="13" stroke="#7c3aed" strokeWidth="1.2" />
                {/* Small feet */}
                <rect x="3" y="18" width="3" height="3" rx="1" fill="#7a461e" />
                <rect x="9" y="18" width="3" height="3" rx="1" fill="#7a461e" />
              </g>
            )}

            {companion === 'bot' && (
              <g stroke="#000000" strokeWidth="2" strokeLinejoin="round">
                <rect x="2" y="4" width="13" height="12" rx="4" fill="#00f0ff" />
                <rect x="4" y="7" width="9" height="5" rx="2" fill="#121324" />
                <circle cx="6.5" cy="9.5" r="1.5" fill="#39ff14" />
                <circle cx="10.5" cy="9.5" r="1.5" fill="#39ff14" />
                <line x1="8.5" y1="4" x2="8.5" y2="1" stroke="#000000" strokeWidth="2" />
                <circle cx="8.5" cy="1" r="2" fill="#ff007f" />
                <ellipse cx="8.5" cy="17" rx="3.5" ry="2" fill="#ffe600" />
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );
};
