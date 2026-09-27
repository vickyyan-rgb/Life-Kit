import React from 'react';
import { motion } from 'motion/react';
import {
  X,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Clock,
  Coins,
  Play,
} from 'lucide-react';
import { Zone, Lesson, UserProfile } from '../types';
import { sound } from '../utils/audio';

interface ZoneDetailModalProps {
  zone: Zone | null;
  onClose: () => void;
  userProfile: UserProfile;
  onSelectLesson: (lesson: Lesson, zone: Zone) => void;
}

export const ZoneDetailModal: React.FC<ZoneDetailModalProps> = ({
  zone,
  onClose,
  userProfile,
  onSelectLesson,
}) => {
  if (!zone) return null;

  const isUnlocked = userProfile.unlockedZones.includes(zone.id);
  const completedInZone = zone.lessons.filter((l) =>
    userProfile.completedLessons.includes(l.id)
  ).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xs overflow-y-auto font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-lg bg-black border-2 border-[#00f0ff] rounded-3xl shadow-[0_0_25px_rgba(0,240,255,0.4)] overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* District Banner Header */}
        <div className="relative p-5 border-b border-[#00f0ff]/50 bg-black">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-black border-2 border-[#ffe600] flex items-center justify-center text-3xl shadow-[0_0_12px_#ffe600]">
                {zone.npcMentor.emoji}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-cartoon font-extrabold neon-text-cyan leading-tight">
                    {zone.name}
                  </h3>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-black border border-[#ff007f] text-black font-cartoon font-bold shadow-[0_0_8px_#ff007f]">
                    <span className="neon-text-pink">{zone.recommendedAge}</span>
                  </span>
                </div>
                <div className="text-xs font-cartoon font-extrabold neon-text-yellow mt-0.5">
                  ★ {zone.title}
                </div>
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

          <p className="text-xs text-slate-200 mt-3 leading-relaxed">
            {zone.description}
          </p>

          {/* NPC Mentor Quote Bubble */}
          <div className="mt-3 p-3 rounded-2xl bg-black border border-white/20 flex items-start gap-2.5 shadow-inner">
            <div className="text-xs">
              <div className="font-cartoon font-bold text-white flex items-center gap-1.5">
                <span className="neon-text-lime font-extrabold">{zone.npcMentor.name}</span>
                <span className="text-[10px] text-slate-400 font-normal">({zone.npcMentor.role})</span>
              </div>
              <div className="text-[11px] text-slate-200 italic mt-0.5">
                "{zone.npcMentor.quote}"
              </div>
            </div>
          </div>
        </div>

        {/* Territory Lessons List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-black">
          <div className="flex items-center justify-between text-xs font-cartoon">
            <span className="font-extrabold neon-text-yellow uppercase tracking-wider text-xs">
              ★ Available Quests & Simulations:
            </span>
            <span className="font-bold px-2 py-0.5 rounded-full bg-black border border-[#39ff14] shadow-[0_0_8px_#39ff14]">
              <span className="neon-text-lime">{completedInZone}/{zone.lessons.length} Completed</span>
            </span>
          </div>

          <div className="space-y-2.5">
            {zone.lessons.map((lesson) => {
              const isCompleted = userProfile.completedLessons.includes(lesson.id);

              return (
                <div
                  key={lesson.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col gap-3 ${
                    isCompleted
                      ? 'bg-black border-[#39ff14] shadow-[0_0_12px_rgba(57,255,20,0.3)]'
                      : 'bg-black border-white/20 hover:border-[#00f0ff]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-white fill-white stroke-[2.5] shrink-0" />
                        ) : (
                          <BookOpen className="w-5 h-5 text-white fill-white stroke-[2.5] shrink-0" />
                        )}
                        <h4 className="text-sm font-cartoon font-extrabold text-white">
                          {lesson.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed pl-7">
                        {lesson.summary}
                      </p>
                    </div>
                  </div>

                  {/* Quest Rewards & Trigger */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                    <div className="flex items-center gap-3 text-slate-300 font-bold">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-white fill-white" />
                        <span className="neon-text-cyan">{lesson.estimatedMinutes}m</span>
                      </span>
                      <span className="flex items-center gap-1 font-cartoon">
                        <Sparkles className="w-3.5 h-3.5 text-white fill-white" />
                        <span className="neon-text-lime">+{lesson.xpReward} XP</span>
                      </span>
                      <span className="flex items-center gap-1 font-cartoon">
                        <Coins className="w-3.5 h-3.5 text-white fill-white" />
                        <span className="neon-text-yellow">+{lesson.coinsReward} Coins</span>
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        sound.playTap();
                        onSelectLesson(lesson, zone);
                        onClose();
                      }}
                      className={`px-4 py-2 rounded-xl font-cartoon font-bold text-xs flex items-center gap-1.5 border transition-all cursor-pointer ${
                        isCompleted
                          ? 'bg-black border-white text-white hover:bg-white/10 shadow-[0_0_8px_#ffffff]'
                          : 'bg-black border-2 border-[#ffe600] hover:bg-[#ffe600]/20 shadow-[0_0_12px_#ffe600]'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5 text-white fill-white" />
                      <span className={isCompleted ? 'text-white' : 'neon-text-yellow font-extrabold'}>
                        {isCompleted ? 'Review Quest' : 'Start Simulation'}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 border-t border-white/15 bg-black text-center text-xs font-bold text-slate-400">
          Landmark: {zone.landmark} · Earn XP and light up the overworld map!
        </div>
      </motion.div>
    </div>
  );
};
