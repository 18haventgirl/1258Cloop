import { UserInput } from '../../types/user';
import { PlanResult } from '../../types/result';
import { generateCarbCyclePlan } from '../calculators/carbCycle';
import { generateFoodExchangeExamples } from '../calculators/foodExchange';

/**
 * 默认策略入口：返回完整计划结果。
 */
export const generatePlan = (input: UserInput): PlanResult => {
  const basePlan = generateCarbCyclePlan(input);

  return {
    ...basePlan,
    foodExchangeExamples: generateFoodExchangeExamples(basePlan.highDay.carbs)
  };
};
