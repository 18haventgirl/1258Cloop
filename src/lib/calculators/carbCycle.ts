import {
  carbFactorsByBodyType,
  kcalPerMacro,
  proteinFactorsByTrainingLevel,
  weeklyCarbRatios,
  weeklyDayCounts,
  weeklyFatRatios
} from '../../config/nutrition';
import { UserInput } from '../../types/user';
import { MacroDay, PlanResult } from '../../types/result';
import { calculateBMR, calculateTDEE } from './metabolism';

/**
 * 每日基础碳水（克）
 */
export const calculateDailyBaseCarbs = (weight: number, bodyType: UserInput['bodyType']): number => {
  return weight * carbFactorsByBodyType[bodyType];
};

/**
 * 每日基础脂肪（克）
 */
export const calculateDailyBaseFat = (weight: number, fatFactor: number): number => {
  return weight * fatFactor;
};

/**
 * 每日固定蛋白质（克）
 */
export const calculateDailyProtein = (
  weight: number,
  trainingLevel: UserInput['trainingLevel']
): number => {
  return weight * proteinFactorsByTrainingLevel[trainingLevel];
};

export const calculateWeeklyMacros = (
  dailyCarbsBase: number,
  dailyFatBase: number,
  dailyProtein: number
) => {
  return {
    weeklyCarbs: dailyCarbsBase * 7,
    weeklyFat: dailyFatBase * 7,
    weeklyProtein: dailyProtein * 7
  };
};

export const calculateDayCalories = (day: MacroDay): number => {
  return day.carbs * kcalPerMacro.carbs + day.protein * kcalPerMacro.protein + day.fat * kcalPerMacro.fat;
};

export const calculateCarbCycleDays = (
  weeklyCarbs: number,
  weeklyFat: number,
  dailyProtein: number
) => {
  const highCarbDayCarbs = (weeklyCarbs * weeklyCarbRatios.high) / weeklyDayCounts.high;
  const mediumCarbDayCarbs = (weeklyCarbs * weeklyCarbRatios.medium) / weeklyDayCounts.medium;
  const lowCarbDayCarbs = (weeklyCarbs * weeklyCarbRatios.low) / weeklyDayCounts.low;

  const highCarbDayFat = (weeklyFat * weeklyFatRatios.high) / weeklyDayCounts.high;
  const mediumCarbDayFat = (weeklyFat * weeklyFatRatios.medium) / weeklyDayCounts.medium;
  const lowCarbDayFat = (weeklyFat * weeklyFatRatios.low) / weeklyDayCounts.low;

  const highDay: MacroDay = {
    carbs: highCarbDayCarbs,
    protein: dailyProtein,
    fat: highCarbDayFat,
    calories: 0
  };

  const mediumDay: MacroDay = {
    carbs: mediumCarbDayCarbs,
    protein: dailyProtein,
    fat: mediumCarbDayFat,
    calories: 0
  };

  const lowDay: MacroDay = {
    carbs: lowCarbDayCarbs,
    protein: dailyProtein,
    fat: lowCarbDayFat,
    calories: 0
  };

  highDay.calories = calculateDayCalories(highDay);
  mediumDay.calories = calculateDayCalories(mediumDay);
  lowDay.calories = calculateDayCalories(lowDay);

  return { highDay, mediumDay, lowDay };
};

export const generateCarbCyclePlan = (input: UserInput): Omit<PlanResult, 'foodExchangeExamples'> => {
  const bmr = calculateBMR(input);
  const tdee = calculateTDEE(bmr, input.activityLevel);

  const dailyBaseCarbs = calculateDailyBaseCarbs(input.weight, input.bodyType);
  const dailyBaseFat = calculateDailyBaseFat(input.weight, input.fatFactor);
  const dailyProtein = calculateDailyProtein(input.weight, input.trainingLevel);

  const { weeklyCarbs, weeklyFat, weeklyProtein } = calculateWeeklyMacros(
    dailyBaseCarbs,
    dailyBaseFat,
    dailyProtein
  );

  const { highDay, mediumDay, lowDay } = calculateCarbCycleDays(
    weeklyCarbs,
    weeklyFat,
    dailyProtein
  );

  return {
    bmr,
    tdee,
    dailyBaseCarbs,
    dailyBaseFat,
    dailyProtein,
    weeklyCarbs,
    weeklyFat,
    weeklyProtein,
    highDay,
    mediumDay,
    lowDay,
    notes: [
      '碳循环的核心是碳水与脂肪的反向波动，蛋白质保持固定。',
      '高碳日与低碳日总热量尽量接近，但仍会存在自然差异。',
      '这是减脂起始模板，后续需结合体重与状态微调。'
    ],
    warnings: []
  };
};
