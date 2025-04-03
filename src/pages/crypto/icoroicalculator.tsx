
import React from "react";
import Layout from "@/components/layout/Layout";
import ICOROICalculator from "@/components/calculators/crypto/ICOROICalculator";
import CalculatorSEOContent from "@/components/seo/CalculatorSEOContent";

const ICOROICalculatorPage = () => {
  return (
    <Layout>
      <CalculatorSEOContent
        title="ICO ROI Calculator | Initial Coin Offering Returns | CalcMaster"
        description="Calculate the return on investment (ROI) from your Initial Coin Offering (ICO) investments. Track your crypto token performance since purchase."
        keywords="ICO ROI, initial coin offering, ICO investment, token ROI, crypto investment returns, token sale, ICO calculator, token performance"
        pageIdentifier="ico-roi-calculator"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">ICO ROI Calculator</h1>
              <p className="text-gray-600 md:text-lg">
                Evaluate the performance of your Initial Coin Offering (ICO) investments.
              </p>
            </div>
            
            <ICOROICalculator />
          </div>
        </div>
      </CalculatorSEOContent>
    </Layout>
  );
};

export default ICOROICalculatorPage;
