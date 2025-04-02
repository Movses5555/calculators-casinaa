
import React from 'react';
import Layout from '@/components/layout/Layout';
import PageSEOContent from '@/components/seo/PageSEOContent';
import CrapsPayoutCalculator from '@/components/calculators/casino/CrapsPayoutCalculator';

const CrapsPayoutCalculatorPage = () => {
  return (
    <Layout>
      <PageSEOContent
        title="Craps Payout Calculator | Craps Odds Calculator | CalcMaster"
        description="Calculate payouts and odds for all craps bets with our free calculator. Learn the best and worst bets in craps based on house edge and expected value."
        keywords="craps payout, craps odds, craps calculator, craps bet, craps strategy, dice odds"
        pageIdentifier="craps-payout-calculator"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Craps Payout Calculator</h1>
              <p className="text-gray-600 md:text-lg">
                Calculate payouts and odds for all craps bets. Find the best bets based on house edge.
              </p>
            </div>
            
            <CrapsPayoutCalculator />
          </div>
        </div>
      </PageSEOContent>
    </Layout>
  );
};

export default CrapsPayoutCalculatorPage;
