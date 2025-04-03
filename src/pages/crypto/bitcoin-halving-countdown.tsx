
import React from "react";
import Layout from "@/components/layout/Layout";
import BitcoinHalvingCountdown from "@/components/calculators/crypto/BitcoinHalvingCountdown";
import CalculatorSEOContent from "@/components/seo/CalculatorSEOContent";

const BitcoinHalvingCountdownPage = () => {
  return (
    <Layout>
      <CalculatorSEOContent
        title="Bitcoin Halving Countdown | BTC Reward Halving | CalcMaster"
        description="Track the countdown to the next Bitcoin halving event. Understand the impact of halving on Bitcoin's supply and potentially its price with our live tracker."
        keywords="bitcoin halving, btc halving, bitcoin halving countdown, crypto halving, mining rewards, bitcoin supply, halving impact"
        pageIdentifier="bitcoin-halving-countdown"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Bitcoin Halving Countdown</h1>
              <p className="text-gray-600 md:text-lg">
                Stay informed about the next Bitcoin halving event with our real-time countdown.
              </p>
            </div>
            
            <BitcoinHalvingCountdown />
          </div>
        </div>
      </CalculatorSEOContent>
    </Layout>
  );
};

export default BitcoinHalvingCountdownPage;
