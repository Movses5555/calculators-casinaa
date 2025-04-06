/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Validation utility functions
 */

/**
 * Check if a value is a valid number
 */
export const isValidNumber = (value: any): boolean => {
  if (value === null || value === undefined || value === '') return false;
  return !isNaN(Number(value));
};

/**
 * Check if a value is a positive number
 */
export const isPositiveNumber = (value: any): boolean => {
  if (!isValidNumber(value)) return false;
  return Number(value) > 0;
};

/**
 * Check if a value is a non-negative number (zero or positive)
 */
export const isNonNegativeNumber = (value: any): boolean => {
  if (!isValidNumber(value)) return false;
  return Number(value) >= 0;
};

/**
 * Check if a value is within a specified range
 */
export const isWithinRange = (value: any, min: number, max: number): boolean => {
  if (!isValidNumber(value)) return false;
  const num = Number(value);
  return num >= min && num <= max;
};

/**
 * Check if a value is a valid percentage (0-100)
 */
export const isValidPercentage = (value: any): boolean => {
  return isWithinRange(value, 0, 100);
};

/**
 * Check if a value is a valid email address
 */
export const isValidEmail = (value: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

/**
 * Check if a value is a valid URL
 */
export const isValidUrl = (value: string): boolean => {
  try {
    new URL(value);
    return true;
  } catch (error) {
    return false;
  }
};
