
import React from "react";
import { Helmet } from "react-helmet";
import BettingLayout from "@/components/layout/BettingLayout";
import PlaceholderCalculator from "@/components/calculators/betting/PlaceholderCalculator";

const LayBetCalculatorPage = () => {
  return (
    <>
      <Helmet>
        <title>Lay Bet Calculator | Money Metrics Mania</title>
        <meta 
          name="description" 
          content="Calculate liability and potential profit for lay bets on betting exchanges. Free online calculator for exchange betting."
        />
      </Helmet>
      <BettingLayout 
        title="Lay Bet Calculator" 
        description="Calculate liability and potential returns for lay bets on betting exchanges. Understand your risk when betting against an outcome happening."
        pageIdentifier="lay-bet-calculator"
      >
        <PlaceholderCalculator 
          title="Lay Bet Calculator"
          description="Calculate liability and potential returns for lay bets on betting exchanges"
        />
      </BettingLayout>
    </>
  );
};

export default LayBetCalculatorPage;
