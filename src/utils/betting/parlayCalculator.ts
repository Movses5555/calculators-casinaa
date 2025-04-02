
/**
 * Parlay calculator utility functions
 */

export const calculateParlayOdds = (
  odds: number[],
  format: 'decimal' | 'american' = 'decimal'
): number | string => {
  // Calculate the total decimal odds
  const totalDecimalOdds = odds.reduce((total, odd) => total * odd, 1);
  
  // Return in the requested format
  if (format === 'decimal') {
    return parseFloat(totalDecimalOdds.toFixed(2));
  } else if (format === 'american') {
    if (totalDecimalOdds >= 2) {
      return `+${Math.round((totalDecimalOdds - 1) * 100)}`;
    } else {
      return `-${Math.round(100 / (totalDecimalOdds - 1))}`;
    }
  }
  
  throw new Error('Unsupported odds format');
};

export const calculateParlayPayout = (
  stake: number,
  odds: number[]
): number => {
  // Calculate the total decimal odds
  const totalDecimalOdds = odds.reduce((total, odd) => total * odd, 1);
  
  // Calculate and return the payout
  return parseFloat((stake * totalDecimalOdds).toFixed(2));
};
