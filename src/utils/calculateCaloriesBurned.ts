
/**
 * Compatibility export for calories burned calculator
 */

export { 
  calculateCaloriesBurned, 
  activities,
  getActivityCategories 
} from './health/caloriesBurned';

// Define the interfaces with all required properties
export interface ActivityOption {
  id: string;
  name: string;
  met: number;
  category: string;
  description?: string;
}

export interface CaloriesBurnedInput {
  weight: number;
  duration: number;
  activity: string;
  // Add missing properties that the component is using
  weightUnit: 'kg' | 'lb';
  durationUnit: 'minutes' | 'hours';
  activityId: string;
  intensity?: 'low' | 'medium' | 'high';
  // Add properties required by implementation
  activityMet?: number;
  useMetric?: boolean;
}

export interface CaloriesBurnedResult {
  caloriesBurned: number;
  activity: string;
  // Add missing properties that the component is using
  activityName: string;
  duration: number;
  durationUnit: string;
  weightUsed: number;
  weightUnit: string;
  metValue: number;
  // Add properties required by implementation
  activityMet?: number;
  hourlyRate?: number;
  explanation?: string;
  formula?: string;
}

// Add missing helper functions and types
export enum ActivityFactor {
  Sedentary = 1.2,
  LightlyActive = 1.375,
  ModeratelyActive = 1.55,
  VeryActive = 1.725,
  ExtraActive = 1.9
}

export const getActivitiesByCategory = (): Record<string, ActivityOption[]> => {
  // Mock implementation - this will be replaced by actual implementation
  const categories: Record<string, ActivityOption[]> = {
    'Walking/Running': [
      { id: 'walking-moderate', name: 'Walking (moderate)', met: 3.5, category: 'Walking/Running' },
      { id: 'running-jogging', name: 'Jogging', met: 7.0, category: 'Walking/Running' }
    ],
    'Cycling': [
      { id: 'cycling-moderate', name: 'Cycling (moderate)', met: 8.0, category: 'Cycling' }
    ],
    'Swimming': [
      { id: 'swimming-freestyle', name: 'Swimming (freestyle)', met: 8.3, category: 'Swimming' }
    ]
  };
  
  return categories;
};

export const formatCalories = (calories: number): string => {
  return `${calories.toLocaleString()} calories`;
};

export const getDurationOptions = (): Array<{value: number, label: string}> => {
  return [
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 45, label: '45 minutes' },
    { value: 60, label: '1 hour' },
    { value: 90, label: '1.5 hours' },
    { value: 120, label: '2 hours' }
  ];
};

// Updated ExtendedCaloriesBurnedInput interface to match the durationUnit type
export interface ExtendedCaloriesBurnedInput extends Omit<CaloriesBurnedInput, 'durationUnit'> {
  weightUnit: 'kg' | 'lb';
  durationUnit: 'minutes' | 'hours'; // Changed from 'min' | 'hour' to match CaloriesBurnedInput
  activityId: string;
  intensity?: 'low' | 'medium' | 'high';
}

export interface ExtendedCaloriesBurnedResult extends CaloriesBurnedResult {
  activityName: string;
  duration: number;
  durationUnit: 'minutes' | 'hours'; // Changed from 'min' | 'hour'
  weightUsed: number;
  weightUnit: 'kg' | 'lb';
  metValue: number;
}
