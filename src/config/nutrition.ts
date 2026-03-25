import { ActivityLevel, BodyType, TrainingLevel } from '../types/user';

export const activityMultipliers: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  high: 1.725,
  very_high: 1.9
};

export const carbFactorsByBodyType: Record<BodyType, number> = {
  endomorph: 2.0,
  mesomorph: 2.5,
  ectomorph: 3.0
};

export const proteinFactorsByTrainingLevel: Record<TrainingLevel, number> = {
  none: 0.8,
  beginner: 1.0,
  intermediate: 1.2,
  advanced: 1.5
};

export const weeklyDayCounts = {
  high: 2,
  medium: 3,
  low: 2
} as const;

export const weeklyCarbRatios = {
  high: 0.5,
  medium: 0.35,
  low: 0.15
} as const;

export const weeklyFatRatios = {
  high: 0.15,
  medium: 0.35,
  low: 0.5
} as const;

export const kcalPerMacro = {
  carbs: 4,
  protein: 4,
  fat: 9
} as const;

export const foodCarbDensityPer100g = {
  rice: 25,
  mantou: 50,
  pumpkin: 4.4
} as const;
