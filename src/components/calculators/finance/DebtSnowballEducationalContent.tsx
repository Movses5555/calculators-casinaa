
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { calculatorColors } from '@/utils/calculatorColors';
import { BookOpen, Snowflake, Flame, Info, TrendingUp } from 'lucide-react';

const DebtSnowballEducationalContent: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BookOpen className="mr-2 h-5 w-5 text-primary" />
          Debt Payoff Strategies
        </CardTitle>
        <CardDescription>
          Understanding the Debt Snowball and Avalanche Methods
        </CardDescription>
      </CardHeader>
      <CardContent className="prose prose-sm max-w-none">
        <div className="space-y-4">
          <section>
            <h3 className="text-lg font-medium flex items-center" style={{ color: calculatorColors.text.heading }}>
              <Snowflake className="mr-2 h-5 w-5 text-blue-500" />
              The Debt Snowball Method
            </h3>
            <p style={{ color: calculatorColors.text.body }}>
              The Debt Snowball method, popularized by Dave Ramsey, focuses on paying off your smallest debts first, regardless of interest rates. This approach provides quick wins that keep you motivated throughout your debt payoff journey.
            </p>
            
            <div className="mt-3 bg-blue-50 p-4 rounded-lg">
              <h4 className="text-base font-medium text-blue-700">How it works:</h4>
              <ol className="list-decimal list-inside space-y-2 mt-2 text-blue-800">
                <li>List all your debts from smallest to largest balance.</li>
                <li>Make minimum payments on all debts except the smallest.</li>
                <li>Put any extra money toward the smallest debt until it's paid off.</li>
                <li>Once the smallest debt is paid, add that payment amount to the minimum payment on the next smallest debt (creating a "snowball" effect).</li>
                <li>Continue this process until all debts are paid off.</li>
              </ol>
            </div>
            
            <div className="mt-3">
              <h4 className="font-medium" style={{ color: calculatorColors.text.heading }}>Advantages:</h4>
              <ul className="list-disc list-inside space-y-1 mt-1" style={{ color: calculatorColors.text.body }}>
                <li>Provides quick wins to build momentum and motivation</li>
                <li>Simpler to understand and implement</li>
                <li>Reduces the number of separate payments faster</li>
                <li>May be more effective psychologically for many people</li>
              </ul>
            </div>
          </section>
          
          <section>
            <h3 className="text-lg font-medium flex items-center" style={{ color: calculatorColors.text.heading }}>
              <Flame className="mr-2 h-5 w-5 text-red-500" />
              The Debt Avalanche Method
            </h3>
            <p style={{ color: calculatorColors.text.body }}>
              The Debt Avalanche method prioritizes paying off debts with the highest interest rates first. This approach is mathematically optimal and will save you the most money in interest over time.
            </p>
            
            <div className="mt-3 bg-red-50 p-4 rounded-lg">
              <h4 className="text-base font-medium text-red-700">How it works:</h4>
              <ol className="list-decimal list-inside space-y-2 mt-2 text-red-800">
                <li>List all your debts from highest to lowest interest rate.</li>
                <li>Make minimum payments on all debts.</li>
                <li>Put any extra money toward the highest-interest debt first.</li>
                <li>Once the highest-interest debt is paid off, move to the next highest.</li>
                <li>Continue until all debts are paid off.</li>
              </ol>
            </div>
            
            <div className="mt-3">
              <h4 className="font-medium" style={{ color: calculatorColors.text.heading }}>Advantages:</h4>
              <ul className="list-disc list-inside space-y-1 mt-1" style={{ color: calculatorColors.text.body }}>
                <li>Mathematically optimal - saves the most money on interest</li>
                <li>Results in a faster payoff time when followed strictly</li>
                <li>More efficient from a purely financial perspective</li>
                <li>Better for those primarily concerned with minimizing interest costs</li>
              </ul>
            </div>
          </section>
          
          <section>
            <h3 className="text-lg font-medium flex items-center" style={{ color: calculatorColors.text.heading }}>
              <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
              Tips for Successful Debt Payoff
            </h3>
            <ul className="list-disc list-inside space-y-2 mt-3" style={{ color: calculatorColors.text.body }}>
              <li><strong>Stop adding new debt</strong> - Cut up credit cards or freeze them if necessary.</li>
              <li><strong>Create a budget</strong> - Know where your money is going and find areas to cut back.</li>
              <li><strong>Build an emergency fund</strong> - Start with $1,000 to avoid new debt for unexpected expenses.</li>
              <li><strong>Find extra income</strong> - Consider a side hustle or selling items you don't need.</li>
              <li><strong>Celebrate milestones</strong> - Recognize your progress to stay motivated (without spending a lot).</li>
              <li><strong>Automate payments</strong> - Set up automatic payments to avoid missing due dates.</li>
              <li><strong>Consider consolidation</strong> - If you qualify for lower interest rates, debt consolidation might help.</li>
            </ul>
          </section>
          
          <div className="bg-green-50 p-4 rounded-lg flex items-start mt-4">
            <Info className="text-green-500 mr-2 mt-1 h-5 w-5 flex-shrink-0" />
            <p className="text-sm text-green-700">
              <strong>Which method is better?</strong> The best debt payoff strategy is the one you'll stick with. While the Avalanche method saves more money mathematically, studies show the Snowball method often leads to higher success rates because of its psychological benefits. Our calculator lets you try both to see which works better for your situation.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DebtSnowballEducationalContent;
