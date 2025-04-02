
import React from 'react';
import Layout from '@/components/layout/Layout';
import PageSEOContent from '@/components/seo/PageSEOContent';
import PokerICMCalculator from '@/components/calculators/casino/PokerICMCalculator';

const PokerICMCalculatorPage = () => {
  return (
    <Layout>
      <PageSEOContent
        title="Poker ICM Calculator | Independent Chip Model | CalcMaster"
        description="Calculate tournament equity using the Independent Chip Model (ICM). Make optimal decisions in poker tournaments with our free ICM calculator."
        keywords="poker ICM, independent chip model, tournament equity, ICM calculator, poker tournament, bubble factor"
        pageIdentifier="poker-icm-calculator"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Poker ICM Calculator</h1>
              <p className="text-gray-600 md:text-lg">
                Calculate tournament equity and make optimal decisions using the Independent Chip Model (ICM).
              </p>
            </div>
            
            <PokerICMCalculator />
          </div>
        </div>
      </PageSEOContent>
    </Layout>
  );
};

export default PokerICMCalculatorPage;
