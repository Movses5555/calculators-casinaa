
import React from 'react';
import Layout from '@/components/layout/Layout';
import PageSEOContent from '@/components/seo/PageSEOContent';
import SlotMachineRTPCalculator from '@/components/calculators/casino/SlotMachineRTPCalculator';

const SlotMachineRTPCalculatorPage = () => {
  return (
    <Layout>
      <PageSEOContent
        title="Slot Machine RTP Calculator | Return to Player Analysis | CalcMaster"
        description="Calculate and compare the Return to Player (RTP) percentages for different slot machines. Find the best slots based on payout percentage."
        keywords="slot machine RTP, return to player, slot payback, slot variance, slot volatility, slot payout"
        pageIdentifier="slot-machine-rtp-calculator"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Slot Machine RTP Calculator</h1>
              <p className="text-gray-600 md:text-lg">
                Calculate and compare Return to Player (RTP) percentages for slot machines.
              </p>
            </div>
            
            <SlotMachineRTPCalculator />
          </div>
        </div>
      </PageSEOContent>
    </Layout>
  );
};

export default SlotMachineRTPCalculatorPage;
