
import React from "react";
import Layout from "@/components/layout/Layout";
import CryptoLoanCalculator from "@/components/calculators/crypto/CryptoLoanCalculator";
import CalculatorSEOContent from "@/components/seo/CalculatorSEOContent";

const CryptoLoanCalculatorPage = () => {
  return (
    <Layout>
      <CalculatorSEOContent
        title="Crypto Loan Calculator | Digital Asset Backed Loans | CalcMaster"
        description="Calculate crypto-backed loan terms and repayments. Understand collateral requirements, loan-to-value ratios, and interest costs for cryptocurrency loans."
        keywords="crypto loan, crypto-backed loan, bitcoin loan, collateral loan, LTV ratio, loan liquidation, crypto borrowing, digital asset loan"
        pageIdentifier="crypto-loan-calculator"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Cryptocurrency Loan Calculator</h1>
              <p className="text-gray-600 md:text-lg">
                Plan your crypto-backed loans with our detailed calculator.
              </p>
            </div>
            
            <CryptoLoanCalculator />
          </div>
        </div>
      </CalculatorSEOContent>
    </Layout>
  );
};

export default CryptoLoanCalculatorPage;
