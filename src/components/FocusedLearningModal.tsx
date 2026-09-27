import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  ArrowRight,
  RotateCcw,
  Sparkles,
  ChevronRight,
  FileText,
  Lightbulb,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FullCurriculumLesson, UserProfile } from '../types';
import { CocoRenderer } from './CocoRenderer';
import { sound } from '../utils/audio';

interface FocusedLearningModalProps {
  lesson: FullCurriculumLesson;
  categoryName: string;
  userProfile: UserProfile;
  onClose: () => void;
  onPassLesson: (lessonId: string, earnedXp: number, earnedCoins: number) => void;
  onNextLesson?: () => void;
}

type StepType = 'situation' | 'concepts' | 'practice' | 'takeaways' | 'quiz' | 'result';

export const FocusedLearningModal: React.FC<FocusedLearningModalProps> = ({
  lesson,
  categoryName,
  userProfile,
  onClose,
  onPassLesson,
  onNextLesson,
}) => {
  const [currentStep, setCurrentStep] = useState<StepType>('situation');
  const [conceptIndex, setConceptIndex] = useState(0);

  // Practice state
  const [selectedPracticeOption, setSelectedPracticeOption] = useState<string | null>(null);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizExplanations, setShowQuizExplanations] = useState<Record<number, boolean>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [score, setScore] = useState(0);

  const alreadyCompleted = userProfile.completedLessons.includes(lesson.id);

  // Advance concept screens
  const handleNextConcept = () => {
    sound.playTap();
    if (conceptIndex < lesson.conceptScreens.length - 1) {
      setConceptIndex((prev) => prev + 1);
    } else {
      setCurrentStep('practice');
    }
  };

  const handleSelectPractice = (optId: string) => {
    sound.playTap();
    setSelectedPracticeOption(optId);
  };

  const handleSelectQuizAnswer = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    sound.playTap();
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
    setShowQuizExplanations((prev) => ({ ...prev, [qIdx]: true }));
  };

  const handleEvaluateQuiz = () => {
    sound.playTap();
    let calculatedScore = 0;
    lesson.quizQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIndex) {
        calculatedScore++;
      }
    });

    const passed = calculatedScore >= 2;
    setScore(calculatedScore);
    setHasPassed(passed);
    setQuizSubmitted(true);
    setCurrentStep('result');

    if (passed) {
      sound.playFanfare();
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#7928ca', '#00f0ff', '#39ff14', '#ffe600'],
        });
      } catch {
        // Fallback
      }
      // Award one-time XP & coins
      if (!alreadyCompleted) {
        onPassLesson(lesson.id, lesson.reward.xp, lesson.reward.coins);
      }
    } else {
      sound.playFootstep();
    }
  };

  const handleRetryQuiz = () => {
    sound.playTap();
    setQuizAnswers({});
    setShowQuizExplanations({});
    setQuizSubmitted(false);
    setCurrentStep('quiz');
  };

  const totalSteps = 4 + lesson.conceptScreens.length; // situation, concepts..., practice, takeaways, quiz
  const stepNumber =
    currentStep === 'situation'
      ? 1
      : currentStep === 'concepts'
      ? 2 + conceptIndex
      : currentStep === 'practice'
      ? 2 + lesson.conceptScreens.length
      : currentStep === 'takeaways'
      ? 3 + lesson.conceptScreens.length
      : totalSteps;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 select-none overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border-3 border-[#7928ca] shadow-[0_12px_40px_rgba(121,40,202,0.35)] flex flex-col max-h-[92vh] overflow-hidden my-auto text-slate-900 font-sans">
        {/* Top Header */}
        <header className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-cartoon font-bold px-2.5 py-1 rounded-full bg-violet-100 text-[#7928ca] border border-violet-200">
              {categoryName}
            </span>
            <span className="text-xs font-cartoon font-bold text-slate-500">
              Lesson {lesson.order}
            </span>
          </div>

          {/* Step Progress Pill */}
          <div className="flex items-center gap-2">
            <div className="text-xs font-cartoon font-bold text-slate-500">
              Step {stepNumber} of {totalSteps}
            </div>
            <div className="w-20 sm:w-28 bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#7928ca] to-[#00f0ff] transition-all duration-300"
                style={{ width: `${(stepNumber / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </header>

        {/* Content Area */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-5">
          <AnimatePresence mode="wait">
            {/* 1. RELATABLE OPENING SITUATION */}
            {currentStep === 'situation' && (
              <motion.div
                key="situation"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-1.5 text-xs font-cartoon font-bold text-[#7928ca] uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4 text-[#7928ca]" />
                  <span>Real-World Dilemma</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-cartoon font-extrabold text-slate-900 leading-snug">
                  {lesson.title}
                </h2>
                <div className="p-4 rounded-2xl bg-amber-50/70 border-2 border-amber-200 text-slate-800 space-y-2">
                  <h3 className="font-cartoon font-bold text-amber-900 text-base">
                    {lesson.openingSituation.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-700">
                    {lesson.openingSituation.narrative}
                  </p>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-violet-50/60 border border-violet-100">
                  <CocoRenderer size={52} pose="sitting" />
                  <div className="text-xs text-slate-700">
                    <span className="font-cartoon font-bold text-[#7928ca] block mb-0.5">
                      Coco says:
                    </span>
                    {lesson.openingSituation.reflectionPrompt}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. CONCEPT SCREENS */}
            {currentStep === 'concepts' && (
              <motion.div
                key={`concept_${conceptIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <h3 className="text-xl sm:text-2xl font-cartoon font-extrabold text-slate-900">
                  {lesson.conceptScreens[conceptIndex].title}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-slate-700">
                  {lesson.conceptScreens[conceptIndex].body}
                </p>

                {/* Highlighted Terms */}
                {lesson.conceptScreens[conceptIndex].highlightTerms && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {lesson.conceptScreens[conceptIndex].highlightTerms.map((t) => (
                      <div
                        key={t.term}
                        className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-left"
                      >
                        <span className="text-xs font-cartoon font-extrabold text-[#7928ca] block">
                          ✦ {t.term}
                        </span>
                        <span className="text-xs text-slate-600 mt-0.5 block">
                          {t.definition}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Inspectable Document Sample */}
                {lesson.conceptScreens[conceptIndex].documentSample && (
                  <div className="p-4 rounded-2xl bg-slate-900 text-white shadow-inner space-y-2 border border-slate-800">
                    <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                      <div className="flex items-center gap-1.5 text-xs font-cartoon font-bold text-[#00f0ff]">
                        <FileText className="w-3.5 h-3.5" />
                        <span>{lesson.conceptScreens[conceptIndex].documentSample?.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono">
                        Inspect Details
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                      {lesson.conceptScreens[conceptIndex].documentSample?.fields.map((f, i) => (
                        <div
                          key={i}
                          className={`p-2 rounded-xl ${
                            f.caution ? 'bg-amber-950/40 border border-amber-500/40 text-amber-200' : 'bg-slate-800 text-slate-200'
                          }`}
                        >
                          <div className="text-[10px] text-slate-400">{f.label}</div>
                          <div className="font-bold text-sm font-mono mt-0.5">{f.value}</div>
                          {f.tip && <div className="text-[10px] text-[#39ff14] mt-0.5">💡 {f.tip}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mascot Coco Tip */}
                {lesson.conceptScreens[conceptIndex].cocoTip && (
                  <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <CocoRenderer size={48} pose="waving" />
                    <p className="text-xs text-emerald-950 font-medium">
                      {lesson.conceptScreens[conceptIndex].cocoTip}
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* 3. INTERACTIVE PRACTICE ACTIVITY */}
            {currentStep === 'practice' && (
              <motion.div
                key="practice"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-1.5 text-xs font-cartoon font-bold text-emerald-600 uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Hands-On Practice</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-cartoon font-extrabold text-slate-900">
                  {lesson.practiceActivity.title}
                </h3>
                <p className="text-sm text-slate-700 font-medium">
                  {lesson.practiceActivity.prompt}
                </p>

                <div className="space-y-2.5 pt-2">
                  {lesson.practiceActivity.options.map((opt) => {
                    const isSelected = selectedPracticeOption === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectPractice(opt.id)}
                        className={`w-full p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                          isSelected
                            ? opt.isRecommended
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                              : 'bg-rose-50 border-rose-400 text-rose-950'
                            : 'bg-slate-50 border-slate-200 hover:border-[#7928ca] text-slate-800'
                        }`}
                      >
                        <div className="text-sm font-semibold">{opt.label}</div>
                        {isSelected && (
                          <div className={`mt-2 text-xs font-medium pt-2 border-t ${
                            opt.isRecommended ? 'border-emerald-200 text-emerald-800' : 'border-rose-200 text-rose-800'
                          }`}>
                            {opt.feedback}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* 4. CONCISE TAKEAWAYS */}
            {currentStep === 'takeaways' && (
              <motion.div
                key="takeaways"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-1.5 text-xs font-cartoon font-bold text-[#7928ca] uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#7928ca]" />
                  <span>Key Takeaways</span>
                </div>
                <h3 className="text-2xl font-cartoon font-extrabold text-slate-900">
                  Ready to test your knowledge?
                </h3>

                <div className="space-y-2.5">
                  {lesson.takeaways.map((point, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200"
                    >
                      <span className="w-6 h-6 rounded-full bg-violet-100 text-[#7928ca] font-cartoon font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-slate-700 leading-snug">{point}</p>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3">
                  <CocoRenderer size={44} pose="cheering" />
                  <p className="text-xs text-amber-900 font-medium">
                    "Take your time on the 3 questions. Answer 2 correctly to pass and unlock the next route step!"
                  </p>
                </div>
              </motion.div>
            )}

            {/* 5. 3-QUESTION QUIZ */}
            {currentStep === 'quiz' && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="border-b border-slate-200 pb-2">
                  <h3 className="text-xl font-cartoon font-extrabold text-slate-900">
                    End-of-Lesson Check (3 Questions)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Score at least 2 of 3 to complete this step.
                  </p>
                </div>

                {lesson.quizQuestions.map((q, qIdx) => {
                  const selectedOpt = quizAnswers[qIdx];
                  const hasAnswered = selectedOpt !== undefined;
                  const isCorrect = selectedOpt === q.correctIndex;

                  return (
                    <div
                      key={q.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
                    >
                      <h4 className="text-sm font-cartoon font-extrabold text-slate-900">
                        {qIdx + 1}. {q.question}
                      </h4>

                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => {
                          const isOptChosen = selectedOpt === optIdx;
                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectQuizAnswer(qIdx, optIdx)}
                              className={`w-full p-3 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                                isOptChosen
                                  ? optIdx === q.correctIndex
                                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                                    : 'bg-rose-50 border-rose-400 text-rose-950'
                                  : 'bg-white border-slate-200 hover:border-[#7928ca] text-slate-800'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {hasAnswered && showQuizExplanations[qIdx] && (
                        <div
                          className={`p-2.5 rounded-xl text-xs font-medium ${
                            isCorrect ? 'bg-emerald-100/60 text-emerald-900' : 'bg-amber-100/60 text-amber-900'
                          }`}
                        >
                          {isCorrect ? '✓ Correct! ' : '💡 Review note: '}
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </motion.div>
            )}

            {/* 6. RESULT SUMMARY */}
            {currentStep === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4 space-y-5"
              >
                {hasPassed ? (
                  <>
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                      <Award className="w-8 h-8 stroke-[2.5]" />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-cartoon font-extrabold text-slate-900">
                        Lesson Mastered! 🎉
                      </h3>
                      <p className="text-sm font-semibold text-slate-600 mt-1">
                        You scored {score} of 3 questions correctly.
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-violet-50 border-2 border-[#7928ca]/30 text-sm font-cartoon font-bold text-[#7928ca]">
                      <span>+{lesson.reward.xp} XP</span>
                      <span>·</span>
                      <span>+{lesson.reward.coins} Coins</span>
                    </div>

                    <div className="max-w-md mx-auto p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3 text-left">
                      <CocoRenderer size={48} pose="cheering" />
                      <p className="text-xs text-slate-700">
                        "Fantastic work! The next stop along your journey route is now unlocked."
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto border-2 border-amber-300">
                      <RotateCcw className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-cartoon font-extrabold text-slate-900">
                        Almost There! ({score} / 3)
                      </h3>
                      <p className="text-sm font-semibold text-slate-600 mt-1">
                        Review the key takeaways and try the 3 questions again. No lives or progress lost!
                      </p>
                    </div>

                    <div className="max-w-md mx-auto p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3 text-left">
                      <CocoRenderer size={48} pose="thinking" />
                      <p className="text-xs text-amber-950">
                        "Let's look at this together: Re-check the deduction terms and give it another shot!"
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Actions Footer */}
        <footer className="px-5 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-2xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-cartoon font-bold text-xs sm:text-sm cursor-pointer"
          >
            Exit to Map
          </button>

          {/* Action based on current step */}
          {currentStep === 'situation' && (
            <button
              onClick={() => {
                sound.playTap();
                setCurrentStep('concepts');
              }}
              className="px-6 py-2.5 rounded-2xl bg-[#7928ca] hover:bg-[#6b21a8] text-white font-cartoon font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-[0_0_15px_rgba(121,40,202,0.4)] active:scale-95 transition-all cursor-pointer"
            >
              <span>Explore Concepts</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          )}

          {currentStep === 'concepts' && (
            <button
              onClick={handleNextConcept}
              className="px-6 py-2.5 rounded-2xl bg-[#7928ca] hover:bg-[#6b21a8] text-white font-cartoon font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-[0_0_15px_rgba(121,40,202,0.4)] active:scale-95 transition-all cursor-pointer"
            >
              <span>
                {conceptIndex < lesson.conceptScreens.length - 1 ? 'Next Concept' : 'Try Practice'}
              </span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          )}

          {currentStep === 'practice' && (
            <button
              disabled={!selectedPracticeOption}
              onClick={() => {
                sound.playTap();
                setCurrentStep('takeaways');
              }}
              className={`px-6 py-2.5 rounded-2xl bg-[#7928ca] text-white font-cartoon font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-[0_0_15px_rgba(121,40,202,0.4)] active:scale-95 transition-all cursor-pointer ${
                !selectedPracticeOption ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#6b21a8]'
              }`}
            >
              <span>Review Takeaways</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          )}

          {currentStep === 'takeaways' && (
            <button
              onClick={() => {
                sound.playTap();
                setCurrentStep('quiz');
              }}
              className="px-6 py-2.5 rounded-2xl bg-[#7928ca] hover:bg-[#6b21a8] text-white font-cartoon font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-[0_0_15px_rgba(121,40,202,0.4)] active:scale-95 transition-all cursor-pointer"
            >
              <span>Start 3-Question Quiz</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          )}

          {currentStep === 'quiz' && (
            <button
              disabled={Object.keys(quizAnswers).length < lesson.quizQuestions.length}
              onClick={handleEvaluateQuiz}
              className={`px-6 py-2.5 rounded-2xl bg-[#7928ca] text-white font-cartoon font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-[0_0_15px_rgba(121,40,202,0.4)] active:scale-95 transition-all cursor-pointer ${
                Object.keys(quizAnswers).length < lesson.quizQuestions.length
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-[#6b21a8]'
              }`}
            >
              <span>Submit & Check</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          )}

          {currentStep === 'result' && (
            <div className="flex items-center gap-2">
              {!hasPassed ? (
                <button
                  onClick={handleRetryQuiz}
                  className="px-5 py-2.5 rounded-2xl bg-[#7928ca] hover:bg-[#6b21a8] text-white font-cartoon font-extrabold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(121,40,202,0.4)]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Try Quiz Again</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-2xl bg-white border-2 border-slate-300 text-slate-800 font-cartoon font-bold text-xs sm:text-sm hover:border-[#7928ca] cursor-pointer"
                  >
                    Back to Route
                  </button>
                  {onNextLesson && (
                    <button
                      onClick={onNextLesson}
                      className="px-5 py-2.5 rounded-2xl bg-[#39ff14] hover:bg-[#2ecc71] text-slate-900 font-cartoon font-extrabold text-xs sm:text-sm flex items-center gap-1.5 shadow-[0_0_15px_rgba(57,255,20,0.5)] cursor-pointer"
                    >
                      <span>Next Lesson</span>
                      <ChevronRight className="w-4 h-4 stroke-[3]" />
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </footer>
      </div>
    </div>
  );
};
