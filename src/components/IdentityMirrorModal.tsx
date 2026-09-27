import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, MapPin, User, Calendar, ArrowRight, Zap } from 'lucide-react';
import { sound } from '../utils/audio';

interface IdentityMirrorModalProps {
  initialName?: string;
  initialAge?: number;
  initialGender?: string;
  initialCountry?: string;
  initialCity?: string;
  onConfirm: (data: {
    name: string;
    age: number;
    gender: string;
    country: string;
    city: string;
  }) => void;
}

export const IdentityMirrorModal: React.FC<IdentityMirrorModalProps> = ({
  initialName = '',
  initialAge = 17,
  initialGender = 'She/Her',
  initialCountry = 'United States',
  initialCity = '',
  onConfirm,
}) => {
  const [name, setName] = useState(initialName);
  const [age, setAge] = useState<number>(initialAge);
  const [gender, setGender] = useState(initialGender);
  const [country, setCountry] = useState(initialCountry);
  const [city, setCity] = useState(initialCity);
  const [error, setError] = useState('');

  const genderOptions = [
    { label: 'Woman', value: 'Woman' },
    { label: 'Man', value: 'Man' },
    { label: 'Transgender', value: 'Transgender' },
    { label: 'Non-binary/non-conforming', value: 'Non-binary/non-conforming' },
    { label: 'Prefer not to respond', value: 'Prefer not to respond' },
  ];

  const popularCountries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'Global / Other',
  ];

  const getAgeNarrative = (val: number) => {
    if (val <= 15) return '★ Early High School · Smart savings habits & basics';
    if (val <= 17) return '★ First Jobs, W-4 Forms & Learning Auto Rules';
    if (val <= 18) return '★ Legal Adulthood · Signing Contracts & Credit Cards';
    return '★ College & Young Adult · Leases, Big Taxes & Wealth';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please tell the mirror your name or gamer tag!');
      sound.playTap();
      return;
    }
    sound.playMirrorResonance();
    onConfirm({
      name: name.trim(),
      age,
      gender,
      country,
      city: city.trim() || 'Neo City',
    });
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0b0c1b] flex flex-col items-center justify-between p-4 sm:p-6 overflow-y-auto select-none font-sans">
      {/* Cartoon Neon Mirror Chamber Backdrop */}
      <div className="fixed inset-0 pointer-events-none">
        <img
          src="/src/assets/images/cartoon_neon_mirror_chamber_1790537117648.jpg"
          alt="Cartoon Mirror Chamber"
          className="w-full h-full object-cover opacity-35 filter brightness-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c1b] via-[#0b0c1b]/80 to-[#0b0c1b]/60" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-lg mx-auto text-center pt-2 pb-3"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffe600] border-2 border-black text-xs font-cartoon font-bold text-black shadow-[2px_2px_0px_#000] mb-2">
          <Sparkles className="w-4 h-4 text-black fill-current" />
          <span>The Magic Mirror of Identity</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-cartoon font-bold text-white tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          Who Is Entering the Sandbox?
        </h2>
        <p className="text-xs font-semibold text-[#00f0ff] mt-0.5">
          Tell us about yourself to tailor your real-life quests!
        </p>
      </motion.div>

      {/* Chunky Cartoon Form Card */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 w-full max-w-lg mx-auto bg-[#14152d]/95 backdrop-blur-xl border-3 border-black rounded-3xl p-5 sm:p-6 shadow-[6px_6px_0px_#000] space-y-4"
      >
        {/* Name Input */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-cartoon font-bold text-white mb-1.5">
            <User className="w-4 h-4 text-[#ffe600]" />
            <span>Your Name or Explorer Handle</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError('');
            }}
            placeholder="e.g. Alex, Sam, Jordan..."
            className="w-full h-12 px-4 rounded-2xl bg-[#0b0c1b] border-2 border-black text-white font-cartoon text-sm placeholder-slate-500 focus:outline-none focus:border-[#00f0ff] focus:ring-2 focus:ring-[#00f0ff]/50 shadow-[2px_2px_0px_#000]"
          />
          {error && (
            <p className="text-xs font-bold text-[#ff007f] mt-1 bg-[#ff007f]/10 p-1.5 rounded-lg border border-[#ff007f]/40">
              {error}
            </p>
          )}
        </div>

        {/* Age Slider with real-world context */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="flex items-center gap-1.5 text-xs font-cartoon font-bold text-white">
              <Calendar className="w-4 h-4 text-[#00f0ff]" />
              <span>Age (14–21)</span>
            </label>
            <span className="px-2.5 py-0.5 rounded-full bg-[#ff007f] border-2 border-black text-xs font-cartoon font-bold text-white shadow-[2px_2px_0px_#000]">
              {age} Years Old
            </span>
          </div>

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
            className="w-full accent-[#00f0ff] h-3 bg-[#0b0c1b] rounded-lg border-2 border-black cursor-pointer"
          />

          <div className="flex justify-between text-[11px] font-cartoon font-bold text-slate-400 px-1 mt-1">
            <span>14</span>
            <span>16</span>
            <span>18</span>
            <span>20</span>
            <span>21</span>
          </div>

          <div className="mt-2 p-2.5 rounded-2xl bg-[#00f0ff]/15 border-2 border-[#00f0ff] text-[11px] font-bold text-[#00f0ff] flex items-center gap-2 shadow-[2px_2px_0px_#000]">
            <Zap className="w-3.5 h-3.5 text-[#ffe600] shrink-0 fill-current" />
            <span>{getAgeNarrative(age)}</span>
          </div>
        </div>

        {/* Gender Selection */}
        <div>
          <label className="block text-xs font-cartoon font-bold text-white mb-2">
            Pronouns / Identity
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {genderOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  setGender(opt.value);
                  sound.playTap();
                }}
                className={`h-10 text-xs font-cartoon font-bold rounded-2xl border-2 border-black transition-all cursor-pointer shadow-[2px_2px_0px_#000] ${
                  gender === opt.value
                    ? 'bg-[#ffe600] text-black scale-102 font-extrabold'
                    : 'bg-[#0b0c1b] text-slate-300 hover:bg-[#1a1b3a]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Location: Country & City */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-cartoon font-bold text-white">
            <MapPin className="w-4 h-4 text-[#39ff14]" />
            <span>Location (Country & City)</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <select
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  sound.playTap();
                }}
                className="w-full h-11 px-3 rounded-2xl bg-[#0b0c1b] border-2 border-black text-white font-cartoon text-xs focus:outline-none focus:border-[#ffe600] shadow-[2px_2px_0px_#000]"
              >
                {popularCountries.map((c) => (
                  <option key={c} value={c} className="bg-[#14152d] text-white">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City (e.g. Seattle, Austin)"
                className="w-full h-11 px-3 rounded-2xl bg-[#0b0c1b] border-2 border-black text-white placeholder-slate-500 font-cartoon text-xs focus:outline-none focus:border-[#ffe600] shadow-[2px_2px_0px_#000]"
              />
            </div>
          </div>
        </div>

        {/* Submit to Avatar Customizer */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full h-13 rounded-2xl bg-[#39ff14] hover:bg-[#4dff2c] text-black font-cartoon font-bold text-sm flex items-center justify-center gap-2 border-3 border-black shadow-[4px_4px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer"
          >
            <span>Confirm & Customize Avatar</span>
            <ArrowRight className="w-4 h-4 text-black stroke-[3]" />
          </button>
        </div>
      </motion.form>

      {/* Footer hint */}
      <div className="relative z-10 py-2 text-center text-[11px] font-semibold text-slate-400">
        Everything can be modified later in your profile wardrobe anytime.
      </div>
    </div>
  );
};
