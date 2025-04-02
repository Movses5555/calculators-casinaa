
import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import BodyFatPercentageCalculator from '@/components/calculators/health/BodyFatPercentageCalculator';
import BodyFatPercentagePageHeader from '@/components/calculators/health/BodyFatPercentagePageHeader';
import BodyFatPercentageEducationalContent from '@/components/calculators/health/BodyFatPercentageEducationalContent';

const BodyFatPercentageCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <Helmet>
        <title>Body Fat Percentage Calculator - Measure Body Composition | CalcMaster</title>
        <meta 
          name="description" 
          content="Calculate your body fat percentage using multiple methods including the Navy Method and skinfold measurements. Understand your body composition and health risks." 
        />
        <meta 
          name="keywords" 
          content="body fat percentage calculator, body composition, Navy method, skinfold measurements, fat mass, lean mass, body fat categories" 
        />
        <link rel="canonical" href="/health/body-fat-percentage-calculator" />
        <meta property="og:title" content="Body Fat Percentage Calculator - Measure Body Composition | CalcMaster" />
        <meta property="og:description" content="Calculate your body fat percentage using multiple methods including the Navy Method and skinfold measurements. Understand your body composition and health risks." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/health/body-fat-percentage-calculator" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Body Fat Percentage Calculator",
              "description": "Free online body fat percentage calculator to determine body composition using multiple methods",
              "mainEntity": {
                "@type": "SoftwareApplication",
                "name": "Body Fat Percentage Calculator",
                "applicationCategory": "HealthApplication",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                }
              }
            }
          `}
        </script>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <BodyFatPercentagePageHeader />
          <BodyFatPercentageCalculator />
          <BodyFatPercentageEducationalContent />
        </div>
      </div>
    </Layout>
  );
};

export default BodyFatPercentageCalculatorPage;
