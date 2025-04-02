
import React from 'react';
import Layout from '@/components/layout/Layout';
import PageSEOContent from '@/components/seo/PageSEOContent';
import BetHedgingCalculator from '@/components/calculators/betting/BetHedgingCalculator';

const BetHedgingCalculatorPage = () => {
  return (
    <Layout>
      <PageSEOContent
        title="Bet Hedging Calculator | Optimize Your Hedging Strategy | CalcMaster"
        description="Calculate optimal hedge bets to lock in profits or minimize losses on existing wagers. Free online bet hedging calculator."
        keywords="hedge betting, hedging calculator, hedge bet strategy, betting hedge, lock in profit, minimize losses"
        pageIdentifier="bet-hedging-calculator"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Bet Hedging Calculator</h1>
              <p className="text-gray-600 md:text-lg">
                Calculate optimal hedge bets to lock in profits or minimize losses on existing wagers.
              </p>
            </div>
            
            <BetHedgingCalculator />
          </div>
        </div>
      </PageSEOContent>
    </Layout>
  );
};

export default BetHedgingCalculatorPage;
