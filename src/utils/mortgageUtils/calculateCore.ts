
/**
 * Core mortgage calculation functions
 */

/**
 * Calculate monthly mortgage payment
 */
export const calculateMonthlyPayment = (
  propertyPrice: number,
  interestRate: number,
  loanTerm: number,
  downPayment: number
): number => {
  const principal = propertyPrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  
  if (monthlyRate === 0) {
    return principal / numberOfPayments;
  }
  
  const x = Math.pow(1 + monthlyRate, numberOfPayments);
  return principal * (monthlyRate * x) / (x - 1);
};

/**
 * Calculate total cost of the mortgage
 */
export const calculateTotalCost = (
  monthlyPayment: number,
  loanTerm: number
): number => {
  return monthlyPayment * loanTerm * 12;
};

/**
 * Calculate total interest paid over the life of the loan
 */
export const calculateTotalInterest = (
  totalCost: number,
  propertyPrice: number,
  downPayment: number
): number => {
  return totalCost - (propertyPrice - downPayment);
};

/**
 * Calculate the complete amortization schedule
 */
export const calculateAmortizationSchedule = (
  propertyPrice: number,
  interestRate: number,
  loanTerm: number,
  downPayment: number
) => {
  const principal = propertyPrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  const monthlyPayment = calculateMonthlyPayment(propertyPrice, interestRate, loanTerm, downPayment);
  
  const schedule = [];
  let remainingBalance = principal;
  let totalPrincipalPaid = 0;
  let totalInterestPaid = 0;
  
  for (let month = 1; month <= numberOfPayments; month++) {
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    
    remainingBalance -= principalPayment;
    totalPrincipalPaid += principalPayment;
    totalInterestPaid += interestPayment;
    
    schedule.push({
      month,
      year: Math.ceil(month / 12),
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      remainingBalance: Math.max(0, remainingBalance),
      totalPrincipalPaid,
      totalInterestPaid
    });
  }
  
  return schedule;
};
