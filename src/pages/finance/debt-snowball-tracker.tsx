
import React from 'react';
import Layout from '@/components/layout/Layout';
import Head from "next/head";
import { Snowflake } from 'lucide-react';
import { calculatorColors } from '@/utils/calculatorColors';
import DebtSnowballTracker from '@/components/calculators/finance/DebtSnowballTracker';

const DebtSnowballTrackerPage: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Debt Snowball Tracker | Pay Off Debt Faster</title>
        <meta name="description" content="Track your debt payoff journey with our debt snowball calculator. See how quickly you can become debt-free with this popular debt reduction strategy." />
        <meta name="keywords" content="debt snowball, debt payoff, debt tracker, debt reduction, financial freedom" />
        <link rel="canonical" href="/finance/debt-snowball-tracker" />
      </Head>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-blue-500/10 rounded-full mb-4">
            <Snowflake className="h-6 w-6 text-blue-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2" style={{ color: calculatorColors.text.heading }}>
            Debt Snowball Tracker
          </h1>
          <p className="text-xl max-w-2xl mx-auto px-4" style={{ color: calculatorColors.text.body }}>
            Track your debt payoff journey and see how quickly you can become debt-free.
          </p>
        </header>
        
        <DebtSnowballTracker />
      </div>
    </Layout>
  );
};

export default DebtSnowballTrackerPage;
