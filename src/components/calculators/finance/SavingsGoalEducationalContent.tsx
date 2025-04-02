
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Target, TrendingUp, Landmark, PiggyBank, Lightbulb } from 'lucide-react';

const SavingsGoalEducationalContent: React.FC = () => {
  return (
    <Card className="bg-white">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Learn About Saving for Goals</h2>
        
        <Tabs defaultValue="strategies" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="strategies">Saving Strategies</TabsTrigger>
            <TabsTrigger value="compound">Compound Interest</TabsTrigger>
            <TabsTrigger value="tips">Savings Tips</TabsTrigger>
          </TabsList>
          
          <TabsContent value="strategies" className="pt-4 space-y-4">
            <div className="flex gap-4 items-start">
              <div className="bg-green-100 p-2 rounded-full">
                <Target className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Set Clear, Specific Goals</h3>
                <p className="text-gray-600">
                  Having a concrete goal like "save $20,000 for a down payment in 3 years" is more effective 
                  than a vague goal like "save more money." Specific goals help you track progress and stay motivated.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="bg-blue-100 p-2 rounded-full">
                <PiggyBank className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Pay Yourself First</h3>
                <p className="text-gray-600">
                  Set up automatic transfers to your savings account right after you get paid. This ensures you're 
                  consistently saving before you have a chance to spend the money on other things.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="bg-purple-100 p-2 rounded-full">
                <Landmark className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Use the Right Accounts</h3>
                <p className="text-gray-600">
                  Choose accounts that match your timeline. High-yield savings accounts work well for short-term goals, 
                  while investment accounts may be better for long-term goals (more than 5 years away).
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="compound" className="pt-4 space-y-4">
            <div className="flex gap-4 items-start">
              <div className="bg-indigo-100 p-2 rounded-full">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-medium text-lg">The Power of Compound Interest</h3>
                <p className="text-gray-600">
                  Compound interest means you earn interest not just on your initial investment, but also on the interest 
                  you've already earned. This creates a snowball effect that accelerates your savings growth over time.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Example: $10,000 at 5% Annual Interest</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>After 5 years: $12,763 (earned $2,763 in interest)</li>
                <li>After 10 years: $16,289 (earned $6,289 in interest)</li>
                <li>After 20 years: $26,533 (earned $16,533 in interest)</li>
                <li>After 30 years: $43,219 (earned $33,219 in interest)</li>
              </ul>
              <p className="mt-2 text-sm">
                Notice how the interest earned accelerates dramatically over longer time periods.
              </p>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="bg-green-100 p-2 rounded-full">
                <Lightbulb className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Compounding Frequency Matters</h3>
                <p className="text-gray-600">
                  The more frequently interest compounds (daily, monthly, quarterly, annually), the more your money grows. 
                  When comparing interest rates, always check how often the interest compounds.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tips" className="pt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Make Saving a Habit</h3>
                <p className="text-gray-600 text-sm">
                  Consistency is key to reaching your savings goals. Even small, regular contributions add up 
                  significantly over time thanks to compound interest.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Cut Unnecessary Expenses</h3>
                <p className="text-gray-600 text-sm">
                  Review your subscriptions, dining habits, and impulse purchases. Redirecting even $100 per month 
                  to savings can add over $1,200 per year to your goal.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Boost Your Income</h3>
                <p className="text-gray-600 text-sm">
                  Consider side hustles, freelance work, or asking for a raise. Additional income can accelerate 
                  your progress dramatically if you commit it to savings.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Adjust as You Go</h3>
                <p className="text-gray-600 text-sm">
                  Revisit your savings plan regularly. As your income increases or circumstances change, 
                  consider increasing your monthly contributions to reach your goal faster.
                </p>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h3 className="font-medium text-green-700 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                <span>Pro Tip: The Rule of 72</span>
              </h3>
              <p className="text-gray-600 mt-1">
                To estimate how long it will take your money to double, divide 72 by your annual interest rate. 
                For example, at 6% interest, your money will double in approximately 72 ÷ 6 = 12 years.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SavingsGoalEducationalContent;
