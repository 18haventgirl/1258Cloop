import { describe, it, expect } from 'vitest';
import { calculateBMR, calculateTDEE } from '../src/lib/calculators/metabolism';
import {
  calculateDailyBaseCarbs,
  calculateDailyBaseFat,
  calculateDailyProtein,
  calculateWeeklyMacros,
  calculateCarbCycleDays,
  calculateDayCalories
} from '../src/lib/calculators/carbCycle';
import { convertCarbToFoodWeight } from '../src/lib/calculators/foodExchange';

const closeTo = (value: number) => ({
  expect: (result: number) => expect(result).toBeCloseTo(value, 2)
});

describe('BMR 计算', () => {
  it('男性样例', () => {
    const bmr = calculateBMR({ gender: 'male', age: 30, height: 175, weight: 70 });
    closeTo(1648.75).expect(bmr);
  });

  it('女性样例', () => {
    const bmr = calculateBMR({ gender: 'female', age: 28, height: 165, weight: 55 });
    closeTo(1260.25).expect(bmr);
  });
});

describe('TDEE 计算', () => {
  it('不同活动水平', () => {
    const bmr = 1600;
    closeTo(1920).expect(calculateTDEE(bmr, 'sedentary'));
    closeTo(2200).expect(calculateTDEE(bmr, 'light'));
    closeTo(2480).expect(calculateTDEE(bmr, 'moderate'));
  });
});

describe('每日基础碳水', () => {
  it('内胚型', () => {
    closeTo(140).expect(calculateDailyBaseCarbs(70, 'endomorph'));
  });

  it('中胚型', () => {
    closeTo(175).expect(calculateDailyBaseCarbs(70, 'mesomorph'));
  });

  it('外胚型', () => {
    closeTo(210).expect(calculateDailyBaseCarbs(70, 'ectomorph'));
  });
});

describe('每日基础脂肪', () => {
  it('固定 1.0 g/kg', () => {
    closeTo(70).expect(calculateDailyBaseFat(70, 'endomorph'));
    closeTo(70).expect(calculateDailyBaseFat(70, 'mesomorph'));
    closeTo(70).expect(calculateDailyBaseFat(70, 'ectomorph'));
  });
});

describe('每日固定蛋白质', () => {
  it('无基础', () => {
    closeTo(56).expect(calculateDailyProtein(70, 'none'));
  });

  it('新手', () => {
    closeTo(70).expect(calculateDailyProtein(70, 'beginner'));
  });

  it('中级', () => {
    closeTo(84).expect(calculateDailyProtein(70, 'intermediate'));
  });

  it('高级', () => {
    closeTo(105).expect(calculateDailyProtein(70, 'advanced'));
  });
});

describe('每周宏量总数', () => {
  it('weeklyCarbs/weeklyFat/weeklyProtein', () => {
    const weekly = calculateWeeklyMacros(175, 70, 84);
    closeTo(1225).expect(weekly.weeklyCarbs);
    closeTo(490).expect(weekly.weeklyFat);
    closeTo(588).expect(weekly.weeklyProtein);
  });
});

describe('高中低碳日分配', () => {
  it('分配正确', () => {
    const { highDay, mediumDay, lowDay } = calculateCarbCycleDays(1225, 490, 84);
    expect(highDay.carbs).toBeGreaterThan(mediumDay.carbs);
    expect(mediumDay.carbs).toBeGreaterThan(lowDay.carbs);

    expect(lowDay.fat).toBeGreaterThan(mediumDay.fat);
    expect(mediumDay.fat).toBeGreaterThan(highDay.fat);

    closeTo(highDay.protein).expect(mediumDay.protein);
    closeTo(highDay.protein).expect(lowDay.protein);

    closeTo(1225).expect(highDay.carbs * 2 + mediumDay.carbs * 3 + lowDay.carbs * 2);
    closeTo(490).expect(highDay.fat * 2 + mediumDay.fat * 3 + lowDay.fat * 2);
  });
});

describe('热量计算', () => {
  it('calories = carbs * 4 + protein * 4 + fat * 9', () => {
    const day = { carbs: 200, protein: 120, fat: 60, calories: 0 };
    closeTo(200 * 4 + 120 * 4 + 60 * 9).expect(calculateDayCalories(day));
  });
});

describe('食物换算', () => {
  it('米饭换算', () => {
    closeTo(200).expect(convertCarbToFoodWeight(50, 25));
  });

  it('馒头换算', () => {
    closeTo(100).expect(convertCarbToFoodWeight(50, 50));
  });

  it('南瓜换算', () => {
    closeTo(1136.36).expect(convertCarbToFoodWeight(50, 4.4));
  });
});

describe('边界值测试', () => {
  it('极低体重', () => {
    closeTo(60).expect(calculateDailyBaseCarbs(30, 'mesomorph'));
  });

  it('极高体重', () => {
    closeTo(625).expect(calculateDailyBaseCarbs(250, 'mesomorph'));
  });

  it('最小年龄', () => {
    const bmr = calculateBMR({ gender: 'male', age: 12, height: 140, weight: 35 });
    expect(bmr).toBeGreaterThan(0);
  });

  it('最大年龄', () => {
    const bmr = calculateBMR({ gender: 'female', age: 80, height: 160, weight: 50 });
    expect(bmr).toBeGreaterThan(0);
  });
});
