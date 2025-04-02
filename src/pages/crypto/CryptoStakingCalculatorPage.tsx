
import React from 'react';
import Layout from '@/components/layout/Layout';
import CryptoStakingCalculator from '@/components/calculators/crypto/CryptoStakingCalculator';
import CalculatorSEOContent from '@/components/seo/CalculatorSEOContent';

const CryptoStakingCalculatorPage = () => {
  return (
    <Layout>
      <CalculatorSEOContent
        title="Crypto Staking Calculator | Staking Rewards Estimator | CalcMaster"
        description="Calculate potential rewards from staking various cryptocurrencies. Estimate your staking yields and earnings with our free calculator."
        keywords="staking calculator, crypto staking, staking rewards, staking yield, passive income, staking APY, proof of stake, POS rewards"
        pageIdentifier="crypto-staking-calculator"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Crypto Staking Calculator</h1>
              <p className="text-gray-600 md:text-lg">
                Calculate potential rewards from staking various cryptocurrencies and estimate your earnings.
              </p>
            </div>
            
            <CryptoStakingCalculator />
          </div>
        </div>
      </CalculatorSEOContent>
    </Layout>
  );
};

export default CryptoStakingCalculatorPage;
