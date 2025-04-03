
import React from 'react';
import Layout from '@/components/layout/Layout';
import FlipACoin from '@/components/calculators/chance/FlipACoin';
import CalculatorSEOContent from '@/components/seo/CalculatorSEOContent';

const FlipACoinPage = () => {
  return (
    <Layout>
      <CalculatorSEOContent
        title="Flip a Coin | Virtual Coin Flipper | CalcMaster"
        description="Flip a virtual coin online with our free coin flipper. Get heads or tails instantly for making decisions or settling debates."
        keywords="coin flip, coin toss, virtual coin, heads or tails, online coin, random coin, decision maker, coin flipper"
        pageIdentifier="flip-a-coin"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Flip a Coin</h1>
              <p className="text-gray-600 md:text-lg">
                Virtual coin flipper with heads or tails outcome. Perfect for making quick decisions or settling debates.
              </p>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6">
              <FlipACoin />
            </div>
          </div>
        </div>
      </CalculatorSEOContent>
    </Layout>
  );
};

export default FlipACoinPage;
