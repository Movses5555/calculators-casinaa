
/**
 * Crypto mining calculator utility functions
 */

export const calculateMiningProfitability = (
  hashrate: number,
  hashrateUnit: 'H/s' | 'KH/s' | 'MH/s' | 'GH/s' | 'TH/s',
  blockReward: number,
  networkHashrate: number,
  networkHashrateUnit: 'H/s' | 'KH/s' | 'MH/s' | 'GH/s' | 'TH/s',
  blockTime: number,
  electricityCost: number,
  powerConsumption: number
): { 
  dailyRevenue: number; 
  dailyCost: number; 
  dailyProfit: number;
  monthlyProfit: number;
  yearlyProfit: number;
  breakEvenDays: number;
} => {
  // Convert hashrate to H/s for calculation
  const hashrateFactor = {
    'H/s': 1,
    'KH/s': 1000,
    'MH/s': 1000000,
    'GH/s': 1000000000,
    'TH/s': 1000000000000
  };
  
  const normalizedHashrate = hashrate * hashrateFactor[hashrateUnit];
  const normalizedNetworkHashrate = networkHashrate * hashrateFactor[networkHashrateUnit];
  
  // Calculate mining share
  const miningShare = normalizedHashrate / normalizedNetworkHashrate;
  
  // Calculate blocks per day
  const blocksPerDay = (86400 / blockTime);
  
  // Calculate daily rewards
  const dailyRewards = miningShare * blocksPerDay * blockReward;
  
  // Calculate electricity cost
  const dailyPowerCost = (powerConsumption / 1000) * 24 * electricityCost;
  
  // Calculate profit
  const dailyProfit = dailyRewards - dailyPowerCost;
  const monthlyProfit = dailyProfit * 30;
  const yearlyProfit = dailyProfit * 365;
  
  // Calculate break-even days for mining hardware
  const breakEvenDays = dailyProfit > 0 ? Math.ceil(0 / dailyProfit) : Infinity;
  
  return {
    dailyRevenue: parseFloat(dailyRewards.toFixed(6)),
    dailyCost: parseFloat(dailyPowerCost.toFixed(2)),
    dailyProfit: parseFloat(dailyProfit.toFixed(6)),
    monthlyProfit: parseFloat(monthlyProfit.toFixed(2)),
    yearlyProfit: parseFloat(yearlyProfit.toFixed(2)),
    breakEvenDays
  };
};
