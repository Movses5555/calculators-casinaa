
import React from 'react';
import Layout from '@/components/layout/Layout';
import PageSEOContent from '@/components/seo/PageSEOContent';
import RouletteSpinSimulator from '@/components/calculators/casino/RouletteSpinSimulator';

const RouletteSpinSimulatorPage = () => {
  return (
    <Layout>
      <PageSEOContent
        title="Roulette Spin Simulator | Virtual Roulette Wheel | CalcMaster"
        description="Simulate roulette spins and track results with our free online roulette simulator. Test betting systems without risking real money."
        keywords="roulette simulator, virtual roulette, roulette spin, roulette wheel, roulette game, betting systems"
        pageIdentifier="roulette-spin-simulator"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Roulette Spin Simulator</h1>
              <p className="text-gray-600 md:text-lg">
                Simulate roulette spins and track results to test betting systems and strategies.
              </p>
            </div>
            
            <RouletteSpinSimulator />
          </div>
        </div>
      </PageSEOContent>
    </Layout>
  );
};

export default RouletteSpinSimulatorPage;
