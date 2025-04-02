
/**
 * Pace calculation utility
 */

export interface PaceInput {
  calculationType: 'pace' | 'time' | 'distance';
  distance?: number;
  distanceUnit?: 'km' | 'mi';
  timeInSeconds?: number;
  paceInSeconds?: number;
  paceUnit?: 'min/km' | 'min/mi';
}

export interface PaceResult {
  distance: number;
  distanceUnit: 'km' | 'mi';
  paceMinutes: number;
  paceSeconds: number;
  paceUnit: 'min/km' | 'min/mi';
  hours: number;
  minutes: number;
  seconds: number;
}

export const formatTime = (hours: number, minutes: number, seconds: number): string => {
  const paddedHours = hours > 0 ? `${hours}:` : '';
  const paddedMinutes = minutes.toString().padStart(hours > 0 ? 2 : 1, '0');
  const paddedSeconds = seconds.toString().padStart(2, '0');
  
  return `${paddedHours}${paddedMinutes}:${paddedSeconds}`;
};

export const formatPace = (minutes: number, seconds: number, unit: 'min/km' | 'min/mi'): string => {
  return `${minutes}:${seconds.toString().padStart(2, '0')} ${unit}`;
};

export const convertPace = (
  paceInSeconds: number,
  fromUnit: 'min/km' | 'min/mi',
  toUnit: 'min/km' | 'min/mi'
): number => {
  if (fromUnit === toUnit) return paceInSeconds;
  
  const conversionFactor = 1.60934; // km to miles
  
  // Convert from min/km to min/mi
  if (fromUnit === 'min/km' && toUnit === 'min/mi') {
    return paceInSeconds * conversionFactor;
  }
  
  // Convert from min/mi to min/km
  return paceInSeconds / conversionFactor;
};

export const convertDistance = (
  distance: number,
  fromUnit: 'km' | 'mi',
  toUnit: 'km' | 'mi'
): number => {
  if (fromUnit === toUnit) return distance;
  
  const conversionFactor = 1.60934; // miles to km
  
  // Convert from miles to km
  if (fromUnit === 'mi' && toUnit === 'km') {
    return distance * conversionFactor;
  }
  
  // Convert from km to miles
  return distance / conversionFactor;
};

export const calculatePace = (input: PaceInput): PaceResult => {
  const {
    calculationType,
    distance = 0,
    distanceUnit = 'km',
    timeInSeconds = 0,
    paceInSeconds = 0,
    paceUnit = 'min/km'
  } = input;
  
  switch (calculationType) {
    case 'pace': {
      // Calculate pace (time ÷ distance)
      if (distance <= 0 || timeInSeconds <= 0) {
        throw new Error('Distance and time must be greater than zero');
      }
      
      const paceInSecondsResult = timeInSeconds / distance;
      const paceMinutes = Math.floor(paceInSecondsResult / 60);
      const paceSeconds = Math.floor(paceInSecondsResult % 60);
      
      const hours = Math.floor(timeInSeconds / 3600);
      const minutes = Math.floor((timeInSeconds % 3600) / 60);
      const seconds = Math.floor(timeInSeconds % 60);
      
      return {
        distance,
        distanceUnit,
        paceMinutes,
        paceSeconds,
        paceUnit: distanceUnit === 'km' ? 'min/km' : 'min/mi',
        hours,
        minutes,
        seconds
      };
    }
    
    case 'time': {
      // Calculate time (pace × distance)
      if (distance <= 0 || paceInSeconds <= 0) {
        throw new Error('Distance and pace must be greater than zero');
      }
      
      // Ensure pace and distance units match
      let effectivePaceInSeconds = paceInSeconds;
      if ((distanceUnit === 'km' && paceUnit === 'min/mi') || 
          (distanceUnit === 'mi' && paceUnit === 'min/km')) {
        effectivePaceInSeconds = convertPace(paceInSeconds, paceUnit, distanceUnit === 'km' ? 'min/km' : 'min/mi');
      }
      
      const timeInSecondsResult = effectivePaceInSeconds * distance;
      const hours = Math.floor(timeInSecondsResult / 3600);
      const minutes = Math.floor((timeInSecondsResult % 3600) / 60);
      const seconds = Math.floor(timeInSecondsResult % 60);
      
      const paceMinutes = Math.floor(effectivePaceInSeconds / 60);
      const paceSeconds = Math.floor(effectivePaceInSeconds % 60);
      
      return {
        distance,
        distanceUnit,
        paceMinutes,
        paceSeconds,
        paceUnit: distanceUnit === 'km' ? 'min/km' : 'min/mi',
        hours,
        minutes,
        seconds
      };
    }
    
    case 'distance': {
      // Calculate distance (time ÷ pace)
      if (timeInSeconds <= 0 || paceInSeconds <= 0) {
        throw new Error('Time and pace must be greater than zero');
      }
      
      const distanceResult = timeInSeconds / paceInSeconds;
      
      const hours = Math.floor(timeInSeconds / 3600);
      const minutes = Math.floor((timeInSeconds % 3600) / 60);
      const seconds = Math.floor(timeInSeconds % 60);
      
      const paceMinutes = Math.floor(paceInSeconds / 60);
      const paceSeconds = Math.floor(paceInSeconds % 60);
      
      return {
        distance: distanceResult,
        distanceUnit: paceUnit === 'min/km' ? 'km' : 'mi',
        paceMinutes,
        paceSeconds,
        paceUnit,
        hours,
        minutes,
        seconds
      };
    }
    
    default:
      throw new Error('Invalid calculation type');
  }
};
