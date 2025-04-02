
/**
 * Calculate mortgage payments and related statistics
 */

export interface MortgageInput {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  downPayment?: number;
  propertyTax?: number;
  homeInsurance?: number;
  pmi?: number;
}

export interface MortgageResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  monthlyPrincipalInterest: number;
  monthlyPropertyTax: number;
  monthlyHomeInsurance: number;
  monthlyPMI: number;
  paymentSchedule: {
    year: number;
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }[];
}

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export const formatPercent = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value / 100);
};

export const calculateMonthlyPayment = (
  loanAmount: number,
  interestRate: number,
  loanTerm: number,
  downPayment: number = 0
): number => {
  const principal = loanAmount - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  
  if (monthlyRate === 0) {
    return principal / numberOfPayments;
  }
  
  const x = Math.pow(1 + monthlyRate, numberOfPayments);
  return principal * (monthlyRate * x) / (x - 1);
};

export const calculateTotalCost = (
  monthlyPayment: number,
  loanTerm: number
): number => {
  return monthlyPayment * loanTerm * 12;
};

export const calculateTotalInterest = (
  totalCost: number,
  loanAmount: number,
  downPayment: number = 0
): number => {
  return totalCost - (loanAmount - downPayment);
};

export const calculateAmortizationSchedule = (
  loanAmount: number,
  interestRate: number,
  loanTerm: number,
  downPayment: number = 0
) => {
  const principal = loanAmount - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTerm, downPayment);
  
  const schedule = [];
  let balance = principal;
  let totalPrincipalPaid = 0;
  let totalInterestPaid = 0;
  
  for (let i = 1; i <= numberOfPayments; i++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    
    balance -= principalPayment;
    totalPrincipalPaid += principalPayment;
    totalInterestPaid += interestPayment;
    
    const month = i % 12 === 0 ? 12 : i % 12;
    const year = Math.ceil(i / 12);
    
    schedule.push({
      month,
      year,
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      balance: Math.max(0, balance),
      totalPrincipalPaid,
      totalInterestPaid,
      remainingBalance: Math.max(0, balance)
    });
  }
  
  return schedule;
};

export const calculateMortgage = (input: MortgageInput): MortgageResult => {
  const {
    loanAmount,
    interestRate,
    loanTerm,
    downPayment = 0,
    propertyTax = 0,
    homeInsurance = 0,
    pmi = 0
  } = input;

  // Calculate the principal loan amount after down payment
  const principal = loanAmount - downPayment;
  
  // Convert annual interest rate to monthly rate
  const monthlyRate = interestRate / 100 / 12;
  
  // Convert loan term from years to months
  const numberOfPayments = loanTerm * 12;

  // Calculate monthly principal and interest payment
  let monthlyPrincipalInterest = 0;
  
  if (monthlyRate === 0) {
    monthlyPrincipalInterest = principal / numberOfPayments;
  } else {
    const x = Math.pow(1 + monthlyRate, numberOfPayments);
    monthlyPrincipalInterest = principal * (monthlyRate * x) / (x - 1);
  }

  // Calculate additional monthly costs
  const monthlyPropertyTax = propertyTax / 12;
  const monthlyHomeInsurance = homeInsurance / 12;
  const monthlyPMI = pmi;

  // Calculate total monthly payment
  const monthlyPayment = monthlyPrincipalInterest + monthlyPropertyTax + monthlyHomeInsurance + monthlyPMI;

  // Calculate total payment over the life of the loan
  const totalPayment = monthlyPayment * numberOfPayments;

  // Calculate total interest paid
  const totalInterest = (monthlyPrincipalInterest * numberOfPayments) - principal;

  // Generate the payment schedule
  const paymentSchedule = calculateAmortizationSchedule(loanAmount, interestRate, loanTerm, downPayment);

  return {
    monthlyPayment,
    totalPayment,
    totalInterest,
    monthlyPrincipalInterest,
    monthlyPropertyTax,
    monthlyHomeInsurance,
    monthlyPMI,
    paymentSchedule
  };
};
