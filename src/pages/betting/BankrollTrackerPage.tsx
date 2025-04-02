
import React from "react";
import { Helmet } from "react-helmet";
import BettingLayout from "@/components/layout/BettingLayout";
import PlaceholderCalculator from "@/components/calculators/betting/PlaceholderCalculator";

const BankrollTrackerPage = () => {
  return (
    <>
      <Helmet>
        <title>Bankroll Tracker | Money Metrics Mania</title>
        <meta 
          name="description" 
          content="Track your betting bankroll, analyze performance, and generate betting stats. Free bankroll management tool for sports bettors."
        />
      </Helmet>
      <BettingLayout 
        title="Bankroll Tracker" 
        description="Track your betting bankroll, analyze performance, and generate stats. Maintain proper bankroll management and track your betting success over time."
        pageIdentifier="bankroll-tracker"
      >
        <PlaceholderCalculator 
          title="Bankroll Tracker"
          description="Track your betting bankroll, analyze performance, and generate stats"
        />
      </BettingLayout>
    </>
  );
};

export default BankrollTrackerPage;
