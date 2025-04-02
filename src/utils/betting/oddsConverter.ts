
/**
 * Odds converter utility functions
 */

export type OddsFormat = 'decimal' | 'fractional' | 'american' | 'implied';

export const convertOdds = (odds: number | string, fromFormat: OddsFormat, toFormat: OddsFormat): number | string => {
  // First convert to decimal as a common format
  let decimalOdds: number;
  
  if (fromFormat === 'decimal') {
    decimalOdds = typeof odds === 'string' ? parseFloat(odds) : odds;
  } else if (fromFormat === 'american') {
    const americanOdds = typeof odds === 'string' ? parseInt(odds) : odds;
    decimalOdds = americanOdds > 0 
      ? 1 + (americanOdds / 100) 
      : 1 + (100 / Math.abs(americanOdds));
  } else if (fromFormat === 'fractional') {
    const [numerator, denominator] = typeof odds === 'string' 
      ? odds.split('/').map(n => parseInt(n.trim())) 
      : [odds, 1];
    decimalOdds = (numerator / denominator) + 1;
  } else if (fromFormat === 'implied') {
    const impliedProbability = typeof odds === 'string' ? parseFloat(odds) : odds;
    decimalOdds = 100 / impliedProbability;
  } else {
    throw new Error('Invalid odds format');
  }
  
  // Convert from decimal to target format
  if (toFormat === 'decimal') {
    return parseFloat(decimalOdds.toFixed(2));
  } else if (toFormat === 'american') {
    if (decimalOdds >= 2) {
      return `+${Math.round((decimalOdds - 1) * 100)}`;
    } else {
      return `-${Math.round(100 / (decimalOdds - 1))}`;
    }
  } else if (toFormat === 'fractional') {
    const decimal = decimalOdds - 1;
    if (decimal === 0) return '0/1';
    
    // Find the greatest common divisor
    const findGCD = (a: number, b: number): number => {
      return b ? findGCD(b, a % b) : a;
    };
    
    // Convert to fraction with reasonable precision
    const precision = 1000;
    const gcd = findGCD(Math.round(decimal * precision), precision);
    const numerator = Math.round(decimal * precision) / gcd;
    const denominator = precision / gcd;
    
    return `${numerator}/${denominator}`;
  } else if (toFormat === 'implied') {
    // Implied probability as percentage
    return parseFloat((100 / decimalOdds).toFixed(1));
  }
  
  throw new Error('Invalid target odds format');
};
