
import React from 'react';
import Layout from '@/components/layout/Layout';
import Head from "next/head";
import NumberBaseConverter from '@/components/calculators/math/NumberBaseConverter';

const NumberBaseConverterPage: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Number Base Converter | Binary, Decimal, Hex Conversion</title>
        <meta name="description" content="Convert numbers between different bases including binary, decimal, octal, and hexadecimal with our number base converter." />
        <meta name="keywords" content="base converter, binary converter, decimal to binary, hexadecimal, number conversion" />
        <link rel="canonical" href="/math/number-base-converter" />
      </Head>

      <div className="container max-w-6xl mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-indigo-500/10 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 3 21 3 21 8"></polyline>
              <line x1="4" y1="20" x2="21" y2="3"></line>
              <polyline points="21 16 21 21 16 21"></polyline>
              <line x1="15" y1="15" x2="21" y2="21"></line>
              <line x1="4" y1="4" x2="9" y2="9"></line>
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Number Base Converter
          </h1>
          <p className="text-xl max-w-2xl mx-auto px-4">
            Convert numbers between binary, decimal, octal, hexadecimal and more.
          </p>
        </header>
        
        <NumberBaseConverter />
      </div>
    </Layout>
  );
};

export default NumberBaseConverterPage;
