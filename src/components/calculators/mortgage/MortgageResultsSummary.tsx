
import React from 'react';
import { Card, CardHeader, CardDescription, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MortgageResultsSummaryProps {
  monthlyPayment: number;
  loanAmount: number;
  totalInterest: number;
  totalCost: number;
  isCalculating: boolean;
  formatCurrency: (value: number) => string;
}

const MortgageResultsSummary: React.FC<MortgageResultsSummaryProps> = ({
  monthlyPayment,
  loanAmount,
  totalInterest,
  totalCost,
  isCalculating,
  formatCurrency
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className={cn("shadow-subtle transition-all duration-300", isCalculating ? "opacity-50" : "opacity-100")}>
        <CardHeader className="py-4">
          <CardDescription>Monthly Payment</CardDescription>
          <CardTitle className="text-2xl text-primary">
            {formatCurrency(monthlyPayment)}
          </CardTitle>
        </CardHeader>
      </Card>
      
      <Card className={cn("shadow-subtle transition-all duration-300", isCalculating ? "opacity-50" : "opacity-100")}>
        <CardHeader className="py-4">
          <CardDescription>Loan Amount</CardDescription>
          <CardTitle className="text-2xl">
            {formatCurrency(loanAmount)}
          </CardTitle>
        </CardHeader>
      </Card>
      
      <Card className={cn("shadow-subtle transition-all duration-300", isCalculating ? "opacity-50" : "opacity-100")}>
        <CardHeader className="py-4">
          <CardDescription>Total Interest</CardDescription>
          <CardTitle className="text-2xl text-destructive">
            {formatCurrency(totalInterest)}
          </CardTitle>
        </CardHeader>
      </Card>
      
      <Card className={cn("shadow-subtle transition-all duration-300", isCalculating ? "opacity-50" : "opacity-100")}>
        <CardHeader className="py-4">
          <CardDescription>Total Payment</CardDescription>
          <CardTitle className="text-2xl">
            {formatCurrency(totalCost)}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default MortgageResultsSummary;
