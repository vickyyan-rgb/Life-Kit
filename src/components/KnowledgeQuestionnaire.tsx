import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Check, X, Sparkles } from 'lucide-react';
import { AvatarConfig } from '../types';
import { AvatarRenderer } from './AvatarRenderer';
import { sound } from '../utils/audio';

interface KnowledgeQuestionnaireProps {
  userName: string;
  avatar: AvatarConfig;
  onComplete: (results: { knownZoneIds: string[]; earnedStartingXp: number }) => void;
}

interface QuestionItem {
  id: string;
  question: string;
  subtitle: string;
  zoneId: string;
  tag: string;
}

const LIFEKIT_QUESTIONS: QuestionItem[] = [
  {
    id: 'taxes',
    question: 'Do you know how to file taxes?',
    subtitle: 'W-2s, 1099 deductions, and IRS filing deadlines',
    zoneId: 'tax_haven',
    tag: 'Citadel of Taxes & Deductions',
  },
  {
    id: 'license',
    question: "Do you have a driver's license?",
    subtitle: 'Road rules, car purchase, insurance & registration',
    zoneId: 'mobility_port',
    tag: 'Mobility Port: Vehicles & Commuting',
  },
  {
    id: 'credit',
    question: 'Do you have a credit card?',
    subtitle: 'Credit scores, billing cycles, APR & credit building',
    zoneId: 'credit_crest',
    tag: 'Credit Crest: Score & Interest',
  },
  {
    id: 'moving_out',
    question: 'Do you know what to watch for when you plan to move out?',
    subtitle: 'Lease contracts, tenant rights, deposits & utilities',
    zoneId: 'shelter_springs',
    tag: 'Shelter Springs: Rent & Housing',
  },
];

export const KnowledgeQuestionnaire: React.FC<KnowledgeQuestionnaireProps> = ({
  userName,
  avatar,
  onComplete,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [knownZoneIds, setKnownZoneIds] = useState<string[]>([]);
  const [totalXp, setTotalXp] = useState<number>(100);
  const [avatarReaction, setAvatarReaction] = useState<string | null>(null);
  const [isFinishing, setIsFinishing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Safely clamp question to prevent out-of-bounds access
  const safeIndex = Math.min(Math.max(0, currentIndex), LIFEKIT_QUESTIONS.length - 1);
  const currentQ = LIFEKIT_QUESTIONS[safeIndex] || LIFEKIT_QUESTIONS[0];

  const handleAnswer = (answeredYes: boolean) => {
    if (isProcessing || isFinishing) return;
    setIsProcessing(true);

    sound.playTap();

    let updatedKnown = knownZoneIds;
    let earnedThisQuestion = 50;

    if (answeredYes) {
      sound.playKnowledgeUnlock();
      if (currentQ?.zoneId) {
        updatedKnown = [...knownZoneIds, currentQ.zoneId];
        setKnownZoneIds(updatedKnown);
      }
      earnedThisQuestion = 150;
      setAvatarReaction('Awesome! Land illuminated! 🌟');
    } else {
      setAvatarReaction("No worries, we'll master it! 🚀");
    }

    const newTotalXp = totalXp + earnedThisQuestion;
    setTotalXp(newTotalXp);

    setTimeout(() => {
      setAvatarReaction(null);
      setIsProcessing(false);

      if (currentIndex < LIFEKIT_QUESTIONS.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        // All questions answered: bring them directly to the map!
        setIsFinishing(true);
        sound.playFanfare();
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#00f0ff', '#ff007f', '#ffe600', '#39ff14'],
          });
        } catch {
          // Confetti fallback
        }

        setTimeout(() => {
          onComplete({
            knownZoneIds: updatedKnown,
            earnedStartingXp: newTotalXp,
          });
        }, 700);
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-between p-4 sm:p-6 overflow-hidden select-none font-sans">
      {/* Ambient neon glow on white background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00f0ff]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff007f]/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Top Header & Progress */}
      <div className="relative z-10 w-full max-w-lg mx-auto text-center pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border-2 border-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.4)] text-xs font-cartoon font-bold text-slate-800 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#ff007f] animate-spin duration-3000" />
          <span>Life Knowledge Check</span>
          <span className="text-[#00f0ff] font-extrabold">({Math.min(currentIndex + 1, LIFEKIT_QUESTIONS.length)} of {LIFEKIT_QUESTIONS.length})</span>
        </div>

        {/* Progress bar with neon gradient */}
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border-2 border-slate-200 shadow-inner max-w-xs mx-auto">
          <motion.div
            className="h-full bg-gradient-to-r from-[#00f0ff] via-[#ffe600] to-[#ff007f] rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${((Math.min(currentIndex + 1, LIFEKIT_QUESTIONS.length)) / LIFEKIT_QUESTIONS.length) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Center Question Card */}
      <div className="relative z-10 w-full max-w-lg mx-auto my-auto py-2">
        {isFinishing ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/95 backdrop-blur-md border-3 border-[#39ff14] rounded-3xl p-6 sm:p-8 shadow-[0_0_25px_rgba(57,255,20,0.4)] text-center space-y-4"
          >
            <div className="text-3xl sm:text-4xl font-cartoon font-extrabold text-slate-900 leading-snug">
              World Unlocked! 🗺️
            </div>
            <p className="text-sm font-semibold text-slate-600">
              Entering the open world map...
            </p>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            {currentQ && (
              <motion.div
                key={currentQ.id || 'question'}
                initial={{ opacity: 0, y: 15, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="bg-white/95 backdrop-blur-md border-3 border-[#00f0ff] rounded-3xl p-6 sm:p-8 shadow-[0_0_25px_rgba(0,240,255,0.3)] text-center space-y-6"
              >
                {/* Tag */}
                <div className="text-xs font-cartoon font-bold text-[#ff007f] filter drop-shadow-[0_0_6px_rgba(255,0,127,0.3)] uppercase tracking-wider">
                  {currentQ?.tag || 'LifeKit Milestone'}
                </div>

                {/* Question prompt */}
                <div>
                  <h2 className="text-2xl sm:text-4xl font-cartoon font-extrabold text-slate-900 leading-snug">
                    {currentQ?.question || ''}
                  </h2>
                  <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-2">
                    {currentQ?.subtitle || ''}
                  </p>
                </div>

                {/* JUST BUTTONS FOR YES OR NO (IN NEON OUTLINES) */}
                <div className="grid grid-cols-2 gap-4 pt-2 max-w-sm mx-auto">
                  {/* YES BUTTON */}
                  <button
                    type="button"
                    disabled={isProcessing || isFinishing}
                    onClick={() => handleAnswer(true)}
                    className={`h-14 sm:h-16 rounded-2xl bg-white border-3 border-[#39ff14] hover:bg-[#39ff14]/10 text-[#39ff14] hover:text-[#2ecc71] font-cartoon font-extrabold text-xl sm:text-2xl tracking-wider uppercase shadow-[0_0_20px_rgba(57,255,20,0.5)] hover:shadow-[0_0_30px_rgba(57,255,20,0.8)] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 group ${
                      isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <Check className="w-6 h-6 stroke-[3.5] text-[#39ff14] group-hover:scale-110 transition-transform" />
                    <span>yes</span>
                  </button>

                  {/* NO BUTTON */}
                  <button
                    type="button"
                    disabled={isProcessing || isFinishing}
                    onClick={() => handleAnswer(false)}
                    className={`h-14 sm:h-16 rounded-2xl bg-white border-3 border-[#ff007f] hover:bg-[#ff007f]/10 text-[#ff007f] font-cartoon font-extrabold text-xl sm:text-2xl tracking-wider uppercase shadow-[0_0_20px_rgba(255,0,127,0.5)] hover:shadow-[0_0_30px_rgba(255,0,127,0.8)] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 group ${
                      isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <X className="w-6 h-6 stroke-[3.5] text-[#ff007f] group-hover:scale-110 transition-transform" />
                    <span>no</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* BOTTOM SCREEN: AVATAR DISPLAYED HERE DURING QUESTIONNAIRE */}
      <div className="relative z-10 w-full flex flex-col items-center justify-end pb-2 pt-2">
        {/* Avatar speech reaction bubble */}
        <AnimatePresence>
          {avatarReaction && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.9 }}
              className="mb-2 px-4 py-1.5 rounded-full bg-white border-2 border-[#ff007f] shadow-[0_0_12px_rgba(255,0,127,0.4)] text-xs font-cartoon font-extrabold text-[#ff007f]"
            >
              {avatarReaction}
            </motion.div>
          )}
        </AnimatePresence>

        <AvatarRenderer
          avatar={avatar}
          size={84}
          isWalking={isProcessing}
        />
        <div className="text-xs font-cartoon font-bold text-slate-700 mt-1">
          {userName}
        </div>
      </div>
    </div>
  );
};
