import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';

interface DetailsStepProps {
  initialAge?: number;
  initialGender?: string;
  initialCountry?: string;
  initialState?: string;
  onNext: (details: { age: number; gender: string; country: string; state: string }) => void;
}

export const DetailsStep: React.FC<DetailsStepProps> = ({
  initialAge = 17,
  initialGender = 'Woman',
  initialCountry = 'United States',
  initialState = 'Washington',
  onNext,
}) => {
  const [age, setAge] = useState<number>(initialAge);
  const [gender, setGender] = useState(initialGender);
  const [country, setCountry] = useState(initialCountry);
  const [state, setState] = useState(initialState);

  const genderOptions = [
    'Woman',
    'Man',
    'Transgender',
    'Non-binary/non-conforming',
    'Prefer not to respond',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playTap();
    sound.playKnowledgeUnlock();
    onNext({
      age,
      gender,
      country: country.trim() || 'United States',
      state: state.trim() || 'Washington',
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-6 overflow-y-auto select-none font-sans">
      {/* Neon ambient glow on white background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00f0ff]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff007f]/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center text-center space-y-6 sm:space-y-7 my-auto py-4"
      >
        {/* LINE 1: what is your age */}
        <div className="w-full flex flex-col items-center">
          <label className="text-2xl sm:text-4xl font-cartoon font-extrabold tracking-wide lowercase text-transparent bg-clip-text bg-gradient-to-r from-[#ff007f] to-[#7928ca] filter drop-shadow-[0_0_12px_rgba(255,0,127,0.5)] mb-3">
            what is your age
          </label>

          <div className="w-full max-w-xs flex items-center justify-center gap-4">
            <input
              type="range"
              min={14}
              max={21}
              step={1}
              value={age}
              onChange={(e) => {
                setAge(Number(e.target.value));
                sound.playTap();
              }}
              className="flex-1 accent-[#ff007f] h-3 bg-slate-200 rounded-lg cursor-pointer"
            />
            <span className="w-14 text-2xl font-cartoon font-extrabold text-[#ff007f] filter drop-shadow-[0_0_8px_rgba(255,0,127,0.5)]">
              {age}
            </span>
          </div>
        </div>

        {/* LINE 2: what is your gender */}
        <div className="w-full flex flex-col items-center">
          <label className="text-2xl sm:text-4xl font-cartoon font-extrabold tracking-wide lowercase text-transparent bg-clip-text bg-gradient-to-r from-[#7928ca] to-[#00f0ff] filter drop-shadow-[0_0_12px_rgba(0,240,255,0.5)] mb-3">
            what is your gender
          </label>

          <div className="flex flex-wrap justify-center gap-2 max-w-md">
            {genderOptions.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => {
                  setGender(g);
                  sound.playTap();
                }}
                className={`px-4 py-2 rounded-2xl font-cartoon font-bold text-sm sm:text-base border-3 transition-all cursor-pointer ${
                  gender === g
                    ? 'bg-white border-[#ff007f] text-[#ff007f] shadow-[0_0_15px_rgba(255,0,127,0.6)] scale-105'
                    : 'bg-white border-slate-300 text-slate-600 hover:border-[#00f0ff]'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* LINE 3: what is your location */}
        <div className="w-full flex flex-col items-center">
          <label className="text-2xl sm:text-4xl font-cartoon font-extrabold tracking-wide lowercase text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#39ff14] filter drop-shadow-[0_0_12px_rgba(57,255,20,0.5)] mb-3 leading-tight">
            what is your location
          </label>

          <div className="w-full max-w-sm flex flex-col gap-3">
            {/* Country Option */}
            <div className="flex flex-col text-left">
              <label className="text-xs font-cartoon font-bold text-slate-500 uppercase tracking-wider pl-1 mb-1">
                Country
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="country (e.g. United States)"
                className="w-full h-12 px-4 rounded-2xl bg-white border-2 border-[#00f0ff] text-slate-900 font-cartoon font-bold text-sm focus:outline-none focus:border-[#ff007f] shadow-[0_0_12px_rgba(0,240,255,0.3)] text-center"
              />
            </div>

            {/* City/State Option */}
            <div className="flex flex-col text-left">
              <label className="text-xs font-cartoon font-bold text-slate-500 uppercase tracking-wider pl-1 mb-1">
                City / State
              </label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="city/state (e.g. Seattle, WA)"
                className="w-full h-12 px-4 rounded-2xl bg-white border-2 border-[#39ff14] text-slate-900 font-cartoon font-bold text-sm focus:outline-none focus:border-[#ff007f] shadow-[0_0_12px_rgba(57,255,20,0.3)] text-center"
              />
            </div>
          </div>
        </div>

        {/* Enter Button with neon outline */}
        <div className="pt-2">
          <button
            type="submit"
            className="px-10 py-3.5 rounded-full bg-white border-3 border-[#00f0ff] hover:border-[#ff007f] text-transparent bg-clip-text bg-gradient-to-r from-[#ff007f] via-[#7928ca] to-[#00f0ff] font-cartoon font-extrabold text-xl tracking-wider uppercase shadow-[0_0_20px_rgba(0,240,255,0.5)] hover:shadow-[0_0_30px_rgba(255,0,127,0.6)] active:scale-95 transition-all cursor-pointer flex items-center gap-2 group"
          >
            <span>enter</span>
            <ArrowRight className="w-5 h-5 text-[#00f0ff] group-hover:text-[#ff007f] transition-colors stroke-[3]" />
          </button>
        </div>
      </motion.form>
    </div>
  );
};
