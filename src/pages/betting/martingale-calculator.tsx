
import React from "react";
import { Helmet } from "react-helmet";
import BettingLayout from "@/components/layout/BettingLayout";
import PlaceholderCalculator from "@/components/calculators/betting/PlaceholderCalculator";

const MartingaleCalculatorPage = () => {
  return (
    <>
      <Helmet>
        <title>Martingale Calculator | Money Metrics Mania</title>
        <meta 
          name="description" 
          content="Calculate stakes using the Martingale betting system. Understand the risks and potential bankroll requirements of progressive betting strategies."
        />
      </Helmet>
      <BettingLayout 
        title="Martingale Calculator" 
        description="Calculate stakes using the Martingale betting system where you double your bet after each loss. Understand the risks and bankroll requirements of this progressive betting strategy."
        pageIdentifier="martingale-calculator"
      >
        <PlaceholderCalculator 
          title="Martingale Calculator"
          description="Calculate stakes using the Martingale betting system where you double your bet after each loss"
        />
      </BettingLayout>
    </>
  );
};

export default MartingaleCalculatorPage;
