
import React from 'react';
import Layout from '@/components/layout/Layout';
import TimeZoneConverter from '@/components/calculators/random/TimeZoneConverter';
import CalculatorSEOContent from '@/components/seo/CalculatorSEOContent';

const TimeZoneConverterPage = () => {
  return (
    <Layout>
      <CalculatorSEOContent
        title="Time Zone Converter | World Clock | CalcMaster"
        description="Convert time between different time zones easily with our free online time zone converter tool. Compare multiple time zones at once."
        keywords="time zone converter, world clock, time difference, international time, time zone calculator, timezone comparison"
        pageIdentifier="time-zone-converter"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Time Zone Converter</h1>
              <p className="text-gray-600 md:text-lg">
                Convert times between different time zones around the world.
              </p>
            </div>
            
            <TimeZoneConverter />
          </div>
        </div>
      </CalculatorSEOContent>
    </Layout>
  );
};

export default TimeZoneConverterPage;
