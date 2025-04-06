
import React from 'react';
import Layout from '@/components/layout/Layout';
import Head from "next/head";
import DiscountPercentageFinder from '@/components/calculators/math/DiscountPercentageFinder';
import { Percent } from 'lucide-react';

const DiscountPercentageFinderPage: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Discount Percentage Finder | Calculate Sale Savings</title>
        <meta name="description" content="Find the discount percentage from original and sale prices. Calculate how much you save with our discount calculator." />
        <meta name="keywords" content="discount calculator, sale price, discount percentage, savings calculator, price reduction" />
        <link rel="canonical" href="/math/discount-percentage-finder" />
      </Head>

      <div className="container max-w-6xl mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-red-500/10 rounded-full mb-4">
            <Percent className="h-6 w-6 text-red-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Discount Percentage Finder
          </h1>
          <p className="text-xl max-w-2xl mx-auto px-4">
            Calculate discount percentages and see how much you save on sales.
          </p>
        </header>
        
        <DiscountPercentageFinder />
      </div>
    </Layout>
  );
};

export default DiscountPercentageFinderPage;
