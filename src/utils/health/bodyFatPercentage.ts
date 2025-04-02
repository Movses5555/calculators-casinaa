
/**
 * Body fat percentage calculation utility
 */

export interface BodyFatInput {
  gender: 'male' | 'female';
  height: number; // in cm
  weight: number; // in kg
  neck: number; // in cm
  waist: number; // in cm
  hip?: number; // in cm (required for females)
  age?: number; // optional
  method: 'navy' | 'bmi' | 'jackson';
  useMetric: boolean;
  
  // For Jackson-Pollock method
  chest?: number; // in mm
  abdominal?: number; // in mm
  thigh?: number; // in mm
  triceps?: number; // in mm
  subscapular?: number; // in mm
  suprailiac?: number; // in mm
  midaxillary?: number; // in mm
}

export interface BodyFatResult {
  bodyFatPercentage: number;
  fatMass: number;
  leanMass: number;
  category: string;
  method: string;
  formula: string;
  healthRisk: 'low' | 'moderate' | 'high' | 'very high';
}

const cmToInches = (cm: number): number => cm / 2.54;
const kgToLbs = (kg: number): number => kg * 2.20462;
const lbsToKg = (lbs: number): number => lbs / 2.20462;
const inchesToCm = (inches: number): number => inches * 2.54;

export const calculateBodyFatPercentage = (input: BodyFatInput): BodyFatResult => {
  let bodyFatPercentage = 0;
  let formula = '';
  let methodName = '';
  
  // Convert measurements if needed
  const height = input.useMetric ? input.height : inchesToCm(input.height);
  const weight = input.useMetric ? input.weight : lbsToKg(input.weight);
  const neck = input.useMetric ? input.neck : inchesToCm(input.neck);
  const waist = input.useMetric ? input.waist : inchesToCm(input.waist);
  const hip = input.hip ? (input.useMetric ? input.hip : inchesToCm(input.hip)) : 0;
  
  switch (input.method) {
    case 'navy': {
      methodName = 'U.S. Navy Method';
      
      // Log values for debugging
      const logHeight = input.useMetric ? height : cmToInches(height);
      const logWeight = input.useMetric ? weight : kgToLbs(weight);
      const logNeck = input.useMetric ? neck : cmToInches(neck);
      const logWaist = input.useMetric ? waist : cmToInches(waist);
      const logHip = hip ? (input.useMetric ? hip : cmToInches(hip)) : 0;
      
      // Use the appropriate formula based on gender
      if (input.gender === 'male') {
        const heightInches = cmToInches(height);
        const waistInches = cmToInches(waist);
        const neckInches = cmToInches(neck);
        
        bodyFatPercentage = 86.01 * Math.log10(waistInches - neckInches) - 70.041 * Math.log10(heightInches) + 36.76;
        
        formula = `86.01 × log10(${waistInches.toFixed(1)} - ${neckInches.toFixed(1)}) - 70.041 × log10(${heightInches.toFixed(1)}) + 36.76 = ${bodyFatPercentage.toFixed(1)}%`;
      } else {
        if (!hip) {
          throw new Error('Hip measurement is required for females when using the Navy method');
        }
        
        const heightInches = cmToInches(height);
        const waistInches = cmToInches(waist);
        const neckInches = cmToInches(neck);
        const hipInches = cmToInches(hip);
        
        bodyFatPercentage = 163.205 * Math.log10(waistInches + hipInches - neckInches) - 97.684 * Math.log10(heightInches) - 78.387;
        
        formula = `163.205 × log10(${waistInches.toFixed(1)} + ${hipInches.toFixed(1)} - ${neckInches.toFixed(1)}) - 97.684 × log10(${heightInches.toFixed(1)}) - 78.387 = ${bodyFatPercentage.toFixed(1)}%`;
      }
      break;
    }
    
    case 'bmi': {
      methodName = 'BMI Method';
      
      // Calculate BMI first
      const heightMeters = height / 100;
      const bmi = weight / (heightMeters * heightMeters);
      
      // Use appropriate formula based on gender
      if (input.gender === 'male') {
        bodyFatPercentage = (1.2 * bmi) + (0.23 * (input.age || 25)) - 16.2;
      } else {
        bodyFatPercentage = (1.2 * bmi) + (0.23 * (input.age || 25)) - 5.4;
      }
      
      const ageText = input.age ? input.age.toString() : '25 (default)';
      formula = `BMI = ${weight.toFixed(1)} kg ÷ (${heightMeters.toFixed(2)} m)² = ${bmi.toFixed(1)}\n`;
      formula += input.gender === 'male'
        ? `1.2 × ${bmi.toFixed(1)} + 0.23 × ${ageText} - 16.2 = ${bodyFatPercentage.toFixed(1)}%`
        : `1.2 × ${bmi.toFixed(1)} + 0.23 × ${ageText} - 5.4 = ${bodyFatPercentage.toFixed(1)}%`;
      break;
    }
    
    case 'jackson': {
      methodName = 'Jackson-Pollock Method';
      
      if (input.gender === 'male') {
        if (!input.chest || !input.abdominal || !input.thigh) {
          throw new Error('Chest, abdominal, and thigh measurements are required for males when using the Jackson-Pollock method');
        }
        
        // Convert to mm if using metric (input expected in mm)
        const chest = input.chest;
        const abdominal = input.abdominal;
        const thigh = input.thigh;
        
        // Sum of the three skinfolds
        const sum = chest + abdominal + thigh;
        
        // Calculate body density
        const bodyDensity = 1.10938 - (0.0008267 * sum) + (0.0000016 * sum * sum) - (0.0002574 * (input.age || 25));
        
        // Convert body density to body fat percentage using Siri equation
        bodyFatPercentage = (4.95 / bodyDensity - 4.5) * 100;
        
        formula = `Sum of Skinfolds = ${chest} + ${abdominal} + ${thigh} = ${sum} mm\n`;
        formula += `Body Density = 1.10938 - (0.0008267 × ${sum}) + (0.0000016 × ${sum}²) - (0.0002574 × ${input.age || 25}) = ${bodyDensity.toFixed(4)}\n`;
        formula += `Body Fat % = (4.95 ÷ ${bodyDensity.toFixed(4)} - 4.5) × 100 = ${bodyFatPercentage.toFixed(1)}%`;
      } else {
        if (!input.triceps || !input.suprailiac || !input.thigh) {
          throw new Error('Triceps, suprailiac, and thigh measurements are required for females when using the Jackson-Pollock method');
        }
        
        // Convert to mm if using metric (input expected in mm)
        const triceps = input.triceps;
        const suprailiac = input.suprailiac;
        const thigh = input.thigh;
        
        // Sum of the three skinfolds
        const sum = triceps + suprailiac + thigh;
        
        // Calculate body density
        const bodyDensity = 1.0994921 - (0.0009929 * sum) + (0.0000023 * sum * sum) - (0.0001392 * (input.age || 25));
        
        // Convert body density to body fat percentage using Siri equation
        bodyFatPercentage = (4.95 / bodyDensity - 4.5) * 100;
        
        formula = `Sum of Skinfolds = ${triceps} + ${suprailiac} + ${thigh} = ${sum} mm\n`;
        formula += `Body Density = 1.0994921 - (0.0009929 × ${sum}) + (0.0000023 × ${sum}²) - (0.0001392 × ${input.age || 25}) = ${bodyDensity.toFixed(4)}\n`;
        formula += `Body Fat % = (4.95 ÷ ${bodyDensity.toFixed(4)} - 4.5) × 100 = ${bodyFatPercentage.toFixed(1)}%`;
      }
      break;
    }
    
    default:
      throw new Error('Invalid method');
  }
  
  // Ensure bodyFatPercentage is not negative
  bodyFatPercentage = Math.max(0, bodyFatPercentage);
  
  // Calculate fat mass and lean mass
  const fatMass = (bodyFatPercentage / 100) * weight;
  const leanMass = weight - fatMass;
  
  // Determine body fat category based on gender and body fat percentage
  let category = '';
  let healthRisk: 'low' | 'moderate' | 'high' | 'very high' = 'moderate';
  
  if (input.gender === 'male') {
    if (bodyFatPercentage < 6) {
      category = 'Essential Fat';
      healthRisk = 'moderate';
    } else if (bodyFatPercentage < 14) {
      category = 'Athletic';
      healthRisk = 'low';
    } else if (bodyFatPercentage < 18) {
      category = 'Fitness';
      healthRisk = 'low';
    } else if (bodyFatPercentage < 25) {
      category = 'Average';
      healthRisk = 'moderate';
    } else {
      category = 'Obese';
      healthRisk = bodyFatPercentage > 30 ? 'very high' : 'high';
    }
  } else {
    if (bodyFatPercentage < 16) {
      category = 'Essential Fat';
      healthRisk = 'moderate';
    } else if (bodyFatPercentage < 21) {
      category = 'Athletic';
      healthRisk = 'low';
    } else if (bodyFatPercentage < 25) {
      category = 'Fitness';
      healthRisk = 'low';
    } else if (bodyFatPercentage < 32) {
      category = 'Average';
      healthRisk = 'moderate';
    } else {
      category = 'Obese';
      healthRisk = bodyFatPercentage > 40 ? 'very high' : 'high';
    }
  }
  
  return {
    bodyFatPercentage,
    fatMass,
    leanMass,
    category,
    method: methodName,
    formula,
    healthRisk
  };
};
