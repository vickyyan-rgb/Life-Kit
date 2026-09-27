import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  User,
  MapPin,
  Calendar,
  Sparkles,
  Palette,
  Volume2,
  VolumeX,
  RotateCcw,
  Target,
  Trophy,
  CheckCircle,
} from 'lucide-react';
import { UserProfile, LearningPriority } from '../types';
import { WORLD_ZONES, PRIORITY_OPTIONS } from '../data/worldData';
import { AvatarRenderer } from './AvatarRenderer';
import { sound } from '../utils/audio';

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onUpdatePriority: (priority: LearningPriority) => void;
  onToggleSound: () => void;
  onEditAvatar: () => void;
  onEditIdentity: () => void;
  onResetProgress: () => void;
}

export const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onUpdatePriority,
  onToggleSound,
  onEditAvatar,
  onEditIdentity,
  onResetProgress,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'priority' | 'settings'>('profile');
  const [confirmReset, setConfirmReset] = useState(false);

  if (!isOpen) return null;

  const totalLessonsCount = WORLD_ZONES.reduce((acc, z) => acc + z.lessons.length, 0);
  const completedCount = userProfile.completedLessons.length;
  const masteryPercentage = Math.round((completedCount / (totalLessonsCount || 1)) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xs overflow-y-auto font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-lg bg-black border-2 border-[#00f0ff] rounded-3xl shadow-[0_0_25px_rgba(0,240,255,0.4)] overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#00f0ff]/40 bg-black">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-white fill-white" />
            <span className="text-base font-cartoon font-extrabold neon-text-cyan">
              Profile & Explorer Settings
            </span>
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

        {/* Tab Switcher */}
        <div className="grid grid-cols-3 gap-1.5 p-2 bg-black border-b border-white/10">
          {[
            { id: 'profile', label: 'Persona & Stats' },
            { id: 'priority', label: 'Priority Focus' },
            { id: 'settings', label: 'Sound & Reset' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as typeof activeTab);
                sound.playTap();
              }}
              className={`py-2 text-xs font-cartoon font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-black border border-[#ffe600] text-black shadow-[0_0_10px_#ffe600]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className={activeTab === tab.id ? 'neon-text-yellow font-extrabold' : ''}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* Tab 1: Profile & Masteries */}
        {activeTab === 'profile' && (
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-black">
            {/* Avatar & Account Lockup */}
            <div className="flex items-center gap-4 bg-black border border-white/20 p-4 rounded-3xl shadow-[0_0_12px_rgba(255,255,255,0.15)]">
              <div className="relative w-20 h-20 rounded-2xl bg-black border border-[#00f0ff] flex items-center justify-center overflow-hidden shrink-0 shadow-[0_0_8px_#00f0ff]">
                <AvatarRenderer avatar={userProfile.avatar} size={70} isWalking={false} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-cartoon font-extrabold neon-text-cyan truncate">
                    {userProfile.name || 'Hero'}
                  </h3>
                  <span className="text-xs font-cartoon font-extrabold text-black px-2.5 py-0.5 rounded-full bg-black border border-[#ffe600] shadow-[0_0_8px_#ffe600]">
                    <span className="neon-text-yellow">Lv. {userProfile.level}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-300 mt-1 font-bold">
                  <Calendar className="w-3.5 h-3.5 text-white fill-white shrink-0" />
                  <span>{userProfile.age} yrs · {userProfile.gender}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-300 mt-0.5 font-bold">
                  <MapPin className="w-3.5 h-3.5 text-white fill-white shrink-0" />
                  <span className="truncate">{userProfile.city}, {userProfile.country}</span>
                </div>

                <div className="flex items-center gap-2 mt-2.5">
                  <button
                    onClick={() => {
                      sound.playTap();
                      onEditAvatar();
                    }}
                    className="px-3 py-1 rounded-xl bg-black hover:bg-[#ff007f]/20 border border-[#ff007f] text-xs font-cartoon font-bold flex items-center gap-1 shadow-[0_0_8px_#ff007f] active:scale-95 transition-all cursor-pointer"
                  >
                    <Palette className="w-3.5 h-3.5 text-white fill-white" />
                    <span className="neon-text-pink font-extrabold">Edit Wardrobe</span>
                  </button>

                  <button
                    onClick={() => {
                      sound.playTap();
                      onEditIdentity();
                    }}
                    className="px-3 py-1 rounded-xl bg-black hover:bg-white/10 border border-white/30 text-white text-xs font-cartoon font-bold shadow-[0_0_6px_rgba(255,255,255,0.2)] active:scale-95 transition-all cursor-pointer"
                  >
                    Edit Info
                  </button>
                </div>
              </div>
            </div>

            {/* Adulting Readiness Meter */}
            <div className="bg-black border border-[#39ff14] p-4 rounded-3xl shadow-[0_0_12px_rgba(57,255,20,0.25)] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-cartoon font-bold text-white flex items-center gap-1.5 text-xs">
                  <Trophy className="w-4 h-4 text-white fill-white" />
                  <span className="neon-text-lime font-extrabold">Real-World Adulting Readiness</span>
                </span>
                <span className="font-cartoon font-extrabold neon-text-yellow">
                  {masteryPercentage}% Complete
                </span>
              </div>

              <div className="w-full bg-black h-3.5 rounded-full overflow-hidden border border-white/20 shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-[#ffe600] via-[#ff007f] to-[#39ff14] rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(masteryPercentage, 10)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs font-cartoon font-bold pt-1">
                <span>XP: <strong className="neon-text-lime font-extrabold">{userProfile.xp}</strong></span>
                <span>Coins: <strong className="neon-text-yellow font-extrabold">{userProfile.coins}</strong></span>
                <span>Streak: <strong className="neon-text-pink font-extrabold">{userProfile.dailyStreak} Days</strong></span>
              </div>
            </div>

            {/* Territory Masteries Breakdown */}
            <div className="space-y-2">
              <span className="text-xs font-cartoon font-extrabold neon-text-yellow uppercase tracking-wider block">
                ★ Territories Unlocked & Knowledge:
              </span>
              <div className="space-y-1.5">
                {WORLD_ZONES.map((zone) => {
                  const completedInZone = zone.lessons.filter((l) =>
                    userProfile.completedLessons.includes(l.id)
                  ).length;
                  const isUnlocked = userProfile.unlockedZones.includes(zone.id);

                  return (
                    <div
                      key={zone.id}
                      className="flex items-center justify-between p-2.5 rounded-2xl bg-black border border-white/20 text-xs shadow-sm"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-lg">{zone.npcMentor.emoji}</span>
                        <div className="truncate">
                          <span className="font-cartoon font-extrabold neon-text-cyan truncate block">
                            {zone.name}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {isUnlocked ? 'Glowing' : 'Fog Shrouded'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-cartoon neon-text-lime font-extrabold text-xs">
                          {completedInZone}/{zone.lessons.length} Quests
                        </span>
                        {completedInZone === zone.lessons.length && (
                          <CheckCircle className="w-4 h-4 text-white fill-white" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Learning Priority Shifter */}
        {activeTab === 'priority' && (
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-black">
            <div>
              <h3 className="text-base font-cartoon font-extrabold text-white flex items-center gap-1.5">
                <Target className="w-5 h-5 text-white fill-white" />
                <span className="neon-text-yellow">Shift Your Current Life Priority</span>
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed font-sans">
                Choose what milestone matters most right now. This highlights that territory on your map and customizes your daily quests!
              </p>
            </div>

            <div className="space-y-2.5">
              {PRIORITY_OPTIONS.map((p) => {
                const isSelected = userProfile.priority === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      sound.playKnowledgeUnlock();
                      onUpdatePriority(p.id);
                    }}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'bg-black border-2 border-[#ffe600] shadow-[0_0_15px_#ffe600] scale-102'
                        : 'bg-black border-white/20 text-slate-200 hover:border-[#00f0ff]'
                    }`}
                  >
                    <span className="text-2xl mt-0.5">{p.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs sm:text-sm font-cartoon font-extrabold ${isSelected ? 'neon-text-yellow' : 'text-white'}`}>
                          {p.title}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] uppercase font-cartoon font-extrabold px-2 py-0.5 rounded-full bg-black border border-[#ff007f] shadow-[0_0_6px_#ff007f]">
                            <span className="neon-text-pink">Active</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 leading-tight">
                        {p.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Settings & Audio */}
        {activeTab === 'settings' && (
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-black">
            {/* Sound Toggle */}
            <div className="flex items-center justify-between p-4 rounded-3xl bg-black border border-white/20 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-black border border-[#ffe600] flex items-center justify-center shadow-[0_0_8px_#ffe600]">
                  {userProfile.soundEnabled ? (
                    <Volume2 className="w-5 h-5 text-white fill-white" />
                  ) : (
                    <VolumeX className="w-5 h-5 text-slate-500" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-cartoon font-extrabold neon-text-yellow">
                    Sound Effects & Fanfares
                  </div>
                  <div className="text-xs text-slate-400">
                    Footsteps, mirror chimes, and level-up audio
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playTap();
                  onToggleSound();
                }}
                className={`px-3.5 py-1.5 rounded-2xl text-xs font-cartoon font-extrabold border shadow-sm transition-colors cursor-pointer ${
                  userProfile.soundEnabled
                    ? 'bg-black border-[#39ff14] shadow-[0_0_8px_#39ff14]'
                    : 'bg-black border-slate-700 text-slate-500'
                }`}
              >
                <span className={userProfile.soundEnabled ? 'neon-text-lime' : ''}>
                  {userProfile.soundEnabled ? 'Enabled' : 'Muted'}
                </span>
              </button>
            </div>

            {/* Reset Progress Section */}
            <div className="p-4 rounded-3xl bg-black border border-[#ff007f] space-y-2.5 shadow-[0_0_12px_rgba(255,0,127,0.3)]">
              <div className="flex items-center gap-2 text-xs font-cartoon font-extrabold neon-text-pink">
                <RotateCcw className="w-4 h-4 text-white fill-white" />
                <span>Reset World Progress</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Clear all completed quests, XP, and territory fog clearances to experience the awakening portal and video anew.
              </p>

              {!confirmReset ? (
                <button
                  onClick={() => setConfirmReset(true)}
                  className="px-4 py-2 rounded-2xl bg-black hover:bg-[#ff007f]/20 border border-[#ff007f] text-xs font-cartoon font-extrabold shadow-[0_0_8px_#ff007f] active:scale-95 transition-all cursor-pointer"
                >
                  <span className="neon-text-pink">Reset All Progress</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => {
                      sound.playTap();
                      onResetProgress();
                      onClose();
                    }}
                    className="px-4 py-2 rounded-2xl bg-red-600 hover:bg-red-500 text-white text-xs font-cartoon font-bold shadow-[0_0_10px_red] transition-colors cursor-pointer"
                  >
                    Confirm & Wipe Progress
                  </button>
                  <button
                    onClick={() => setConfirmReset(false)}
                    className="px-3.5 py-2 rounded-2xl bg-black border border-white/20 text-slate-300 text-xs font-cartoon font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
