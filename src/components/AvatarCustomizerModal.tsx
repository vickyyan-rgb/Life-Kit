import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Check, Sparkles, Shirt, Palette } from 'lucide-react';
import { AvatarConfig } from '../types';
import { AvatarRenderer } from './AvatarRenderer';
import { sound } from '../utils/audio';

interface AvatarCustomizerModalProps {
  initialAvatar: AvatarConfig;
  userName: string;
  onSave: (avatar: AvatarConfig, newName?: string) => void;
  onBack?: () => void;
}

export const AvatarCustomizerModal: React.FC<AvatarCustomizerModalProps> = ({
  initialAvatar,
  userName = 'Alex',
  onSave,
  onBack,
}) => {
  const [nickname, setNickname] = useState(userName || 'Alex');
  const [activeTab, setActiveTab] = useState<'skin' | 'hair' | 'outfit' | 'extras' | 'pet'>('outfit');
  const [isShowcasing, setIsShowcasing] = useState(false);

  // Initialize with the style from the user's uploaded reference image!
  const [avatar, setAvatar] = useState<AvatarConfig>({
    ...initialAvatar,
    outfitStyleId: initialAvatar.outfitStyleId || 'striped',
    hairStyle: initialAvatar.hairStyle || 'waves',
    companion: initialAvatar.companion || 'capybara',
    accessory: initialAvatar.accessory || 'earrings',
  });

  // 3 Signature 3D Outfits matching the uploaded photo
  const outfitOptions = [
    {
      id: 'striped',
      name: 'Striped Crewneck',
      desc: 'Purple & lime stripes, purple cargo pants',
      image: '/src/assets/images/avatar_style_striped_1790540848089.jpg',
      outfitType: 'streetwear' as const,
      color: '#7c3aed',
    },
    {
      id: 'pinkstar',
      name: 'Star Pastel Hoodie',
      desc: 'Bubblegum pink star hoodie, cyan pants',
      image: '/src/assets/images/avatar_style_pinkstar_1790540860259.jpg',
      outfitType: 'casual' as const,
      color: '#ec4899',
    },
    {
      id: 'limejacket',
      name: 'Track Zip Jacket',
      desc: 'Neon lime jacket, crossbody bag, joggers',
      image: '/src/assets/images/avatar_style_limejacket_1790540871396.jpg',
      outfitType: 'cyberpunk' as const,
      color: '#84cc16',
    },
  ];

  // Skin tones
  const skinTones = [
    { id: 'honey', label: 'Warm Honey', color: '#e0a97a' },
    { id: 'peach', label: 'Sunlit Peach', color: '#ffdfbf' },
    { id: 'golden', label: 'Golden Amber', color: '#b87333' },
    { id: 'bronze', label: 'Warm Bronze', color: '#9a5323' },
    { id: 'espresso', label: 'Deep Espresso', color: '#4a2c1d' },
    { id: 'solar', label: 'Solar Gold', color: '#ffe600' },
  ];

  // Hair styles
  const hairStyles = [
    { id: 'waves', label: 'Voluminous Waves (Featured)', preview: '〰️' },
    { id: 'curly', label: 'Fluffy Curls', preview: '🌀' },
    { id: 'short', label: 'Clean Crop', preview: '✂️' },
    { id: 'ponytail', label: 'High Ponytail', preview: '👱‍♀️' },
    { id: 'messy', label: 'Anime Spikes', preview: '⚡' },
    { id: 'buzz', label: 'Fade Buzz', preview: '💈' },
  ];

  const hairColors = [
    { label: 'Chestnut Brown', color: '#4a2e16' },
    { label: 'Obsidian Black', color: '#1a1b26' },
    { label: 'Neon Purple', color: '#7c3aed' },
    { label: 'Electric Cyan', color: '#00f0ff' },
    { label: 'Platinum Blonde', color: '#fef08a' },
    { label: 'Blaze Auburn', color: '#c2410c' },
  ];

  // Extras / Accessories
  const extrasOptions = [
    { id: 'earrings', label: 'Silver Hoop Earrings (Featured)', icon: '💍' },
    { id: 'headphones', label: 'Cat-Ear Headphones', icon: '🎧' },
    { id: 'glasses', label: 'Neon Wireframes', icon: '👓' },
    { id: 'backpack', label: 'Explorer Backpack', icon: '🎒' },
    { id: 'cap', label: 'Snapback Cap', icon: '🧢' },
    { id: 'none', label: 'None', icon: '∅' },
  ];

  // Pets / Companions
  const companionOptions = [
    {
      id: 'capybara',
      label: 'Mini Bag Capybara (Featured)',
      desc: 'Chubby cute capybara with purple bag',
      icon: '🐾',
      image: '/src/assets/images/companion_capybara_1790540892905.jpg',
    },
    {
      id: 'fox',
      label: 'Pocket Fox',
      desc: 'Sniffs out lease contract traps',
      icon: '🦊',
    },
    {
      id: 'bot',
      label: 'Robo-Buddy',
      desc: 'Calculates compound interest APY',
      icon: '🤖',
    },
    {
      id: 'owl',
      label: 'Cosmic Owl',
      desc: 'Deciphers IRS tax fine print',
      icon: '🦉',
    },
    {
      id: 'none',
      label: 'Solo Adventurer',
      desc: 'Traveling lightweight',
      icon: '🚶',
    },
  ];

  const handleFinishCustomization = () => {
    sound.playTap();
    sound.playFanfare();
    setIsShowcasing(true);

    setTimeout(() => {
      onSave(avatar, nickname.trim() || 'Alex');
    }, 1100);
  };

  // 1-second full-screen celebration showcase before going to next step
  if (isShowcasing) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-6 overflow-hidden select-none font-sans">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: [0.7, 1.15, 1.05], opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center text-center"
        >
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-[#f3e8ff] p-4 flex items-center justify-center shadow-[0_20px_50px_rgba(124,58,237,0.3)]">
            <div className="absolute inset-0 rounded-full border-4 border-[#7c3aed] animate-ping opacity-30" />
            <img
              src={
                avatar.outfitStyleId === 'pinkstar'
                  ? '/src/assets/images/avatar_style_pinkstar_1790540860259.jpg'
                  : avatar.outfitStyleId === 'limejacket'
                  ? '/src/assets/images/avatar_style_limejacket_1790540871396.jpg'
                  : '/src/assets/images/avatar_style_striped_1790540848089.jpg'
              }
              alt="Awakened Avatar"
              className="w-full h-full object-contain rounded-full"
            />
          </div>

          <h3 className="text-3xl sm:text-4xl font-extrabold mt-6 text-[#1e1b4b] tracking-tight">
            Ready to explore, <span className="text-[#7c3aed]">{nickname || 'Alex'}!</span>
          </h3>
        </motion.div>
      </div>
    );
  }

  // Active outfit hero image
  const currentHeroImage =
    avatar.outfitStyleId === 'pinkstar'
      ? '/src/assets/images/avatar_style_pinkstar_1790540860259.jpg'
      : avatar.outfitStyleId === 'limejacket'
      ? '/src/assets/images/avatar_style_limejacket_1790540871396.jpg'
      : '/src/assets/images/avatar_style_striped_1790540848089.jpg';

  return (
    <div className="fixed inset-0 z-50 bg-[#fafafa] flex flex-col items-center justify-between p-4 sm:p-6 overflow-y-auto select-none font-sans">
      <div className="w-full max-w-md mx-auto flex flex-col min-h-full justify-between">
        {/* TOP BAR: Back Arrow, 4-Pill Progress Indicator (3 of 4), Skip Button */}
        <div className="w-full flex items-center justify-between pt-1 pb-3">
          <button
            onClick={() => {
              sound.playTap();
              if (onBack) onBack();
            }}
            className="w-10 h-10 -ml-2 rounded-full hover:bg-slate-200/60 flex items-center justify-center text-slate-800 transition-colors cursor-pointer"
            title="Go Back"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* 4-Pill Progress Bar */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5">
              <div className="w-9 h-1.5 rounded-full bg-[#7c3aed]/40" />
              <div className="w-9 h-1.5 rounded-full bg-[#7c3aed]/40" />
              <div className="w-9 h-1.5 rounded-full bg-[#7c3aed]" />
              <div className="w-9 h-1.5 rounded-full bg-slate-200" />
            </div>
            <span className="text-[11px] font-semibold text-slate-400">3 of 4</span>
          </div>

          <button
            onClick={handleFinishCustomization}
            className="text-sm font-bold text-[#7c3aed] hover:text-[#6d28d9] px-2 py-1 transition-colors cursor-pointer"
          >
            Skip
          </button>
        </div>

        {/* HEADLINE: Make it you. Ready to explore, your way. */}
        <div className="text-center pt-1 pb-3">
          <h1 className="text-4xl sm:text-5xl font-black text-[#1e2038] tracking-tight">
            Make it <span className="text-[#6c1fe6]">you.</span>
          </h1>
          <p className="text-base font-semibold text-slate-500 mt-1">
            Ready to explore, your way.
          </p>
        </div>

        {/* HERO 3D AVATAR STAGE */}
        <div className="relative w-full flex items-center justify-center my-2">
          {/* Floating Neon Sparkles and Doodles around Avatar */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Top-Right Sparkles */}
            <span className="absolute top-2 right-12 text-[#a3e635] text-2xl animate-pulse">✦</span>
            <span className="absolute top-10 right-8 text-[#c084fc] text-xl animate-pulse delay-300">✧</span>
            {/* Top-Left Sparkles */}
            <span className="absolute top-6 left-12 text-[#a3e635] text-xl animate-pulse delay-500">✦</span>
            <span className="absolute bottom-16 left-8 text-[#38bdf8] text-sm animate-ping">●</span>
            {/* Curved trajectory dashed line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
              <path d="M 60 70 Q 200 20 340 70" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
            </svg>
          </div>

          {/* Floating "Map view" circle bubble */}
          <div className="absolute top-0 right-3 z-20 flex flex-col items-center">
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full border-3 border-white shadow-[0_8px_20px_rgba(0,0,0,0.12)] overflow-hidden bg-purple-50">
              <img
                src="/src/assets/images/avatar_map_backview_1790540882188.jpg"
                alt="Map View Back"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[11px] font-bold text-slate-500 mt-1 tracking-tight">
              Map view
            </span>
          </div>

          {/* Circular Lavender Pedestal Stage */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
            <div className="absolute bottom-2 w-64 h-16 rounded-[100%] bg-[#ede9fe] shadow-[0_12px_30px_rgba(124,58,237,0.15)] filter blur-[1px]" />
            <motion.div
              key={avatar.outfitStyleId || 'striped'}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 w-full h-full flex items-center justify-center"
            >
              <img
                src={currentHeroImage}
                alt="3D Avatar Figurine"
                className="w-68 h-68 sm:w-76 sm:h-76 object-contain filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.15)]"
              />
            </motion.div>
          </div>
        </div>

        {/* NICKNAME INPUT FIELD */}
        <div className="w-full text-left my-2">
          <label className="block text-sm font-bold text-[#1e2038] mb-1.5">
            Nickname
          </label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Alex"
            className="w-full h-13 px-4 rounded-2xl bg-white border border-slate-200 text-[#1e2038] font-bold text-base placeholder-slate-400 focus:outline-none focus:border-[#7c3aed] focus:ring-3 focus:ring-[#7c3aed]/20 shadow-sm transition-all"
          />
        </div>

        {/* CATEGORY TABS PILL BAR: Skin, Hair, Outfit, Extras, Pet */}
        <div className="w-full flex items-center gap-2 overflow-x-auto py-2 no-scrollbar">
          {/* Skin Tab */}
          <button
            onClick={() => {
              sound.playTap();
              setActiveTab('skin');
            }}
            className={`px-4 py-2 rounded-full font-bold text-sm flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
              activeTab === 'skin'
                ? 'bg-[#6c1fe6] text-white shadow-[0_4px_12px_rgba(108,31,230,0.35)]'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            <span
              className="w-3.5 h-3.5 rounded-full inline-block border border-black/10"
              style={{ backgroundColor: avatar.skinColor || '#e0a97a' }}
            />
            <span>Skin</span>
          </button>

          {/* Hair Tab */}
          <button
            onClick={() => {
              sound.playTap();
              setActiveTab('hair');
            }}
            className={`px-4 py-2 rounded-full font-bold text-sm flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
              activeTab === 'hair'
                ? 'bg-[#6c1fe6] text-white shadow-[0_4px_12px_rgba(108,31,230,0.35)]'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            <span className="text-sm">💇</span>
            <span>Hair</span>
          </button>

          {/* Outfit Tab */}
          <button
            onClick={() => {
              sound.playTap();
              setActiveTab('outfit');
            }}
            className={`px-4 py-2 rounded-full font-bold text-sm flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
              activeTab === 'outfit'
                ? 'bg-[#6c1fe6] text-white shadow-[0_4px_12px_rgba(108,31,230,0.35)]'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            <Shirt className="w-4 h-4 fill-current stroke-0" />
            <span>Outfit</span>
          </button>

          {/* Extras Tab */}
          <button
            onClick={() => {
              sound.playTap();
              setActiveTab('extras');
            }}
            className={`px-4 py-2 rounded-full font-bold text-sm flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
              activeTab === 'extras'
                ? 'bg-[#6c1fe6] text-white shadow-[0_4px_12px_rgba(108,31,230,0.35)]'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Extras</span>
          </button>

          {/* Pet Tab */}
          <button
            onClick={() => {
              sound.playTap();
              setActiveTab('pet');
            }}
            className={`px-4 py-2 rounded-full font-bold text-sm flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
              activeTab === 'pet'
                ? 'bg-[#6c1fe6] text-white shadow-[0_4px_12px_rgba(108,31,230,0.35)]'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            <span className="text-sm">🐾</span>
            <span>Pet</span>
          </button>
        </div>

        {/* 3-CARD CAROUSEL / OPTIONS PANEL (MATCHING THE 3 CARDS IN THE REFERENCE IMAGE!) */}
        <div className="w-full my-2">
          {/* TAB 1: OUTFIT (The 3 Signature 3D Cards from the Photo!) */}
          {activeTab === 'outfit' && (
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {outfitOptions.map((opt) => {
                const isSelected = (avatar.outfitStyleId || 'striped') === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      sound.playTap();
                      setAvatar((prev) => ({
                        ...prev,
                        outfitStyleId: opt.id,
                        outfit: opt.outfitType,
                        outfitColor: opt.color,
                      }));
                    }}
                    className={`relative rounded-3xl p-1.5 transition-all cursor-pointer flex flex-col items-center overflow-hidden bg-slate-50 ${
                      isSelected
                        ? 'border-2 border-[#6c1fe6] ring-3 ring-[#6c1fe6]/20 shadow-md bg-white'
                        : 'border border-slate-200 hover:border-slate-300 opacity-90'
                    }`}
                  >
                    {/* Purple Circle Checkmark Badge on Active Card (Top Right) */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-[#6c1fe6] text-white flex items-center justify-center shadow-sm">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}

                    <div className="w-full h-32 sm:h-36 rounded-2xl overflow-hidden flex items-center justify-center bg-purple-50/40">
                      <img
                        src={opt.image}
                        alt={opt.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* TAB 2: SKIN TONES */}
          {activeTab === 'skin' && (
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {skinTones.map((skin) => {
                const isSelected = avatar.skinColor === skin.color;
                return (
                  <button
                    key={skin.id}
                    onClick={() => {
                      sound.playTap();
                      setAvatar((prev) => ({ ...prev, skinColor: skin.color }));
                    }}
                    className={`relative rounded-3xl p-3 h-28 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-2 border-[#6c1fe6] ring-3 ring-[#6c1fe6]/20 bg-white shadow-md'
                        : 'border border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#6c1fe6] text-white flex items-center justify-center shadow-sm">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                    <span
                      className="w-10 h-10 rounded-full shadow-inner border-2 border-white ring-1 ring-black/10"
                      style={{ backgroundColor: skin.color }}
                    />
                    <span className="text-xs font-bold text-slate-700 text-center leading-tight">
                      {skin.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* TAB 3: HAIR STYLES & COLOR */}
          {activeTab === 'hair' && (
            <div className="space-y-3">
              {/* Hair Style Options */}
              <div className="grid grid-cols-3 gap-2.5">
                {hairStyles.map((h) => {
                  const isSelected = avatar.hairStyle === h.id;
                  return (
                    <button
                      key={h.id}
                      onClick={() => {
                        sound.playTap();
                        setAvatar((prev) => ({
                          ...prev,
                          hairStyle: h.id as AvatarConfig['hairStyle'],
                        }));
                      }}
                      className={`relative rounded-2xl p-2.5 text-center cursor-pointer transition-all ${
                        isSelected
                          ? 'border-2 border-[#6c1fe6] ring-3 ring-[#6c1fe6]/20 bg-white shadow-sm'
                          : 'border border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#6c1fe6] text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                      <div className="text-xl mb-1">{h.preview}</div>
                      <div className="text-[11px] font-bold text-slate-700 leading-tight">
                        {h.label}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Hair Color Palette */}
              <div className="flex items-center justify-center gap-2 pt-1">
                {hairColors.map((hc) => (
                  <button
                    key={hc.color}
                    onClick={() => {
                      sound.playTap();
                      setAvatar((prev) => ({ ...prev, hairColor: hc.color }));
                    }}
                    title={hc.label}
                    style={{ backgroundColor: hc.color }}
                    className={`w-7 h-7 rounded-full border-2 cursor-pointer transition-transform ${
                      avatar.hairColor === hc.color
                        ? 'border-[#6c1fe6] scale-120 ring-2 ring-[#6c1fe6]/30'
                        : 'border-white ring-1 ring-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: EXTRAS / ACCESSORIES */}
          {activeTab === 'extras' && (
            <div className="grid grid-cols-3 gap-2.5">
              {extrasOptions.map((ext) => {
                const isSelected = avatar.accessory === ext.id;
                return (
                  <button
                    key={ext.id}
                    onClick={() => {
                      sound.playTap();
                      setAvatar((prev) => ({
                        ...prev,
                        accessory: ext.id as AvatarConfig['accessory'],
                      }));
                    }}
                    className={`relative rounded-2xl p-3 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-2 border-[#6c1fe6] ring-3 ring-[#6c1fe6]/20 bg-white shadow-sm'
                        : 'border border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#6c1fe6] text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                    <span className="text-2xl">{ext.icon}</span>
                    <span className="text-[11px] font-bold text-slate-700 text-center leading-tight">
                      {ext.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* TAB 5: PETS / COMPANIONS */}
          {activeTab === 'pet' && (
            <div className="grid grid-cols-3 gap-2.5">
              {companionOptions.map((comp) => {
                const isSelected = avatar.companion === comp.id;
                return (
                  <button
                    key={comp.id}
                    onClick={() => {
                      sound.playTap();
                      setAvatar((prev) => ({
                        ...prev,
                        companion: comp.id as AvatarConfig['companion'],
                      }));
                    }}
                    className={`relative rounded-2xl p-2.5 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-2 border-[#6c1fe6] ring-3 ring-[#6c1fe6]/20 bg-white shadow-sm'
                        : 'border border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#6c1fe6] text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                    {comp.image ? (
                      <div className="w-12 h-12 rounded-xl overflow-hidden mb-0.5">
                        <img src={comp.image} alt={comp.label} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <span className="text-2xl mb-1">{comp.icon}</span>
                    )}
                    <span className="text-[11px] font-bold text-slate-800 text-center leading-tight">
                      {comp.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* BOTTOM ACTION BUTTONS: CONTINUE & CUSTOMIZE LATER */}
        <div className="w-full flex flex-col items-center pt-2 pb-1 gap-2">
          {/* Main "Continue →" Pill Button */}
          <button
            onClick={handleFinishCustomization}
            className="w-full py-4 rounded-full bg-gradient-to-r from-[#6b21a8] via-[#7c3aed] to-[#8b5cf6] hover:from-[#581c87] hover:to-[#7c3aed] text-white font-extrabold text-lg shadow-[0_10px_25px_rgba(124,58,237,0.45)] hover:shadow-[0_12px_30px_rgba(124,58,237,0.6)] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Continue</span>
            <span className="text-xl">→</span>
          </button>

          {/* "Customize later" Link */}
          <button
            onClick={handleFinishCustomization}
            className="text-sm font-bold text-[#6c1fe6] hover:underline cursor-pointer py-1"
          >
            Customize later
          </button>
        </div>
      </div>
    </div>
  );
};
