'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  History, 
  ArrowLeft, 
  Trash2, 
  Compass, 
  ExternalLink, 
  Loader2, 
  AlertCircle 
} from 'lucide-react';
import { getCalculationHistory, clearCalculationHistory } from '@/utils/storage';
import { apiFetch } from '@/utils/api';
import { useAuth } from '@/context/AuthContext';

export default function HistoryPage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth?redirectTo=/history');
      return;
    }

    async function fetchHistory() {
      setLoading(true);
      setError('');

      try {
        // Try fetching history records from Spring Gateway
        const remoteHistory = await apiFetch('/regrets');
        if (Array.isArray(remoteHistory)) {
          setHistory(remoteHistory);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Backend history fetch failed, reading local storage:', err);
      }

      // Fallback to local storage
      const localHistory = getCalculationHistory();
      setHistory(localHistory);
      setLoading(false);
    }

    if (isAuthenticated) {
      fetchHistory();
    }
  }, [isAuthenticated, authLoading, router]);

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your local history?')) {
      clearCalculationHistory();
      setHistory([]);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#0A090D] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#7C3AED] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A090D] text-[#E2E8F0] px-4 py-8 md:py-12 flex flex-col items-center">
      <div className="max-w-4xl w-full space-y-8">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-[#2A2634] pb-4">
          <Link
            href="/calculator"
            className="flex items-center gap-2 text-sm font-mono text-[#94A3B8] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Calculator</span>
          </Link>

          {history.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="flex items-center gap-2 bg-[#8B0000]/20 border border-[#8B0000]/50 text-[#FF4D4D] px-3 py-1.5 rounded-xl text-xs font-mono hover:bg-[#8B0000]/40 transition-all cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#7C3AED]/15 border border-[#7C3AED]/30 text-xs font-mono text-[#A78BFA]">
            <History className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>Previous Assessments</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-wide">
            Decision History
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            Review your past Orakle assessments and regret scores.
          </p>
        </div>

        {/* History List */}
        {history.length === 0 ? (
          <div className="bg-[#14121A] border border-[#2A2634] rounded-2xl p-12 text-center space-y-4">
            <Compass className="w-12 h-12 text-[#94A3B8]/40 mx-auto" />
            <h2 className="text-base font-bold text-white">No history records found</h2>
            <p className="text-xs text-[#94A3B8] max-w-sm mx-auto">
              You have not submitted any decisions yet. Consult the Orakle to generate your first assessment.
            </p>
            <Link
              href="/calculator"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#F59E0B] text-[#0A090D] font-extrabold rounded-xl text-xs"
            >
              Consult Orakle
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => {
              const score = item.regret_score ?? item.regretScore ?? 0;
              const dateStr = item.date || (item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent');

              return (
                <div
                  key={item.id}
                  className="bg-[#14121A] border border-[#2A2634] hover:border-[#7C3AED]/50 rounded-2xl p-5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg"
                >
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#94A3B8] uppercase">{dateStr}</span>
                      {item.mood && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#7C3AED]/20 text-[#A78BFA]">
                          Mood: {item.mood}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-white">{item.decision}</h3>
                    {item.verdict && (
                      <p className="text-xs text-[#94A3B8] italic">{item.verdict}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-[#2A2634] pt-3 md:pt-0">
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-[#94A3B8] uppercase block">Regret Index</span>
                      <span className="text-2xl font-black text-[#FF4D4D] font-mono">{score} / 100</span>
                    </div>

                    <Link
                      href={`/result/${item.id}`}
                      className="p-3 bg-[#2A2634] hover:bg-[#7C3AED] text-white rounded-xl transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}