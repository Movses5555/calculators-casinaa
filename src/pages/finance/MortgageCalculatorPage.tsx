
import React from 'react';
import Layout from '@/components/layout/Layout';
import ModernMortgageCalculator from '@/components/calculators/ModernMortgageCalculator';
import CalculatorSEOContent from '@/components/seo/CalculatorSEOContent';

const MortgageCalculatorPage = () => {
  return (
    <Layout>
      <CalculatorSEOContent
        title="Mortgage Calculator | Home Loan Payment Estimator | CalcMaster"
        description="Calculate your monthly mortgage payments, interest costs, and amortization schedule with our free mortgage calculator. Plan your home purchase effectively."
        keywords="mortgage calculator, home loan calculator, mortgage payment, house payment calculator, interest calculator, amortization schedule"
        pageIdentifier="mortgage-calculator"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Mortgage Calculator</h1>
              <p className="text-gray-600 md:text-lg">
                Calculate your monthly mortgage payments, interest costs, and see your complete amortization schedule.
              </p>
            </div>
            
            <ModernMortgageCalculator />
          </div>
        </div>
      </CalculatorSEOContent>
    </Layout>
  );
};

export default MortgageCalculatorPage;
