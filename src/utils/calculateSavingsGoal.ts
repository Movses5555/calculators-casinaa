
/**
 * Compatibility export for savings goal calculator
 */

export { calculateSavingsGoal } from './finance/savingsGoal';
export type { SavingsGoalInput, SavingsGoalResult } from './finance/savingsGoal';

// Add missing helper functions
export { formatCurrency, formatPercent } from './formatters';

// Add missing formatTimeToGoal function
export const formatTimeToGoal = (months: number): string => {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (years === 0) {
    return `${months} month${months !== 1 ? 's' : ''}`;
  } else if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? 's' : ''}`;
  } else {
    return `${years} year${years !== 1 ? 's' : ''} and ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  }
};
