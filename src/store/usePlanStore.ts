import { create } from 'zustand';
import { PlanResult } from '../types/result';
import { UserInput } from '../types/user';
import { loadStoredState, saveStoredState } from '../lib/utils/storage';

interface PlanState {
  input: UserInput | null;
  result: PlanResult | null;
  setPlan: (input: UserInput, result: PlanResult) => void;
  clearPlan: () => void;
}

const stored = loadStoredState();

export const usePlanStore = create<PlanState>((set) => ({
  input: stored.input,
  result: stored.result,
  setPlan: (input, result) => {
    set({ input, result });
    saveStoredState({ input, result });
  },
  clearPlan: () => {
    set({ input: null, result: null });
    saveStoredState({ input: null, result: null });
  }
}));
