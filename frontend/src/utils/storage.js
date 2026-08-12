// src/utils/storage.js

const HISTORY_KEY = 'regret_analysis_history';
const CURRENT_RESULT_KEY = 'regret_analysis_result';

export function saveCalculationResult(resultData) {
  if (typeof window === 'undefined') return {};

  const id = resultData.id || resultData.calculationId || `calc_${Date.now()}`;

  const entry = {
    id,
    decision: resultData.decision || 'Untitled Decision',
    price: resultData.price ?? null,
    mood: resultData.mood || '',
    trigger: resultData.trigger || null,
    regret_score: resultData.regret_score ?? resultData.regretScore ?? 0,
    verdict: resultData.verdict || 'Undetermined',
    reasoning: resultData.reasoning || '',
    risk_factors: resultData.risk_factors || resultData.riskFactors || [],
    tarot: resultData.tarot || null,
    remedies: resultData.remedies || [],
    createdAt: resultData.createdAt || new Date().toISOString(),
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

export function getCalculationResultById(id) {
  if (typeof window === 'undefined') return null;

  if (id === 'current') {
    const current = localStorage.getItem(CURRENT_RESULT_KEY);
    return current ? JSON.parse(current) : null;
  }

  const history = getCalculationHistory();
  return history.find((item) => String(item.id) === String(id)) || null;
}

export function clearCalculationHistory() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(HISTORY_KEY);
  localStorage.removeItem(CURRENT_RESULT_KEY);
}