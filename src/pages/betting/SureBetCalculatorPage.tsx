
import React from "react";
import { Helmet } from "react-helmet";
import BettingLayout from "@/components/layout/BettingLayout";
import PlaceholderCalculator from "@/components/calculators/betting/PlaceholderCalculator";

const SureBetCalculatorPage = () => {
  return (
    <>
      <Helmet>
        <title>Sure Bet (Arbitrage) Calculator | Money Metrics Mania</title>
        <meta 
          name="description" 
          content="Find arbitrage opportunities across bookmakers with our sure bet calculator. Guarantee profits regardless of the outcome by betting on all possibilities."
        />
      </Helmet>
      <BettingLayout 
        title="Sure Bet (Arbitrage) Calculator" 
        description="Calculate arbitrage opportunities across different bookmakers. Find situations where you can bet on all possible outcomes and guarantee a profit regardless of the result."
        pageIdentifier="sure-bet-calculator"
      >
        <PlaceholderCalculator 
          title="Sure Bet (Arbitrage) Calculator"
          description="Calculate arbitrage opportunities across different bookmakers"
        />
      </BettingLayout>
    </>
  );
};

export default SureBetCalculatorPage;
