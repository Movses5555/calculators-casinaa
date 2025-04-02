
import React from 'react';
import { MortgageFormData } from './MortgageInputForm';

interface MortgageSummaryProps {
  formData: MortgageFormData;
  loanAmount: number;
  downPaymentPercent: number;
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  formatCurrency: (value: number) => string;
}

const MortgageSummary: React.FC<MortgageSummaryProps> = ({
  formData,
  loanAmount,
  downPaymentPercent,
  monthlyPayment,
  totalInterest,
  totalCost,
  formatCurrency
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Mortgage Summary</h3>
      <div className="space-y-4">
        <div className="border-b pb-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Loan Amount:</span>
            <span className="font-medium">{formatCurrency(loanAmount)}</span>
          </div>
        </div>
        <div className="border-b pb-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Down Payment:</span>
            <span className="font-medium">{formatCurrency(formData.downPayment)} ({downPaymentPercent.toFixed(0)}%)</span>
          </div>
        </div>
        <div className="border-b pb-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Loan Term:</span>
            <span className="font-medium">{formData.loanTerm} years ({formData.loanTerm * 12} months)</span>
          </div>
        </div>
        <div className="border-b pb-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Interest Rate:</span>
            <span className="font-medium">{formData.interestRate}%</span>
          </div>
        </div>
        <div className="border-b pb-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Monthly Payment:</span>
            <span className="font-medium text-primary">{formatCurrency(monthlyPayment)}</span>
          </div>
        </div>
        <div className="border-b pb-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Interest:</span>
            <span className="font-medium text-destructive">{formatCurrency(totalInterest)}</span>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Cost:</span>
            <span className="font-medium">{formatCurrency(totalCost)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageSummary;
