
import React from "react";
import Head from "next/head";
import BettingLayout from "@/components/layout/BettingLayout";
import PlaceholderCalculator from "@/components/calculators/betting/PlaceholderCalculator";

const StopLossCalculatorPage = () => {
  return (
    <>
      <Head>
        <title>Stop Loss/Take Profit Calculator | Money Metrics Mania</title>
        <meta 
          name="description" 
          content="Calculate optimal stop loss and take profit levels for trading and betting. Manage risk and secure profits with proper exit strategies."
        />
      </Head>
      <BettingLayout 
        title="Stop Loss/Take Profit Calculator" 
        description="Calculate optimal stop loss and take profit levels for your betting or trading activity. Learn how to manage risk and secure profits with proper exit strategies."
        pageIdentifier="stop-loss-calculator"
      >
        <PlaceholderCalculator 
          title="Stop Loss/Take Profit Calculator"
          description="Calculate optimal stop loss and take profit levels for your betting or trading activity"
        />
      </BettingLayout>
    </>
  );
};

export default StopLossCalculatorPage;
