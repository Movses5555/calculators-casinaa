
import React from 'react';
import Layout from '@/components/layout/Layout';
import CryptoProfitCalculator from '@/components/calculators/crypto/CryptoProfitCalculator';
import CalculatorSEOContent from '@/components/seo/CalculatorSEOContent';

const CryptoProfitCalculatorPage = () => {
  return (
    <Layout>
      <CalculatorSEOContent
        title="Crypto Profit Calculator | Cryptocurrency Investment Returns | CalcMaster"
        description="Calculate profit or loss on your cryptocurrency investments. Track ROI, unrealized gains, and performance metrics with our free calculator."
        keywords="crypto profit, cryptocurrency calculator, bitcoin profit, crypto ROI, investment returns, crypto gains, altcoin calculator, crypto investment"
        pageIdentifier="crypto-profit-calculator"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Crypto Profit Calculator</h1>
              <p className="text-gray-600 md:text-lg">
                Calculate profit or loss on your cryptocurrency investments and track performance over time.
              </p>
            </div>
            
            <CryptoProfitCalculator />
          </div>
        </div>
      </CalculatorSEOContent>
    </Layout>
  );
};

export default CryptoProfitCalculatorPage;
