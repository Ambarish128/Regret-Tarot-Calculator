// src/components/HistoryCard.jsx
'use flex';

import React from 'react';
import { Clock, ShieldAlert, ArrowRight } from 'lucide-react';

export default function HistoryCard({ entry, onSelect }) {
  return (
    <div
      onClick={() => onSelect(entry)}
      className="group bg-[#14121A] hover:bg-[#1A1722] border border-[#2A2634] hover:border-[#10B981]/50 rounded-2xl p-5 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      <div className="space-y-2 max-w-2xl">
        <div className="flex items-center gap-3 text-xs font-mono text-[#94A3B8]">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#10B981]" />
            {entry.date || 'Recent Entry'}
          </span>
        </div>

        <h3 className="text-base font-bold text-white group-hover:text-[#10B981] transition-colors">
          "{entry.decision}"
        </h3>

        <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed">
          {entry.reasoning}
        </p>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-[#2A2634] pt-3 md:pt-0">
        <div className="text-right">
          <span className="text-[10px] font-mono text-[#94A3B8] uppercase block">Regret Index</span>
          <span className="text-xl font-black font-mono text-[#FF4D4D]">
            {entry.regret_score} <span className="text-xs text-[#94A3B8]">/100</span>
          </span>
        </div>

        <div className="flex items-center gap-2 bg-[#8B0000]/20 border border-[#8B0000]/50 px-3 py-1.5 rounded-xl">
          <ShieldAlert className="w-4 h-4 text-[#FF4D4D]" />
          <span className="text-xs font-semibold text-white whitespace-nowrap">{entry.verdict}</span>
        </div>

        <div className="p-2 rounded-xl bg-[#2A2634]/50 text-[#94A3B8] group-hover:text-white group-hover:bg-[#10B981]/20 transition-all">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}