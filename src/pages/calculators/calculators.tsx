
import React from 'react';
import Layout from '@/components/layout/Layout';
import PageSEOContent from '@/components/seo/PageSEOContent';
import CalculatorDirectory from '@/components/calculators/CalculatorDirectory';

const CalculatorsPage = () => {
  return (
    <Layout>
      <PageSEOContent
        title="All Calculators & Tools | Free Online Calculators | CalcMaster"
        description="Browse our complete collection of free online calculators and tools for finance, health, math, crypto, betting, and more. No signup required, instant results."
        keywords="calculators, online calculators, free calculators, percentage calculator, mortgage calculator, BMI calculator, crypto calculator, betting calculator, math tools, finance tools"
        pageIdentifier="calculators-directory"
      >
        <CalculatorDirectory />
      </PageSEOContent>
    </Layout>
  );
};

export default CalculatorsPage;
