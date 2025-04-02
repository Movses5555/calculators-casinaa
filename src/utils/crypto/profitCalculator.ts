
/**
 * Crypto profit calculator utility functions
 */

export const calculateCryptoProfit = (
  buyPrice: number,
  sellPrice: number,
  amount: number,
  fees: number = 0
): { profit: number; profitPercentage: number } => {
  const initialInvestment = buyPrice * amount;
  const finalValue = sellPrice * amount;
  const feeAmount = initialInvestment * (fees / 100);
  
  const profit = finalValue - initialInvestment - feeAmount;
  const profitPercentage = (profit / initialInvestment) * 100;
  
  return {
    profit: parseFloat(profit.toFixed(2)),
    profitPercentage: parseFloat(profitPercentage.toFixed(2))
  };
};
