
/**
 * Compatibility export for body fat percentage calculator
 */

export { calculateBodyFatPercentage } from './health/bodyFatPercentage';

// Define the interfaces properly with all required properties
export interface BodyFatInput {
  weight: number;
  height: number;
  age: number;
  gender: 'male' | 'female';
  waist: number;
  neck: number;
  hip: number;
  chest: number;
  thigh: number;
  abdominal: number;
  // Add the missing properties that the component is using
  weightUnit: 'kg' | 'lb';
  heightUnit: 'cm' | 'in';
  measurementUnit: 'cm' | 'in';
  method: 'navy' | 'bmi' | 'jackson'; // Add this field based on error
  useMetric: boolean; // Add this field based on error
}

export interface BodyFatResult {
  bodyFatPercentage: number;
  fatMass: number;
  leanMass: number;
  category: string;
  method: string;
  // Add the missing property that the component is using
  totalWeight: number;
  formula: string;
  healthRisk: 'low' | 'moderate' | 'high' | 'very high';
}

// Add missing helper function
export const getBodyFatCategory = (bodyFatPercentage: number, gender: 'male' | 'female'): string => {
  if (gender === 'male') {
    if (bodyFatPercentage < 6) return 'Essential Fat';
    if (bodyFatPercentage < 14) return 'Athletic';
    if (bodyFatPercentage < 18) return 'Fitness';
    if (bodyFatPercentage < 25) return 'Average';
    return 'Obese';
  } else {
    if (bodyFatPercentage < 16) return 'Essential Fat';
    if (bodyFatPercentage < 21) return 'Athletic';
    if (bodyFatPercentage < 25) return 'Fitness';
    if (bodyFatPercentage < 32) return 'Average';
    return 'Obese';
  }
};
