// src/utils/storage.js

const HISTORY_KEY = 'regret_analysis_history';
const CURRENT_RESULT_KEY = 'regret_analysis_result';

export function saveCalculationResult(resultData) {
  if (typeof window === 'undefined') return;

  const entry = {
    id: resultData.id || `calc_${Date.now()}`,
    decision: resultData.decision || 'Untitled Decision',
    regret_score: resultData.regret_score ?? 0,
    verdict: resultData.verdict || 'Undetermined',
    reasoning: resultData.reasoning || '',
    risk_factors: resultData.risk_factors || [],
    tarot: resultData.tarot || null,
    remedies: resultData.remedies || [],
    date: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
  };

  // 1. Set current active result
  localStorage.setItem(CURRENT_RESULT_KEY, JSON.stringify(entry));

  // 2. Prepend to history array
  const existingHistory = getCalculationHistory();
  const updatedHistory = [entry, ...existingHistory.filter((item) => item.id !== entry.id)];

  localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));

  return entry;
}

export function getCalculationHistory() {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to parse history from localStorage', e);
    return [];
  }
}

export function clearCalculationHistory() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(HISTORY_KEY);
  localStorage.removeItem(CURRENT_RESULT_KEY);
}