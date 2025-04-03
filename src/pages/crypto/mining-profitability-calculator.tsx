
import React from 'react';
import Layout from '@/components/layout/Layout';
import MiningProfitabilityCalculator from '@/components/calculators/crypto/MiningProfitabilityCalculator';
import CalculatorSEOContent from '@/components/seo/CalculatorSEOContent';

const MiningProfitabilityCalculatorPage = () => {
  return (
    <Layout>
      <CalculatorSEOContent
        title="Mining Profitability Calculator | Crypto Mining Calculator | CalcMaster"
        description="Calculate cryptocurrency mining profitability based on hash rate, power consumption, and electricity costs with our free mining calculator."
        keywords="mining calculator, crypto mining, mining profitability, bitcoin mining, hash rate, mining ROI, GPU mining, ASIC mining"
        pageIdentifier="mining-profitability-calculator"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Mining Profitability Calculator</h1>
              <p className="text-gray-600 md:text-lg">
                Calculate cryptocurrency mining profitability based on hash rate, power consumption, and costs.
              </p>
            </div>
            
            <MiningProfitabilityCalculator />
          </div>
        </div>
      </CalculatorSEOContent>
    </Layout>
  );
};

export default MiningProfitabilityCalculatorPage;
