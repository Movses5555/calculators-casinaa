
/**
 * Expected Value (EV) calculator utility functions
 */

export const calculateExpectedValue = (
  probability: number,
  decimalOdds: number,
  stake: number
): number => {
  // Convert probability to decimal (0-1)
  const probDecimal = probability / 100;
  
  // Calculate expected value
  const winAmount = stake * (decimalOdds - 1);
  const lossAmount = stake;
  
  const expectedValue = (probDecimal * winAmount) - ((1 - probDecimal) * lossAmount);
  
  return parseFloat(expectedValue.toFixed(2));
};

export const calculateROI = (
  probability: number,
  decimalOdds: number
): number => {
  // Convert probability to decimal (0-1)
  const probDecimal = probability / 100;
  
  // Calculate ROI as percentage
  const roi = (probDecimal * decimalOdds) - 1;
  
  return parseFloat((roi * 100).toFixed(2));
};
