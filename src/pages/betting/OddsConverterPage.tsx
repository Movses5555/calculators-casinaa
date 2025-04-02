
import React from 'react';
import Layout from '@/components/layout/Layout';
import OddsConverter from '@/components/calculators/betting/OddsConverter';
import CalculatorSEOContent from '@/components/seo/CalculatorSEOContent';

const OddsConverterPage = () => {
  return (
    <Layout>
      <CalculatorSEOContent
        title="Odds Converter | Convert Betting Odds | CalcMaster"
        description="Convert between decimal, fractional, American, and implied probability odds formats with our free online odds converter. Make smarter betting decisions."
        keywords="odds converter, betting odds, decimal odds, fractional odds, american odds, moneyline odds, implied probability, betting calculator"
        pageIdentifier="odds-converter"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Odds Converter</h1>
              <p className="text-gray-600 md:text-lg">
                Convert between decimal, fractional, American, and implied probability odds formats.
              </p>
            </div>
            
            <OddsConverter />
          </div>
        </div>
      </CalculatorSEOContent>
    </Layout>
  );
};

export default OddsConverterPage;
