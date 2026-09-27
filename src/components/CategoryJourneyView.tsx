import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  CheckCircle2,
  Lock,
  Play,
  RotateCcw,
  Sparkles,
  Award,
  ChevronDown,
  Clock,
  Compass,
} from 'lucide-react';
import {
  CategoryRegion,
  FullCurriculumLesson,
  UserProfile,
  LessonState,
} from '../types';
import { AvatarRenderer } from './AvatarRenderer';
import { CocoRenderer } from './CocoRenderer';
import { sound } from '../utils/audio';

interface CategoryJourneyViewProps {
  category: CategoryRegion;
  userProfile: UserProfile;
  onBackToWorldMap: () => void;
  onOpenLesson: (lesson: FullCurriculumLesson) => void;
}

export const CategoryJourneyView: React.FC<CategoryJourneyViewProps> = ({
  category,
  userProfile,
  onBackToWorldMap,
  onOpenLesson,
}) => {
  const [selectedPreviewLesson, setSelectedPreviewLesson] = useState<FullCurriculumLesson | null>(null);

  // Helper to determine lesson state
  const getLessonState = (lesson: FullCurriculumLesson, idx: number): LessonState => {
    const isCompleted = userProfile.completedLessons.includes(lesson.id);
    if (isCompleted) return 'completed';

    // Check if prerequisites are met
    const prereqsMet =
      lesson.prerequisiteIds.length === 0 ||
      lesson.prerequisiteIds.every((pid) => userProfile.completedLessons.includes(pid));

    if (prereqsMet) {
      // If it's the first incomplete lesson with prereqs met, it's 'current'
      return 'current';
    }

    return 'locked';
  };

  const completedCount = category.lessons.filter((l) =>
    userProfile.completedLessons.includes(l.id)
  ).length;

  const currentActiveLesson =
    category.lessons.find((l) => !userProfile.completedLessons.includes(l.id)) ||
    category.lessons[category.lessons.length - 1];

  const currentActiveIndex = category.lessons.findIndex((l) => l.id === currentActiveLesson.id);

  const isCategoryComplete = completedCount === category.lessons.length;

  return (
    <div className="relative w-full min-h-screen bg-slate-900 text-slate-900 flex flex-col font-sans select-none overflow-x-hidden">
      {/* Background Ambience with soft illustrated colors */}
      <div className="fixed inset-0 pointer-events-none opacity-25">
        <div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: category.accentColor }}
        />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#7928ca]/30 rounded-full blur-3xl" />
      </div>

      {/* Top Floating Sticky Header */}
      <header className="sticky top-0 z-30 px-4 py-3 bg-white/95 backdrop-blur-md border-b-2 border-slate-200 shadow-md flex items-center justify-between gap-3">
        {/* Back to World Map Button */}
        <button
          onClick={() => {
            sound.playTap();
            onBackToWorldMap();
          }}
          className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-cartoon font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          <span>World Map</span>
        </button>

        {/* Title and Destination Subtitle */}
        <div className="text-center truncate px-2">
          <h1 className="text-base sm:text-lg font-cartoon font-extrabold text-slate-900 truncate">
            {category.primaryCategory}
          </h1>
          <p className="text-[11px] font-cartoon font-bold text-[#7928ca] truncate">
            {category.destinationName} · {completedCount}/{category.lessons.length} Completed
          </p>
        </div>

        {/* User Stats Pill */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-cartoon font-bold text-slate-700">
              {userProfile.xp} XP
            </span>
          </div>
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#7928ca] bg-slate-100 flex items-center justify-center">
            <AvatarRenderer avatar={userProfile.avatar} size={28} showCompanion={false} />
          </div>
        </div>
      </header>

      {/* Vertical Scrollable Route */}
      <main className="flex-1 w-full max-w-lg mx-auto py-8 px-4 flex flex-col items-center relative z-10">
        {/* Category Header Card */}
        <div className="w-full bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-lg text-center mb-8 space-y-2">
          <span className="text-xs font-cartoon font-bold px-3 py-1 rounded-full bg-violet-100 text-[#7928ca] inline-block">
            {category.landmarkCues}
          </span>
          <h2 className="text-2xl font-cartoon font-extrabold text-slate-900">
            Journey to {category.destinationName}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            {category.themeDescription}
          </p>
          <div className="text-[11px] font-bold text-slate-500 pt-1">
            ↓ First lesson starts at the TOP · Progress continues DOWNWARD
          </div>
        </div>

        {/* Winding Route Path connecting nodes */}
        <div className="relative w-full flex flex-col items-center space-y-12">
          {category.lessons.map((lesson, idx) => {
            const state = getLessonState(lesson, idx);
            const isCurrent = state === 'current';
            const isCompleted = state === 'completed';
            const isLocked = state === 'locked';

            // Alternating staggered offsets to create a fun winding path
            const offsetClasses = [
              'sm:-translate-x-12',
              'sm:translate-x-12',
              'sm:-translate-x-8',
              'sm:translate-x-14',
              'sm:translate-x-0',
            ];
            const currentOffset = offsetClasses[idx % offsetClasses.length];

            return (
              <div
                key={lesson.id}
                className={`relative flex flex-col items-center transition-all ${currentOffset}`}
              >
                {/* Connecting Dotted Line to Next Stop */}
                {idx < category.lessons.length - 1 && (
                  <div className="absolute top-16 left-1/2 -translate-x-1/2 w-1 h-16 border-l-3 border-dashed border-slate-300 pointer-events-none" />
                )}

                {/* Avatar Standing at Current Lesson */}
                {isCurrent && (
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20">
                    <div className="px-2.5 py-0.5 rounded-full bg-white border border-[#7928ca] text-[10px] font-cartoon font-extrabold text-[#7928ca] shadow-sm mb-1 whitespace-nowrap">
                      Current Stop!
                    </div>
                    <AvatarRenderer avatar={userProfile.avatar} size={50} isWalking={false} />
                  </div>
                )}

                {/* Coco the Capybara beside current active step */}
                {isCurrent && (
                  <div className="absolute top-0 -right-24 sm:-right-28 hidden xs:flex flex-col items-center z-20">
                    <CocoRenderer
                      size={54}
                      pose="waving"
                      speechBubble="Let's do this together!"
                    />
                  </div>
                )}

                {/* Lesson Stop Card Node */}
                <button
                  onClick={() => {
                    sound.playTap();
                    setSelectedPreviewLesson(lesson);
                  }}
                  className={`group relative w-64 sm:w-72 p-4 rounded-3xl border-3 transition-all cursor-pointer text-left flex items-center gap-3.5 shadow-md active:scale-95 ${
                    isCurrent
                      ? 'bg-white border-[#7928ca] shadow-[0_0_20px_rgba(121,40,202,0.35)] scale-105'
                      : isCompleted
                      ? 'bg-white border-emerald-400 hover:border-emerald-500'
                      : 'bg-slate-100 border-slate-300 opacity-80 hover:opacity-100'
                  }`}
                >
                  {/* Number Badge Icon */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-cartoon font-extrabold text-base shrink-0 shadow-sm ${
                      isCurrent
                        ? 'bg-[#7928ca] text-white shadow-[0_0_12px_rgba(121,40,202,0.4)]'
                        : isCompleted
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-300 text-slate-600'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 stroke-[3]" />
                    ) : isLocked ? (
                      <Lock className="w-5 h-5 text-slate-500" />
                    ) : (
                      <span>{lesson.order}</span>
                    )}
                  </div>

                  {/* Lesson Info */}
                  <div className="truncate">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-cartoon font-bold uppercase tracking-wider text-slate-500">
                        Stop {lesson.order} · ~{lesson.estimatedMinutes}m
                      </span>
                    </div>
                    <div className="text-sm font-cartoon font-extrabold text-slate-900 group-hover:text-[#7928ca] transition-colors truncate">
                      {lesson.title}
                    </div>
                    <div className="text-[11px] font-semibold text-slate-500 truncate">
                      {isCompleted ? '✓ Completed (Review)' : isLocked ? 'Locked (Complete prev)' : 'Ready to start!'}
                    </div>
                  </div>
                </button>
              </div>
            );
          })}

          {/* Category Milestone / Passport Stamp Box at Route End */}
          <div className="w-full max-w-sm pt-4 flex flex-col items-center text-center">
            <div
              className={`p-6 rounded-3xl border-3 w-full space-y-3 transition-all ${
                isCategoryComplete
                  ? 'bg-white border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.3)]'
                  : 'bg-white/80 border-slate-300'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center text-2xl border-2 ${
                  isCategoryComplete
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-600'
                    : 'bg-slate-100 border-slate-300 text-slate-400'
                }`}
              >
                <Award className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-lg font-cartoon font-extrabold text-slate-900">
                  {category.destinationName} Passport Stamp
                </h3>
                <p className="text-xs text-slate-600">
                  {isCategoryComplete
                    ? '🎉 Mastered! All 5 lessons completed.'
                    : `Complete all 5 lessons to earn this official badge (${completedCount}/5).`}
                </p>
              </div>

              {isCategoryComplete && (
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-cartoon font-bold">
                  ★ Certified Explorer
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* COMPACT PREVIEW SHEET MODAL (When tapping a lesson) */}
      <AnimatePresence>
        {selectedPreviewLesson && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 select-none">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="w-full max-w-md bg-white rounded-3xl border-3 border-[#7928ca] p-6 shadow-2xl space-y-4 text-slate-900"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-cartoon font-bold px-2.5 py-0.5 rounded-full bg-violet-100 text-[#7928ca]">
                    Stop {selectedPreviewLesson.order} of {category.lessons.length}
                  </span>
                  <h3 className="text-xl font-cartoon font-extrabold text-slate-900 mt-1">
                    {selectedPreviewLesson.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedPreviewLesson(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedPreviewLesson.description}
              </p>

              {/* What You'll Learn */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[11px] font-cartoon font-bold uppercase tracking-wider text-slate-500 block">
                  What You'll Learn:
                </span>
                <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                  {selectedPreviewLesson.learningObjectives.map((obj, i) => (
                    <li key={i}>{obj}</li>
                  ))}
                </ul>
              </div>

              {/* Meta Stats */}
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>~{selectedPreviewLesson.estimatedMinutes} minutes</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#7928ca] font-cartoon font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>+{selectedPreviewLesson.reward.xp} XP reward</span>
                </div>
              </div>

              {/* Action Button */}
              {(() => {
                const state = getLessonState(selectedPreviewLesson, selectedPreviewLesson.order - 1);
                if (state === 'locked') {
                  return (
                    <div className="p-3 rounded-2xl bg-slate-100 border border-slate-300 text-center text-xs font-bold text-slate-600">
                      🔒 Complete earlier lessons along the route to unlock this stop.
                    </div>
                  );
                }

                const isCompleted = state === 'completed';

                return (
                  <button
                    onClick={() => {
                      const lessonToOpen = selectedPreviewLesson;
                      setSelectedPreviewLesson(null);
                      onOpenLesson(lessonToOpen);
                    }}
                    className="w-full py-3.5 rounded-2xl bg-[#7928ca] hover:bg-[#6b21a8] text-white font-cartoon font-extrabold text-base flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(121,40,202,0.4)] active:scale-95 transition-all cursor-pointer"
                  >
                    {isCompleted ? (
                      <>
                        <RotateCcw className="w-4 h-4 stroke-[3]" />
                        <span>Review Lesson</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 stroke-[3] fill-white" />
                        <span>Start Lesson</span>
                      </>
                    )}
                  </button>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
