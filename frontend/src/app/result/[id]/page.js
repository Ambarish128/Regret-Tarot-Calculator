'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Sparkles, 
  ArrowLeft, 
  Loader2, 
  ShieldAlert, 
  Sparkle, 
  History, 
  RefreshCw, 
  CheckCircle2, 
  Lightbulb,
  AlertCircle
} from 'lucide-react';
import { apiFetch } from '@/utils/api';
import { getCalculationResultById } from '@/utils/storage';

export default function ResultPage() {
  const params = useParams();
  const resultId = params?.id || 'current';

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadResult() {
      setLoading(true);
      setError('');

      try {
        // 1. Check local storage if ID matches recent or current session
        const localData = getCalculationResultById(resultId);
        
        if (localData) {
          setResult(localData);
          setLoading(false);
          return;
        }

        // 2. Fetch directly from backend if ID is specified and not present locally
        if (resultId && resultId !== 'current') {
          const apiData = await apiFetch(`/regrets/${resultId}`);
          setResult(apiData);
        } else {
          setError('No calculation result found. Please submit a new assessment.');
        }
      } catch (err) {
        console.error('Failed to load result:', err);
        setError(err.message || 'Unable to retrieve calculation result from server.');
      } finally {
        setLoading(false);
      }
    }

    loadResult();
  }, [resultId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A090D] text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#7C3AED]" />
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-[#0A090D] text-white flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#14121A] border border-[#2A2634] rounded-2xl p-6 text-center space-y-4">
          <AlertCircle className="w-10 h-10 text-[#FF4D4D] mx-auto" />
          <h2 className="text-lg font-bold">Result Not Found</h2>
          <p className="text-xs text-[#94A3B8]">{error || 'Unable to locate this assessment.'}</p>
          <Link
            href="/calculator"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#F59E0B] text-[#0A090D] rounded-xl text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Calculator</span>
          </Link>
        </div>
      </div>
    );
  }

  const tarotData = result.tarot;
  const remedies = result.remedies || [];

  return (
    <div className="min-h-screen bg-[#0A090D] text-[#E2E8F0] px-4 py-8 md:py-12 flex flex-col items-center">
      <div className="max-w-5xl w-full space-y-10">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-[#2A2634] pb-4">
          <Link
            href="/calculator"
            className="flex items-center gap-2 text-sm font-mono text-[#94A3B8] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>New Decision</span>
          </Link>

          <Link
            href="/history"
            className="flex items-center gap-2 bg-[#7C3AED]/10 border border-[#7C3AED]/40 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#A78BFA] hover:bg-[#7C3AED]/20 transition-all"
          >
            <History className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>View History</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C3AED]/15 border border-[#7C3AED]/30 text-xs font-mono text-[#A78BFA]">
            <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>Orakle Guidance & Analysis</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-wide">
            Divination & Orakle Verdict
          </h1>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto">
            Analysis for: <span className="text-white italic">"{result.decision}"</span>
          </p>
        </div>

        {/* SECTION 1: 3-CARD TAROT SPREAD */}
        {tarotData && (
          <div className="space-y-6 pt-2">
            <div className="flex items-center justify-center gap-2 text-[#A78BFA]">
              <Sparkle className="w-5 h-5 text-[#F59E0B]" />
              <h2 className="text-xl font-bold text-white tracking-wide">3-Card Tarot Divination</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              
              {/* CARD 1: PAST */}
              {tarotData.past_card && (
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-full max-w-[260px] h-[360px] rounded-2xl border-2 border-[#F59E0B] bg-[#14121A] p-5 flex flex-col justify-between shadow-[0_0_25px_rgba(245,158,11,0.2)] transition-transform duration-300 hover:scale-105">
                    <div className="flex items-center justify-between text-xs font-mono text-[#F59E0B]">
                      <span>{tarotData.past_card.number || 'I'}</span>
                      <span className="uppercase tracking-widest">PAST</span>
                    </div>

                    <div className="my-auto flex flex-col items-center justify-center space-y-3 text-center">
                      <div className="w-16 h-16 rounded-full bg-[#2A2213] border border-[#F59E0B]/50 flex items-center justify-center text-3xl shadow-inner">
                        {tarotData.past_card.symbol || '📜'}
                      </div>
                      <h3 className="text-base font-bold text-white tracking-wider uppercase">
                        {tarotData.past_card.name}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F59E0B]/20 text-[#F59E0B]">
                        {tarotData.past_card.meaning}
                      </span>
                    </div>

                    <div className="text-center border-t border-[#F59E0B]/30 pt-2">
                      <p className="text-xs text-[#94A3B8] leading-tight">
                        {tarotData.past_card.tied_to_user}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#94A3B8] flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 text-[#F59E0B]" /> Position I: Past Focus
                  </span>
                </div>
              )}

              {/* CARD 2: PRESENT */}
              {tarotData.present_card && (
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-full max-w-[260px] h-[360px] rounded-2xl border-2 border-[#00F0FF] bg-[#14121A] p-5 flex flex-col justify-between shadow-[0_0_30px_rgba(0,240,255,0.25)] transition-transform duration-300 hover:scale-105 md:-translate-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-[#00F0FF]">
                      <span>{tarotData.present_card.number || 'II'}</span>
                      <span className="uppercase tracking-widest">PRESENT</span>
                    </div>

                    <div className="my-auto flex flex-col items-center justify-center space-y-3 text-center">
                      <div className="w-16 h-16 rounded-full bg-[#0E2433] border border-[#00F0FF]/50 flex items-center justify-center text-3xl shadow-inner">
                        {tarotData.present_card.symbol || '🏰⚡️'}
                      </div>
                      <h3 className="text-base font-bold text-white tracking-wider uppercase">
                        {tarotData.present_card.name}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00F0FF]/20 text-[#00F0FF]">
                        {tarotData.present_card.meaning}
                      </span>
                    </div>

                    <div className="text-center border-t border-[#00F0FF]/30 pt-2">
                      <p className="text-xs text-[#94A3B8] leading-tight">
                        {tarotData.present_card.tied_to_user}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#94A3B8] flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 text-[#00F0FF]" /> Position II: Present Focus
                  </span>
                </div>
              )}

              {/* CARD 3: FUTURE */}
              {tarotData.future_card && (
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-full max-w-[260px] h-[360px] rounded-2xl border-2 border-[#A78BFA] bg-[#14121A] p-5 flex flex-col justify-between shadow-[0_0_25px_rgba(167,139,250,0.2)] transition-transform duration-300 hover:scale-105">
                    <div className="flex items-center justify-between text-xs font-mono text-[#A78BFA]">
                      <span>{tarotData.future_card.number || 'III'}</span>
                      <span className="uppercase tracking-widest">FUTURE</span>
                    </div>

                    <div className="my-auto flex flex-col items-center justify-center space-y-3 text-center">
                      <div className="w-16 h-16 rounded-full bg-[#1E192B] border border-[#A78BFA]/50 flex items-center justify-center text-3xl shadow-inner">
                        {tarotData.future_card.symbol || '✨'}
                      </div>
                      <h3 className="text-base font-bold text-white tracking-wider uppercase">
                        {tarotData.future_card.name}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#A78BFA]/20 text-[#A78BFA]">
                        {tarotData.future_card.meaning}
                      </span>
                    </div>

                    <div className="text-center border-t border-[#A78BFA]/30 pt-2">
                      <p className="text-xs text-[#94A3B8] leading-tight">
                        {tarotData.future_card.tied_to_user}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#94A3B8] flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 text-[#A78BFA]" /> Position III: Future Outcome
                  </span>
                </div>
              )}

            </div>

            {/* Closing Reflection */}
            {tarotData.closing_reflection && (
              <div className="p-4 rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/30 text-center max-w-2xl mx-auto">
                <span className="text-xs font-mono text-[#A78BFA] uppercase block mb-1">Closing Reflection</span>
                <p className="text-xs sm:text-sm italic text-white">
                  "{tarotData.closing_reflection}"
                </p>
              </div>
            )}
          </div>
        )}

        {/* SECTION 2: REGRET ANALYSIS & Orakle JUDGMENT */}
        <div className="bg-[#14121A] border border-[#2A2634] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#2A2634] pb-6">
            <div>
              <span className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider block mb-1">
                Regret Index Score
              </span>
              <div className="text-4xl font-black text-[#FF4D4D] font-mono">
                {result.regret_score ?? result.regretScore ?? 0} <span className="text-xl text-[#94A3B8]">/ 100</span>
              </div>
            </div>
            
            {result.verdict && (
              <div className="bg-[#8B0000]/20 border border-[#8B0000] px-4 py-2 rounded-xl flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-[#FF4D4D]" />
                <span className="text-sm font-semibold text-white">{result.verdict}</span>
              </div>
            )}
          </div>

          {/* Reasoning */}
          {result.reasoning && (
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#A78BFA]">
                Orakle Reasoning
              </h3>
              <p className="text-sm text-[#E2E8F0]/90 leading-relaxed">
                {result.reasoning}
              </p>
            </div>
          )}

          {/* Risk Factors */}
          {result.risk_factors && result.risk_factors.length > 0 && (
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#A78BFA]">
                Identified Risk Factors
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {result.risk_factors.map((factor, idx) => (
                  <li 
                    key={idx}
                    className="p-3 rounded-xl bg-[#0A090D] border border-[#2A2634] text-xs text-[#94A3B8] flex items-start gap-2"
                  >
                    <span className="text-[#FF4D4D] font-bold">•</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* SECTION 3: REMEDY & ACTION PLAN */}
        {remedies.length > 0 && (
          <div className="bg-[#14121A] border border-[#10B981]/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-[0_0_25px_rgba(16,185,129,0.1)]">
            <div className="flex items-center gap-2.5 border-b border-[#2A2634] pb-4">
              <div className="p-2 rounded-xl bg-[#10B981]/20 border border-[#10B981]/50 text-[#10B981]">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white tracking-wide">Prescribed Remedy & Path Forward</h2>
                <p className="text-xs text-[#94A3B8]">Actionable steps to resolve anxiety and avert regret</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {remedies.map((remedy, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-xl bg-[#0A090D] border border-[#2A2634] space-y-2 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/30">
                      STEP 0{remedy.step || idx + 1}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]/60" />
                  </div>
                  <h3 className="text-sm font-semibold text-white pt-1">{remedy.title}</h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{remedy.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}