
export interface CalorieBurnedInput {
  weight: number;
  weightUnit: 'kg' | 'lb';
  duration: number;
  durationUnit: 'min' | 'hr';
  activity: string;
  intensity?: 'low' | 'moderate' | 'high';
}

export interface CalorieBurnedResult {
  caloriesBurned: number;
  activity: string;
  duration: number;
  durationUnit: string;
  metabolicEquivalent: number;
}

interface ActivityMET {
  [key: string]: {
    low: number;
    moderate: number;
    high: number;
  };
}

// Metabolic Equivalent of Task (MET) values for various activities
const activityMETs: ActivityMET = {
  'walking': {
    low: 2.0,      // Casual stroll (< 2 mph)
    moderate: 3.5, // Brisk walk (3-4 mph)
    high: 5.0      // Very brisk walk (4.5-5 mph)
  },
  'running': {
    low: 6.0,      // Jogging (5 mph)
    moderate: 9.8, // Running (8 mph)
    high: 14.5     // Running fast (10+ mph)
  },
  'cycling': {
    low: 3.5,      // Leisure cycling (< 10 mph)
    moderate: 8.0, // Moderate cycling (12-14 mph)
    high: 12.0     // Vigorous cycling (16-19 mph)
  },
  'swimming': {
    low: 4.5,      // Leisurely swimming
    moderate: 7.0, // Moderate swimming
    high: 10.0     // Vigorous swimming
  },
  'weight_training': {
    low: 3.0,       // Light weight training
    moderate: 5.0,  // Moderate weight training
    high: 7.0       // Heavy weight training
  },
  'yoga': {
    low: 2.5,       // Hatha yoga
    moderate: 4.0,  // Power yoga
    high: 5.5       // Advanced power yoga
  },
  'dancing': {
    low: 3.0,       // Light dancing
    moderate: 5.0,  // Moderate dancing
    high: 7.0       // Vigorous dancing
  },
  'hiit': {
    low: 6.0,       // Light HIIT
    moderate: 8.5,  // Moderate HIIT
    high: 12.0      // Vigorous HIIT
  },
  'gardening': {
    low: 2.5,       // Light gardening
    moderate: 4.0,  // Moderate gardening
    high: 6.0       // Heavy gardening
  },
  'cleaning': {
    low: 2.0,       // Light cleaning
    moderate: 3.5,  // Moderate cleaning
    high: 4.5       // Heavy cleaning
  }
};

/**
 * Calculate calories burned during an activity
 */
export const calculateCaloriesBurned = (input: CalorieBurnedInput): CalorieBurnedResult => {
  const { weight, weightUnit, duration, durationUnit, activity, intensity = 'moderate' } = input;
  
  // Convert weight to kg if necessary
  const weightInKg = weightUnit === 'lb' ? weight * 0.453592 : weight;
  
  // Convert duration to hours
  const durationInHours = durationUnit === 'min' ? duration / 60 : duration;
  
  // Get MET value for the activity and intensity
  const activityKey = activity.toLowerCase().replace(' ', '_');
  const met = activityMETs[activityKey]?.[intensity] || 
              activityMETs['walking'][intensity]; // Default to walking if activity not found
  
  // Calculate calories burned using the MET formula
  // Calories = MET × weight (kg) × duration (hours)
  const caloriesBurned = met * weightInKg * durationInHours;
  
  return {
    caloriesBurned: Math.round(caloriesBurned),
    activity,
    duration,
    durationUnit,
    metabolicEquivalent: met
  };
};

/**
 * Get all available activity options
 */
export const getActivityOptions = (): string[] => {
  return Object.keys(activityMETs).map(key => 
    key.replace('_', ' ')
       .split(' ')
       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
       .join(' ')
  );
};

/**
 * Format calories to readable string
 */
export const formatCalories = (calories: number): string => {
  return calories.toLocaleString('en-US', {
    maximumFractionDigits: 0
  });
};
