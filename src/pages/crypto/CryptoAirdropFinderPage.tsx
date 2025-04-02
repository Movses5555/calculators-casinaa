
import React from "react";
import Layout from "@/components/layout/Layout";
import CryptoAirdropFinder from "@/components/calculators/crypto/CryptoAirdropFinder";
import CalculatorSEOContent from "@/components/seo/CalculatorSEOContent";

const CryptoAirdropFinderPage = () => {
  return (
    <Layout>
      <CalculatorSEOContent
        title="Crypto Airdrop Finder | Free Token Distributions | CalcMaster"
        description="Discover upcoming cryptocurrency airdrops and learn how to participate. Find opportunities for free token distributions and new project launches."
        keywords="crypto airdrop, token airdrop, free crypto, airdrop finder, upcoming airdrops, token distribution, crypto giveaway, new crypto projects"
        pageIdentifier="crypto-airdrop-finder"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Cryptocurrency Airdrop Finder</h1>
              <p className="text-gray-600 md:text-lg">
                Find upcoming and active cryptocurrency airdrops to receive free tokens.
              </p>
            </div>
            
            <CryptoAirdropFinder />
          </div>
        </div>
      </CalculatorSEOContent>
    </Layout>
  );
};

export default CryptoAirdropFinderPage;
