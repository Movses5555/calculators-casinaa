
import React from "react";
import Layout from "@/components/layout/Layout";
import StablecoinAPYTracker from "@/components/calculators/crypto/StablecoinAPYTracker";
import CalculatorSEOContent from "@/components/seo/CalculatorSEOContent";

const StablecoinAPYTrackerPage = () => {
  return (
    <Layout>
      <CalculatorSEOContent
        title="Stablecoin APY Tracker | Stablecoin Yield Comparison | CalcMaster"
        description="Track and compare current yields offered on stablecoins across different platforms. Find the best rates for your stablecoin investments in CeFi and DeFi."
        keywords="stablecoin APY, stablecoin yield, USDC interest, USDT yield, DAI interest rate, yield comparison, stablecoin interest, passive income"
        pageIdentifier="stablecoin-apy-tracker"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Stablecoin APY Tracker</h1>
              <p className="text-gray-600 md:text-lg">
                Compare annual percentage yields (APY) for stablecoins across multiple platforms.
              </p>
            </div>
            
            <StablecoinAPYTracker />
          </div>
        </div>
      </CalculatorSEOContent>
    </Layout>
  );
};

export default StablecoinAPYTrackerPage;
