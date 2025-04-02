
/**
 * Savings goal calculation utility
 */

export interface SavingsGoalInput {
  targetAmount: number;
  initialDeposit?: number;
  monthlyContribution?: number;
  interestRate?: number;
  compoundingFrequency?: 'monthly' | 'quarterly' | 'annually';
  timeFrame?: number; // in months
}

export interface SavingsGoalResult {
  reachDate: Date;
  monthsToGoal: number;
  yearsToGoal: number;
  finalBalance: number;
  totalContributions: number;
  totalInterestEarned: number;
  monthlySchedule: Array<{
    month: number;
    date: Date;
    startingBalance: number;
    contribution: number;
    interestEarned: number;
    endingBalance: number;
    totalContributions: number;
    totalInterestEarned: number;
    percentComplete: number;
  }>;
  // Add properties expected by SavingsGoalTracker component
  totalDeposits: number;
  totalInterest: number;
  monthlyData: Array<{
    month: number;
    balance: number;
    contributions: number;
    interestToDate: number;
  }>;
}

export const calculateSavingsGoal = (input: SavingsGoalInput): SavingsGoalResult => {
  const {
    targetAmount,
    initialDeposit = 0,
    monthlyContribution = 0,
    interestRate = 0,
    compoundingFrequency = 'monthly',
    timeFrame
  } = input;
  
  // Validate inputs
  if (targetAmount <= 0) {
    throw new Error("Target amount must be greater than zero");
  }
  
  if (initialDeposit < 0) {
    throw new Error("Initial deposit cannot be negative");
  }
  
  if (monthlyContribution <= 0 && initialDeposit < targetAmount) {
    throw new Error("Monthly contribution must be greater than zero if initial deposit is less than target");
  }
  
  if (interestRate < 0) {
    throw new Error("Interest rate cannot be negative");
  }
  
  // Set up variables for calculation
  let currentBalance = initialDeposit;
  let month = 0;
  let totalContributions = initialDeposit;
  let totalInterestEarned = 0;
  const monthlySchedule = [];
  const currentDate = new Date();
  
  // Calculate compounding periods per year
  const periodsPerYear = compoundingFrequency === 'monthly' ? 12 :
                          compoundingFrequency === 'quarterly' ? 4 : 1;
  
  // Calculate periodic interest rate
  const periodicRate = interestRate > 0 ? (interestRate / 100) / periodsPerYear : 0;
  
  // Calculate months between compounding
  const monthsBetweenCompounding = 12 / periodsPerYear;
  
  // Calculate until goal is reached or timeframe is exceeded
  const maxMonths = timeFrame ? timeFrame : 600; // 50 years max to prevent infinite loops
  
  // For the monthlyData property expected by the component
  const monthlyData = [];
  
  while (currentBalance < targetAmount && month < maxMonths) {
    month++;
    const monthDate = new Date(
      currentDate.getFullYear() + Math.floor((currentDate.getMonth() + month) / 12),
      (currentDate.getMonth() + month) % 12,
      1
    );
    
    const startingBalance = currentBalance;
    
    // Add monthly contribution
    currentBalance += monthlyContribution;
    totalContributions += monthlyContribution;
    
    // Apply interest if it's a compounding month
    let interestEarned = 0;
    if (month % monthsBetweenCompounding === 0) {
      interestEarned = currentBalance * periodicRate;
      currentBalance += interestEarned;
      totalInterestEarned += interestEarned;
    }
    
    // Record this month's data
    monthlySchedule.push({
      month,
      date: monthDate,
      startingBalance,
      contribution: monthlyContribution,
      interestEarned,
      endingBalance: currentBalance,
      totalContributions,
      totalInterestEarned,
      percentComplete: Math.min(100, (currentBalance / targetAmount) * 100)
    });
    
    // Add data for monthlyData array (for component)
    monthlyData.push({
      month,
      balance: currentBalance,
      contributions: totalContributions,
      interestToDate: totalInterestEarned
    });
  }
  
  // Calculate final results
  const reachDate = new Date(
    currentDate.getFullYear() + Math.floor((currentDate.getMonth() + month) / 12),
    (currentDate.getMonth() + month) % 12,
    1
  );
  
  return {
    reachDate,
    monthsToGoal: month,
    yearsToGoal: month / 12,
    finalBalance: currentBalance,
    totalContributions,
    totalInterestEarned,
    monthlySchedule,
    // Add properties expected by SavingsGoalTracker component
    totalDeposits: totalContributions,
    totalInterest: totalInterestEarned,
    monthlyData
  };
};
