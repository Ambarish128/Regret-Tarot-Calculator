'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';

const ANSWER_TO_SCORE = {
  'strongly disagree': 1,
  'disagree': 2,
  'neutral': 3,
  'agree': 4,
  'strongly agree': 5,
};

const OPTIONS = [
  { label: 'Strongly Disagree', value: 1 },
  { label: 'Disagree', value: 2 },
  { label: 'Neutral', value: 3 },
  { label: 'Agree', value: 4 },
  { label: 'Strongly Agree', value: 5 },
];

const ONBOARDING_QUESTIONS = [
  "I often spend time second-guessing decisions I made in the past.",
  "I consider potential financial risk before making impulse purchases.",
  "My mood significantly influences whether I regret a decision later.",
  "I seek outside perspectives or advice when feeling uncertain about a choice.",
  "I tend to feel immediate buyer's remorse after purchasing non-essential items."
];

const normalizeScore = (answer) => {
  if (typeof answer === 'number' && answer >= 1 && answer <= 5) {
    return answer;
  }
  if (typeof answer === 'string') {
    const lower = answer.trim().toLowerCase();
    if (ANSWER_TO_SCORE[lower] !== undefined) {
      return ANSWER_TO_SCORE[lower];
    }
  }
  return parseInt(answer, 10) || 3;
};

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const currentQuestionText = ONBOARDING_QUESTIONS[currentStep];

  const handleSelectOption = (scoreValue) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionText]: normalizeScore(scoreValue),
    }));
  };

  const submitFinalPayload = async (rawAnswers) => {
    setIsSubmitting(true);
    setErrorMessage('');

    const formattedResponses = {};
    ONBOARDING_QUESTIONS.forEach((questionText, index) => {
      const questionKey = `${index + 1}. ${questionText}`;
      const score = rawAnswers[questionText] !== undefined 
        ? normalizeScore(rawAnswers[questionText]) 
        : 3;
      
      formattedResponses[questionKey] = score;
    });

    let success = false;

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ responses: formattedResponses })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.warn('API submission response not OK:', errorData);
        // Fallback to local persistence if API fails or isn't connected
        if (typeof window !== 'undefined') {
          localStorage.setItem('onboarding_responses', JSON.stringify(formattedResponses));
        }
      }
      
      success = true;
    } catch (err) {
      console.warn('Network or server failure, using local storage fallback:', err);
      if (typeof window !== 'undefined') {
        localStorage.setItem('onboarding_responses', JSON.stringify(formattedResponses));
      }
      success = true; // Mark true so app gracefully proceeds
    } finally {
      setIsSubmitting(false);
    }

    return success;
  };

  const handleSubmitAnswer = async () => {
    if (answers[currentQuestionText] === undefined) return;

    if (currentStep < ONBOARDING_QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      const isOk = await submitFinalPayload(answers);
      if (isOk) {
        router.push('/calculator');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A090D] text-[#E2E8F0] flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full bg-[#14121A] border border-[#2A2634] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header Progress */}
        <div className="flex items-center justify-between border-b border-[#2A2634] pb-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[#A78BFA]">
            Assessment Step {currentStep + 1} of {ONBOARDING_QUESTIONS.length}
          </span>
          <span className="text-xs font-mono text-[#94A3B8]">
            {Math.round(((currentStep + 1) / ONBOARDING_QUESTIONS.length) * 100)}%
          </span>
        </div>

        {/* Question Text */}
        <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
          {currentQuestionText}
        </h2>

        {/* Option Selection */}
        <div className="space-y-3">
          {OPTIONS.map((opt) => {
            const isSelected = answers[currentQuestionText] === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelectOption(opt.value)}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-[#7C3AED]/20 border-[#7C3AED] text-white shadow-glow-purple'
                    : 'bg-[#0A090D] border-[#2A2634] text-[#E2E8F0]/80 hover:border-[#7C3AED]/50'
                }`}
              >
                <span>{opt.label}</span>
                <span className="text-xs font-mono text-[#94A3B8]">[{opt.value}]</span>
              </button>
            );
          })}
        </div>

        {/* Error message display */}
        {errorMessage && (
          <p className="text-xs font-mono text-[#FF4D4D] text-center bg-[#8B0000]/20 p-2.5 rounded-lg border border-[#8B0000]">
            {errorMessage}
          </p>
        )}

        {/* Navigation Button */}
        <button
          type="button"
          onClick={handleSubmitAnswer}
          disabled={answers[currentQuestionText] === undefined || isSubmitting}
          className="w-full flex items-center justify-center gap-2 bg-[#8B0000] hover:bg-[#8B0000]/80 disabled:bg-[#1E1B26] text-white font-semibold text-sm py-3.5 rounded-xl border border-[#8B0000] shadow-glow-red transition-all cursor-pointer disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Submitting Assessment...</span>
            </>
          ) : currentStep < ONBOARDING_QUESTIONS.length - 1 ? (
            <>
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Complete Assessment</span>
            </>
          )}
        </button>

      </div>
    </div>
  );
}