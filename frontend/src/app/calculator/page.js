'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Compass, 
  Sparkles, 
  ArrowRight, 
  Loader2, 
  AlertCircle 
} from 'lucide-react';
import { saveCalculationResult } from '@/utils/storage';
import { apiFetch } from '@/utils/api';
import { useAuth } from '@/context/AuthContext';

export default function CalculatorPage() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  // Inputs matching contract: decision (required), price (optional), mood (text), trigger (optional text)
  const [decision, setDecision] = useState('');
  const [price, setPrice] = useState('');
  const [mood, setMood] = useState('');
  const [trigger, setTrigger] = useState('');

  // UI State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Protect route client-side if user is unauthenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth?redirectTo=/calculator');
    }
  }, [isAuthenticated, loading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!decision.trim()) {
      setError('Decision text is required.');
      return;
    }

    if (!mood.trim()) {
      setError('Current mood is required.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    const payload = {
      decision: decision.trim(),
      price: price !== '' ? parseFloat(price) : null,
      mood: mood.trim(),
      trigger: trigger.trim() || null,
    };

    try {
      // POST request sent to http://localhost:8080/api/regrets/analyze via Gateway
      const analyzeData = await apiFetch('/regrets/analyze', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      const saved = saveCalculationResult({
        decision,
        price: payload.price,
        mood: payload.mood,
        trigger: payload.trigger,
        ...analyzeData,
      });

      router.push(`/result/${saved.id || saved.calculationId}`);
    } catch (err) {
      console.error('Backend analysis request failed:', err);
      setError(
        err.message || 'Unable to connect to the Orakle service. Please ensure all backend microservices are running.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A090D] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#F59E0B] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A090D] text-[#E2E8F0] px-4 py-8 md:py-12 flex flex-col items-center">
      <div className="max-w-xl w-full space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/40 text-xs font-mono text-[#F59E0B]">
            <Compass className="w-3.5 h-3.5" />
            <span>Orakle Assessment</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-wide">
            Consult The Orakle
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            Enter your decision details to calculate your regret score and reveal your tarot reading.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-[#8B0000]/20 border border-[#8B0000] text-[#FF4D4D] text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-[#14121A] border border-[#2A2634] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-2 border-b border-[#2A2634] pb-4">
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            <h2 className="text-base font-bold text-white tracking-wide">Decision Inputs</h2>
          </div>

          <div className="space-y-5">
            {/* Decision Textarea */}
            <div>
              <label className="block text-xs font-mono text-[#94A3B8] uppercase mb-2">
                What decision or purchase are you considering?
              </label>
              <textarea
                value={decision}
                onChange={(e) => setDecision(e.target.value)}
                placeholder="e.g. Buying a new mechanical keyboard while late-night browsing"
                rows={3}
                className="w-full bg-[#0A090D] border border-[#2A2634] focus:border-[#F59E0B] rounded-xl px-4 py-3 text-sm text-white placeholder-[#94A3B8]/40 outline-none transition-all resize-none"
                required
              />
            </div>

            {/* Price (Optional) */}
            <div>
              <label className="block text-xs font-mono text-[#94A3B8] uppercase mb-2">
                Price / Cost ($) <span className="text-[#94A3B8]/60">(Optional)</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="w-full bg-[#0A090D] border border-[#2A2634] focus:border-[#F59E0B] rounded-xl px-4 py-3 text-sm text-white placeholder-[#94A3B8]/40 outline-none transition-all"
              />
            </div>

            {/* Mood Input */}
            <div>
              <label className="block text-xs font-mono text-[#94A3B8] uppercase mb-2">
                Current Mood *
              </label>
              <input
                type="text"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                placeholder="e.g. Exhausted, anxious, euphoric, burnt out"
                className="w-full bg-[#0A090D] border border-[#2A2634] focus:border-[#F59E0B] rounded-xl px-4 py-3 text-sm text-white placeholder-[#94A3B8]/40 outline-none transition-all"
                required
              />
            </div>

            {/* Trigger Text Input */}
            <div>
              <label className="block text-xs font-mono text-[#94A3B8] uppercase mb-2">
                Decision Trigger
              </label>
              <input
                type="text"
                value={trigger}
                onChange={(e) => setTrigger(e.target.value)}
                placeholder="e.g. Saw an Instagram ad or feeling burnt out"
                className="w-full bg-[#0A090D] border border-[#2A2634] focus:border-[#F59E0B] rounded-xl px-4 py-3 text-sm text-white placeholder-[#94A3B8]/40 outline-none transition-all"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-[#0A090D] font-extrabold text-sm py-4 rounded-xl shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>The Orakle is deliberating...</span>
                </>
              ) : (
                <>
                  <span>Consult The Orakle</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}