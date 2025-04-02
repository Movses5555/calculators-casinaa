
/**
 * Compatibility export for debt snowball calculator
 */

export { calculateDebtSnowball } from './finance/debtSnowball';

// Define the missing interfaces
export interface DebtItem {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
}

export interface DebtSnowballResult {
  totalInterestPaid: number;
  totalPaid: number;
  payoffMonths: number;
  amortization: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    remainingBalance: number;
    debtName: string;
  }>;
  debtPayoffOrder: DebtItem[];
  
  // Add properties expected by DebtSnowballTracker component
  totalMonths: number;
  totalInterest: number;
  payoffOrder: string[];
  paymentSchedule: Array<{
    month: number;
    date: Date;
    totalPaid: number;
    remainingBalance: number;
    payments: Array<{
      debtId: string;
      amount: number;
      interestPaid: number;
      remainingBalance: number;
    }>;
  }>;
}

// Add missing helper functions and type re-exports
export { formatCurrency, formatPercent } from './formatters';

// Create example debts generator function
export const generateExampleDebts = (): DebtItem[] => [
  {
    id: "1",
    name: "Credit Card",
    balance: 5000,
    interestRate: 18.99,
    minimumPayment: 150
  },
  {
    id: "2",
    name: "Car Loan",
    balance: 12000,
    interestRate: 4.5,
    minimumPayment: 250
  },
  {
    id: "3",
    name: "Student Loan",
    balance: 20000,
    interestRate: 5.8,
    minimumPayment: 200
  }
];
