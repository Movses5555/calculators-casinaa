
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Helmet } from 'react-helmet';
import BillSplitCalculator from '@/components/calculators/math/BillSplitCalculator';

const BillSplitCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <Helmet>
        <title>Bill Split Calculator | Divide Expenses Fairly</title>
        <meta name="description" content="Split bills and expenses easily among friends, roommates, or groups. Calculate how much each person owes with our bill split calculator." />
        <meta name="keywords" content="bill splitter, expense sharing, split cost, roommate calculator, group expense" />
        <link rel="canonical" href="/math/bill-split-calculator" />
      </Helmet>

      <div className="container max-w-6xl mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-amber-500/10 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Bill Split Calculator
          </h1>
          <p className="text-xl max-w-2xl mx-auto px-4">
            Split bills fairly among friends, roommates, or groups with ease.
          </p>
        </header>
        
        <BillSplitCalculator />
      </div>
    </Layout>
  );
};

export default BillSplitCalculatorPage;
