
import React from 'react';
import Layout from '@/components/layout/Layout';
import PageSEOContent from '@/components/seo/PageSEOContent';
import KenoProbabilityCalculator from '@/components/calculators/casino/KenoProbabilityCalculator';

const KenoProbabilityCalculatorPage = () => {
  return (
    <Layout>
      <PageSEOContent
        title="Keno Probability Calculator | Keno Odds | CalcMaster"
        description="Calculate the probability of hitting different numbers in Keno. Analyze Keno odds and expected returns with our free calculator."
        keywords="keno probability, keno odds, keno calculator, keno payout, keno strategy, keno expected value"
        pageIdentifier="keno-probability-calculator"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Keno Probability Calculator</h1>
              <p className="text-gray-600 md:text-lg">
                Calculate the probability of hitting different numbers in Keno and analyze your expected return.
              </p>
            </div>
            
            <KenoProbabilityCalculator />
          </div>
        </div>
      </PageSEOContent>
    </Layout>
  );
};

export default KenoProbabilityCalculatorPage;
