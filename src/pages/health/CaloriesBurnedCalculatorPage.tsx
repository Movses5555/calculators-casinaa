
import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import CaloriesBurnedCalculator from '@/components/calculators/health/CaloriesBurnedCalculator';
import CaloriesBurnedPageHeader from '@/components/calculators/health/CaloriesBurnedPageHeader';
import CaloriesBurnedEducationalContent from '@/components/calculators/health/CaloriesBurnedEducationalContent';

const CaloriesBurnedCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <Helmet>
        <title>Calories Burned Calculator - Track Exercise Energy Expenditure | CalcMaster</title>
        <meta 
          name="description" 
          content="Calculate how many calories you burn during various physical activities. Find out the energy expenditure for walking, running, swimming, sports, and daily activities based on your weight." 
        />
        <meta 
          name="keywords" 
          content="calories burned calculator, calorie expenditure, exercise calories, MET calculator, physical activity calories, weight loss calculator, energy expenditure" 
        />
        <link rel="canonical" href="/health/calories-burned-calculator" />
        <meta property="og:title" content="Calories Burned Calculator - Track Exercise Energy Expenditure | CalcMaster" />
        <meta property="og:description" content="Calculate how many calories you burn during walking, running, swimming, cycling, and other activities based on your weight and exercise duration." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/health/calories-burned-calculator" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Calories Burned Calculator",
              "description": "Free online calories burned calculator to determine energy expenditure during various activities",
              "mainEntity": {
                "@type": "SoftwareApplication",
                "name": "Calories Burned Calculator",
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
          <CaloriesBurnedPageHeader />
          <CaloriesBurnedCalculator />
          <CaloriesBurnedEducationalContent />
        </div>
      </div>
    </Layout>
  );
};

export default CaloriesBurnedCalculatorPage;
