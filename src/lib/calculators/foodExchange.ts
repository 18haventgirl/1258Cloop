import { foodCarbDensityPer100g } from '../../config/nutrition';
import { FoodExchangeExamples } from '../../types/result';

/**
 * 将碳水克数换算为食物重量（克）。
 */
export const convertCarbToFoodWeight = (carbGrams: number, carbPer100g: number): number => {
  return (carbGrams / carbPer100g) * 100;
};

export const generateFoodExchangeExamples = (carbGrams: number): FoodExchangeExamples => {
  return {
    riceGrams: convertCarbToFoodWeight(carbGrams, foodCarbDensityPer100g.rice),
    mantouGrams: convertCarbToFoodWeight(carbGrams, foodCarbDensityPer100g.mantou),
    pumpkinGrams: convertCarbToFoodWeight(carbGrams, foodCarbDensityPer100g.pumpkin)
  };
};
