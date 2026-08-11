// src/components/TarotSelectorCard.jsx
'use client';

import React from 'react';
import { HelpCircle } from 'lucide-react';

export default function TarotSelectorCard({
  slotLabel,
  slotIndex,
  card,
  isActive,
  onSelectSlot,
  onRemoveCard,
}) {
  return (
    <div
      onClick={() => onSelectSlot(slotIndex)}
      className={`relative rounded-xl border-2 p-4 flex flex-col items-center justify-center min-h-[160px] cursor-pointer transition-all ${
        isActive
          ? 'border-[#F59E0B] bg-[#F59E0B]/10 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
          : card
          ? 'border-[#7C3AED]/50 bg-[#0A090D]'
          : 'border-[#2A2634] bg-[#0A090D] hover:border-[#94A3B8]/40'
      }`}
    >
      <span className="text-[10px] font-mono text-[#F59E0B] uppercase tracking-widest absolute top-2 left-3">
        {slotLabel}
      </span>

      {card ? (
        <div className="text-center space-y-1 pt-2">
          <div className="text-3xl">{card.symbol}</div>
          <div className="text-xs font-bold text-white uppercase">{card.name}</div>
          <div className="text-[10px] font-mono text-[#94A3B8]">{card.meaning}</div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveCard(slotIndex);
            }}
            className="mt-2 text-[10px] font-mono text-[#FF4D4D] underline hover:text-white"
          >
            Clear Slot
          </button>
        </div>
      ) : (
        <div className="text-center space-y-1 text-[#94A3B8]">
          <HelpCircle className="w-6 h-6 mx-auto opacity-40" />
          <p className="text-xs">Click deck to select {slotLabel} card</p>
        </div>
      )}
    </div>
  );
}