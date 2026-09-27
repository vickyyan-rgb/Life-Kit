/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  MessageSquare,
  Volume2,
  VolumeX,
  Sparkles,
  Sword,
  Target,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import {
  UserProfile,
  AppStage,
  Zone,
  Lesson,
  AvatarConfig,
  CategoryRegion,
  FullCurriculumLesson,
} from './types';
import { WORLD_ZONES } from './data/worldData';
import { WORLD_CATEGORIES } from './data/curriculumData';
import { sound } from './utils/audio';

import { NeonSwordIntro } from './components/NeonSwordIntro';
import { NameStep } from './components/NameStep';
import { DetailsStep } from './components/DetailsStep';
import { AvatarCustomizerModal } from './components/AvatarCustomizerModal';
import { KnowledgeQuestionnaire } from './components/KnowledgeQuestionnaire';
import { WorldMapCanvas } from './components/WorldMapCanvas';
import { CategoryJourneyView } from './components/CategoryJourneyView';
import { FocusedLearningModal } from './components/FocusedLearningModal';
import { ZoneDetailModal } from './components/ZoneDetailModal';
import { InteractiveLessonModal } from './components/InteractiveLessonModal';
import { MentorChatDrawer } from './components/MentorChatDrawer';
import { ProfileSettingsModal } from './components/ProfileSettingsModal';
import { DailyLessonCard } from './components/DailyLessonCard';
import { TopicSearchBar } from './components/TopicSearchBar';
import { AvatarRenderer } from './components/AvatarRenderer';

const STORAGE_KEY = 'lifekit_profile_v6';

const DEFAULT_PROFILE: UserProfile = {
  name: '',
  age: 17,
  gender: 'Woman',
  country: 'United States',
  city: 'Washington',
  avatar: {
    skinColor: '#ffe600',
    hairStyle: 'messy',
    hairColor: '#00f0ff',
    outfit: 'streetwear',
    outfitColor: '#ff007f',
    expression: 'confident',
    accessory: 'headphones',
    companion: 'coco',
  },
  level: 1,
  xp: 0,
  coins: 50,
  unlockedZones: ['mobility_port'],
  knownTopics: [],
  priority: 'moving_out',
  completedLessons: [],
  activeDailyQuestId: 'money_1',
  dailyStreak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  soundEnabled: true,
  categoryStamps: [],
};

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return DEFAULT_PROFILE;
  });

  // Start with the RGB Sword Intro page!
  const [stage, setStage] = useState<AppStage>('SWORD_START');

  // Explore & Category Journey state
  const [activeCategory, setActiveCategory] = useState<CategoryRegion | null>(null);
  const [activeCurriculumLesson, setActiveCurriculumLesson] = useState<FullCurriculumLesson | null>(null);

  // Legacy zone detail & chat drawer state
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [activeLessonData, setActiveLessonData] = useState<{ lesson: Lesson; zone: Zone } | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [waypointZoneId, setWaypointZoneId] = useState<string | null>(null);
  const [isDailyQuestOpen, setIsDailyQuestOpen] = useState(false);

  useEffect(() => {
    sound.enabled = profile.soundEnabled;
  }, [profile.soundEnabled]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // Storage error fallback
    }
  }, [profile]);

  // Stage 1: Sword Start -> Next page is Name Step
  const handleSwordStart = () => {
    setStage('NAME_STEP');
  };

  // Stage 2: Name Step -> Next page is Details Step
  const handleNameNext = (name: string) => {
    setProfile((prev) => ({ ...prev, name }));
    setStage('DETAILS_STEP');
  };

  // Stage 3: Details Step -> Next page is Avatar Customization
  const handleDetailsNext = (details: { age: number; gender: string; country: string; state: string }) => {
    setProfile((prev) => ({
      ...prev,
      age: details.age,
      gender: details.gender,
      country: details.country,
      city: details.state,
    }));
    setStage('AVATAR_CUSTOMIZE');
  };

  // Stage 4: Avatar Saved -> Next page is Knowledge Questionnaire
  const handleSaveAvatar = (newAvatar: AvatarConfig) => {
    setProfile((prev) => ({
      ...prev,
      avatar: newAvatar,
    }));
    setStage('KNOWLEDGE_QUESTIONNAIRE');
  };

  // Stage 5: Questionnaire Finished -> Directly to the Full Screen Map!
  const handleCompleteQuestionnaire = (results: {
    knownZoneIds: string[];
    earnedStartingXp: number;
  }) => {
    const updatedUnlocked = Array.from(new Set(['mobility_port', ...results.knownZoneIds]));
    const calculatedLevel = Math.max(1, Math.floor(results.earnedStartingXp / 150) + 1);

    setProfile((prev) => ({
      ...prev,
      unlockedZones: updatedUnlocked,
      knownTopics: results.knownZoneIds,
      xp: prev.xp + results.earnedStartingXp,
      level: calculatedLevel,
    }));
    setStage('MAP_SANDBOX');
  };

  // Passing a curriculum lesson
  const handlePassCurriculumLesson = (lessonId: string, earnedXp: number, earnedCoins: number) => {
    setProfile((prev) => {
      const alreadyCompleted = prev.completedLessons.includes(lessonId);
      const newCompleted = alreadyCompleted ? prev.completedLessons : [...prev.completedLessons, lessonId];
      const newXp = prev.xp + earnedXp;
      const newCoins = prev.coins + earnedCoins;
      const newLevel = Math.floor(newXp / 200) + 1;

      // Check if current category completed all 5 lessons
      let newStamps = prev.categoryStamps || [];
      if (activeCategory) {
        const catAllCompleted = activeCategory.lessons.every((l) => newCompleted.includes(l.id));
        if (catAllCompleted && !newStamps.includes(activeCategory.id)) {
          newStamps = [...newStamps, activeCategory.id];
        }
      }

      return {
        ...prev,
        completedLessons: newCompleted,
        xp: newXp,
        coins: newCoins,
        level: newLevel,
        categoryStamps: newStamps,
      };
    });
  };

  const handleNextCurriculumLesson = () => {
    if (!activeCategory || !activeCurriculumLesson) return;
    const currentIdx = activeCategory.lessons.findIndex((l) => l.id === activeCurriculumLesson.id);
    if (currentIdx >= 0 && currentIdx < activeCategory.lessons.length - 1) {
      setActiveCurriculumLesson(activeCategory.lessons[currentIdx + 1]);
    } else {
      setActiveCurriculumLesson(null);
    }
  };

  const handleCompleteLesson = (lessonId: string, xp: number, coins: number) => {
    setProfile((prev) => {
      const alreadyCompleted = prev.completedLessons.includes(lessonId);
      const newCompleted = alreadyCompleted ? prev.completedLessons : [...prev.completedLessons, lessonId];
      const newXp = prev.xp + xp;
      const newCoins = prev.coins + coins;
      const newLevel = Math.floor(newXp / 200) + 1;

      return {
        ...prev,
        completedLessons: newCompleted,
        xp: newXp,
        coins: newCoins,
        level: newLevel,
      };
    });
  };

  const handleResetProgress = () => {
    setProfile(DEFAULT_PROFILE);
    localStorage.removeItem(STORAGE_KEY);
    setActiveCategory(null);
    setActiveCurriculumLesson(null);
    setStage('SWORD_START');
  };

  const handleNavigateToZone = (zoneId: string) => {
    setWaypointZoneId(zoneId);
  };

  return (
    <div className="w-full h-full min-h-screen bg-black text-white font-sans select-none antialiased">
      {/* PAGE 1: STARTING PAGE (White background, ONLY "LIFEKIT" in neon colors, RGB sword button, "start here") */}
      {stage === 'SWORD_START' && (
        <NeonSwordIntro onStart={handleSwordStart} />
      )}

      {/* PAGE 2: WHAT IS YOUR NAME? */}
      {stage === 'NAME_STEP' && (
        <NameStep
          initialName={profile.name}
          onNext={handleNameNext}
        />
      )}

      {/* PAGE 3: WHAT IS YOUR AGE / GENDER / LOCATION */}
      {stage === 'DETAILS_STEP' && (
        <DetailsStep
          initialAge={profile.age}
          initialGender={profile.gender}
          initialCountry={profile.country}
          initialState={profile.city}
          onNext={handleDetailsNext}
        />
      )}

      {/* PAGE 4: FULL SCREEN AVATAR CUSTOMIZATION */}
      {stage === 'AVATAR_CUSTOMIZE' && (
        <AvatarCustomizerModal
          initialAvatar={profile.avatar}
          userName={profile.name || 'Hero'}
          onSave={handleSaveAvatar}
        />
      )}

      {/* PAGE 5: QUESTIONNAIRE */}
      {stage === 'KNOWLEDGE_QUESTIONNAIRE' && (
        <KnowledgeQuestionnaire
          userName={profile.name || 'Hero'}
          avatar={profile.avatar}
          onComplete={handleCompleteQuestionnaire}
        />
      )}

      {/* PAGE 6: EXPLORE WORLD MAP & CATEGORY JOURNEYS */}
      {stage === 'MAP_SANDBOX' && (
        <div className="fixed inset-0 w-screen h-screen bg-black overflow-hidden select-none">
          {/* View Mode 1: Inside a Category Journey Route */}
          {activeCategory ? (
            <CategoryJourneyView
              category={activeCategory}
              userProfile={profile}
              onBackToWorldMap={() => setActiveCategory(null)}
              onOpenLesson={(lesson) => setActiveCurriculumLesson(lesson)}
            />
          ) : (
            /* View Mode 2: Overworld Interactive Map */
            <div className="absolute inset-0 w-full h-full z-0">
              <WorldMapCanvas
                userProfile={profile}
                onSelectCategory={(category) => {
                  setActiveCategory(category);
                }}
              />

              {/* Floating Global Utility Header */}
              <header className="fixed top-3 right-3 sm:right-6 z-30 flex items-center gap-1.5 sm:gap-2">
                {/* Replay Sword Start Button */}
                <button
                  onClick={() => {
                    sound.playTap();
                    setStage('SWORD_START');
                  }}
                  title="Replay Sword Intro"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white border-2 border-slate-200 hover:border-[#ff007f] flex items-center justify-center transition-all cursor-pointer shadow-md text-slate-800"
                >
                  <Sword className="w-4 h-4 text-[#ff007f]" />
                </button>

                {/* Sound Toggle */}
                <button
                  onClick={() => {
                    sound.playTap();
                    setProfile((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
                  }}
                  title={profile.soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white border-2 border-slate-200 hover:border-[#ffe600] flex items-center justify-center transition-all cursor-pointer shadow-md text-slate-800"
                >
                  {profile.soundEnabled ? (
                    <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#f59e0b]" />
                  ) : (
                    <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                  )}
                </button>

                {/* Sage Mentor Chat Button */}
                <button
                  onClick={() => {
                    sound.playTap();
                    setIsChatOpen(true);
                  }}
                  className="h-9 sm:h-10 px-2.5 sm:px-3 rounded-2xl bg-white border-2 border-slate-200 hover:border-[#00f0ff] text-xs font-cartoon font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer text-slate-800"
                >
                  <MessageSquare className="w-4 h-4 text-[#00f0ff]" />
                  <span className="hidden md:inline font-extrabold">Ask Mentor</span>
                </button>

                {/* Profile Avatar Button */}
                <button
                  onClick={() => {
                    sound.playTap();
                    setIsProfileOpen(true);
                  }}
                  className="flex items-center gap-2 p-1 pl-2 sm:pl-2.5 rounded-2xl bg-white border-2 border-slate-200 hover:border-[#7928ca] transition-all cursor-pointer shadow-md text-slate-800"
                >
                  <div className="text-right hidden sm:block">
                    <div className="text-xs font-cartoon font-extrabold truncate max-w-[80px] text-slate-900">
                      {profile.name || 'Hero'}
                    </div>
                    <div className="text-[10px] font-cartoon font-bold text-[#7928ca]">
                      {profile.xp} XP
                    </div>
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-100 overflow-hidden border border-slate-300 flex items-center justify-center">
                    <AvatarRenderer avatar={profile.avatar} size={28} isWalking={false} showCompanion={false} />
                  </div>
                </button>
              </header>
            </div>
          )}
        </div>
      )}

      {/* FOCUSED LEARNING MODAL (Concepts, inspectable doc, practice activity, 3-question quiz, feedback) */}
      {activeCurriculumLesson && activeCategory && (
        <FocusedLearningModal
          lesson={activeCurriculumLesson}
          categoryName={activeCategory.primaryCategory}
          userProfile={profile}
          onClose={() => setActiveCurriculumLesson(null)}
          onPassLesson={handlePassCurriculumLesson}
          onNextLesson={handleNextCurriculumLesson}
        />
      )}

      {/* SAGE MENTOR CHATBOX DRAWER */}
      <MentorChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        userProfile={profile}
        currentZoneName={activeCategory?.primaryCategory || selectedZone?.name}
        onNavigateToZone={handleNavigateToZone}
      />

      {/* PROFILE REVIEW & SETTINGS */}
      <ProfileSettingsModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userProfile={profile}
        onUpdatePriority={(newPriority) => {
          setProfile((prev) => ({ ...prev, priority: newPriority }));
        }}
        onToggleSound={() => {
          setProfile((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
        }}
        onEditAvatar={() => {
          setIsProfileOpen(false);
          setStage('AVATAR_CUSTOMIZE');
        }}
        onEditIdentity={() => {
          setIsProfileOpen(false);
          setStage('DETAILS_STEP');
        }}
        onResetProgress={handleResetProgress}
      />
    </div>
  );
}
