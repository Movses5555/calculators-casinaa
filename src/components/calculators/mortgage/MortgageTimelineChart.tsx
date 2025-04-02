
import React from 'react';
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis } from 'recharts';
import { calculatorColors } from '@/utils/calculatorColors';

interface TimelineDataPoint {
  month: number;
  remainingBalance: number;
  totalPrincipalPaid: number;
  totalInterestPaid: number;
}

interface MortgageTimelineChartProps {
  timelineData: TimelineDataPoint[];
  formatCurrency: (value: number) => string;
}

const MortgageTimelineChart: React.FC<MortgageTimelineChartProps> = ({
  timelineData,
  formatCurrency
}) => {
  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={timelineData}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis 
            dataKey="month" 
            label={{ 
              value: 'Month', 
              position: 'insideBottom', 
              offset: -5 
            }}
            tickFormatter={(month) => Math.floor(month/12) + 'y'}
          />
          <YAxis 
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            width={80}
          />
          <RechartsTooltip 
            formatter={(value) => formatCurrency(Number(value))}
            labelFormatter={(month) => `Month ${month} (Year ${Math.floor(month/12) + 1})`}
          />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="remainingBalance" 
            name="Remaining Balance"
            stroke={calculatorColors.chart.balance} 
            fill={`${calculatorColors.chart.balance}80`} 
            activeDot={{ r: 6 }} 
          />
          <Area 
            type="monotone" 
            dataKey="totalPrincipalPaid" 
            name="Principal Paid"
            stroke={calculatorColors.chart.principal} 
            fill={`${calculatorColors.chart.principal}80`} 
            activeDot={{ r: 6 }} 
          />
          <Area 
            type="monotone" 
            dataKey="totalInterestPaid" 
            name="Interest Paid"
            stroke={calculatorColors.chart.interest} 
            fill={`${calculatorColors.chart.interest}80`} 
            activeDot={{ r: 6 }} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MortgageTimelineChart;
