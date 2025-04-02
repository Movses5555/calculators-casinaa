
/**
 * Kelly Criterion calculator utility functions
 */

export const calculateKellyCriterion = (
  probability: number,
  decimalOdds: number
): number => {
  // Convert probability to decimal (0-1)
  const probDecimal = probability / 100;
  
  // Calculate Kelly criterion
  const b = decimalOdds - 1; // Decimal odds minus 1 (the "b" in the Kelly formula)
  const q = 1 - probDecimal; // Probability of losing
  
  // Kelly formula: (bp - q) / b
  const kellyPercentage = ((b * probDecimal) - q) / b;
  
  // Cap at 100% and floor at 0%
  const cappedKelly = Math.max(0, Math.min(1, kellyPercentage));
  
  return parseFloat((cappedKelly * 100).toFixed(2));
};

export const calculateHalfKelly = (fullKelly: number): number => {
  return parseFloat((fullKelly / 2).toFixed(2));
};

export const calculateQuarterKelly = (fullKelly: number): number => {
  return parseFloat((fullKelly / 4).toFixed(2));
};
