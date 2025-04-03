
import React from "react";
import { Helmet } from "react-helmet";
import BettingLayout from "@/components/layout/BettingLayout";
import PlaceholderCalculator from "@/components/calculators/betting/PlaceholderCalculator";

const StakingPlanCalculatorPage = () => {
  return (
    <>
      <Helmet>
        <title>Staking Plan Calculator | Money Metrics Mania</title>
        <meta 
          name="description" 
          content="Compare different staking plans for sports betting. Calculate optimal stake sizes using flat, percentage, Kelly criterion, and other methods."
        />
      </Helmet>
      <BettingLayout 
        title="Staking Plan Calculator" 
        description="Compare different staking plans and betting systems to find what works best for your betting style. Calculate stake sizes using flat betting, percentage, Kelly criterion, and other methods."
        pageIdentifier="staking-plan-calculator"
      >
        <PlaceholderCalculator 
          title="Staking Plan Calculator"
          description="Compare different staking plans and betting systems to find what works best for your betting style"
        />
      </BettingLayout>
    </>
  );
};

export default StakingPlanCalculatorPage;
