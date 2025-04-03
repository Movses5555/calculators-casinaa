
import React from 'react';
import Layout from '@/components/layout/Layout';
import DailyAffirmationGenerator from '@/components/calculators/random/DailyAffirmationGenerator';
import CalculatorSEOContent from '@/components/seo/CalculatorSEOContent';

const DailyAffirmationGeneratorPage = () => {
  return (
    <Layout>
      <CalculatorSEOContent
        title="Daily Affirmation Generator | Positive Affirmations | CalcMaster"
        description="Generate positive daily affirmations to boost your mood and mindset with our free affirmation generator. Customize by category and save your favorites."
        keywords="affirmation generator, positive affirmations, daily motivation, self-help, positive thinking, mindfulness tool, inspirational quotes"
        pageIdentifier="daily-affirmation-generator"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Daily Affirmation Generator</h1>
              <p className="text-gray-600 md:text-lg">
                Generate positive affirmations to boost your mood and mindset.
              </p>
            </div>
            
            <DailyAffirmationGenerator />
          </div>
        </div>
      </CalculatorSEOContent>
    </Layout>
  );
};

export default DailyAffirmationGeneratorPage;
