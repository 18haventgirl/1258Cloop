import { UserInput } from '../../types/user';
import { generatePlan } from './defaultStrategy';

export const sampleInput: UserInput = {
  gender: 'male',
  age: 30,
  height: 175,
  weight: 70,
  activityLevel: 'moderate',
  trainingLevel: 'intermediate',
  bodyType: 'mesomorph',
  fatFactor: 1.0,
  goal: 'fat_loss'
};

export const getSampleOutput = () => generatePlan(sampleInput);
