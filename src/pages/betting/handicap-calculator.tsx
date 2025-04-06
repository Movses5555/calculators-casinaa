
import React from "react";
import Head from "next/head";
import BettingLayout from "@/components/layout/BettingLayout";
import PlaceholderCalculator from "@/components/calculators/betting/PlaceholderCalculator";

const HandicapCalculatorPage = () => {
  return (
    <>
      <Head>
        <title>Handicap Betting Calculator | Money Metrics Mania</title>
        <meta 
          name="description" 
          content="Calculate payouts for Asian handicap, European handicap, and point spread bets. Free online calculator for handicap betting markets."
        />
      </Head>
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
