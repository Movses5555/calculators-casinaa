/**
 * Debt snowball calculation utility
 */

export interface DebtInput {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
}

export interface DebtResult {
  id: string;
  name: string;
  originalBalance: number;
  currentBalance: number;
  interestRate: number;
  minimumPayment: number;
  additionalPayment: number;
  totalPayment: number;
  payoffDate: Date;
  monthsToPayoff: number;
  interestPaid: number;
}

export interface DebtSnowballResult {
  debts: DebtResult[];
  totalMonthsToPayoff: number;
  totalInterestPaid: number;
  totalInitialBalance: number;
  totalMinimumPayment: number;
  monthlyPaymentAmount: number;
  payoffOrder: string[];
  monthlySchedule: Array<{
    month: number;
    date: Date;
    remainingDebts: number;
    payments: Array<{
      debtId: string;
      amount: number;
      principal: number;
      interest: number;
      remainingBalance: number;
    }>;
  }>;
  // Add compatibility with the interface in calculateDebtSnowball.ts
  totalMonths: number;
  totalPaid: number;
  totalInterest: number;
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
  // These properties are for the DebtSnowballTracker component
  payoffMonths: number;
  amortization: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    remainingBalance: number;
    debtName: string;
  }>;
  debtPayoffOrder: DebtInput[];
}

export function calculateDebtSnowball(
  debts: DebtInput[],
  monthlyPayment: number,
  strategy: 'snowball' | 'avalanche' = 'snowball'
): DebtSnowballResult {
  // Sort debts by strategy (snowball = balance, avalanche = interest rate)
  const sortedDebts = [...debts].sort((a, b) => {
    if (strategy === 'snowball') {
      return a.balance - b.balance;
    } else {
      return b.interestRate - a.interestRate;
    }
  });

  // Calculate total minimum payment
  const totalMinimumPayment = sortedDebts.reduce((sum, debt) => sum + debt.minimumPayment, 0);
  
  // Calculate initial extra payment amount
  let extraPayment = Math.max(0, monthlyPayment - totalMinimumPayment);
  
  // Initialize the result object
  const result: DebtSnowballResult = {
    debts: [],
    totalMonthsToPayoff: 0,
    totalInterestPaid: 0,
    totalInitialBalance: sortedDebts.reduce((sum, debt) => sum + debt.balance, 0),
    totalMinimumPayment,
    monthlyPaymentAmount: monthlyPayment,
    payoffOrder: [],
    monthlySchedule: [],
    // Add properties for DebtSnowballTracker
    totalMonths: 0,
    totalPaid: 0,
    totalInterest: 0,
    paymentSchedule: [],
    payoffMonths: 0,
    amortization: [],
    debtPayoffOrder: []
  };
  
  // Create working copies of debts with additional fields
  const workingDebts = sortedDebts.map(debt => ({
    ...debt,
    originalBalance: debt.balance,
    interestPaid: 0,
    paidOff: false,
    payoffMonth: 0,
    payoffDate: new Date()
  }));
  
  // Simulate month-by-month payments
  let month = 0;
  let currentDate = new Date();
  let activeDebts = workingDebts.length;
  let totalPaid = 0;
  
  while (activeDebts > 0 && month < 600) { // 50 years max to prevent infinite loops
    month++;
    const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + month, 1);
    
    // Monthly payment tracker
    const monthlyPaymentData = {
      month,
      date: monthDate,
      remainingDebts: activeDebts,
      totalPaid: 0,
      remainingBalance: 0,
      payments: [] as Array<{
        debtId: string;
        amount: number;
        principal: number;
        interest: number;
        remainingBalance: number;
        interestPaid: number;
      }>
    };
    
    // Apply the snowball strategy
    let remainingExtraPayment = extraPayment;
    let monthTotalPaid = 0;
    
    for (const debt of workingDebts) {
      if (debt.paidOff) continue;
      
      // Calculate interest for this month
      const monthlyInterestRate = debt.interestRate / 100 / 12;
      const interestThisMonth = debt.balance * monthlyInterestRate;
      debt.interestPaid += interestThisMonth;
      
      // Determine payment amount (minimum + any extra)
      let paymentAmount = debt.minimumPayment;
      
      if (remainingExtraPayment > 0) {
        paymentAmount += remainingExtraPayment;
        remainingExtraPayment = 0;
      }
      
      // Ensure we don't pay more than the balance + this month's interest
      const totalDue = debt.balance + interestThisMonth;
      paymentAmount = Math.min(paymentAmount, totalDue);
      
      // Apply payment
      const principalPayment = paymentAmount - interestThisMonth;
      debt.balance = Math.max(0, debt.balance - principalPayment);
      
      monthTotalPaid += paymentAmount;
      
      // Record payment for this month
      monthlyPaymentData.payments.push({
        debtId: debt.id,
        amount: paymentAmount,
        principal: principalPayment,
        interest: interestThisMonth,
        remainingBalance: debt.balance,
        interestPaid: interestThisMonth
      });
      
      // Check if debt is paid off
      if (debt.balance <= 0) {
        debt.paidOff = true;
        debt.payoffMonth = month;
        debt.payoffDate = new Date(monthDate);
        activeDebts--;
        
        // Add the paid-off debt's minimum payment to the extra payment amount
        extraPayment += debt.minimumPayment;
        
        // Record the payoff order
        result.payoffOrder.push(debt.id);
      }
    }
    
    totalPaid += monthTotalPaid;
    
    // Calculate remaining balance across all debts
    const remainingBalance = workingDebts.reduce((sum, debt) => sum + debt.balance, 0);
    monthlyPaymentData.remainingBalance = remainingBalance;
    monthlyPaymentData.totalPaid = monthTotalPaid;
    
    // Add this month's data to the schedule
    result.monthlySchedule.push(monthlyPaymentData);
    
    // Also add to paymentSchedule for the component
    result.paymentSchedule.push({
      month: monthlyPaymentData.month,
      date: monthlyPaymentData.date,
      totalPaid: monthlyPaymentData.totalPaid,
      remainingBalance: monthlyPaymentData.remainingBalance,
      payments: monthlyPaymentData.payments.map(p => ({
        debtId: p.debtId,
        amount: p.amount,
        interestPaid: p.interest,
        remainingBalance: p.remainingBalance
      }))
    });
  }
  
  // Calculate final results
  result.totalMonthsToPayoff = month;
  result.totalInterestPaid = workingDebts.reduce((sum, debt) => sum + debt.interestPaid, 0);
  result.totalMonths = month;
  result.totalPaid = totalPaid;
  result.totalInterest = result.totalInterestPaid;
  
  // Convert working debts back to result format
  result.debts = workingDebts.map(debt => ({
    id: debt.id,
    name: debt.name,
    originalBalance: debt.originalBalance,
    currentBalance: debt.balance,
    interestRate: debt.interestRate,
    minimumPayment: debt.minimumPayment,
    additionalPayment: debt.paidOff ? 0 : extraPayment, // Only the currently focused debt gets extra payment
    totalPayment: debt.minimumPayment + (debt.paidOff ? 0 : extraPayment),
    payoffDate: debt.payoffDate,
    monthsToPayoff: debt.payoffMonth,
    interestPaid: debt.interestPaid
  }));
  
  // Ensure the return value has all the required properties
  return {
    debts: result.debts,
    totalMonthsToPayoff: result.totalMonthsToPayoff,
    totalInterestPaid: result.totalInterestPaid,
    totalInitialBalance: result.totalInitialBalance,
    totalMinimumPayment: result.totalMinimumPayment,
    monthlyPaymentAmount: result.monthlyPaymentAmount,
    payoffOrder: result.payoffOrder,
    monthlySchedule: result.monthlySchedule,
    totalMonths: result.totalMonths,
    totalPaid: result.totalPaid,
    totalInterest: result.totalInterest,
    paymentSchedule: result.paymentSchedule,
    
    // Add these properties to match the interface expected by the component
    payoffMonths: result.totalMonthsToPayoff,
    amortization: result.monthlySchedule.map(m => ({
      month: m.month,
      payment: m.payments.reduce((sum, p) => sum + p.amount, 0),
      principal: m.payments.reduce((sum, p) => sum + p.principal, 0),
      interest: m.payments.reduce((sum, p) => sum + p.interest, 0),
      remainingBalance: m.payments.reduce((sum, p) => sum + p.remainingBalance, 0),
      debtName: 'Combined'
    })),
    debtPayoffOrder: sortedDebts.map(debt => ({
      id: debt.id,
      name: debt.name,
      balance: debt.balance,
      interestRate: debt.interestRate,
      minimumPayment: debt.minimumPayment
    }))
  };
}
