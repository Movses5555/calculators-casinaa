
import React from "react";
import { Helmet } from "react-helmet";
import BettingLayout from "@/components/layout/BettingLayout";
import PlaceholderCalculator from "@/components/calculators/betting/PlaceholderCalculator";

const OverUnderCalculatorPage = () => {
  return (
    <>
      <Helmet>
        <title>Over/Under Betting Calculator | Money Metrics Mania</title>
        <meta 
          name="description" 
          content="Calculate potential payouts for over/under (totals) bets in sports betting. Analyze historical data and trends for more informed betting decisions."
        />
      </Helmet>
      <BettingLayout 
        title="Over/Under Betting Calculator" 
        description="Calculate potential returns for over/under (totals) bets across different sports. Analyze historical performance and trends to make more informed betting decisions."
        pageIdentifier="over-under-calculator"
      >
        <PlaceholderCalculator 
          title="Over/Under Betting Calculator"
          description="Calculate potential returns for over/under (totals) bets across different sports"
        />
      </BettingLayout>
    </>
  );
};

export default OverUnderCalculatorPage;
