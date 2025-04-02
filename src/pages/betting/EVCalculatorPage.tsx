
import React from 'react';
import Layout from '@/components/layout/Layout';
import PageSEOContent from '@/components/seo/PageSEOContent';
import EVCalculator from '@/components/calculators/betting/EVCalculator';

const EVCalculatorPage = () => {
  return (
    <Layout>
      <PageSEOContent
        title="Expected Value Calculator | Calculate EV for Bets | CalcMaster"
        description="Calculate the expected value (EV) of your bets to determine if they have positive or negative expected returns over time."
        keywords="expected value calculator, EV calculator, betting value, positive EV, betting edge, value betting"
        pageIdentifier="ev-calculator"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Expected Value Calculator</h1>
              <p className="text-gray-600 md:text-lg">
                Calculate the expected value (EV) of your bets to determine if they're profitable in the long run.
              </p>
            </div>
            
            <EVCalculator />
          </div>
        </div>
      </PageSEOContent>
    </Layout>
  );
};

export default EVCalculatorPage;
