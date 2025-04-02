
import React from 'react';
import Layout from '@/components/layout/Layout';
import PageSEOContent from '@/components/seo/PageSEOContent';
import ParlayCalculator from '@/components/calculators/betting/ParlayCalculator';

const ParlayCalculatorPage = () => {
  return (
    <Layout>
      <PageSEOContent
        title="Parlay Calculator | Calculate Parlay Odds and Payouts | CalcMaster"
        description="Calculate potential payouts for parlay bets across multiple events. Understand your parlays better with our free online parlay calculator."
        keywords="parlay calculator, accumulator calculator, multiple bet calculator, parlay odds, parlay payout, betting calculator"
        pageIdentifier="parlay-calculator"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Parlay Calculator</h1>
              <p className="text-gray-600 md:text-lg">
                Calculate potential payouts for parlay bets across multiple events.
              </p>
            </div>
            
            <ParlayCalculator />
          </div>
        </div>
      </PageSEOContent>
    </Layout>
  );
};

export default ParlayCalculatorPage;
