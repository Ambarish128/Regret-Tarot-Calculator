// src/app/history/page.js
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookOpen, Compass, Trash2, Sparkles } from 'lucide-react';
import HistoryCard from '@/components/HistoryCard';
import { getCalculationHistory, clearCalculationHistory } from '@/utils/storage';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setHistory(getCalculationHistory());
    setLoading(false);
  }, []);

  const handleClear = () => {
    clearCalculationHistory();
    setHistory([]);
  };

  const handleSelectResult = (item) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('regret_analysis_result', JSON.stringify(item));
      router.push(`/result/${item.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A090D] text-[#E2E8F0] px-4 py-8 md:py-12 flex flex-col items-center">
      <div className="max-w-5xl w-full space-y-8">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2634] pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-xs font-mono text-[#10B981]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Grimoire Archives</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
              Recent Regret Divinations
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Review past decision assessments and tribunal rulings stored in your Grimoire.
            </p>
          </div>

          {history.length > 0 && (
            <button
              onClick={handleClear}
              className="flex items-center gap-2 bg-[#1A1722] hover:bg-[#8B0000]/20 text-[#94A3B8] hover:text-[#FF4D4D] border border-[#2A2634] hover:border-[#8B0000]/50 px-4 py-2 rounded-xl text-xs font-mono transition-all self-start sm:self-auto cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Purge Grimoire</span>
            </button>
          )}
        </div>

        {/* History Cards */}
        {loading ? (
          <div className="p-12 text-center text-[#94A3B8] font-mono text-sm">
            Consulting archives...
          </div>
        ) : history.length === 0 ? (
          <div className="bg-[#14121A] border border-[#2A2634] rounded-2xl p-10 text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/30 flex items-center justify-center mx-auto text-[#7C3AED]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Your Grimoire is Empty</h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-md mx-auto">
              No recent regret calculations recorded. Perform a decision assessment in Divination to record your first entry.
            </p>
            <div className="pt-2">
              <Link
                href="/calculator"
                className="inline-flex items-center gap-2 bg-[#F59E0B]/20 border border-[#F59E0B] text-white px-5 py-2.5 rounded-xl text-xs font-mono shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:bg-[#F59E0B]/30 transition-all"
              >
                <Compass className="w-4 h-4 text-[#F59E0B]" />
                <span>Begin New Divination</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {history.map((entry) => (
              <HistoryCard key={entry.id} entry={entry} onSelect={handleSelectResult} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}