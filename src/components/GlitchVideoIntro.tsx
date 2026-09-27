import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, SkipForward, Volume2, VolumeX, Sparkles, Compass } from 'lucide-react';
import { sound } from '../utils/audio';

interface GlitchVideoIntroProps {
  onFinish: () => void;
}

export const GlitchVideoIntro: React.FC<GlitchVideoIntroProps> = ({ onFinish }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const duration = 4.0; // 4 seconds video clip
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    sound.playMirrorResonance();
    startTimeRef.current = Date.now();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    // 3D Polygons and Glitch shards
    const shards: {
      points: [number, number, number][];
      color: string;
      speed: number;
      rotSpeed: number;
    }[] = [];

    // Generate faceted geometric shards matching the video's black/white/neon crystal structure
    for (let i = 0; i < 28; i++) {
      const radius = 60 + Math.random() * 140;
      const angle = (i / 28) * Math.PI * 2;
      const color =
        i % 4 === 0
          ? '#000000'
          : i % 4 === 1
          ? '#ffffff'
          : i % 4 === 2
          ? '#ff007f'
          : '#00f0ff';

      shards.push({
        points: [
          [Math.cos(angle) * radius, Math.sin(angle) * radius, (Math.random() - 0.5) * 100],
          [Math.cos(angle + 0.5) * (radius * 1.3), Math.sin(angle + 0.5) * (radius * 1.3), (Math.random() - 0.5) * 120],
          [Math.cos(angle - 0.3) * (radius * 0.7), Math.sin(angle - 0.3) * (radius * 0.7), (Math.random() - 0.5) * 80],
        ],
        color,
        speed: 0.8 + Math.random() * 1.5,
        rotSpeed: (Math.random() - 0.5) * 0.04,
      });
    }

    const render = () => {
      const now = Date.now();
      const elapsed = ((now - startTimeRef.current) / 1000) % duration;
      setCurrentTime(elapsed);

      // Clear with dark glitch wash
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Draw background geometric pattern (triangles grid matching video frame 0)
      const gridSize = 40;
      ctx.save();
      ctx.strokeStyle = '#ffffff15';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + gridSize, y + gridSize);
          ctx.lineTo(x, y + gridSize);
          ctx.closePath();
          if ((x / gridSize + y / gridSize) % 3 === 0) {
            ctx.fillStyle = (x + y) % 2 === 0 ? '#111111' : '#220022';
            ctx.fill();
          }
          ctx.stroke();
        }
      }
      ctx.restore();

      // Center origin for 3D rotation
      const cx = width / 2;
      const cy = height / 2;
      const t = elapsed;

      // Chromatic RGB aberration offset based on glitch timing
      const glitchStrength = (Math.sin(t * 12) > 0.6 ? 12 : 2) * (Math.sin(t * 5) > 0.3 ? 1.5 : 0.8);

      const renderPass = (offsetX: number, colorTint?: string) => {
        ctx.save();
        ctx.translate(cx + offsetX, cy);

        // Global perspective tilt
        const rotY = t * 1.8;
        const rotX = Math.sin(t * 1.2) * 0.8;
        const rotZ = Math.cos(t * 0.9) * 0.4;

        shards.forEach((shard, idx) => {
          ctx.beginPath();
          shard.points.forEach((pt, pIdx) => {
            // 3D rotation math
            let [x, y, z] = pt;
            // Rotate Y
            const x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
            const z1 = x * Math.sin(rotY) + z * Math.cos(rotY);
            // Rotate X
            const y2 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
            const z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);
            // Rotate Z
            const x3 = x1 * Math.cos(rotZ) - y2 * Math.sin(rotZ);
            const y3 = x1 * Math.sin(rotZ) + y2 * Math.cos(rotZ);

            // Perspective scale
            const fov = 300;
            const scale = fov / (fov + z2 + 100);
            const px = x3 * scale;
            const py = y3 * scale;

            if (pIdx === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          });
          ctx.closePath();

          ctx.fillStyle = colorTint || shard.color;
          ctx.globalAlpha = 0.85;
          ctx.fill();

          ctx.lineWidth = 2;
          ctx.strokeStyle = idx % 2 === 0 ? '#00f0ff' : '#000000';
          ctx.stroke();
        });

        // Center black/white polygon star
        ctx.beginPath();
        for (let a = 0; a < 6; a++) {
          const r = a % 2 === 0 ? 50 : 25;
          const ang = (a / 6) * Math.PI * 2 + t * 2;
          const sx = Math.cos(ang) * r;
          const sy = Math.sin(ang) * r;
          if (a === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.closePath();
        ctx.fillStyle = '#000000';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.restore();
      };

      // Chromatic RGB Glitch passes
      ctx.globalCompositeOperation = 'screen';
      renderPass(-glitchStrength, 'rgba(0, 240, 255, 0.6)');
      renderPass(glitchStrength, 'rgba(255, 0, 127, 0.6)');
      ctx.globalCompositeOperation = 'source-over';
      renderPass(0);

      // Horizontal Scanlines & Glitch Slices
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      for (let y = 0; y < height; y += 4) {
        ctx.fillRect(0, y, width, 1.5);
      }

      // Random glitch slice bars
      if (Math.random() < 0.25) {
        const sliceY = Math.random() * height;
        const sliceH = 8 + Math.random() * 24;
        ctx.fillStyle = Math.random() > 0.5 ? '#ffe600' : '#00f0ff';
        ctx.globalAlpha = 0.3;
        ctx.fillRect(0, sliceY, width, sliceH);
        ctx.globalAlpha = 1.0;
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    // Auto-advance when video ends (after 4.2 seconds)
    const autoAdvanceTimer = setTimeout(() => {
      onFinish();
    }, 4200);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      clearTimeout(autoAdvanceTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-black flex flex-col items-center justify-between p-4 sm:p-6 overflow-hidden select-none font-sans">
      {/* Top Video Header */}
      <header className="relative z-20 w-full max-w-3xl flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-black border-2 border-[#00f0ff] flex items-center justify-center shadow-[0_0_10px_#00f0ff]">
            <Compass className="w-4 h-4 text-white stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-sm font-cartoon font-bold text-white tracking-widest uppercase">
              TERRANOVA INTRO
            </h1>
            <span className="text-[10px] font-bold text-[#00f0ff] block">
              Dimensional Awakening Sequence
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playTap();
            onFinish();
          }}
          className="px-4 py-1.5 rounded-full bg-black border-2 border-[#ffe600] text-black font-cartoon font-bold text-xs flex items-center gap-1.5 shadow-[0_0_12px_#ffe600] active:scale-95 transition-all cursor-pointer"
        >
          <span className="text-white">Skip Intro</span>
          <SkipForward className="w-3.5 h-3.5 text-white stroke-[3]" />
        </button>
      </header>

      {/* Main Video Screen Container */}
      <div className="relative z-10 w-full max-w-3xl my-auto aspect-video rounded-3xl overflow-hidden border-3 border-[#00f0ff] shadow-[0_0_30px_rgba(0,240,255,0.4)] bg-black flex flex-col justify-between group">
        {/* Canvas Glitch 3D Video Player */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />

        {/* Video Glitch Watermark & Audio Indicator */}
        <div className="relative z-20 p-4 flex items-center justify-between pointer-events-none">
          <div className="px-2.5 py-1 rounded-md bg-black/80 border border-[#ff007f] text-[10px] font-mono font-bold text-white flex items-center gap-1.5 shadow-[0_0_8px_#ff007f]">
            <span className="w-2 h-2 rounded-full bg-[#ff007f] animate-ping" />
            <span>PLAYING INTRO 00:0{Math.floor(currentTime)}</span>
          </div>

          <div className="px-2 py-0.5 rounded bg-black/80 border border-[#39ff14] text-[10px] font-mono text-white">
            1080p · 60fps
          </div>
        </div>

        {/* Video Bottom Scrub Bar & Controls */}
        <div className="relative z-20 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-2">
          {/* Progress bar */}
          <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden border border-black cursor-pointer">
            <div
              className="h-full bg-gradient-to-r from-[#00f0ff] via-[#ff007f] to-[#ffe600] transition-all duration-75"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>

          {/* Time & Play Controls */}
          <div className="flex items-center justify-between text-xs font-mono text-white font-bold">
            <div className="flex items-center gap-3">
              <span className="text-white">00:0{Math.min(3, Math.floor(currentTime))} / 00:04</span>
              <span className="text-[#00f0ff] text-[11px] font-cartoon">
                Entering Reality Sandbox...
              </span>
            </div>

            <button
              onClick={() => {
                sound.playTap();
                onFinish();
              }}
              className="px-3 py-1 rounded-lg bg-black border border-[#39ff14] text-white hover:text-black hover:bg-[#39ff14] font-cartoon text-xs transition-colors cursor-pointer"
            >
              Continue to Mirror →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom CTA to Step to Mirror */}
      <footer className="relative z-20 w-full max-w-3xl pb-2 text-center">
        <button
          onClick={() => {
            sound.playTap();
            sound.playKnowledgeUnlock();
            onFinish();
          }}
          className="w-full h-13 rounded-2xl bg-black border-2 border-[#00f0ff] text-white hover:text-[#00f0ff] font-cartoon font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_15px_#00f0ff] active:scale-[0.98] transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-white fill-white" />
          <span>Step Into the Mirror of Identity</span>
          <SkipForward className="w-4 h-4 text-white stroke-[2.5]" />
        </button>
      </footer>
    </div>
  );
};
