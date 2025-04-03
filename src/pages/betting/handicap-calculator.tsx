
import React from "react";
import { Helmet } from "react-helmet";
import BettingLayout from "@/components/layout/BettingLayout";
import PlaceholderCalculator from "@/components/calculators/betting/PlaceholderCalculator";

const HandicapCalculatorPage = () => {
  return (
    <>
      <Helmet>
        <title>Handicap Betting Calculator | Money Metrics Mania</title>
        <meta 
          name="description" 
          content="Calculate payouts for Asian handicap, European handicap, and point spread bets. Free online calculator for handicap betting markets."
        />
      </Helmet>
      <BettingLayout 
        title="Handicap Betting Calculator" 
        description="Calculate potential returns for various handicap betting markets including Asian handicap, European handicap, and point spreads. Understand how handicaps affect your bets."
        pageIdentifier="handicap-calculator"
      >
        <PlaceholderCalculator 
          title="Handicap Betting Calculator"
          description="Calculate potential returns for various handicap betting markets"
        />
      </BettingLayout>
    </>
  );
};

export default HandicapCalculatorPage;
