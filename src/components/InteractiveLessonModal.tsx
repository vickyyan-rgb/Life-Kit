import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  X,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  Coins,
  ArrowRight,
} from 'lucide-react';
import { Lesson, Zone } from '../types';
import { sound } from '../utils/audio';

interface InteractiveLessonModalProps {
  lesson: Lesson;
  zone: Zone;
  onClose: () => void;
  onComplete: (lessonId: string, xpEarned: number, coinsEarned: number) => void;
}

export const InteractiveLessonModal: React.FC<InteractiveLessonModalProps> = ({
  lesson,
  zone,
  onClose,
  onComplete,
}) => {
  const [stage, setStage] = useState<'overview' | 'doc' | 'scenario' | 'victory'>('overview');
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleStartDocOrScenario = () => {
    sound.playTap();
    if (lesson.docPreview) {
      setStage('doc');
    } else {
      setStage('scenario');
    }
  };

  const handleChooseOption = (index: number) => {
    if (hasAnswered) return;
    sound.playTap();
    setSelectedOptionIndex(index);
    setHasAnswered(true);

    const isCorrect = lesson.scenario.options[index]?.isCorrect;
    if (isCorrect) {
      sound.playKnowledgeUnlock();
    }
  };

  const handleFinishLesson = () => {
    sound.playFanfare();
    setStage('victory');
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#ffe600', '#00f0ff', '#ff007f', '#39ff14'],
      });
    } catch {
      // Confetti fallback
    }
    onComplete(lesson.id, lesson.xpReward, lesson.coinsReward);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xs overflow-y-auto font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-lg bg-black border-2 border-[#00f0ff] rounded-3xl shadow-[0_0_25px_rgba(0,240,255,0.4)] overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#00f0ff]/40 bg-black">
          <div className="flex items-center gap-2.5 truncate">
            <span className="text-2xl">{zone.npcMentor.emoji}</span>
            <div className="truncate">
              <span className="text-xs font-cartoon font-extrabold neon-text-yellow block truncate">
                {zone.name}
              </span>
              <h3 className="text-sm font-cartoon font-bold text-white truncate">
                {lesson.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playTap();
              onClose();
            }}
            className="w-9 h-9 rounded-2xl bg-black border border-[#ff007f] flex items-center justify-center text-white hover:bg-[#ff007f]/20 transition-colors cursor-pointer shadow-[0_0_8px_#ff007f]"
          >
            <X className="w-5 h-5 text-white stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-black">
          {/* STAGE 1: OVERVIEW */}
          {stage === 'overview' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs font-cartoon font-bold">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-white fill-white" />
                  <span className="neon-text-cyan">{lesson.estimatedMinutes} min simulation</span>
                </span>
                <span className="flex items-center gap-1 font-cartoon">
                  <Sparkles className="w-4 h-4 text-white fill-white" />
                  <span className="neon-text-lime">+{lesson.xpReward} XP</span>
                </span>
                <span className="flex items-center gap-1 font-cartoon">
                  <Coins className="w-4 h-4 text-white fill-white" />
                  <span className="neon-text-yellow">+{lesson.coinsReward} Coins</span>
                </span>
              </div>

              <p className="text-sm text-slate-200 leading-relaxed font-sans">
                {lesson.summary}
              </p>

              {/* Key Takeaways */}
              <div className="bg-black border border-[#ffe600] rounded-3xl p-4 space-y-2.5 shadow-[0_0_12px_rgba(255,230,0,0.25)]">
                <span className="text-xs font-cartoon font-extrabold neon-text-yellow uppercase tracking-wider block">
                  ★ Golden Rules to Remember:
                </span>
                <ul className="space-y-2 text-xs text-slate-200">
                  {lesson.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-black border border-[#ff007f] text-white flex items-center justify-center text-xs font-cartoon font-bold shrink-0 mt-0.5 shadow-[0_0_6px_#ff007f]">
                        <span className="neon-text-pink">{idx + 1}</span>
                      </span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mentor Tip Card */}
              <div className="bg-black border border-[#00f0ff] rounded-3xl p-3.5 flex items-start gap-3 shadow-[0_0_12px_rgba(0,240,255,0.3)]">
                <div className="w-10 h-10 rounded-2xl bg-black border border-[#00f0ff] flex items-center justify-center text-xl shrink-0">
                  {zone.npcMentor.emoji}
                </div>
                <div>
                  <div className="text-xs font-cartoon font-extrabold neon-text-cyan">
                    {zone.npcMentor.name} ({zone.npcMentor.role})
                  </div>
                  <div className="text-[11px] text-slate-200 italic mt-0.5">
                    "{zone.npcMentor.quote}"
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STAGE 2: DOCUMENT INSPECTOR */}
          {stage === 'doc' && lesson.docPreview && (
            <div className="space-y-3.5">
              <div className="flex items-center gap-1.5 text-xs font-cartoon font-bold">
                <FileText className="w-4 h-4 text-white fill-white" />
                <span className="neon-text-yellow font-extrabold">Examine The Paperwork & Fine Print</span>
              </div>

              <div className="bg-black border-2 border-[#00f0ff] rounded-3xl p-4 space-y-3 font-mono text-xs shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <div className="text-center font-cartoon font-bold text-white border-b border-white/20 pb-2 text-sm">
                  {lesson.docPreview.title}
                </div>

                {/* Highlighted Warning Clause */}
                <div className="p-3 rounded-2xl bg-black border border-[#ffe600] text-slate-200 font-sans font-bold text-xs leading-relaxed shadow-[0_0_10px_#ffe600] flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-white fill-white shrink-0 mt-0.5" />
                  <div>
                    <span className="neon-text-yellow font-extrabold uppercase tracking-wider">CRUCIAL CLAUSE: </span>
                    {lesson.docPreview.highlightClause}
                  </div>
                </div>

                {/* Details Breakdown */}
                <div className="space-y-1.5 pt-1">
                  {lesson.docPreview.details.map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between p-2.5 rounded-xl border ${
                        item.caution ? 'bg-black border-[#ff007f] shadow-[0_0_8px_#ff007f]' : 'bg-black border-white/20 text-slate-200'
                      }`}
                    >
                      <span className="text-slate-400 font-sans">{item.label}</span>
                      <span className={`font-bold font-mono ${item.caution ? 'neon-text-pink font-extrabold' : 'text-white'}`}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xs font-bold text-[#00f0ff]">
                Notice how the numbers interact. Next up: what do you do when put on the spot?
              </p>
            </div>
          )}

          {/* STAGE 3: REAL-WORLD SCENARIO */}
          {stage === 'scenario' && (
            <div className="space-y-3.5">
              <div className="bg-black border border-[#ffe600] rounded-3xl p-4 space-y-1.5 shadow-[0_0_12px_rgba(255,230,0,0.3)]">
                <span className="text-xs font-cartoon font-extrabold neon-text-yellow uppercase tracking-wide block">
                  Scenario: {lesson.scenario.title}
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  {lesson.scenario.narrative}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-cartoon font-bold text-white mb-2">
                  {lesson.scenario.question}
                </h4>

                <div className="space-y-2.5">
                  {lesson.scenario.options.map((opt, i) => {
                    const isSelected = selectedOptionIndex === i;
                    let borderClass = 'border border-white/20 bg-black hover:border-[#00f0ff]';
                    if (hasAnswered) {
                      if (opt.isCorrect) {
                        borderClass = 'border-2 border-[#39ff14] bg-black shadow-[0_0_15px_#39ff14]';
                      } else if (isSelected && !opt.isCorrect) {
                        borderClass = 'border-2 border-[#ff007f] bg-black shadow-[0_0_15px_#ff007f]';
                      } else {
                        borderClass = 'border border-white/10 bg-black opacity-30';
                      }
                    }

                    return (
                      <button
                        key={i}
                        disabled={hasAnswered}
                        onClick={() => handleChooseOption(i)}
                        className={`w-full p-3.5 rounded-2xl text-left text-xs transition-all flex items-start gap-2.5 cursor-pointer ${borderClass}`}
                      >
                        <span className="w-5 h-5 rounded-full border border-white bg-black text-white flex items-center justify-center text-xs font-cartoon font-bold shrink-0 mt-0.5">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <div className="flex-1">
                          <div className={`font-cartoon font-bold ${hasAnswered && opt.isCorrect ? 'neon-text-lime font-extrabold' : 'text-slate-100'}`}>
                            {opt.text}
                          </div>
                          {hasAnswered && isSelected && (
                            <div className="mt-2 text-xs font-sans leading-relaxed pt-2 border-t border-white/20">
                              <div className="font-bold mb-0.5">
                                {opt.isCorrect ? (
                                  <span className="neon-text-lime font-extrabold">★ SPOT ON!</span>
                                ) : (
                                  <span className="neon-text-pink font-extrabold">⚠️ CAUTION! TRAP!</span>
                                )}
                              </div>
                              <div className="text-slate-200">{opt.feedback}</div>
                              <div className="mt-1 font-mono font-bold text-[11px] text-[#ffe600]">
                                Impact: {opt.impact}
                              </div>
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STAGE 4: VICTORY */}
          {stage === 'victory' && (
            <div className="text-center py-5 space-y-4">
              <div className="w-18 h-18 rounded-3xl bg-black border-2 border-[#39ff14] flex items-center justify-center mx-auto shadow-[0_0_20px_#39ff14]">
                <CheckCircle2 className="w-10 h-10 text-white fill-white" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-black border border-[#ffe600] text-xs font-cartoon font-extrabold neon-text-yellow shadow-[0_0_10px_#ffe600]">
                  QUEST ACCOMPLISHED!
                </span>
                <h3 className="text-2xl font-cartoon font-extrabold neon-text-lime mt-2">
                  Knowledge Added to Persona!
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto">
                  You mastered <strong className="text-white">{lesson.title}</strong>!
                </p>
              </div>

              <div className="inline-flex items-center gap-4 p-3 bg-black rounded-2xl border border-white/20 shadow-[0_0_12px_rgba(255,255,255,0.2)]">
                <div className="text-center px-3">
                  <div className="text-xs font-bold text-slate-400">Earned XP</div>
                  <div className="text-base font-cartoon font-extrabold neon-text-lime">
                    +{lesson.xpReward} XP
                  </div>
                </div>
                <div className="w-0.5 h-8 bg-white/20" />
                <div className="text-center px-3">
                  <div className="text-xs font-bold text-slate-400">Coins</div>
                  <div className="text-base font-cartoon font-extrabold neon-text-yellow">
                    +{lesson.coinsReward}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 border-t border-[#00f0ff]/40 bg-black">
          {stage === 'overview' && (
            <button
              onClick={handleStartDocOrScenario}
              className="w-full h-12 rounded-2xl bg-black hover:bg-[#ffe600]/20 border-2 border-[#ffe600] font-cartoon font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_12px_#ffe600] active:scale-95 transition-all cursor-pointer"
            >
              <span className="neon-text-yellow font-extrabold">
                {lesson.docPreview ? 'Inspect Sample Document' : 'Enter Real-Life Scenario'}
              </span>
              <ArrowRight className="w-4 h-4 text-white stroke-[3]" />
            </button>
          )}

          {stage === 'doc' && (
            <button
              onClick={() => {
                sound.playTap();
                setStage('scenario');
              }}
              className="w-full h-12 rounded-2xl bg-black hover:bg-[#39ff14]/20 border-2 border-[#39ff14] font-cartoon font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_12px_#39ff14] active:scale-95 transition-all cursor-pointer"
            >
              <span className="neon-text-lime font-extrabold">Ready for Real-Life Scenario!</span>
              <ArrowRight className="w-4 h-4 text-white stroke-[3]" />
            </button>
          )}

          {stage === 'scenario' && (
            <button
              disabled={!hasAnswered}
              onClick={handleFinishLesson}
              className={`w-full h-12 rounded-2xl font-cartoon font-bold text-sm flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                hasAnswered
                  ? 'bg-black border-2 border-[#39ff14] hover:bg-[#39ff14]/20 shadow-[0_0_15px_#39ff14] active:scale-95'
                  : 'bg-black text-slate-600 cursor-not-allowed border-white/10'
              }`}
            >
              <span className={hasAnswered ? 'neon-text-lime font-extrabold' : ''}>
                Collect XP & Finish Lesson!
              </span>
              <Sparkles className="w-4 h-4 text-white fill-white" />
            </button>
          )}

          {stage === 'victory' && (
            <button
              onClick={() => {
                sound.playTap();
                onClose();
              }}
              className="w-full h-12 rounded-2xl bg-black hover:bg-[#00f0ff]/20 border-2 border-[#00f0ff] font-cartoon font-extrabold text-sm flex items-center justify-center shadow-[0_0_15px_#00f0ff] active:scale-95 transition-all cursor-pointer"
            >
              <span className="neon-text-cyan">Return to Open World Map</span>
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
