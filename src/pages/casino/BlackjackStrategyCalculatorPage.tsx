
import React from 'react';
import Layout from '@/components/layout/Layout';
import PageSEOContent from '@/components/seo/PageSEOContent';
import BlackjackStrategyCalculator from '@/components/calculators/casino/BlackjackStrategyCalculator';

const BlackjackStrategyCalculatorPage = () => {
  return (
    <Layout>
      <PageSEOContent
        title="Blackjack Strategy Calculator | Optimal Blackjack Plays | CalcMaster"
        description="Get the mathematically optimal play for any blackjack hand with our free strategy calculator. Improve your blackjack skills and reduce the house edge."
        keywords="blackjack strategy, blackjack calculator, basic strategy, optimal play, blackjack odds, blackjack trainer"
        pageIdentifier="blackjack-strategy-calculator"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Blackjack Strategy Calculator</h1>
              <p className="text-gray-600 md:text-lg">
                Get the mathematically optimal play for any blackjack hand based on basic strategy.
              </p>
            </div>
            
            <BlackjackStrategyCalculator />
          </div>
        </div>
      </PageSEOContent>
    </Layout>
  );
};

export default BlackjackStrategyCalculatorPage;
