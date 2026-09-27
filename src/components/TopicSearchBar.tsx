import React, { useState, useRef, useEffect } from 'react';
import { Search, Compass, X, ArrowRight } from 'lucide-react';
import { WORLD_ZONES } from '../data/worldData';
import { Zone } from '../types';
import { sound } from '../utils/audio';

interface TopicSearchBarProps {
  onSelectDestination: (zone: Zone) => void;
}

export const TopicSearchBar: React.FC<TopicSearchBarProps> = ({ onSelectDestination }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredResults = query.trim()
    ? WORLD_ZONES.flatMap((zone) => {
        const queryLower = query.toLowerCase();
        const matchesZoneName = zone.name.toLowerCase().includes(queryLower);
        const matchesDescription = zone.description.toLowerCase().includes(queryLower);
        const matchedTopics = zone.topics.filter((t) => t.toLowerCase().includes(queryLower));
        const matchedLessons = zone.lessons.filter(
          (l) => l.title.toLowerCase().includes(queryLower) || l.summary.toLowerCase().includes(queryLower)
        );

        if (matchesZoneName || matchesDescription || matchedTopics.length > 0 || matchedLessons.length > 0) {
          return [
            {
              zone,
              topicBadge: matchedTopics[0] || matchedLessons[0]?.title || zone.title,
            },
          ];
        }
        return [];
      })
    : [];

  const handlePickResult = (zone: Zone) => {
    sound.playTap();
    sound.playKnowledgeUnlock();
    setQuery('');
    setIsOpen(false);
    onSelectDestination(zone);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      {/* Search Input Box: Pure black with neon cyan border and white icon */}
      <div className="relative flex items-center">
        <Search className="w-4 h-4 text-white fill-white absolute left-3.5 pointer-events-none filter drop-shadow-[0_0_6px_#00f0ff]" />
        <input
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Search skills (APR, W-2, lease, copay, HYSA)..."
          className="w-full h-11 pl-10 pr-8 rounded-2xl bg-black border-2 border-[#00f0ff] text-white font-cartoon placeholder-slate-400 text-xs focus:outline-none focus:shadow-[0_0_15px_#00f0ff] transition-all"
        />

        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-2.5 text-white hover:text-[#ff007f]"
          >
            <X className="w-4 h-4 text-white stroke-[2.5]" />
          </button>
        )}
      </div>

      {/* Dropdown Suggestions */}
      {isOpen && query.trim() && (
        <div className="absolute top-13 left-0 right-0 z-50 bg-black/98 backdrop-blur-xl border-2 border-[#00f0ff] rounded-3xl shadow-[0_0_20px_rgba(0,240,255,0.4)] p-2 max-h-60 overflow-y-auto space-y-1">
          {filteredResults.length > 0 ? (
            filteredResults.map(({ zone, topicBadge }, idx) => (
              <button
                key={idx}
                onClick={() => handlePickResult(zone)}
                className="w-full p-2.5 rounded-2xl bg-black hover:bg-white/10 border border-white/20 hover:border-[#00f0ff] text-left flex items-center justify-between gap-2 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className="text-xl filter drop-shadow-[0_0_6px_#ffffff]">{zone.npcMentor.emoji}</span>
                  <div className="truncate">
                    <div className="text-xs font-cartoon font-extrabold neon-text-cyan truncate">
                      {zone.name}
                    </div>
                    <div className="text-[10px] text-slate-300 truncate">
                      Topic: <span className="neon-text-yellow font-bold">{topicBadge}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-black border border-[#39ff14] text-xs font-cartoon font-bold shrink-0 shadow-[0_0_8px_#39ff14]">
                  <Compass className="w-3.5 h-3.5 text-white fill-white" />
                  <span className="neon-text-lime font-extrabold">Walk Here</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </div>
              </button>
            ))
          ) : (
            <div className="p-3 text-center text-xs font-cartoon text-slate-400">
              No land match for "{query}". Try "taxes", "credit", or "rent".
            </div>
          )}
        </div>
      )}
    </div>
  );
};
