'use client';

import React from 'react';
import { Clock, ShieldAlert, ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function HistoryCard({ entry, onSelect }) {
  const score = entry?.regret_score ?? entry?.regretScore ?? 0;

  // Dynamic status colors based on regret score severity
  const getSeverityBadge = (score) => {
    if (score >= 70) {
      return {
        bg: 'bg-[#8B0000]/20',
        border: 'border-[#8B0000]/50',
        text: 'text-[#FF4D4D]',
        icon: <ShieldAlert className="w-4 h-4 text-[#FF4D4D]" />,
      };
    }
    if (score >= 40) {
      return {
        bg: 'bg-[#F59E0B]/10',
        border: 'border-[#F59E0B]/40',
        text: 'text-[#F59E0B]',
        icon: <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />,
      };
    }
    return {
      bg: 'bg-[#10B981]/10',
      border: 'border-[#10B981]/40',
      text: 'text-[#10B981]',
      icon: <CheckCircle2 className="w-4 h-4 text-[#10B981]" />,
    };
  };

  const badgeStyle = getSeverityBadge(score);
  const formattedDate = entry?.date || (entry?.createdAt ? new Date(entry.createdAt).toLocaleDateString() : 'Recent');

  return (
    <div
      onClick={() => onSelect && onSelect(entry)}
      className="group bg-[#14121A] hover:bg-[#1A1722] border border-[#2A2634] hover:border-[#7C3AED]/50 rounded-2xl p-5 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(124,58,237,0.15)] flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      <div className="space-y-2 max-w-2xl">
        <div className="flex items-center gap-3 text-xs font-mono text-[#94A3B8]">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#A78BFA]" />
            {formattedDate}
          </span>
          {entry?.mood && (
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#7C3AED]/20 text-[#A78BFA] font-mono">
              Mood: {entry.mood}
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-white group-hover:text-[#A78BFA] transition-colors">
          "{entry?.decision || 'Untitled Decision'}"
        </h3>

        {entry?.reasoning && (
          <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed">
            {entry.reasoning}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between md:justify-end gap-4 sm:gap-6 border-t md:border-t-0 border-[#2A2634] pt-3 md:pt-0">
        <div className="text-right">
          <span className="text-[10px] font-mono text-[#94A3B8] uppercase block">Regret Index</span>
          <span className="text-xl font-black font-mono text-white">
            {score} <span className="text-xs text-[#94A3B8]">/100</span>
          </span>
        </div>

        {entry?.verdict && (
          <div className={`flex items-center gap-2 ${badgeStyle.bg} border ${badgeStyle.border} px-3 py-1.5 rounded-xl`}>
            {badgeStyle.icon}
            <span className={`text-xs font-semibold ${badgeStyle.text} whitespace-nowrap`}>
              {entry.verdict}
            </span>
          </div>
        )}

        <div className="p-2 rounded-xl bg-[#2A2634]/50 text-[#94A3B8] group-hover:text-white group-hover:bg-[#7C3AED]/30 transition-all">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}