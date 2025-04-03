
import React from 'react';
import Layout from '@/components/layout/Layout';
import RouletteOddsCalculator from '@/components/calculators/casino/RouletteOddsCalculator';
import CalculatorSEOContent from '@/components/seo/CalculatorSEOContent';

const RouletteOddsCalculatorPage = () => {
  return (
    <Layout>
      <CalculatorSEOContent
        title="Roulette Odds Calculator | Calculate Roulette Probabilities | CalcMaster"
        description="Calculate odds, payouts, and house edge for all roulette bets. Make informed decisions at the roulette table with our free calculator."
        keywords="roulette odds, roulette calculator, roulette probability, roulette payouts, european roulette, american roulette, roulette house edge, roulette strategy"
        pageIdentifier="roulette-odds-calculator"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Roulette Odds Calculator</h1>
              <p className="text-gray-600 md:text-lg">
                Calculate odds, payouts, and house edge for all roulette bets and strategies.
              </p>
            </div>
            
            <RouletteOddsCalculator />
          </div>
        </div>
      </CalculatorSEOContent>
    </Layout>
  );
};

export default RouletteOddsCalculatorPage;
