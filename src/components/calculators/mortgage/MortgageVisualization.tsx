/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart4 } from 'lucide-react';
import { cn } from '@/lib/utils';
import MortgageBreakdownChart from './MortgageBreakdownChart';
import MortgageTimelineChart from './MortgageTimelineChart';
import MortgageComparisonChart from './MortgageComparisonChart';
import MortgageSummary from './MortgageSummary';
import { MortgageFormData } from './MortgageInputForm';
import { calculatorColors } from '@/utils/calculatorColors';

interface MortgageVisualizationProps {
  formData: MortgageFormData;
  loanAmount: number;
  downPaymentPercent: number;
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  isCalculating: boolean;
  paymentScheduleData: any[];
  formatCurrency: (value: number) => string;
}

const MortgageVisualization: React.FC<MortgageVisualizationProps> = ({
  formData,
  loanAmount,
  downPaymentPercent,
  monthlyPayment,
  totalInterest,
  totalCost,
  isCalculating,
  paymentScheduleData,
  formatCurrency
}) => {
  const breakdownData = [
    { name: 'Principal', value: loanAmount, color: calculatorColors.chart.principal },
    { name: 'Interest', value: totalInterest, color: calculatorColors.chart.interest }
  ];

  return (
    <Card className="shadow-subtle overflow-hidden">
      <Tabs defaultValue="breakdown">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <BarChart4 className="mr-2 h-5 w-5 text-primary" />
              Payment Analysis
            </CardTitle>
            <TabsList>
              <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
            </TabsList>
          </div>
          <CardDescription>
            Visualize your mortgage payments over time
          </CardDescription>
        </CardHeader>
        <CardContent className={cn("pt-0 transition-all duration-300", isCalculating ? "opacity-50" : "opacity-100")}>
          <TabsContent value="breakdown" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Payment Distribution</h3>
                <MortgageBreakdownChart 
                  breakdownData={breakdownData} 
                  formatCurrency={formatCurrency} 
                />
              </div>
              <MortgageSummary
                formData={formData}
                loanAmount={loanAmount}
                downPaymentPercent={downPaymentPercent}
                monthlyPayment={monthlyPayment}
                totalInterest={totalInterest}
                totalCost={totalCost}
                formatCurrency={formatCurrency}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="timeline" className="mt-0">
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Mortgage Amortization Timeline</h3>
              <MortgageTimelineChart
                timelineData={paymentScheduleData}
                formatCurrency={formatCurrency}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="comparison" className="mt-0">
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Cost Comparison</h3>
              <MortgageComparisonChart
                loanAmount={loanAmount}
                totalInterest={totalInterest}
                downPayment={formData.downPayment}
                totalCost={totalCost}
                formatCurrency={formatCurrency}
              />
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default MortgageVisualization;
