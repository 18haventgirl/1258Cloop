import { z } from 'zod';

export const calculatorSchema = z.object({
  gender: z.enum(['male', 'female']),
  age: z.coerce.number().min(12, '年龄需在 12~80 之间').max(80, '年龄需在 12~80 之间'),
  height: z.coerce.number().min(120, '身高需在 120~230 cm 之间').max(230, '身高需在 120~230 cm 之间'),
  weight: z.coerce.number().min(30, '体重需在 30~250 kg 之间').max(250, '体重需在 30~250 kg 之间'),
  activityLevel: z.enum(['sedentary', 'light', 'moderate', 'high', 'very_high']),
  trainingLevel: z.enum(['none', 'beginner', 'intermediate', 'advanced']),
  bodyType: z.enum(['endomorph', 'mesomorph', 'ectomorph']),
  fatFactor: z.coerce
    .number()
    .min(0.5, '脂肪系数建议 0.5~1.5 g/kg')
    .max(1.5, '脂肪系数建议 0.5~1.5 g/kg')
});

export type CalculatorFormValues = z.infer<typeof calculatorSchema>;
