
import React from 'react';
import Layout from '@/components/layout/Layout';
import PageSEOContent from '@/components/seo/PageSEOContent';
import KellyCriterionCalculator from '@/components/calculators/betting/KellyCriterionCalculator';

const KellyCriterionCalculatorPage = () => {
  return (
    <Layout>
      <PageSEOContent
        title="Kelly Criterion Calculator | Optimize Bet Sizing | CalcMaster"
        description="Calculate optimal bet sizes using the Kelly Criterion formula. Maximize long-term growth while managing risk with our free calculator."
        keywords="kelly criterion, kelly formula, optimal bet size, betting bankroll, stake sizing, bankroll management"
        pageIdentifier="kelly-criterion-calculator"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Kelly Criterion Calculator</h1>
              <p className="text-gray-600 md:text-lg">
                Optimize bet sizes using the Kelly Criterion formula to maximize long-term bankroll growth.
              </p>
            </div>
            
            <KellyCriterionCalculator />
          </div>
        </div>
      </PageSEOContent>
    </Layout>
  );
};

export default KellyCriterionCalculatorPage;
