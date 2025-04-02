
// Body Fat Percentage Calculation Utility

export interface BodyFatInput {
  weight: number;
  weightUnit: 'kg' | 'lb';
  height: number;
  heightUnit: 'cm' | 'in';
  age: number;
  gender: 'male' | 'female';
  waist: number;
  neck: number;
  hip: number;
  chest: number;
  thigh: number;
  abdominal: number;
  measurementUnit: 'cm' | 'in';
}

export interface BodyFatResult {
  bodyFatPercentage: number;
  fatMass: number;
  leanMass: number;
  totalWeight: number;
  category: string;
  method: string;
}

/**
 * Calculates body fat percentage using various methods
 */
export const calculateBodyFatPercentage = (
  input: BodyFatInput,
  method: 'navy' | 'jackson-pollock' | 'three-site'
): BodyFatResult => {
  // Convert units if needed
  const weight = input.weightUnit === 'lb' ? input.weight * 0.453592 : input.weight; // Convert to kg
  const height = input.heightUnit === 'in' ? input.height * 2.54 : input.height; // Convert to cm
  
  const waist = input.measurementUnit === 'in' ? input.waist * 2.54 : input.waist; // Convert to cm
  const neck = input.measurementUnit === 'in' ? input.neck * 2.54 : input.neck; // Convert to cm
  const hip = input.measurementUnit === 'in' ? input.hip * 2.54 : input.hip; // Convert to cm
  
  let bodyFatPercentage = 0;
  let methodName = '';
  
  // Calculate body fat percentage based on the selected method
  switch (method) {
    case 'navy':
      methodName = 'U.S. Navy Method';
      if (input.gender === 'male') {
        bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
      } else {
        bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
      }
      break;
    
    case 'jackson-pollock':
      methodName = 'Jackson-Pollock 3-Site Method';
      // For Jackson-Pollock, we need skinfold measurements
      // This is a simplified implementation; actual formula is more complex
      if (input.gender === 'male') {
        const sum = input.chest + input.abdominal + input.thigh;
        bodyFatPercentage = 1.10938 - (0.0008267 * sum) + (0.0000016 * sum * sum) - (0.0002574 * input.age);
        bodyFatPercentage = (4.95 / bodyFatPercentage - 4.5) * 100;
      } else {
        const sum = input.chest + input.abdominal + input.thigh; 
        bodyFatPercentage = 1.089733 - (0.0009245 * sum) + (0.0000025 * sum * sum) - (0.0000979 * input.age);
        bodyFatPercentage = (4.95 / bodyFatPercentage - 4.5) * 100;
      }
      break;
    
    case 'three-site':
      methodName = '3-Site Skinfold Method';
      // Simplified 3-site calculation
      if (input.gender === 'male') {
        const sum = input.chest + input.thigh + input.waist;
        bodyFatPercentage = 8.997 + 0.2468 * sum;
      } else {
        const sum = input.hip + input.thigh + input.waist;
        bodyFatPercentage = 10.47 + 0.2790 * sum;
      }
      break;
  }
  
  // Ensure the percentage is within reasonable bounds
  bodyFatPercentage = Math.max(2, Math.min(60, bodyFatPercentage));
  
  // Calculate fat mass and lean mass
  const fatMass = (bodyFatPercentage / 100) * weight;
  const leanMass = weight - fatMass;
  
  // Determine body fat category
  const category = getBodyFatCategory(bodyFatPercentage, input.gender);
  
  return {
    bodyFatPercentage,
    fatMass,
    leanMass,
    totalWeight: weight,
    category,
    method: methodName
  };
};

/**
 * Determines the body fat category based on percentage and gender
 */
export const getBodyFatCategory = (percentage: number, gender: 'male' | 'female'): string => {
  if (gender === 'male') {
    if (percentage < 6) return 'Essential Fat';
    if (percentage < 14) return 'Athletes';
    if (percentage < 18) return 'Fitness';
    if (percentage < 25) return 'Average';
    return 'Obese';
  } else {
    if (percentage < 14) return 'Essential Fat';
    if (percentage < 21) return 'Athletes';
    if (percentage < 25) return 'Fitness';
    if (percentage < 32) return 'Average';
    return 'Obese';
  }
};
