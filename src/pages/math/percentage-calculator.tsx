
import React from 'react';
import Layout from '@/components/layout/Layout';
import PercentageCalculator from '@/components/calculators/math/PercentageCalculator';
import CalculatorSEOContent from '@/components/seo/CalculatorSEOContent';
import { Percent } from 'lucide-react';

const PercentageCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <CalculatorSEOContent
        title="Percentage Calculator | Calculate Percentages Easily | CalcMaster"
        description="Calculate percentages quickly and easily with our percentage calculator. Find percentages of numbers, percentage increases, and more."
        keywords="percentage calculator, calculate percent, percentage increase, percentage decrease, percent of number, percent change calculator"
        pageIdentifier="percentage-calculator"
      >
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <header className="mb-8 text-center">
            <div className="inline-flex items-center justify-center p-2 bg-purple-500/10 rounded-full mb-4">
              <Percent className="h-6 w-6 text-purple-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              Percentage Calculator
            </h1>
            <p className="text-xl max-w-2xl mx-auto px-4">
              Calculate percentages quickly and easily for any number.
            </p>
          </header>
          
          <PercentageCalculator />
        </div>
      </CalculatorSEOContent>
    </Layout>
  );
};

export default PercentageCalculatorPage;
