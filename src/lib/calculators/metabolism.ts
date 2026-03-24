import { activityMultipliers } from '../../config/nutrition';
import { UserInput } from '../../types/user';

/**
 * Mifflin-St Jeor 公式计算 BMR。
 */
export const calculateBMR = (input: Pick<UserInput, 'gender' | 'weight' | 'height' | 'age'>): number => {
  const { gender, weight, height, age } = input;
  const base = 10 * weight + 6.25 * height - 5 * age;
  return gender === 'male' ? base + 5 : base - 161;
};

/**
 * 基于活动水平计算 TDEE。
 */
export const calculateTDEE = (
  bmr: number,
  activityLevel: UserInput['activityLevel']
): number => {
  const multiplier = activityMultipliers[activityLevel];
  return bmr * multiplier;
};
