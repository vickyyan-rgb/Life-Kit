import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Send,
  Compass,
  ArrowRight,
  Bot,
} from 'lucide-react';
import { ChatMessage, UserProfile } from '../types';
import { sound } from '../utils/audio';

interface MentorChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  currentZoneName?: string;
  onNavigateToZone?: (zoneId: string) => void;
}

export const MentorChatDrawer: React.FC<MentorChatDrawerProps> = ({
  isOpen,
  onClose,
  userProfile,
  currentZoneName = 'World Hub',
  onNavigateToZone,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init_1',
      sender: 'mentor',
      text: `Hey ${userProfile.name}! ★ I'm Sage Spark, your life mentor guide! Ask me anything about taxes, getting your apartment deposit back, credit cards, or your first job paycheck!`,
      timestamp: 'Just now',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    { text: 'Can a landlord keep my deposit for normal scuffs?', zoneId: 'shelter_springs' },
    { text: 'How do I avoid paying interest on a credit card?', zoneId: 'credit_crest' },
    { text: 'Do I get taxes withheld from my paycheck refunded?', zoneId: 'tax_haven' },
    { text: 'What is a High Yield Savings Account (HYSA)?', zoneId: 'vault_valley' },
    { text: 'What is the difference between copay and deductible?', zoneId: 'wellness_sanctuary' },
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputVal.trim();
    if (!text || isLoading) return;

    sound.playTap();
    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ask-mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: text,
          userProfile,
          currentZone: currentZoneName,
        }),
      });

      const data = await res.json();
      const replyText = data.reply || "I'm checking that for you! Keep exploring the world map.";

      let suggestedZoneId: string | undefined = undefined;
      let actionLabel: string | undefined = undefined;
      const lower = text.toLowerCase();
      if (lower.includes('tax') || lower.includes('w-2') || lower.includes('refund')) {
        suggestedZoneId = 'tax_haven';
        actionLabel = 'Walk to Tax Haven';
      } else if (lower.includes('rent') || lower.includes('lease') || lower.includes('deposit')) {
        suggestedZoneId = 'shelter_springs';
        actionLabel = 'Walk to Shelter Springs';
      } else if (lower.includes('credit') || lower.includes('score') || lower.includes('apr')) {
        suggestedZoneId = 'credit_crest';
        actionLabel = 'Walk to Credit Crest';
      } else if (lower.includes('save') || lower.includes('hysa') || lower.includes('budget')) {
        suggestedZoneId = 'vault_valley';
        actionLabel = 'Walk to Vault Valley';
      } else if (lower.includes('job') || lower.includes('overtime') || lower.includes('paycheck')) {
        suggestedZoneId = 'career_heights';
        actionLabel = 'Walk to Career Heights';
      } else if (lower.includes('insurance') || lower.includes('doctor') || lower.includes('copay')) {
        suggestedZoneId = 'wellness_sanctuary';
        actionLabel = 'Walk to Wellness Sanctuary';
      }

      const mentorMsg: ChatMessage = {
        id: `mentor_${Date.now()}`,
        sender: 'mentor',
        text: replyText,
        timestamp: 'Just now',
        suggestedAction: suggestedZoneId && actionLabel ? { zoneId: suggestedZoneId, label: actionLabel } : undefined,
      };

      setMessages((prev) => [...prev, mentorMsg]);
      sound.playKnowledgeUnlock();
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `mentor_${Date.now()}`,
          sender: 'mentor',
          text: `Great question, ${userProfile.name}! Remember to inspect any contract before signing, take photos of everything, and never pay fees without an itemized receipt.`,
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-xs font-sans">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="w-full max-w-md h-full bg-black border-l-2 border-[#00f0ff] shadow-[0_0_30px_rgba(0,240,255,0.3)] flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#00f0ff]/40 bg-black">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-[#00f0ff] shadow-[0_0_10px_#00f0ff]">
                  <img
                    src="/src/assets/images/cartoon_neon_sage_mentor_1790537136348.jpg"
                    alt="Sage Spark"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#39ff14] rounded-full border border-black" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-base font-cartoon font-extrabold neon-text-cyan">Sage Spark</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-black border border-[#ff007f] shadow-[0_0_6px_#ff007f]">
                      <span className="neon-text-pink font-bold">Life Mentor</span>
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-300">
                    ★ Always online for real-life questions
                  </span>
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

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-3xl text-xs sm:text-sm leading-relaxed border ${
                      msg.sender === 'user'
                        ? 'bg-black border-[#ffe600] shadow-[0_0_12px_rgba(255,230,0,0.3)]'
                        : 'bg-black border-white/20 text-slate-100 shadow-[0_0_10px_rgba(255,255,255,0.15)]'
                    }`}
                  >
                    <p className={`whitespace-pre-line ${msg.sender === 'user' ? 'neon-text-yellow font-extrabold' : 'text-slate-100'}`}>
                      {msg.text}
                    </p>

                    {/* Suggested Destination Button */}
                    {msg.suggestedAction && onNavigateToZone && (
                      <button
                        onClick={() => {
                          sound.playTap();
                          if (msg.suggestedAction?.zoneId) {
                            onNavigateToZone(msg.suggestedAction.zoneId);
                            onClose();
                          }
                        }}
                        className="mt-3 w-full py-2.5 px-3 rounded-2xl bg-black hover:bg-[#39ff14]/20 border-2 border-[#39ff14] text-xs font-cartoon font-bold flex items-center justify-center gap-1.5 shadow-[0_0_12px_#39ff14] active:scale-95 transition-all cursor-pointer"
                      >
                        <Compass className="w-4 h-4 text-white fill-white" />
                        <span className="neon-text-lime font-extrabold">{msg.suggestedAction.label}</span>
                        <ArrowRight className="w-4 h-4 text-white" />
                      </button>
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-xs font-cartoon font-bold bg-black p-3 rounded-2xl border border-[#ffe600] shadow-[0_0_10px_#ffe600] max-w-[75%]">
                  <Bot className="w-4 h-4 animate-spin text-white fill-white" />
                  <span className="neon-text-yellow font-extrabold">Sage Spark is consulting real-life wisdom...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Chips Carousel */}
            <div className="px-4 py-2.5 border-t border-white/15 bg-black">
              <span className="text-[10px] font-cartoon font-extrabold neon-text-yellow uppercase tracking-wider block mb-1.5">
                ★ Quick Inquiries:
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {suggestedPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(p.text)}
                    className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-black hover:bg-white/10 border border-white/20 hover:border-[#00f0ff] text-xs font-cartoon text-slate-200 hover:text-white transition-all cursor-pointer shrink-0"
                  >
                    {p.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-4 border-t border-[#00f0ff]/40 bg-black">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ask anything about taxes, rent, credit cards..."
                  className="flex-1 h-12 px-4 rounded-2xl bg-black border-2 border-white/20 text-white placeholder-slate-400 font-cartoon text-xs sm:text-sm focus:outline-none focus:border-[#00f0ff] shadow-inner"
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim() || isLoading}
                  className="w-12 h-12 rounded-2xl bg-black hover:bg-[#ff007f]/20 border-2 border-[#ff007f] text-white flex items-center justify-center shadow-[0_0_12px_#ff007f] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shrink-0"
                >
                  <Send className="w-5 h-5 text-white fill-white" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
