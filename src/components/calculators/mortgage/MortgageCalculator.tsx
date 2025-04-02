
import React, { useState, useEffect } from 'react';
import MortgageInputForm, { MortgageFormData } from './MortgageInputForm';
import MortgageResultsSummary from './MortgageResultsSummary';
import MortgageVisualization from './MortgageVisualization';
import MortgageTips from './MortgageTips';
import {
  calculateMonthlyPayment,
  calculateTotalCost,
  calculateTotalInterest,
  calculateAmortizationSchedule
} from '@/utils/finance/mortgage';
import { toast } from 'sonner';

const MortgageCalculator: React.FC = () => {
  const [formData, setFormData] = useState<MortgageFormData>({
    propertyPrice: 300000,
    downPayment: 60000,
    loanTerm: 30,
    interestRate: 4.5
  });
  
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [paymentScheduleData, setPaymentScheduleData] = useState<any[]>([]);
  
  useEffect(() => {
    calculateResults();
  }, [formData]);
  
  const calculateResults = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      try {
        const { propertyPrice, downPayment, loanTerm, interestRate } = formData;
        
        const calculatedLoanAmount = propertyPrice - downPayment;
        setLoanAmount(calculatedLoanAmount);
        
        const calculatedMonthlyPayment = calculateMonthlyPayment(
          propertyPrice,
          interestRate,
          loanTerm,
          downPayment
        );
        setMonthlyPayment(calculatedMonthlyPayment);
        
        const calculatedTotalCost = calculateTotalCost(
          calculatedMonthlyPayment,
          loanTerm
        );
        setTotalCost(calculatedTotalCost);
        
        const calculatedTotalInterest = calculateTotalInterest(
          calculatedTotalCost,
          propertyPrice,
          downPayment
        );
        setTotalInterest(calculatedTotalInterest);
        
        const scheduleData = generatePaymentScheduleData();
        setPaymentScheduleData(scheduleData);
      } catch (error) {
        console.error("Calculation error:", error);
        toast.error("There was an error with your calculation. Please check your inputs.");
      } finally {
        setIsCalculating(false);
      }
    }, 300);
  };
  
  const handleInputChange = (field: keyof MortgageFormData, value: string | number) => {
    let parsedValue: number;
    
    if (typeof value === 'string') {
      const cleanedValue = value.replace(/[^0-9.]/g, '');
      parsedValue = cleanedValue === '' ? 0 : parseFloat(cleanedValue);
    } else {
      parsedValue = value;
    }
    
    const updatedFormData = { ...formData, [field]: parsedValue };
    
    if (field === 'downPayment') {
      const newDownPaymentPercent = (parsedValue / formData.propertyPrice) * 100;
      setDownPaymentPercent(newDownPaymentPercent);
    } else if (field === 'propertyPrice') {
      const newDownPayment = (parsedValue * downPaymentPercent) / 100;
      updatedFormData.downPayment = newDownPayment;
    }
    
    setFormData(updatedFormData);
  };
  
  const handleDownPaymentPercentChange = (value: number[]) => {
    const percent = value[0];
    setDownPaymentPercent(percent);
    
    const newDownPayment = (formData.propertyPrice * percent) / 100;
    setFormData({
      ...formData,
      downPayment: newDownPayment
    });
  };
  
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  const generatePaymentScheduleData = () => {
    const schedule = calculateAmortizationSchedule(
      formData.propertyPrice,
      formData.interestRate,
      formData.loanTerm,
      formData.downPayment
    );
    
    const sampledData = [];
    const interval = Math.max(1, Math.floor(schedule.length / 20));
    
    for (let i = 0; i < schedule.length; i += interval) {
      sampledData.push({
        month: schedule[i].month,
        remainingBalance: schedule[i].remainingBalance,
        totalPrincipalPaid: schedule[i].totalPrincipalPaid,
        totalInterestPaid: schedule[i].totalInterestPaid
      });
    }
    
    if (schedule.length > 0 && sampledData[sampledData.length - 1].month !== schedule[schedule.length - 1].month) {
      sampledData.push({
        month: schedule[schedule.length - 1].month,
        remainingBalance: schedule[schedule.length - 1].remainingBalance,
        totalPrincipalPaid: schedule[schedule.length - 1].totalPrincipalPaid,
        totalInterestPaid: schedule[schedule.length - 1].totalInterestPaid
      });
    }
    
    return sampledData;
  };

  return (
    <div className="fade-transition mx-auto max-w-7xl px-4 py-8 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <MortgageInputForm
          formData={formData}
          downPaymentPercent={downPaymentPercent}
          isCalculating={isCalculating}
          onInputChange={handleInputChange}
          onDownPaymentPercentChange={handleDownPaymentPercentChange}
          onCalculate={calculateResults}
        />
        
        <div className="lg:col-span-2 space-y-6">
          <MortgageResultsSummary
            monthlyPayment={monthlyPayment}
            loanAmount={loanAmount}
            totalInterest={totalInterest}
            totalCost={totalCost}
            isCalculating={isCalculating}
            formatCurrency={formatCurrency}
          />
          
          <MortgageVisualization
            formData={formData}
            loanAmount={loanAmount}
            downPaymentPercent={downPaymentPercent}
            monthlyPayment={monthlyPayment}
            totalInterest={totalInterest}
            totalCost={totalCost}
            isCalculating={isCalculating}
            paymentScheduleData={paymentScheduleData}
            formatCurrency={formatCurrency}
          />
          
          <MortgageTips />
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
