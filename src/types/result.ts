export interface MacroDay {
  carbs: number;
  protein: number;
  fat: number;
  calories: number;
}

export interface FoodExchangeExamples {
  riceGrams: number;
  mantouGrams: number;
  pumpkinGrams: number;
}

export interface PlanResult {
  bmr: number;
  tdee: number;
  dailyBaseCarbs: number;
  dailyBaseFat: number;
  dailyProtein: number;
  weeklyCarbs: number;
  weeklyFat: number;
  weeklyProtein: number;
  highDay: MacroDay;
  mediumDay: MacroDay;
  lowDay: MacroDay;
  notes: string[];
  warnings: string[];
  foodExchangeExamples: FoodExchangeExamples;
}
