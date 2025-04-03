
import React from "react";
import Layout from "@/components/layout/Layout";
import GasFeeTracker from "@/components/calculators/crypto/GasFeeTracker";
import CalculatorSEOContent from "@/components/seo/CalculatorSEOContent";

const GasFeeTrackerPage = () => {
  return (
    <Layout>
      <CalculatorSEOContent
        title="Gas Fee Tracker | Blockchain Transaction Costs | CalcMaster"
        description="Track current gas fees for Ethereum and other blockchain networks. Plan your transactions during lower fee periods to save on transaction costs."
        keywords="gas fees, ethereum gas, transaction fees, gwei tracker, eth gas station, blockchain fees, gas price, network congestion"
        pageIdentifier="gas-fee-tracker"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Blockchain Gas Fee Tracker</h1>
              <p className="text-gray-600 md:text-lg">
                Monitor gas fees across major blockchain networks to optimize your transaction timing.
              </p>
            </div>
            
            <GasFeeTracker />
          </div>
        </div>
      </CalculatorSEOContent>
    </Layout>
  );
};

export default GasFeeTrackerPage;
