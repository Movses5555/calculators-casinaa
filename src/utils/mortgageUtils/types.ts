
/**
 * Mortgage calculation type definitions
 */

export interface MortgageInput {
  loanAmount: number;          // Total loan amount
  interestRate: number;        // Annual interest rate (in percentage)
  loanTerm: number;            // Loan term in years
  downPayment?: number;        // Optional down payment amount
  propertyTax?: number;        // Annual property tax
  homeInsurance?: number;      // Annual home insurance
  pmi?: number;                // Private mortgage insurance (monthly)
}

export interface MortgageResult {
  monthlyPayment: number;      // Monthly mortgage payment (principal + interest)
  totalPayment: number;        // Total of all payments over loan term
  totalInterest: number;       // Total interest paid over loan term
  monthlyPrincipalInterest: number; // Principal + interest monthly payment
  monthlyPropertyTax: number;  // Monthly property tax payment
  monthlyHomeInsurance: number; // Monthly home insurance payment
  monthlyPMI: number;          // Monthly PMI payment
  paymentSchedule: Array<{
    month: number;
    year: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
    totalPrincipalPaid?: number;
    totalInterestPaid?: number;
  }>;
}
