import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  List,
  ChevronRight,
  Briefcase,
  Coins,
  Car,
  HeartPulse,
  Home,
  GraduationCap,
  Users,
} from 'lucide-react';
import { CategoryRegion, UserProfile } from '../types';
import { WORLD_CATEGORIES } from '../data/curriculumData';
import { AvatarRenderer } from './AvatarRenderer';
import { sound } from '../utils/audio';

interface WorldMapCanvasProps {
  userProfile: UserProfile;
  onSelectCategory: (category: CategoryRegion) => void;
}

export const WorldMapCanvas: React.FC<WorldMapCanvasProps> = ({
  userProfile,
  onSelectCategory,
}) => {
  // Pan and Zoom State
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);

  // Selected or zooming region
  const [zoomingCategory, setZoomingCategory] = useState<CategoryRegion | null>(null);

  // Accessible Category List Drawer
  const [showCategoryList, setShowCategoryList] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse / Touch drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setHasMoved(false);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = Math.abs(e.clientX - (dragStart.x + pan.x));
    const deltaY = Math.abs(e.clientY - (dragStart.y + pan.y));
    if (deltaX > 4 || deltaY > 4) {
      setHasMoved(true);
    }
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Zoom controls
  const handleZoomIn = () => {
    sound.playTap();
    setZoom((prev) => Math.min(2.5, prev + 0.3));
  };

  const handleZoomOut = () => {
    sound.playTap();
    setZoom((prev) => Math.max(0.9, prev - 0.3));
  };

  const handleResetView = () => {
    sound.playTap();
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleCategoryClick = (category: CategoryRegion) => {
    if (hasMoved) return; // Ignore drag release
    sound.playTap();
    setZoomingCategory(category);

    // Smoothly pan & zoom towards landmark
    const targetX = (50 - category.mapCoordinates.x) * 5;
    const targetY = (50 - category.mapCoordinates.y) * 5;
    setPan({ x: targetX, y: targetY });
    setZoom(1.5);

    setTimeout(() => {
      onSelectCategory(category);
      setZoomingCategory(null);
    }, 450);
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase':
        return <Briefcase className="w-4 h-4 text-[#ffe600]" />;
      case 'Coins':
        return <Coins className="w-4 h-4 text-[#39ff14]" />;
      case 'Car':
        return <Car className="w-4 h-4 text-[#ff007f]" />;
      case 'HeartPulse':
        return <HeartPulse className="w-4 h-4 text-[#00f0ff]" />;
      case 'Home':
        return <Home className="w-4 h-4 text-[#ff7700]" />;
      case 'GraduationCap':
        return <GraduationCap className="w-4 h-4 text-[#7928ca]" />;
      default:
        return <Users className="w-4 h-4 text-[#00f0ff]" />;
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="relative w-full h-full min-h-screen bg-black overflow-hidden select-none cursor-grab active:cursor-grabbing font-sans"
    >
      {/* Zoomable & Pannable Map Layer */}
      <div
        className="w-full h-full transition-transform duration-300 ease-out origin-center relative"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
        }}
      >
        {/* Environmental World Map Image */}
        <img
          src="/src/assets/images/overworld_fantasy_map_1790537817868.jpg"
          alt="Explore World Map"
          className="w-full h-full object-cover filter contrast-105 pointer-events-none select-none"
          draggable={false}
        />

        {/* 7 CATEGORY REGION PINS & REAL UI LABELS LAYERED OVER SCENERY */}
        {WORLD_CATEGORIES.map((cat) => {
          const completedCount = cat.lessons.filter((l) =>
            userProfile.completedLessons.includes(l.id)
          ).length;

          const isZooming = zoomingCategory?.id === cat.id;

          return (
            <div
              key={cat.id}
              onClick={(e) => {
                e.stopPropagation();
                handleCategoryClick(cat);
              }}
              style={{
                left: `${cat.mapCoordinates.x}%`,
                top: `${cat.mapCoordinates.y}%`,
              }}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group"
            >
              {/* Landmark Selection Glow Ring */}
              <div
                className={`w-12 h-12 rounded-full border-2 border-white/80 absolute -top-1 left-1/2 -translate-x-1/2 pointer-events-none transition-all ${
                  isZooming
                    ? 'border-[#7928ca] scale-150 animate-ping'
                    : 'group-hover:scale-125 group-hover:border-[#7928ca] shadow-[0_0_15px_rgba(255,255,255,0.6)]'
                }`}
              />

              {/* Landmark Pin Indicator */}
              <div className="w-8 h-8 rounded-full bg-white border-2 border-[#7928ca] shadow-md flex items-center justify-center transform group-hover:scale-110 transition-transform">
                {getCategoryIcon(cat.iconName)}
              </div>

              {/* REAL APP UI LABEL SURFACE (Compact white card, dark text, small progress indicator) */}
              <div className="mt-1.5 px-3 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-slate-200 group-hover:border-[#7928ca] text-slate-900 shadow-md group-hover:shadow-[0_4px_16px_rgba(121,40,202,0.3)] transition-all flex flex-col items-center text-center whitespace-nowrap min-w-[130px]">
                {/* Primary Category Label */}
                <span className="text-xs font-cartoon font-extrabold text-slate-900 tracking-tight leading-tight block">
                  {cat.primaryCategory}
                </span>

                {/* Optional Destination Subtitle */}
                <span className="text-[10px] font-semibold text-slate-500 block leading-tight">
                  {cat.destinationName}
                </span>

                {/* Small Progress Indicator (e.g. "2/5 lessons") */}
                <div className="mt-1 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-cartoon font-bold text-slate-700">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor:
                        completedCount === cat.lessons.length ? '#10b981' : cat.accentColor,
                    }}
                  />
                  <span>
                    {completedCount}/{cat.lessons.length} lessons
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* User's Avatar in the Center World */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ left: '50%', top: '50%' }}
        >
          <div className="px-2 py-0.5 rounded-full bg-white/90 border border-[#7928ca] text-[10px] font-cartoon font-extrabold text-[#7928ca] shadow-sm mb-0.5 whitespace-nowrap text-center">
            {userProfile.name || 'Hero'}
          </div>
          <AvatarRenderer avatar={userProfile.avatar} size={48} isWalking={false} />
        </div>
      </div>

      {/* FLOATING TOP BRAND HUD */}
      <div className="fixed top-3 inset-x-3 sm:inset-x-6 z-30 max-w-5xl mx-auto flex items-center justify-between gap-2 pointer-events-none">
        <div className="px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-slate-200 shadow-md flex items-center gap-2 pointer-events-auto">
          <div className="w-8 h-8 rounded-xl bg-violet-100 border border-[#7928ca] flex items-center justify-center text-[#7928ca]">
            <Compass className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-sm font-cartoon font-extrabold text-slate-900 block leading-tight">
              LIFEKIT EXPLORE
            </span>
            <span className="text-[10px] font-cartoon font-bold text-[#7928ca] block">
              Tap a region to start journey
            </span>
          </div>
        </div>

        {/* Accessible Category List Button */}
        <button
          onClick={() => {
            sound.playTap();
            setShowCategoryList(true);
          }}
          className="px-3.5 py-2 rounded-2xl bg-white/95 hover:bg-white border-2 border-slate-200 hover:border-[#7928ca] text-slate-800 font-cartoon font-bold text-xs flex items-center gap-1.5 shadow-md pointer-events-auto transition-colors cursor-pointer"
        >
          <List className="w-4 h-4 text-[#7928ca]" />
          <span className="hidden sm:inline">Category List</span>
        </button>
      </div>

      {/* ACCESSIBLE ZOOM & RECENTER CONTROLS (Bottom-Right) */}
      <div className="fixed bottom-6 right-4 z-30 flex flex-col gap-2 pointer-events-auto">
        <button
          onClick={handleZoomIn}
          title="Zoom In"
          className="w-10 h-10 rounded-2xl bg-white/95 hover:bg-white border-2 border-slate-200 hover:border-[#7928ca] text-slate-800 shadow-md flex items-center justify-center transition-colors cursor-pointer"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          className="w-10 h-10 rounded-2xl bg-white/95 hover:bg-white border-2 border-slate-200 hover:border-[#7928ca] text-slate-800 shadow-md flex items-center justify-center transition-colors cursor-pointer"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <button
          onClick={handleResetView}
          title="Reset Camera"
          className="w-10 h-10 rounded-2xl bg-white/95 hover:bg-white border-2 border-slate-200 hover:border-[#7928ca] text-slate-800 shadow-md flex items-center justify-center transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* ACCESSIBLE CATEGORY LIST MODAL DRAWER */}
      <AnimatePresence>
        {showCategoryList && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 select-none">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="w-full max-w-lg bg-white rounded-3xl border-3 border-[#7928ca] p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col text-slate-900"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <h3 className="text-xl font-cartoon font-extrabold text-slate-900">
                    Explore Regions
                  </h3>
                  <p className="text-xs text-slate-500">
                    Select any category to zoom into its journey route.
                  </p>
                </div>
                <button
                  onClick={() => setShowCategoryList(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="overflow-y-auto space-y-2.5 flex-1 pr-1">
                {WORLD_CATEGORIES.map((cat) => {
                  const completedCount = cat.lessons.filter((l) =>
                    userProfile.completedLessons.includes(l.id)
                  ).length;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setShowCategoryList(false);
                        handleCategoryClick(cat);
                      }}
                      className="w-full p-3.5 rounded-2xl bg-slate-50 hover:bg-violet-50 border-2 border-slate-200 hover:border-[#7928ca] transition-all text-left flex items-center justify-between gap-3 group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                          {getCategoryIcon(cat.iconName)}
                        </div>
                        <div>
                          <div className="text-sm font-cartoon font-extrabold text-slate-900 group-hover:text-[#7928ca] transition-colors">
                            {cat.primaryCategory}
                          </div>
                          <div className="text-xs text-slate-500">
                            {cat.destinationName} · {cat.landmarkCues}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-cartoon font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                          {completedCount}/{cat.lessons.length}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#7928ca]" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
