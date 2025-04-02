
import React from 'react';
import { BarChart, Bar, Cell, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { calculatorColors } from '@/utils/calculatorColors';

interface MortgageComparisonChartProps {
  loanAmount: number;
  totalInterest: number;
  downPayment: number;
  totalCost: number;
  formatCurrency: (value: number) => string;
}

const MortgageComparisonChart: React.FC<MortgageComparisonChartProps> = ({
  loanAmount,
  totalInterest,
  downPayment,
  totalCost,
  formatCurrency
}) => {
  const comparisonData = [
    {
      name: 'Principal',
      amount: loanAmount,
      color: calculatorColors.chart.principal
    },
    {
      name: 'Interest',
      amount: totalInterest,
      color: calculatorColors.chart.interest
    },
    {
      name: 'Down Payment',
      amount: downPayment,
      color: calculatorColors.chart.downPayment
    },
    {
      name: 'Total Cost',
      amount: totalCost + downPayment,
      color: calculatorColors.chart.totalCost
    }
  ];

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={comparisonData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} width={80} />
          <RechartsTooltip formatter={(value) => formatCurrency(Number(value))} />
          <Bar dataKey="amount" name="Amount">
            {comparisonData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MortgageComparisonChart;
