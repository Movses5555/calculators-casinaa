
/**
 * Compatibility layer for old mortgage calculator
 */

import { formatCurrency as formatCurrencyUtil, formatPercent as formatPercentUtil } from './formatters';

export interface MortgageInput {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  downPayment: number;
  propertyTax: number;
  homeInsurance: number;
  pmi: number;
}

export interface MortgagePayment {
  year: number;
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface MortgageResult {
  monthlyPayment: number;
  monthlyPrincipalInterest: number;
  monthlyPropertyTax: number;
  monthlyHomeInsurance: number;
  monthlyPMI: number;
  totalPayment: number;
  totalInterest: number;
  paymentSchedule: MortgagePayment[];
}

export const formatCurrency = (amount: number): string => {
  return formatCurrencyUtil(amount);
};

export const formatPercent = (value: number): string => {
  return formatPercentUtil(value);
};

export const calculateMortgage = (input: MortgageInput): MortgageResult => {
  const {
    loanAmount,
    interestRate,
    loanTerm,
    downPayment,
    propertyTax,
    homeInsurance,
    pmi
  } = input;

  // Calculate the monthly interest rate
  const monthlyRate = interestRate / 100 / 12;

  // Calculate the number of payments
  const numberOfPayments = loanTerm * 12;

  // Calculate the monthly principal and interest payment
  const monthlyPrincipalInterest = 
    monthlyRate === 0
      ? loanAmount / numberOfPayments
      : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  // Calculate additional monthly costs
  const monthlyPropertyTax = propertyTax / 12;
  const monthlyHomeInsurance = homeInsurance / 12;

  // Calculate total monthly payment
  const monthlyPayment = monthlyPrincipalInterest + monthlyPropertyTax + monthlyHomeInsurance + pmi;

  // Calculate total interest paid over the life of the loan
  let totalInterest = 0;
  let remainingBalance = loanAmount;
  
  // Generate the amortization schedule
  const paymentSchedule: MortgagePayment[] = [];

  for (let i = 1; i <= numberOfPayments; i++) {
    const interestPayment = remainingBalance * monthlyRate;
    let principalPayment = monthlyPrincipalInterest - interestPayment;
    
    totalInterest += interestPayment;
    remainingBalance -= principalPayment;
    
    if (remainingBalance < 0) {
      principalPayment += remainingBalance;
      remainingBalance = 0;
    }
    
    const month = ((i - 1) % 12) + 1;
    const year = Math.ceil(i / 12);
    
    paymentSchedule.push({
      year,
      month,
      payment: monthlyPrincipalInterest,
      principal: principalPayment,
      interest: interestPayment,
      balance: remainingBalance
    });
  }

  return {
    monthlyPayment,
    monthlyPrincipalInterest,
    monthlyPropertyTax,
    monthlyHomeInsurance,
    monthlyPMI: pmi,
    totalPayment: monthlyPayment * numberOfPayments,
    totalInterest,
    paymentSchedule
  };
};
