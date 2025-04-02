
import React from 'react';
import Layout from '@/components/layout/Layout';
import PageSEOContent from '@/components/seo/PageSEOContent';
import PokerHandProbabilityCalculator from '@/components/calculators/casino/PokerHandProbabilityCalculator';

const PokerHandProbabilityCalculatorPage = () => {
  return (
    <Layout>
      <PageSEOContent
        title="Poker Hand Probability Calculator | Poker Odds | CalcMaster"
        description="Calculate poker hand probabilities and odds of winning with our free calculator. Improve your poker strategy with accurate hand strength analysis."
        keywords="poker odds, poker probability, poker calculator, hand strength, poker equity, texas holdem calculator"
        pageIdentifier="poker-hand-probability-calculator"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Poker Hand Probability Calculator</h1>
              <p className="text-gray-600 md:text-lg">
                Calculate poker hand probabilities and odds of winning against opponents' possible hands.
              </p>
            </div>
            
            <PokerHandProbabilityCalculator />
          </div>
        </div>
      </PageSEOContent>
    </Layout>
  );
};

export default PokerHandProbabilityCalculatorPage;
