import { PlanResult } from '../types/result';
import { UserInput } from '../types/user';

const STORAGE_KEY = 'kings-carb-cycle';

export interface StoredState {
  input: UserInput | null;
  result: PlanResult | null;
}

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const hasKeys = (value: Record<string, unknown>, keys: string[]) =>
  keys.every((key) => key in value);

export const isUserInput = (value: unknown): value is UserInput => {
  if (!isObject(value)) return false;
  return hasKeys(value, [
    'gender',
    'age',
    'height',
    'weight',
    'trainingLevel',
    'bodyType'
  ]);
};

export const isPlanResult = (value: unknown): value is PlanResult => {
  if (!isObject(value)) return false;
  return hasKeys(value, [
    'bmr',
    'tdee',
    'dailyBaseCarbs',
    'dailyBaseFat',
    'dailyProtein',
    'weeklyCarbs',
    'weeklyFat',
    'weeklyProtein',
    'highDay',
    'mediumDay',
    'lowDay'
  ]);
};

export const loadStoredState = (): StoredState => {
  if (typeof window === 'undefined') {
    return { input: null, result: null };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { input: null, result: null };
    const parsed = JSON.parse(raw) as StoredState;
    return {
      input: isUserInput(parsed.input) ? parsed.input : null,
      result: isPlanResult(parsed.result) ? parsed.result : null
    };
  } catch {
    return { input: null, result: null };
  }
};

export const saveStoredState = (state: StoredState) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore write failures
  }
};
