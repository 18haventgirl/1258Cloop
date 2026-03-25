export type Gender = 'male' | 'female';

export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'high' | 'very_high';

export type TrainingLevel = 'none' | 'beginner' | 'intermediate' | 'advanced';

export type BodyType = 'endomorph' | 'mesomorph' | 'ectomorph';

export interface UserInput {
  gender: Gender;
  age: number;
  height: number; // cm
  weight: number; // kg
  activityLevel: ActivityLevel;
  trainingLevel: TrainingLevel;
  bodyType: BodyType;
  goal?: 'fat_loss';
}
