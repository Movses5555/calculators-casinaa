
import React from "react";
import Layout from "@/components/layout/Layout";
import CryptoTaxCalculator from "@/components/calculators/crypto/CryptoTaxCalculator";
import CalculatorSEOContent from "@/components/seo/CalculatorSEOContent";

const CryptoTaxCalculatorPage = () => {
  return (
    <Layout>
      <CalculatorSEOContent
        title="Crypto Tax Calculator | Digital Asset Tax Estimator | CalcMaster"
        description="Calculate potential tax liabilities from your cryptocurrency trades and investments. Understand your crypto tax obligations with our easy-to-use calculator."
        keywords="crypto tax, cryptocurrency tax, bitcoin tax, capital gains tax, crypto tax calculator, tax liability, digital asset tax, crypto trading tax"
        pageIdentifier="crypto-tax-calculator"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Cryptocurrency Tax Calculator</h1>
              <p className="text-gray-600 md:text-lg">
                Estimate your tax obligations from cryptocurrency trading and investing.
              </p>
            </div>
            
            <CryptoTaxCalculator />
          </div>
        </div>
      </CalculatorSEOContent>
    </Layout>
  );
};

export default CryptoTaxCalculatorPage;
