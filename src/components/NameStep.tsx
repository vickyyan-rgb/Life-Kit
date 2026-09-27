import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface NameStepProps {
  initialName?: string;
  onNext: (name: string) => void;
}

export const NameStep: React.FC<NameStepProps> = ({ initialName = '', onNext }) => {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name');
      sound.playTap();
      return;
    }
    sound.playTap();
    sound.playKnowledgeUnlock();
    onNext(name.trim());
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-6 overflow-hidden select-none font-sans">
      {/* Neon ambient glow on white background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#00f0ff]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-[#ff007f]/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center text-center space-y-6"
      >
        {/* Neon Question */}
        <h2 className="text-3xl sm:text-5xl font-cartoon font-extrabold tracking-wide lowercase text-transparent bg-clip-text bg-gradient-to-r from-[#ff007f] via-[#7928ca] to-[#00f0ff] filter drop-shadow-[0_0_15px_rgba(0,240,255,0.6)]">
          what is your name?
        </h2>

        {/* Text box */}
        <div className="w-full">
          <input
            type="text"
            autoFocus
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError('');
            }}
            placeholder="type your name here..."
            className="w-full h-14 sm:h-16 px-6 rounded-3xl bg-white border-3 border-[#00f0ff] text-slate-900 font-cartoon font-bold text-lg sm:text-xl placeholder-slate-400 focus:outline-none focus:border-[#ff007f] focus:shadow-[0_0_20px_rgba(255,0,127,0.5)] shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all text-center"
          />
          {error && (
            <p className="text-sm font-cartoon font-bold text-[#ff007f] mt-2 filter drop-shadow-[0_0_6px_rgba(255,0,127,0.4)]">
              {error}
            </p>
          )}
        </div>

        {/* Enter button in neon outline */}
        <button
          type="submit"
          className="px-10 py-3.5 rounded-full bg-white border-3 border-[#00f0ff] hover:border-[#ff007f] text-transparent bg-clip-text bg-gradient-to-r from-[#ff007f] to-[#00f0ff] font-cartoon font-extrabold text-xl tracking-wider uppercase shadow-[0_0_20px_rgba(0,240,255,0.5)] hover:shadow-[0_0_30px_rgba(255,0,127,0.6)] active:scale-95 transition-all cursor-pointer flex items-center gap-2 group"
        >
          <span>enter</span>
          <ArrowRight className="w-5 h-5 text-[#00f0ff] group-hover:text-[#ff007f] transition-colors stroke-[3]" />
        </button>
      </motion.form>
    </div>
  );
};
