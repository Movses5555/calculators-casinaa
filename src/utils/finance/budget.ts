
/**
 * Budget calculation utilities
 */

export interface BudgetCategory {
  id: string;
  name: string;
  amount: number;
  type: 'income' | 'expense';
  isRequired?: boolean;
  percentage?: number;
}

export interface BudgetInput {
  income: BudgetCategory[];
  expenses: BudgetCategory[];
  savings?: number;
}

export interface BudgetResult {
  totalIncome: number;
  totalExpenses: number;
  netIncome: number;
  savingsAmount: number;
  savingsPercentage: number;
  categories: BudgetCategory[];
  isBalanced: boolean;
  suggestions: string[];
}

export const calculateBudget = (input: BudgetInput): BudgetResult => {
  const totalIncome = input.income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = input.expenses.reduce((sum, item) => sum + item.amount, 0);
  const netIncome = totalIncome - totalExpenses;
  
  // Calculate savings
  const savingsAmount = input.savings !== undefined ? input.savings : Math.max(0, netIncome);
  const savingsPercentage = totalIncome > 0 ? (savingsAmount / totalIncome) * 100 : 0;
  
  // Calculate percentage of total income for each category
  const categoriesWithPercentage = [
    ...input.income.map(item => ({
      ...item,
      percentage: (item.amount / totalIncome) * 100
    })),
    ...input.expenses.map(item => ({
      ...item,
      percentage: (item.amount / totalIncome) * 100
    }))
  ];
  
  // Generate suggestions
  const suggestions: string[] = [];
  
  if (netIncome < 0) {
    suggestions.push("Your expenses exceed your income. Consider reducing non-essential expenses.");
  }
  
  if (savingsPercentage < 20 && totalIncome > 0) {
    suggestions.push("Your savings rate is below the recommended 20%. Try to increase your savings if possible.");
  }
  
  const housingExpenses = input.expenses
    .filter(item => item.name.toLowerCase().includes('rent') || item.name.toLowerCase().includes('mortgage'))
    .reduce((sum, item) => sum + item.amount, 0);
  
  const housingPercentage = totalIncome > 0 ? (housingExpenses / totalIncome) * 100 : 0;
  
  if (housingPercentage > 30) {
    suggestions.push("Your housing costs exceed 30% of your income, which is higher than recommended.");
  }
  
  return {
    totalIncome,
    totalExpenses,
    netIncome,
    savingsAmount,
    savingsPercentage,
    categories: categoriesWithPercentage,
    isBalanced: netIncome >= 0,
    suggestions
  };
};

export const calculateCategoryPercentage = (amount: number, totalIncome: number): number => {
  return totalIncome > 0 ? (amount / totalIncome) * 100 : 0;
};
