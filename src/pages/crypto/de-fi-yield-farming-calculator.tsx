
import React from 'react';
import Layout from '@/components/layout/Layout';
import DeFiYieldFarmingCalculator from '@/components/calculators/crypto/DeFiYieldFarmingCalculator';
import CalculatorSEOContent from '@/components/seo/CalculatorSEOContent';

const DeFiYieldFarmingCalculatorPage = () => {
  return (
    <Layout>
      <CalculatorSEOContent
        title="DeFi Yield Farming Calculator | Liquidity Mining Returns | CalcMaster"
        description="Calculate potential returns from DeFi yield farming and liquidity mining across different protocols with our free calculator."
        keywords="yield farming, DeFi calculator, liquidity mining, DeFi returns, yield APY, impermanent loss, DeFi yields, LP tokens"
        pageIdentifier="defi-yield-farming-calculator"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">DeFi Yield Farming Calculator</h1>
              <p className="text-gray-600 md:text-lg">
                Calculate potential returns from DeFi yield farming and liquidity mining on various protocols.
              </p>
            </div>
            
            <DeFiYieldFarmingCalculator />
          </div>
        </div>
      </CalculatorSEOContent>
    </Layout>
  );
};

export default DeFiYieldFarmingCalculatorPage;
