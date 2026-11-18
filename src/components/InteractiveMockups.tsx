import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  Play,
  Pause,
  Send,
  Sparkles,
  Flame,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Volume2,
} from 'lucide-react';
import { sounds } from '../utils/audio';

interface MockupProps {
  projectId: string;
}

export const InteractiveMockup: React.FC<MockupProps> = ({ projectId }) => {
  // QualityHub State
  const [verifiedTicket, setVerifiedTicket] = useState(false);

  // BabaSika WhatsApp State
  const [babaMessages, setBabaMessages] = useState<
    { sender: 'bot' | 'user'; text: string; time: string; isAudio?: boolean }[]
  >([
    {
      sender: 'bot',
      text: 'Mama, how much you fit save today? Retirement no dey wait o!',
      time: '10:14 AM',
    },
    {
      sender: 'bot',
      text: 'Voice note from BabaSika (Yoruba & Pidgin)',
      time: '10:14 AM',
      isAudio: true,
    },
  ]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Pocketa State
  const [pocketaView, setPocketaView] = useState<'daily' | 'weekly'>('daily');

  // Ventics Slider State (0 to 100 percentage)
  const [sliderPos, setSliderPos] = useState(55);

  // Vale Candle State
  const [candleLit, setCandleLit] = useState(true);

  // QuickBill State
  const [billQuantity, setBillQuantity] = useState(3);

  // Handle BabaSika deposit
  const handleDeposit = (amount: number) => {
    sounds.playChime();
    setBabaMessages((prev) => [
      ...prev,
      { sender: 'user', text: `Save ₦${amount.toLocaleString()} for me`, time: 'Just now' },
      {
        sender: 'bot',
        text: `Oya! ₦${amount.toLocaleString()} credited to your Micro-Pension. Balance: ₦${(
          18500 + amount
        ).toLocaleString()}. SMS sent! 🚀`,
        time: 'Just now',
      },
    ]);
  };

  // 1. QualityHub Mockup
  if (projectId === 'qualityhub') {
    return (
      <div className="bg-[#12141A] rounded-2xl p-5 text-white border border-white/10 shadow-2xl space-y-4 font-sans select-none">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs">
          <div className="flex items-center gap-2 font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[#9BA3AF]">CASE #QAS-2026-0842</span>
          </div>
          <span className="px-2.5 py-0.5 rounded bg-[#3062F7]/20 text-[#3062F7] font-mono text-[10px] font-bold">
            UNILAG QAS UNIT
          </span>
        </div>

        <div className="space-y-1">
          <div className="text-xs font-mono text-[#9BA3AF]">INCIDENT CATEGORY</div>
          <div className="text-base font-bold text-white">
            Missing Course Grade · Department of Mathematics
          </div>
        </div>

        {/* 4-Step Lifecycle */}
        <div className="grid grid-cols-4 gap-1.5 text-center text-[10px] font-mono py-1">
          <div className="p-1.5 rounded bg-[#10B981]/20 text-[#10B981] font-bold">
            1. Lodged ✓
          </div>
          <div className="p-1.5 rounded bg-[#10B981]/20 text-[#10B981] font-bold">
            2. Triaged ✓
          </div>
          <div className="p-1.5 rounded bg-[#3062F7]/30 text-white font-bold border border-[#3062F7]">
            3. In Review
          </div>
          <div className="p-1.5 rounded bg-white/5 text-[#6B7280]">
            4. Resolved
          </div>
        </div>

        {/* Proof Hash & Interactive Button */}
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-2">
          <div className="text-[11px] font-mono text-[#9BA3AF] truncate">
            Proof Hash:{' '}
            <span className="text-white font-bold">
              {verifiedTicket ? '0x8F42...D9C1 (VALIDATED ✓)' : '0x8F42...D9C1'}
            </span>
          </div>
          <button
            onClick={() => {
              sounds.playChime();
              setVerifiedTicket(true);
            }}
            className="px-3 py-1 bg-[#10B981] hover:bg-[#059669] text-[#121316] text-[10px] font-mono font-bold rounded transition-all cursor-pointer whitespace-nowrap shadow-sm hover:scale-105 active:scale-95"
          >
            {verifiedTicket ? 'Verified ✓' : 'Verify Proof'}
          </button>
        </div>
      </div>
    );
  }

  // 2. BabaSika WhatsApp Conversational Mockup
  if (projectId === 'babasika') {
    return (
      <div className="bg-[#0B141A] rounded-2xl p-4 text-white border border-[#202C33] shadow-2xl space-y-3 font-sans max-w-sm mx-auto select-none">
        {/* WhatsApp Header */}
        <div className="flex items-center justify-between border-b border-[#202C33] pb-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#00A884] flex items-center justify-center font-bold text-xs">
              BS
            </div>
            <div>
              <div className="font-bold text-white text-[11px]">BabaSika Pension Bot ✓</div>
              <div className="text-[9px] text-[#00A884] font-mono">online</div>
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#8696A0]">*384# USSD</span>
        </div>

        {/* Chat Stream */}
        <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1 text-xs">
          {babaMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-lg p-2.5 ${
                  msg.sender === 'user'
                    ? 'bg-[#005C4B] text-white rounded-tr-none'
                    : 'bg-[#202C33] text-[#E9EDEF] rounded-tl-none'
                }`}
              >
                {msg.isAudio ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="w-7 h-7 rounded-full bg-[#00A884] flex items-center justify-center text-white"
                    >
                      {isPlayingAudio ? (
                        <Pause className="w-3.5 h-3.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5 ml-0.5" />
                      )}
                    </button>
                    <div className="space-y-1">
                      <div className="flex gap-0.5 items-center">
                        {[40, 60, 30, 80, 50, 90, 40, 70, 30].map((h, i) => (
                          <div
                            key={i}
                            className="w-1 bg-[#00A884] rounded-full"
                            style={{ height: `${(h / 100) * 16}px` }}
                          />
                        ))}
                      </div>
                      <span className="text-[9px] text-[#8696A0]">0:18 audio (Pidgin)</span>
                    </div>
                  </div>
                ) : (
                  <div>{msg.text}</div>
                )}
                <div className="text-[8px] text-[#8696A0] text-right mt-1">{msg.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Deposit Trigger Buttons */}
        <div className="pt-2 border-t border-[#202C33] flex items-center justify-between gap-1.5">
          <span className="text-[10px] text-[#8696A0] font-mono">Tap to Save:</span>
          <div className="flex items-center gap-1.5">
            {[200, 500, 1000].map((amt) => (
              <button
                key={amt}
                onClick={() => handleDeposit(amt)}
                className="px-2.5 py-1 bg-[#00A884]/20 hover:bg-[#00A884] text-[#00A884] hover:text-black font-mono font-bold text-[10px] rounded transition-colors cursor-pointer"
              >
                +₦{amt}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 3. Pocketa by EcoVest Mockup
  if (projectId === 'ecovest') {
    return (
      <div className="bg-[#12141A] rounded-2xl p-5 text-white border border-white/10 shadow-2xl space-y-4 font-sans select-none max-w-sm mx-auto">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#2FA06A]" />
            <span className="font-bold text-white">Pocketa · EcoVest</span>
          </div>
          <div className="flex bg-white/10 rounded-full p-0.5 text-[10px] font-mono">
            <button
              onClick={() => {
                sounds.playClick();
                setPocketaView('daily');
              }}
              className={`px-2 py-0.5 rounded-full ${
                pocketaView === 'daily' ? 'bg-[#2FA06A] text-white font-bold' : 'text-[#9BA3AF]'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setPocketaView('weekly');
              }}
              className={`px-2 py-0.5 rounded-full ${
                pocketaView === 'weekly' ? 'bg-[#2FA06A] text-white font-bold' : 'text-[#9BA3AF]'
              }`}
            >
              Weekly
            </button>
          </div>
        </div>

        {/* Circular Safe-to-Spend Dial */}
        <div className="py-2 text-center relative">
          <div className="text-[10px] font-mono text-[#9BA3AF] uppercase tracking-wider mb-1">
            SAFE-TO-SPEND TODAY
          </div>
          <div className="text-4xl font-display font-extrabold text-white">
            ₦4,850
            <span className="text-sm font-mono text-[#2FA06A] ml-1">/ day</span>
          </div>
          <div className="text-xs text-[#9BA3AF] mt-1">
            Campus meals &amp; transit safe for next 5 days
          </div>
        </div>

        {/* Spending Pacing Progress */}
        <div className="p-3 bg-white/[0.04] rounded-xl border border-white/10 space-y-2">
          <div className="flex justify-between text-[11px] font-mono">
            <span className="text-[#9BA3AF]">Weekly Allowance Pacing</span>
            <span className="text-[#2FA06A] font-bold">On Track (68%)</span>
          </div>
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-[#2FA06A] w-[68%]" />
          </div>
        </div>
      </div>
    );
  }

  // 4. Ventics AI Before / After Interactive Slider Mockup
  if (projectId === 'ventics-ai') {
    return (
      <div className="bg-[#171A21] rounded-2xl p-4 text-white border border-white/10 shadow-2xl space-y-3 font-sans select-none">
        <div className="flex items-center justify-between text-xs font-mono text-[#9BA3AF] pb-2 border-b border-white/10">
          <span className="text-[#F4BE24] font-bold">INTERACTIVE AI RENDER SLIDER</span>
          <span>Drag handle ↔</span>
        </div>

        {/* Interactive Split View Box */}
        <div
          className="relative h-44 rounded-xl overflow-hidden border border-white/10 cursor-ew-resize select-none"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = ((e.clientX - rect.left) / rect.width) * 100;
            setSliderPos(Math.min(95, Math.max(5, pos)));
          }}
        >
          {/* AFTER LAYER (Rich Generative AI Room) */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2D281E] via-[#1E2628] to-[#12161A] p-4 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="px-2 py-0.5 rounded bg-[#F4BE24] text-black font-mono font-bold text-[9px]">
                AFTER: AI GENERATED
              </span>
              <span className="text-[10px] text-[#F4BE24] font-mono">Render: 3.4s</span>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-white">Japandi Living Room</div>
              <div className="text-[10px] text-white/70">
                Oak slat wall · Ambient 2700K lighting · Bouclé armchair
              </div>
            </div>
          </div>

          {/* BEFORE LAYER (Empty wireframe sketch with clip-path) */}
          <div
            className="absolute inset-0 bg-[#0F1115] p-4 flex flex-col justify-between border-r-2 border-white"
            style={{ width: `${sliderPos}%` }}
          >
            <span className="px-2 py-0.5 rounded bg-white/20 text-white font-mono font-bold text-[9px] w-max">
              BEFORE: EMPTY SHELL
            </span>
            <div className="text-[10px] text-[#9BA3AF] font-mono">
              Raw concrete · Unfurnished space
            </div>
          </div>

          {/* Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white flex items-center justify-center pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="w-5 h-5 rounded-full bg-white text-black text-[9px] font-bold flex items-center justify-center shadow-lg">
              ↔
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-[#9BA3AF]">
          <span>34.2% Waitlist Conversion</span>
          <span className="text-[#F4BE24] font-semibold">94/100 Usability</span>
        </div>
      </div>
    );
  }

  // 5. QuickBill Mockup
  if (projectId === 'quickbill-proj') {
    const total = billQuantity * 15000 - 2000;
    return (
      <div className="bg-[#12141A] rounded-2xl p-5 text-white border border-white/10 shadow-2xl space-y-3 font-sans select-none">
        <div className="flex items-center justify-between border-b border-white/10 pb-2 text-xs">
          <span className="font-mono text-[#EE5828] font-bold">QUICKBILL · VOICE PARSER</span>
          <span className="text-[10px] font-mono text-[#9BA3AF]">3-hour build</span>
        </div>

        {/* Voice Note Input Bubble */}
        <div className="p-3 bg-[#EE5828]/15 border border-[#EE5828]/30 rounded-xl space-y-1">
          <div className="text-[10px] font-mono text-[#EE5828] flex items-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5" />
            <span>Spoken Pidgin Instruction:</span>
          </div>
          <p className="text-xs text-white italic">
            &quot;Send invoice to Emeka for {billQuantity} cakes at 15k each, give am discount 2k&quot;
          </p>
        </div>

        {/* Rendered Invoice Receipt */}
        <div className="p-3 bg-white text-[#121316] rounded-xl space-y-2 shadow">
          <div className="flex justify-between items-center text-xs font-bold border-b border-black/10 pb-1.5">
            <span>INVOICE #084</span>
            <span className="text-[#EE5828]">WHATSAPP READY</span>
          </div>
          <div className="flex justify-between text-xs">
            <span>Custom Cakes ({billQuantity}x)</span>
            <span>₦{(billQuantity * 15000).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xs text-[#DC2626]">
            <span>Special Discount</span>
            <span>-₦2,000</span>
          </div>
          <div className="flex justify-between text-sm font-bold border-t border-black/10 pt-1">
            <span>Total Due</span>
            <span className="text-[#EE5828]">₦{total.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#9BA3AF]">
            <span>Qty:</span>
            <button
              onClick={() => setBillQuantity(Math.max(1, billQuantity - 1))}
              className="w-5 h-5 bg-white/10 rounded flex items-center justify-center font-bold"
            >
              -
            </button>
            <span className="text-white font-bold">{billQuantity}</span>
            <button
              onClick={() => setBillQuantity(billQuantity + 1)}
              className="w-5 h-5 bg-white/10 rounded flex items-center justify-center font-bold"
            >
              +
            </button>
          </div>
          <span className="text-[10px] font-mono text-[#10B981]">Generated in 1.4s ✓</span>
        </div>
      </div>
    );
  }

  // 6. Vale Candle Mockup
  if (projectId === 'vale-proj') {
    return (
      <div
        className="rounded-2xl p-6 text-white border shadow-2xl space-y-4 font-sans select-none transition-colors duration-500 text-center"
        style={{
          backgroundColor: candleLit ? '#231512' : '#12141A',
          borderColor: candleLit ? '#EE5828' : 'rgba(255,255,255,0.1)',
        }}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-2 text-xs">
          <span className="font-mono text-[#C85A3A] font-bold">VALE FLAGSHIP</span>
          <span className="text-[10px] font-mono text-[#9BA3AF]">Click candle to light</span>
        </div>

        {/* Candle Wick and Flame */}
        <div
          onClick={() => {
            sounds.playPop();
            setCandleLit(!candleLit);
          }}
          className="py-6 flex flex-col items-center justify-center cursor-pointer group"
        >
          {candleLit ? (
            <motion.div
              animate={{ scale: [1, 1.15, 0.95, 1.1, 1], rotate: [-2, 2, -1, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-8 h-12 bg-gradient-to-t from-[#EE5828] via-[#F4BE24] to-white rounded-full blur-[1px] shadow-[0_0_30px_#EE5828] mb-1"
            />
          ) : (
            <div className="w-1.5 h-6 bg-[#6B7280] rounded-full mb-1 group-hover:bg-[#EE5828] transition-colors" />
          )}

          {/* Candle Pillar */}
          <div className="w-24 h-20 bg-gradient-to-b from-[#F4EFE6] to-[#D5CEBF] rounded-t-lg border border-black/10 shadow-lg flex items-center justify-center text-black font-serif text-[10px] tracking-widest">
            VALE · 01
          </div>
        </div>

        <div className="text-xs font-mono text-[#9BA3AF]">
          {candleLit ? (
            <span className="text-[#F4BE24] font-semibold">
              Wick Lit · Santal 26 &amp; Amber Ambient Glow
            </span>
          ) : (
            <span>Candle Unlit · Click to ignite flame</span>
          )}
        </div>
      </div>
    );
  }

  // Generic Default High-Fidelity UI Fallback
  return (
    <div className="bg-[#12141A] rounded-2xl p-5 text-white border border-white/10 shadow-2xl space-y-3 font-sans select-none">
      <div className="flex items-center justify-between border-b border-white/10 pb-2 text-xs font-mono text-[#9BA3AF]">
        <span className="text-white font-bold">SYSTEM WORKSPACE</span>
        <span className="text-[#10B981]">ACTIVE</span>
      </div>
      <div className="p-4 bg-white/5 rounded-xl space-y-2">
        <div className="h-3 w-1/3 bg-[#3062F7] rounded-full" />
        <div className="h-2 w-full bg-white/10 rounded-full" />
        <div className="h-2 w-4/5 bg-white/10 rounded-full" />
      </div>
      <div className="text-[11px] font-mono text-[#9BA3AF] flex justify-between">
        <span>Figma Tokens Mapped</span>
        <span className="text-[#3062F7] font-bold">Production Ready</span>
      </div>
    </div>
  );
};
