
import React from 'react';
import Layout from '@/components/layout/Layout';
import PageSEOContent from '@/components/seo/PageSEOContent';
import BaccaratOddsCalculator from '@/components/calculators/casino/BaccaratOddsCalculator';

const BaccaratOddsCalculatorPage = () => {
  return (
    <Layout>
      <PageSEOContent
        title="Baccarat Odds Calculator | Baccarat Probability | CalcMaster"
        description="Calculate the odds, house edge, and expected value for all baccarat bets. Make informed decisions with our free baccarat calculator."
        keywords="baccarat odds, baccarat probability, baccarat calculator, banker bet, player bet, tie bet"
        pageIdentifier="baccarat-odds-calculator"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Baccarat Odds Calculator</h1>
              <p className="text-gray-600 md:text-lg">
                Calculate odds, house edge, and expected value for all baccarat bets.
              </p>
            </div>
            
            <BaccaratOddsCalculator />
          </div>
        </div>
      </PageSEOContent>
    </Layout>
  );
};

export default BaccaratOddsCalculatorPage;
