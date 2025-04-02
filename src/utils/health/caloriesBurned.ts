
/**
 * Calories burned calculation utility
 */

export interface ActivityOption {
  id: string;
  name: string;
  metValue: number;
  category: string;
}

export interface CaloriesBurnedInput {
  weight: number; // in kg
  duration: number; // in minutes
  activityMet: number;
  useMetric: boolean;
}

export interface CaloriesBurnedResult {
  caloriesBurned: number;
  activityMet: number;
  hourlyRate: number;
  explanation: string;
  formula: string;
}

// MET values reference: Compendium of Physical Activities
// A smaller representative list of common activities
export const activities: ActivityOption[] = [
  // Resting
  { id: 'sleep', name: 'Sleeping', metValue: 0.95, category: 'Resting' },
  { id: 'watch-tv', name: 'Watching TV', metValue: 1.0, category: 'Resting' },
  { id: 'reading', name: 'Reading', metValue: 1.3, category: 'Resting' },
  { id: 'standing', name: 'Standing', metValue: 1.5, category: 'Resting' },
  
  // Household
  { id: 'cooking', name: 'Cooking', metValue: 2.5, category: 'Household' },
  { id: 'cleaning', name: 'House Cleaning', metValue: 3.3, category: 'Household' },
  { id: 'gardening', name: 'Gardening', metValue: 4.0, category: 'Household' },
  { id: 'mowing', name: 'Mowing Lawn', metValue: 5.5, category: 'Household' },
  
  // Walking
  { id: 'walking-slow', name: 'Walking (slow, 2 mph)', metValue: 2.8, category: 'Walking' },
  { id: 'walking-moderate', name: 'Walking (moderate, 3 mph)', metValue: 3.5, category: 'Walking' },
  { id: 'walking-brisk', name: 'Walking (brisk, 4 mph)', metValue: 5.0, category: 'Walking' },
  { id: 'hiking', name: 'Hiking', metValue: 6.0, category: 'Walking' },
  
  // Running
  { id: 'jogging', name: 'Jogging (5 mph)', metValue: 8.3, category: 'Running' },
  { id: 'running-6mph', name: 'Running (6 mph)', metValue: 9.8, category: 'Running' },
  { id: 'running-8mph', name: 'Running (8 mph)', metValue: 11.8, category: 'Running' },
  { id: 'running-10mph', name: 'Running (10 mph)', metValue: 14.5, category: 'Running' },
  
  // Cycling
  { id: 'cycling-leisure', name: 'Cycling (leisure, 10 mph)', metValue: 6.8, category: 'Cycling' },
  { id: 'cycling-moderate', name: 'Cycling (moderate, 12-14 mph)', metValue: 8.0, category: 'Cycling' },
  { id: 'cycling-vigorous', name: 'Cycling (vigorous, 14-16 mph)', metValue: 10.0, category: 'Cycling' },
  { id: 'cycling-racing', name: 'Cycling (racing, 20+ mph)', metValue: 16.0, category: 'Cycling' },
  
  // Swimming
  { id: 'swimming-leisure', name: 'Swimming (leisure)', metValue: 6.0, category: 'Swimming' },
  { id: 'swimming-moderate', name: 'Swimming (moderate)', metValue: 8.3, category: 'Swimming' },
  { id: 'swimming-vigorous', name: 'Swimming (vigorous)', metValue: 10.0, category: 'Swimming' },
  
  // Sports
  { id: 'basketball', name: 'Basketball', metValue: 8.0, category: 'Sports' },
  { id: 'soccer', name: 'Soccer', metValue: 10.0, category: 'Sports' },
  { id: 'tennis', name: 'Tennis', metValue: 8.0, category: 'Sports' },
  { id: 'volleyball', name: 'Volleyball', metValue: 4.0, category: 'Sports' },
  { id: 'golf', name: 'Golf (walking, carrying clubs)', metValue: 4.3, category: 'Sports' },
  
  // Gym
  { id: 'weight-training', name: 'Weight Training', metValue: 5.0, category: 'Gym' },
  { id: 'elliptical', name: 'Elliptical Trainer', metValue: 7.0, category: 'Gym' },
  { id: 'stair-stepper', name: 'Stair Stepper', metValue: 9.0, category: 'Gym' },
  { id: 'aerobics', name: 'Aerobics', metValue: 7.3, category: 'Gym' },
  { id: 'yoga', name: 'Yoga', metValue: 3.0, category: 'Gym' },
  { id: 'pilates', name: 'Pilates', metValue: 3.5, category: 'Gym' }
];

export const getActivityCategories = (): string[] => {
  return Array.from(new Set(activities.map(a => a.category)));
};

export const getActivitiesByCategory = (category: string): ActivityOption[] => {
  return activities.filter(a => a.category === category);
};

export const calculateCaloriesBurned = (input: CaloriesBurnedInput): CaloriesBurnedResult => {
  // Convert weight to kg if necessary
  const weightInKg = input.useMetric ? input.weight : input.weight / 2.20462;
  
  // Use the MET formula: Calories = MET × weight (kg) × duration (hours)
  const durationInHours = input.duration / 60;
  const caloriesBurned = input.activityMet * weightInKg * durationInHours;
  const hourlyRate = input.activityMet * weightInKg;
  
  // Round to nearest whole number
  const roundedCalories = Math.round(caloriesBurned);
  
  // Prepare explanation and formula
  const explanation = `At a MET value of ${input.activityMet}, a person weighing ${input.useMetric ? weightInKg : input.weight} ${input.useMetric ? 'kg' : 'lbs'} burns approximately ${roundedCalories} calories in ${input.duration} minutes.`;
  
  const formula = `Calories = MET × Weight (kg) × Duration (hours)\nCalories = ${input.activityMet} × ${weightInKg.toFixed(1)} kg × ${durationInHours.toFixed(2)} hours = ${roundedCalories} calories`;
  
  return {
    caloriesBurned: roundedCalories,
    activityMet: input.activityMet,
    hourlyRate: Math.round(hourlyRate),
    explanation,
    formula
  };
};
