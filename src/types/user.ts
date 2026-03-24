export type Gender = 'male' | 'female';

export type TrainingLevel = 'none' | 'beginner' | 'intermediate' | 'advanced';

export type BodyType = 'endomorph' | 'mesomorph' | 'ectomorph';

export interface UserInput {
  gender: Gender;
  age: number;
  height: number; // cm
  weight: number; // kg
  trainingLevel: TrainingLevel;
  bodyType: BodyType;
  goal?: 'fat_loss';
}
