
import React from 'react';
import Layout from '@/components/layout/Layout';
import Head from "next/head";
import PaceCalculator from '@/components/calculators/math/PaceCalculator';

const PaceCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Pace Calculator | Running & Walking Pace</title>
        <meta name="description" content="Calculate your running or walking pace with our pace calculator. Find your pace per mile or kilometer and plan your exercise routine." />
        <meta name="keywords" content="pace calculator, running pace, walking pace, race pace, marathon calculator" />
        <link rel="canonical" href="/math/pace-calculator" />
      </Head>

      <div className="container max-w-6xl mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-cyan-500/10 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 8v9a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8"></path>
              <path d="M8 2h8l3 6H5l3-6Z"></path>
              <path d="M12 14v3"></path>
              <path d="M12 19h.01"></path>
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Pace Calculator
          </h1>
          <p className="text-xl max-w-2xl mx-auto px-4">
            Calculate your running or walking pace for any distance and time.
          </p>
        </header>
        
        <PaceCalculator />
      </div>
    </Layout>
  );
};

export default PaceCalculatorPage;
