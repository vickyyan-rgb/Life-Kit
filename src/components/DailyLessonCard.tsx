import React from 'react';
import {
  Flame,
  ArrowRight,
  Clock,
  Compass,
} from 'lucide-react';
import { UserProfile, Lesson, Zone } from '../types';
import { WORLD_ZONES, PRIORITY_OPTIONS } from '../data/worldData';
import { sound } from '../utils/audio';

interface DailyLessonCardProps {
  userProfile: UserProfile;
  onStartLesson: (lesson: Lesson, zone: Zone) => void;
  onOpenPriorityShift: () => void;
  onWalkToPriorityZone: (zoneId: string) => void;
}

export const DailyLessonCard: React.FC<DailyLessonCardProps> = ({
  userProfile,
  onStartLesson,
  onOpenPriorityShift,
  onWalkToPriorityZone,
}) => {
  const activePriorityObj = PRIORITY_OPTIONS.find((p) => p.id === userProfile.priority) || PRIORITY_OPTIONS[0];
  const targetZone = WORLD_ZONES.find((z) => z.id === activePriorityObj.focusZoneId) || WORLD_ZONES[0];

  const dailyLesson =
    targetZone.lessons.find((l) => !userProfile.completedLessons.includes(l.id)) ||
    targetZone.lessons[0];

  const isCompletedToday = userProfile.completedLessons.includes(dailyLesson.id);

  return (
    <div className="w-full bg-black border-2 border-[#39ff14] rounded-3xl p-4 sm:p-5 shadow-[0_0_15px_rgba(57,255,20,0.3)] space-y-3 font-sans">
      {/* Top row: Priority tracker & Streak */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl filter drop-shadow-[0_0_8px_#ffffff]">
            {activePriorityObj.icon}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-cartoon font-extrabold neon-text-lime">
                {activePriorityObj.title}
              </span>
              <button
                onClick={() => {
                  sound.playTap();
                  onOpenPriorityShift();
                }}
                className="text-[10px] px-2.5 py-0.5 rounded-full bg-black border border-[#ffe600] text-black font-cartoon font-bold hover:bg-[#ffe600]/20 transition-colors cursor-pointer shadow-[0_0_8px_#ffe600]"
              >
                <span className="neon-text-yellow">Shift Focus</span>
              </button>
            </div>
            <div className="text-[11px] font-bold text-slate-300">
              Target Zone: <span className="neon-text-cyan font-extrabold">{targetZone.name}</span>
            </div>
          </div>
        </div>

        {/* Streak badge: pure black with neon border, white icon */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-black border-2 border-[#ff007f] text-xs font-cartoon font-bold shadow-[0_0_10px_#ff007f]">
          <Flame className="w-4 h-4 fill-white text-white" />
          <span className="neon-text-pink">{userProfile.dailyStreak} Day Streak!</span>
        </div>
      </div>

      {/* Quest Card */}
      <div className="p-3.5 rounded-2xl bg-black border border-[#00f0ff] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[0_0_10px_rgba(0,240,255,0.25)]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-cartoon uppercase font-extrabold neon-text-yellow tracking-wider">
              ★ Today's Recommended Micro-Quest
            </span>
            {isCompletedToday && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-black border border-[#39ff14] text-black font-cartoon font-bold flex items-center gap-1 shadow-[0_0_8px_#39ff14]">
                <span className="neon-text-lime">Finished!</span>
              </span>
            )}
          </div>

          <h4 className="text-sm font-cartoon font-extrabold text-white">
            {dailyLesson.title}
          </h4>

          <div className="flex items-center gap-3 text-xs font-bold text-slate-300">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-white fill-white" />
              <span className="neon-text-cyan font-bold">{dailyLesson.estimatedMinutes} min simulation</span>
            </span>
            <span className="neon-text-lime font-cartoon font-bold">
              +{dailyLesson.xpReward} XP
            </span>
            <span className="neon-text-yellow font-cartoon font-bold">
              +{dailyLesson.coinsReward} Coins
            </span>
          </div>
        </div>

        {/* Action Buttons: Pure black with neon outlines & white icons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              sound.playTap();
              onWalkToPriorityZone(targetZone.id);
            }}
            title="Set destination and walk avatar here"
            className="h-11 px-3.5 rounded-2xl bg-black hover:bg-[#00f0ff]/20 border-2 border-[#00f0ff] font-cartoon font-bold text-xs flex items-center gap-1.5 shadow-[0_0_10px_#00f0ff] active:scale-95 transition-all cursor-pointer"
          >
            <Compass className="w-4 h-4 text-white fill-white stroke-[2]" />
            <span className="hidden sm:inline neon-text-cyan font-extrabold">Walk to Zone</span>
          </button>

          <button
            onClick={() => {
              sound.playTap();
              onStartLesson(dailyLesson, targetZone);
            }}
            className="h-11 px-4 rounded-2xl bg-black hover:bg-[#ff007f]/20 border-2 border-[#ff007f] font-cartoon font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-[0_0_12px_#ff007f] active:scale-95 transition-all cursor-pointer"
          >
            <span className="neon-text-pink font-extrabold">
              {isCompletedToday ? 'Replay Quest' : 'Begin Daily Quest'}
            </span>
            <ArrowRight className="w-4 h-4 text-white stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
};
