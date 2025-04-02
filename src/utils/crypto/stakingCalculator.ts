
/**
 * Crypto staking calculator utility functions
 */

export const calculateStakingRewards = (
  stakingAmount: number,
  apr: number,
  periodInDays: number,
  compoundingFrequency: 'daily' | 'weekly' | 'monthly' | 'none' = 'none'
): number => {
  const aprDecimal = apr / 100;
  const periodInYears = periodInDays / 365;
  
  if (compoundingFrequency === 'none') {
    // Simple interest calculation
    return stakingAmount * aprDecimal * periodInYears;
  }
  
  // Compound interest calculation
  let compoundingPeriodsPerYear: number;
  
  switch (compoundingFrequency) {
    case 'daily':
      compoundingPeriodsPerYear = 365;
      break;
    case 'weekly':
      compoundingPeriodsPerYear = 52;
      break;
    case 'monthly':
      compoundingPeriodsPerYear = 12;
      break;
    default:
      compoundingPeriodsPerYear = 1;
  }
  
  const compoundingPeriods = compoundingPeriodsPerYear * periodInYears;
  const ratePerPeriod = aprDecimal / compoundingPeriodsPerYear;
  
  const finalAmount = stakingAmount * Math.pow(1 + ratePerPeriod, compoundingPeriods);
  const rewards = finalAmount - stakingAmount;
  
  return parseFloat(rewards.toFixed(2));
};
