
import React from "react";
import Head from "next/head";
import BettingLayout from "@/components/layout/BettingLayout";
import PlaceholderCalculator from "@/components/calculators/betting/PlaceholderCalculator";

const AccaCalculatorPage = () => {
  return (
    <>
      <Head>
        <title>Acca (Accumulator) Calculator | Money Metrics Mania</title>
        <meta 
          name="description" 
          content="Calculate potential returns for accumulator bets with our free acca calculator. Plan your multiple selection bets and see potential payouts."
        />
      </Head>
      <BettingLayout 
        title="Acca (Accumulator) Calculator" 
        description="Calculate potential returns for accumulator bets with multiple selections. Plan your combination bets and see possible payouts with our acca calculator."
        pageIdentifier="acca-calculator"
      >
        <PlaceholderCalculator 
          title="Acca (Accumulator) Calculator"
          description="Calculate potential returns for accumulator bets with multiple selections"
        />
      </BettingLayout>
    </>
  );
};

export default AccaCalculatorPage;
