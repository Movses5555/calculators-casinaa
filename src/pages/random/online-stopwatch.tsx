
import React from 'react';
import Layout from '@/components/layout/Layout';
import OnlineStopwatch from '@/components/calculators/random/OnlineStopwatch';
import CalculatorSEOContent from '@/components/seo/CalculatorSEOContent';

const OnlineStopwatchPage = () => {
  return (
    <Layout>
      <CalculatorSEOContent
        title="Online Stopwatch | Free Time Tracking Tool | CalcMaster"
        description="Free online stopwatch tool with lap times, customizable display and easy controls. Perfect for timing workouts, cooking, studying and more."
        keywords="online stopwatch, timer, lap timer, time tracking, free stopwatch, web stopwatch, workout timer"
        pageIdentifier="online-stopwatch"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Online Stopwatch</h1>
              <p className="text-gray-600 md:text-lg">
                Free online stopwatch with lap times and easy controls.
              </p>
            </div>
            
            <OnlineStopwatch />
          </div>
        </div>
      </CalculatorSEOContent>
    </Layout>
  );
};

export default OnlineStopwatchPage;
