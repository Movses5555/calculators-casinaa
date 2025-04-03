
import React from 'react';
import { Helmet } from 'react-helmet';
import { Moon } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SleepCycleCalculator from '@/components/calculators/health/SleepCycleCalculator';
import { calculatorColors } from '@/utils/calculatorColors';

const SleepCycleCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <Helmet>
        <title>Sleep Cycle Calculator - Plan Better Sleep | CalcMaster</title>
        <meta 
          name="description" 
          content="Calculate optimal bedtimes and wake-up times based on 90-minute sleep cycles. Get recommendations for quality sleep and learn how to improve your sleep schedule." 
        />
        <meta 
          name="keywords" 
          content="sleep cycle calculator, sleep calculator, bedtime calculator, wake up time calculator, REM sleep, sleep cycles, optimal sleep, sleep quality" 
        />
        <link rel="canonical" href="/health/sleep-cycle-calculator" />
        <meta property="og:title" content="Sleep Cycle Calculator - Plan Better Sleep | CalcMaster" />
        <meta property="og:description" content="Calculate when to go to bed or wake up based on sleep cycles for optimal rest and energy. Free online sleep cycle calculator." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/health/sleep-cycle-calculator" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Sleep Cycle Calculator",
              "description": "Free online sleep cycle calculator to help you find the optimal bedtime or wake-up time",
              "mainEntity": {
                "@type": "SoftwareApplication",
                "name": "Sleep Cycle Calculator",
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
            <div className="inline-flex items-center justify-center p-2 bg-indigo-500/10 rounded-full mb-4">
              <Moon className="h-6 w-6 text-indigo-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2" style={{ color: calculatorColors.text.heading }}>
              Sleep Cycle Calculator
            </h1>
            <p className="text-xl max-w-2xl mx-auto px-4" style={{ color: calculatorColors.text.body }}>
              Plan your sleep schedule to wake up refreshed by aligning with your natural sleep cycles.
            </p>
          </header>
          
          <SleepCycleCalculator />
          
          <div className="mt-12 p-6 bg-card rounded-xl border shadow-subtle">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: calculatorColors.text.heading }}>
              Understanding Sleep Cycles for Better Rest
            </h2>
            
            <div className="prose prose-slate max-w-none" style={{ color: calculatorColors.text.body }}>
              <p>
                Sleep is not a uniform state but rather a complex process comprising multiple cycles, each with distinct phases that contribute to your overall rest and recovery. By understanding these cycles, you can time your sleep to optimize quality and wake feeling more refreshed.
              </p>
              
              <h3>The Science of Sleep Cycles</h3>
              <p>
                A complete sleep cycle typically lasts about 90 minutes and consists of both non-REM (NREM) and REM (Rapid Eye Movement) phases. During a normal night's sleep, you'll cycle through these stages multiple times, with each cycle playing a crucial role in different aspects of mental and physical restoration.
              </p>
              
              <p>
                The four stages of sleep include:
              </p>
              
              <ul>
                <li><strong>Stage 1 (N1):</strong> Light sleep where you drift in and out of consciousness and can be easily awakened. This lasts only a few minutes.</li>
                <li><strong>Stage 2 (N2):</strong> A slightly deeper sleep where your heart rate slows and body temperature drops. Brain activity begins to decrease.</li>
                <li><strong>Stage 3 (N3):</strong> Deep sleep or slow-wave sleep. This is the most restorative phase where tissue growth and repair occurs, energy is restored, and hormones are released.</li>
                <li><strong>REM Sleep:</strong> Where most dreaming occurs. Your brain becomes more active, almost similar to when you're awake. This stage is crucial for cognitive functions like memory consolidation and learning.</li>
              </ul>
              
              <h3>Why 90-Minute Cycles Matter</h3>
              <p>
                Our sleep calculator is based on the 90-minute sleep cycle model. This timeframe represents the average duration it takes a person to go through all four stages of sleep before starting the cycle again. The significance of this cycle lies in how you feel upon waking:
              </p>
              
              <ul>
                <li>Waking up during deep sleep (middle of a cycle) often leaves you feeling groggy and disoriented, a phenomenon known as "sleep inertia."</li>
                <li>Waking up between cycles when you're in light sleep typically results in feeling more refreshed and alert.</li>
              </ul>
              
              <p>
                By planning your sleep schedule to complete a certain number of full cycles, you can potentially improve how rested you feel upon waking, regardless of the total hours slept.
              </p>
              
              <h3>Optimal Number of Sleep Cycles</h3>
              <p>
                For most adults, the ideal number of sleep cycles per night is 5 to 6, which translates to approximately 7.5 to 9 hours of sleep. However, individual needs may vary based on factors such as:
              </p>
              
              <ul>
                <li>Age: Younger people typically need more sleep than older adults</li>
                <li>Lifestyle and activity level: More physically active individuals often require more sleep for recovery</li>
                <li>Health conditions: Certain conditions may affect sleep quality and quantity requirements</li>
                <li>Sleep debt: Previous sleep deprivation can increase your current sleep needs</li>
              </ul>
              
              <h3>Sleep Cycle Calculator: How It Works</h3>
              <p>
                Our sleep cycle calculator helps you determine either:
              </p>
              
              <ul>
                <li><strong>When to go to bed:</strong> If you know what time you need to wake up, the calculator will suggest bedtimes that allow you to complete multiple full sleep cycles</li>
                <li><strong>When to wake up:</strong> If you know what time you're going to bed, the calculator will recommend wake-up times that coincide with the end of sleep cycles</li>
              </ul>
              
              <p>
                The calculator also takes into account that the average person takes about 14 minutes to fall asleep, though this can be adjusted based on your personal experience.
              </p>
              
              <h3>Benefits of Aligning with Sleep Cycles</h3>
              <p>
                Synchronizing your sleep schedule with your natural sleep cycles can provide numerous benefits:
              </p>
              
              <ul>
                <li>Reduced morning grogginess and sleep inertia</li>
                <li>Improved daytime alertness and cognitive function</li>
                <li>Enhanced mood and emotional regulation</li>
                <li>Better overall sleep efficiency</li>
                <li>Potential for feeling rested with slightly less total sleep time</li>
              </ul>
              
              <h3>Tips for Improving Sleep Quality</h3>
              <p>
                While timing your sleep with cycles is important, overall sleep quality depends on many factors. Here are some evidence-based recommendations to enhance your sleep:
              </p>
              
              <ul>
                <li><strong>Consistent Schedule:</strong> Go to bed and wake up at the same times every day, even on weekends.</li>
                <li><strong>Sleep Environment:</strong> Keep your bedroom dark, quiet, and cool (around 65°F or 18°C).</li>
                <li><strong>Screen Time:</strong> Avoid blue light from screens at least 1 hour before bedtime.</li>
                <li><strong>Caffeine and Alcohol:</strong> Limit consumption, especially in the afternoon and evening.</li>
                <li><strong>Exercise:</strong> Regular physical activity promotes better sleep, but try to finish intense workouts at least 1-2 hours before bedtime.</li>
                <li><strong>Bedtime Routine:</strong> Develop a relaxing pre-sleep ritual to signal to your body that it's time to wind down.</li>
                <li><strong>Mindfulness and Stress Reduction:</strong> Practices like meditation can help calm an active mind before sleep.</li>
              </ul>
              
              <h3>Special Considerations</h3>
              <p>
                While sleep cycles are generally consistent across individuals, certain factors can affect your personal sleep architecture:
              </p>
              
              <ul>
                <li><strong>Sleep Disorders:</strong> Conditions like sleep apnea, insomnia, or narcolepsy can disrupt normal sleep cycles.</li>
                <li><strong>Medications:</strong> Some medications can alter sleep structure and cycle duration.</li>
                <li><strong>Age:</strong> Sleep architecture changes throughout life, with older adults generally experiencing shorter and less distinct cycles.</li>
                <li><strong>Chronotype:</strong> Whether you're naturally a "morning lark" or "night owl" can affect your optimal sleep timing.</li>
              </ul>
              
              <p>
                If you consistently struggle with sleep quality despite using tools like this calculator and following good sleep hygiene practices, consider consulting a healthcare provider or sleep specialist.
              </p>
              
              <h3>Adapting to Different Schedules</h3>
              <p>
                For shift workers, parents of young children, or those with irregular schedules, aligning perfectly with sleep cycles can be challenging. In these cases, consider:
              </p>
              
              <ul>
                <li>Taking strategic naps that complete one full 90-minute cycle</li>
                <li>Using light therapy to help reset your circadian rhythm</li>
                <li>Creating a consistent pre-sleep routine regardless of the time you go to bed</li>
                <li>Optimizing your sleep environment to maximize the quality of whatever sleep you can get</li>
              </ul>
              
              <h3>Historical Perspective on Sleep</h3>
              <p>
                Interestingly, historical evidence suggests that humans haven't always slept in one consolidated block. Before the industrial revolution and widespread artificial lighting, many cultures practiced "biphasic sleep" - sleeping in two distinct periods with a wakeful interval in between. This pattern may actually be more aligned with our natural circadian rhythms than the consolidated 7-9 hour sleep that modern society typically promotes.
              </p>
              
              <h3>The Bottom Line on Sleep Cycles</h3>
              <p>
                While timing your sleep to align with complete cycles can improve how refreshed you feel when waking, total sleep duration still matters significantly for overall health. Most adults should aim for 7-9 hours of quality sleep per night, regardless of how that fits into exact 90-minute cycles.
              </p>
              
              <p>
                Our sleep cycle calculator provides a helpful framework, but remember to pay attention to how you feel and adjust accordingly. The best sleep schedule is ultimately the one that leaves you feeling consistently well-rested and energetic throughout your day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SleepCycleCalculatorPage;
