
import React from 'react';
import Layout from '@/components/layout/Layout';
import SavingsGoalTrackerHeader from '@/components/calculators/finance/SavingsGoalTrackerHeader';
import SavingsGoalTracker from '@/components/calculators/finance/SavingsGoalTracker';
import Head from "next/head";

const SavingsGoalTrackerPage: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Savings Goal Calculator | Track Your Financial Goals</title>
        <meta name="description" content="Plan your savings and track progress towards your financial goals with our savings goal calculator. See how long it takes to reach your target." />
        <meta name="keywords" content="savings calculator, savings goal, financial planning, savings tracker, investment calculator" />
        <link rel="canonical" href="/finance/savings-goal-tracker" />
        <meta property="og:title" content="Savings Goal Calculator | Track Your Financial Goals" />
        <meta property="og:description" content="Plan your savings and track progress towards your financial goals with our savings goal calculator. See how long it takes to reach your target." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/finance/savings-goal-tracker" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Savings Goal Calculator",
              "description": "Plan your savings and track progress towards your financial goals",
              "mainEntity": {
                "@type": "SoftwareApplication",
                "name": "Savings Goal Calculator",
                "applicationCategory": "FinanceApplication",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                }
              }
            }
          `}
        </script>
      </Head>

      <div className="container max-w-6xl mx-auto px-4 py-8">
        <SavingsGoalTrackerHeader />
        <SavingsGoalTracker />
      </div>
    </Layout>
  );
};

export default SavingsGoalTrackerPage;
