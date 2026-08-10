'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Flame, Loader2 } from 'lucide-react';

// MOCK QUESTIONS (Will be fetched from DB later)
const MOCK_QUESTIONS = [
  {
    id: 'q1',
    category: 'Decision Framework',
    question: 'I often make significant life choices impulsively without consulting external opinions.'
  },
  {
    id: 'q2',
    category: 'Emotional Persistence',
    question: 'I tend to hold onto past decisions long after they have stopped yielding positive outcomes.'
  },
  {
    id: 'q3',
    category: 'Regret Index',
    question: 'I frequently replay past scenarios in my head wishing I had chosen a different path.'
  },
  {
    id: 'q4',
    category: 'Remediation Velocity',
    question: 'When I recognize a past mistake, I immediately pivot rather than dwell on the loss.'
  },
  {
    id: 'q5',
    category: 'Core Alignment',
    question: 'My feeling of regret is strongly driven by how other people view the outcome of my choices.'
  }
];

// 5-Point Likert Scale
const LIKERT_OPTIONS = [
  { label: 'Strongly Agree', value: 'STRONGLY_AGREE' },
  { label: 'Agree', value: 'AGREE' },
  { label: 'Neutral', value: 'NEUTRAL' },
  { label: 'Disagree', value: 'DISAGREE' },
  { label: 'Strongly Disagree', value: 'STRONGLY_DISAGREE' }
];

export default function OnboardingPage() {
  const router = useRouter();
  const [questions] = useState(MOCK_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [responses, setResponses] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];

  const progressPercentage = Math.round((responses.length / totalQuestions) * 100);

  const handleSelectOption = (selectedValue) => {
    setSelectedOption(selectedValue);
  };

  const handleSubmitAnswer = async () => {
    if (!selectedOption || isSubmitting) return;

    const updatedResponses = [...responses];
    const existingIndex = updatedResponses.findIndex(r => r.questionId === currentQuestion.id);

    const newEntry = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.question,
      category: currentQuestion.category,
      response: selectedOption
    };

    if (existingIndex > -1) {
      updatedResponses[existingIndex] = newEntry;
    } else {
      updatedResponses.push(newEntry);
    }

    setResponses(updatedResponses);

    if (currentIndex < totalQuestions - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);

      const nextResponse = updatedResponses.find(r => r.questionId === questions[nextIndex].id);
      setSelectedOption(nextResponse ? nextResponse.response : null);
    } else {
      // Final question submitted: Send API request and redirect to /calculator
      await submitFinalPayload(updatedResponses);
    }
  };

  const submitFinalPayload = async (finalPayload) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ responses: finalPayload })
      });

      if (!res.ok) {
        throw new Error('Failed to submit assessment responses.');
      }

      // Redirect immediately to calculator page
      router.push('/calculator');
    } catch (error) {
      console.error('Submission error:', error);
      // Fallback redirect if endpoint isn't set up yet
      router.push('/calculator');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0 && !isSubmitting) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);

      const prevResponse = responses.find(r => r.questionId === questions[prevIndex].id);
      setSelectedOption(prevResponse ? prevResponse.response : null);
    }
  };

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 md:px-8 lg:py-8 relative flex flex-col justify-between max-w-2xl lg:max-w-xl mx-auto">
      
      {/* Background Glow Effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-[#8B0000]/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[250px] sm:w-[300px] h-[250px] sm:h-[300px] bg-[#4C1D95]/10 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none" />

      {/* TOP STATUS BAR */}
      <header className="space-y-2 relative z-10 w-full">
        <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#94A3B8]">
          <span className="flex items-center gap-1.5 text-[#A78BFA]">
            <Flame className="w-3.5 h-3.5 text-[#FF4D4D]" />
            Onboarding
          </span>
          <span>
            {progressPercentage}% ({responses.length}/{totalQuestions})
          </span>
        </div>

        {/* Progress Bar Track */}
        <div className="w-full h-1.5 sm:h-2 bg-[#1A1722] border border-[#2A2634] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#8B0000] via-[#A78BFA] to-[#FF4D4D] rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          />
        </div>
      </header>

      {/* COMPACT QUESTION BOX */}
      <main className="my-auto py-6 sm:py-8 relative z-10 w-full">
        <div className="bg-[#14121A] border border-[#2A2634] rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 shadow-2xl space-y-5 sm:space-y-6 relative overflow-hidden">
          
          {/* Header step count (Category removed) */}
          <div className="flex items-center justify-end border-b border-[#2A2634] pb-3">
            <span className="text-[10px] sm:text-xs font-mono text-[#94A3B8]">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
          </div>

          {/* IN-PLACE QUESTION TRANSITION */}
          <div className="min-h-[64px] sm:min-h-[80px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-white leading-snug sm:leading-relaxed">
                  {currentQuestion.question}
                </h2>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 5-POINT LIKERT SCALE */}
          <div className="space-y-2 pt-1">
            <div className="grid grid-cols-1 gap-2">
              {LIKERT_OPTIONS.map((option) => {
                const isSelected = selectedOption === option.value;

                return (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: isSubmitting ? 1 : 1.005 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.995 }}
                    disabled={isSubmitting}
                    onClick={() => handleSelectOption(option.value)}
                    className={`w-full py-2.5 px-3.5 sm:py-3 sm:px-4 rounded-xl border text-left flex items-center justify-between transition-all duration-200 ${
                      isSubmitting ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
                    } ${
                      isSelected
                        ? 'bg-[#1E1B26] border-[#A78BFA] text-white shadow-glow-purple'
                        : 'bg-[#1A1722]/60 hover:bg-[#1E1B26] border-[#2A2634] hover:border-[#3B3548] text-[#E2E8F0]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'border-[#A78BFA] bg-[#A78BFA]'
                            : 'border-[#3B3548] bg-[#0A090D]'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#0A090D]" />}
                      </div>
                      <span className="font-medium text-xs sm:text-sm">
                        {option.label}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* ACTION CONTROLS & SUBMIT BUTTON */}
          <div className="flex items-center justify-between pt-4 border-t border-[#2A2634]">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0 || isSubmitting}
              className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-mono text-[#94A3B8] hover:text-white disabled:opacity-30 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              onClick={handleSubmitAnswer}
              disabled={!selectedOption || isSubmitting}
              className="inline-flex items-center gap-1.5 bg-[#8B0000] hover:bg-[#8B0000]/80 disabled:bg-[#1E1B26] disabled:text-[#64748B] disabled:border-[#2A2634] disabled:shadow-none text-white text-xs font-semibold px-4 py-2 rounded-xl border border-[#8B0000] shadow-glow-red transition-all cursor-pointer disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>{currentIndex === totalQuestions - 1 ? 'Submit & Finish' : 'Submit Answer'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>

        </div>
      </main>

      <footer className="text-center text-[10px] sm:text-xs font-mono text-[#94A3B8] relative z-10">
        <span>Orakle System &bull; Response Collector</span>
      </footer>

    </div>
  );
}