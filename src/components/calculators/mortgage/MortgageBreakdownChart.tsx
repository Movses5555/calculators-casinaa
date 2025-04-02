
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from 'recharts';
import { calculatorColors } from '@/utils/calculatorColors';

interface MortgageBreakdownChartProps {
  breakdownData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  formatCurrency: (value: number) => string;
}

const MortgageBreakdownChart: React.FC<MortgageBreakdownChartProps> = ({
  breakdownData,
  formatCurrency
}) => {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={breakdownData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {breakdownData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend />
          <RechartsTooltip formatter={(value) => formatCurrency(Number(value))} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MortgageBreakdownChart;
