import { useEffect, useState } from 'react';
import { PlanResult } from '../types/result';
import { UserInput } from '../types/user';
import { loadStoredState, saveStoredState, StoredState, isPlanResult, isUserInput } from './storage';

interface SafeStoredState extends StoredState {
  isValid: boolean;
}

export const useStoredPlan = () => {
  const [state, setState] = useState<SafeStoredState>({
    input: null,
    result: null,
    isValid: true
  });

  useEffect(() => {
    const stored = loadStoredState();
    setState({ ...stored, isValid: Boolean(stored.input || stored.result) || stored.input === null });
  }, []);

  const persist = (input: UserInput | null, result: PlanResult | null) => {
    const next: StoredState = { input, result };
    saveStoredState(next);
    setState({ ...next, isValid: true });
  };

  const hydrate = (raw: unknown) => {
    if (!raw || typeof raw !== 'object') {
      setState({ input: null, result: null, isValid: false });
      return;
    }
    const candidate = raw as StoredState;
    if (candidate.input && !isUserInput(candidate.input)) {
      setState({ input: null, result: null, isValid: false });
      return;
    }
    if (candidate.result && !isPlanResult(candidate.result)) {
      setState({ input: null, result: null, isValid: false });
      return;
    }
    persist(candidate.input ?? null, candidate.result ?? null);
  };

  return { state, persist, hydrate };
};
