
import React from "react";
import Head from "next/head";
import BettingLayout from "@/components/layout/BettingLayout";
import PlaceholderCalculator from "@/components/calculators/betting/PlaceholderCalculator";

const FibonacciCalculatorPage = () => {
  return (
    <>
      <Head>
        <title>Fibonacci Betting Calculator | Money Metrics Mania</title>
        <meta 
          name="description" 
          content="Calculate stakes using the Fibonacci betting system. Determine how to structure your bets using the Fibonacci sequence for potential recovery from losses."
        />
      </Head>
      <BettingLayout 
        title="Fibonacci Betting Calculator" 
        description="Calculate stakes using the Fibonacci betting system, which follows the Fibonacci sequence to determine bet sizes. Analyze the potential and risks of this progressive betting strategy."
        pageIdentifier="fibonacci-calculator"
      >
        <PlaceholderCalculator 
          title="Fibonacci Betting Calculator"
          description="Calculate stakes using the Fibonacci betting system, which follows the Fibonacci sequence to determine bet sizes"
        />
      </BettingLayout>
    </>
  );
};

export default FibonacciCalculatorPage;
