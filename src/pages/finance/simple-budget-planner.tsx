
import React from 'react';
import Layout from '@/components/layout/Layout';
import Head from "next/head";
import { Wallet } from 'lucide-react';
import { calculatorColors } from '@/utils/calculatorColors';
import SimpleBudgetPlanner from '@/components/calculators/finance/SimpleBudgetPlanner';

const SimpleBudgetPlannerPage: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Simple Budget Planner | Easy Financial Planning</title>
        <meta name="description" content="Create a simple budget plan to manage your finances effectively. Track income, expenses, and savings with our easy-to-use budget planner." />
        <meta name="keywords" content="budget planner, simple budget, financial planning, expense tracker, personal finance" />
        <link rel="canonical" href="/finance/simple-budget-planner" />
      </Head>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-green-500/10 rounded-full mb-4">
            <Wallet className="h-6 w-6 text-green-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2" style={{ color: calculatorColors.text.heading }}>
            Simple Budget Planner
          </h1>
          <p className="text-xl max-w-2xl mx-auto px-4" style={{ color: calculatorColors.text.body }}>
            Plan your finances and track your spending with our easy-to-use budget planner.
          </p>
        </header>
        
        <SimpleBudgetPlanner />
      </div>
    </Layout>
  );
};

export default SimpleBudgetPlannerPage;
