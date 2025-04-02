
import React from "react";
import { Helmet } from "react-helmet";
import BettingLayout from "@/components/layout/BettingLayout";
import PlaceholderCalculator from "@/components/calculators/betting/PlaceholderCalculator";

const LossRecoveryCalculatorPage = () => {
  return (
    <>
      <Helmet>
        <title>Loss Recovery Calculator | Money Metrics Mania</title>
        <meta 
          name="description" 
          content="Calculate how to recover from betting losses safely. Determine optimal recovery stakes without risking your entire bankroll."
        />
      </Helmet>
      <BettingLayout 
        title="Loss Recovery Calculator" 
        description="Calculate how to recover from betting losses in a sustainable way. Learn responsible recovery strategies without risking your entire bankroll."
        pageIdentifier="loss-recovery-calculator"
      >
        <PlaceholderCalculator 
          title="Loss Recovery Calculator"
          description="Calculate how to recover from betting losses in a sustainable way"
        />
      </BettingLayout>
    </>
  );
};

export default LossRecoveryCalculatorPage;
