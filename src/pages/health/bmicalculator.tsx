
import React from 'react';
import { Helmet } from 'react-helmet';
import { Heart } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import BMICalculator from '@/components/calculators/health/BMICalculator';
import { calculatorColors } from '@/utils/calculatorColors';

const BMICalculatorPage: React.FC = () => {
  return (
    <Layout>
      <Helmet>
        <title>BMI Calculator - Easy Body Mass Index Tool | CalcMaster</title>
        <meta 
          name="description" 
          content="Calculate your BMI (Body Mass Index) with our free, easy-to-use calculator. Determine if your weight is in the healthy range based on your height. Get instant results and personalized feedback." 
        />
        <meta 
          name="keywords" 
          content="BMI calculator, body mass index, weight calculator, healthy weight calculator, obesity calculator, weight health tool" 
        />
        <link rel="canonical" href="/health/bmi-calculator" />
        <meta property="og:title" content="BMI Calculator - Check Your Body Mass Index | CalcMaster" />
        <meta property="og:description" content="Use our free BMI calculator to check if your weight is healthy for your height. Get instant results and understand what your BMI means for your health." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/health/bmi-calculator" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "BMI Calculator",
              "description": "Free online Body Mass Index (BMI) calculator with detailed explanation of BMI categories",
              "mainEntity": {
                "@type": "SoftwareApplication",
                "name": "BMI Calculator",
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
          <header className="mb-8 text-center">
            <div className="inline-flex items-center justify-center p-2 bg-red-500/10 rounded-full mb-4">
              <Heart className="h-6 w-6 text-red-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2" style={{ color: calculatorColors.text.heading }}>
              BMI Calculator
            </h1>
            <p className="text-xl max-w-2xl mx-auto px-4" style={{ color: calculatorColors.text.body }}>
              Calculate your Body Mass Index (BMI) to determine if your weight is in a healthy range for your height.
            </p>
          </header>
          
          <BMICalculator />
          
          <div className="mt-12 p-6 bg-card rounded-xl border shadow-subtle">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: calculatorColors.text.heading }}>
              Understanding Body Mass Index (BMI)
            </h2>
            
            <div className="prose prose-slate max-w-none" style={{ color: calculatorColors.text.body }}>
              <p>
                Body Mass Index (BMI) is a numerical value calculated from your weight and height. It provides a simple, inexpensive, and easy way to screen for weight categories that may lead to health problems. BMI has become a standard tool for healthcare professionals, researchers, and individuals to assess whether they are at a healthy weight.
              </p>
              
              <h3>How BMI is Calculated</h3>
              <p>
                The formula for calculating BMI is weight in kilograms divided by height in meters squared (BMI = kg/m²). In the imperial system, the formula is weight in pounds divided by height in inches squared multiplied by 703 (BMI = (lb/in²) × 703).
              </p>
              
              <p>
                Our calculator provides both methods, allowing you to enter your measurements in either metric (kilograms, centimeters) or imperial (pounds, inches) units. The result is interpreted using the following standard weight status categories:
              </p>
              
              <ul>
                <li><strong>Below 18.5:</strong> Underweight</li>
                <li><strong>18.5 to 24.9:</strong> Normal weight</li>
                <li><strong>25.0 to 29.9:</strong> Overweight</li>
                <li><strong>30.0 and above:</strong> Obesity (with further classifications)</li>
              </ul>
              
              <h3>History and Development of BMI</h3>
              <p>
                The concept of BMI was developed by Belgian mathematician and statistician Adolphe Quetelet in the 1830s. Originally called the Quetelet Index, it was designed as a way to measure the degree of obesity in populations to assist the government in allocating resources.
              </p>
              
              <p>
                In 1972, physiologist Ancel Keys published a landmark study that established the Body Mass Index as the standard for measuring body fat. Since then, BMI has been widely adopted by health organizations worldwide as a screening tool for weight issues.
              </p>
              
              <h3>Benefits of Knowing Your BMI</h3>
              <p>
                Understanding your BMI can provide several benefits:
              </p>
              
              <ul>
                <li>It offers a starting point for assessing your weight status</li>
                <li>It allows you to track changes in your weight relative to your height over time</li>
                <li>It provides an objective measure that can help identify potential health risks associated with weight</li>
                <li>It serves as a conversation starter with healthcare providers about weight management strategies</li>
                <li>It can motivate lifestyle changes if your BMI falls outside the healthy range</li>
              </ul>
              
              <h3>Limitations of BMI</h3>
              <p>
                While BMI is a useful screening tool, it has several limitations worth noting:
              </p>
              
              <ul>
                <li>It doesn't distinguish between fat and muscle mass. Athletes with high muscle mass may have a high BMI despite having low body fat.</li>
                <li>It doesn't account for where fat is stored in the body. Abdominal fat (often measured by waist circumference) can be a more significant health risk than fat stored in other areas.</li>
                <li>It may not accurately reflect health status across different age groups, genders, and ethnicities.</li>
                <li>It doesn't consider other health factors such as blood pressure, cholesterol levels, blood sugar levels, or family health history.</li>
              </ul>
              
              <h3>When to Consult a Healthcare Professional</h3>
              <p>
                BMI should be considered as just one part of a broader health assessment. If your BMI falls outside the normal range, or if you're concerned about your weight, it's advisable to consult with a healthcare provider. They can:
              </p>
              
              <ul>
                <li>Perform additional measurements and tests to assess your overall health</li>
                <li>Consider your individual circumstances, including your medical history and lifestyle factors</li>
                <li>Provide personalized advice on weight management strategies</li>
                <li>Screen for weight-related health conditions</li>
                <li>Refer you to specialists such as dietitians or exercise physiologists if needed</li>
              </ul>
              
              <h3>Tips for Maintaining a Healthy BMI</h3>
              <p>
                If your goal is to achieve or maintain a healthy BMI, consider these evidence-based strategies:
              </p>
              
              <ul>
                <li><strong>Balanced Diet:</strong> Focus on a diet rich in fruits, vegetables, whole grains, lean proteins, and healthy fats. Limit processed foods, sugary beverages, and excessive alcohol.</li>
                <li><strong>Regular Physical Activity:</strong> Aim for at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous activity each week, along with muscle-strengthening activities twice a week.</li>
                <li><strong>Adequate Sleep:</strong> Poor sleep has been linked to weight gain. Most adults need 7-9 hours of quality sleep per night.</li>
                <li><strong>Stress Management:</strong> Chronic stress can lead to emotional eating and weight gain. Techniques such as mindfulness, meditation, and yoga can help manage stress.</li>
                <li><strong>Portion Control:</strong> Be mindful of portion sizes, even when eating healthy foods.</li>
                <li><strong>Gradual Changes:</strong> If weight loss is needed, aim for a gradual reduction of 1-2 pounds per week, which is more sustainable than rapid weight loss.</li>
              </ul>
              
              <h3>Special Considerations</h3>
              <p>
                BMI calculations may need special consideration for certain groups:
              </p>
              
              <ul>
                <li><strong>Children and Adolescents:</strong> BMI is calculated the same way for children and adults, but it's interpreted differently. For children and teens, BMI is age- and sex-specific and referred to as "BMI-for-age."</li>
                <li><strong>Elderly:</strong> As people age, they tend to lose muscle and gain fat, which may not be reflected in BMI measurements. Some experts suggest a slightly higher BMI range may be acceptable for older adults.</li>
                <li><strong>Athletes:</strong> Those with high muscle mass may need alternative assessment methods like body fat percentage measurements.</li>
                <li><strong>Pregnant Women:</strong> BMI is not valid during pregnancy. Weight gain recommendations during pregnancy depend on the starting BMI.</li>
                <li><strong>Different Ethnicities:</strong> Some research suggests that BMI thresholds may need to be adjusted for different ethnic groups. For example, Asian populations may have health risks at lower BMI levels than Western populations.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BMICalculatorPage;
