
import React from 'react';
import Layout from '@/components/layout/Layout';
import Timer from '@/components/calculators/random/Timer';
import CalculatorSEOContent from '@/components/seo/CalculatorSEOContent';

const TimerPage = () => {
  return (
    <Layout>
      <CalculatorSEOContent
        title="Countdown Timer | Online Timer with Alarm | CalcMaster"
        description="Free online countdown timer with alarm sound, customizable settings and easy controls. Perfect for cooking, studying, workouts, and presentations."
        keywords="countdown timer, online timer, alarm timer, time tracking, countdown clock, web timer, cooking timer, study timer"
        pageIdentifier="timer"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Countdown Timer</h1>
              <p className="text-gray-600 md:text-lg">
                Free online countdown timer with alarm notifications and easy controls.
              </p>
            </div>
            
            <Timer />
          </div>
        </div>
      </CalculatorSEOContent>
    </Layout>
  );
};

export default TimerPage;
