
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, Lightbulb, AlertTriangle, Check, ClipboardList } from 'lucide-react';

const SimpleBudgetEducationalContent: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <CardTitle>Budgeting Guide</CardTitle>
        </div>
        <CardDescription>
          Learn about different budgeting methods and strategies for financial success
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="budgeting-methods">
            <AccordionTrigger className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4" />
              <span>Common Budgeting Methods</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <div>
                  <h4 className="font-medium text-lg">50/30/20 Rule</h4>
                  <p className="text-muted-foreground">
                    Allocate 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment.
                    This simple approach provides clear guidelines while maintaining flexibility.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-lg">Zero-Based Budgeting</h4>
                  <p className="text-muted-foreground">
                    Assign every dollar of income to a specific expense, savings, or debt payment category 
                    until you reach zero. This method ensures complete allocation of all income.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-lg">Envelope System</h4>
                  <p className="text-muted-foreground">
                    Divide cash into envelopes for different spending categories. When an envelope is empty, 
                    you've reached your spending limit for that category until the next budget period.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-lg">Pay Yourself First</h4>
                  <p className="text-muted-foreground">
                    Prioritize savings by automatically directing a portion of your income to savings accounts
                    before allocating the rest to expenses.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="benefits">
            <AccordionTrigger className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              <span>Benefits of Budgeting</span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 pt-2 list-disc pl-5">
                <li>
                  <span className="font-medium">Financial Awareness:</span> 
                  <span className="text-muted-foreground"> Gain clarity on your spending patterns and income allocation.</span>
                </li>
                <li>
                  <span className="font-medium">Debt Reduction:</span> 
                  <span className="text-muted-foreground"> Systematically reduce debt by allocating funds to repayment.</span>
                </li>
                <li>
                  <span className="font-medium">Goal Achievement:</span> 
                  <span className="text-muted-foreground"> Reach financial goals by directing money toward specific objectives.</span>
                </li>
                <li>
                  <span className="font-medium">Emergency Preparedness:</span> 
                  <span className="text-muted-foreground"> Build emergency funds to handle unexpected expenses.</span>
                </li>
                <li>
                  <span className="font-medium">Reduced Financial Stress:</span> 
                  <span className="text-muted-foreground"> Gain peace of mind knowing your finances are under control.</span>
                </li>
                <li>
                  <span className="font-medium">Better Communication:</span> 
                  <span className="text-muted-foreground"> Improve financial discussions with family members or partners.</span>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="mistakes">
            <AccordionTrigger className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Common Budgeting Mistakes</span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 pt-2 list-disc pl-5">
                <li>
                  <span className="font-medium">Unrealistic Expectations:</span> 
                  <span className="text-muted-foreground"> Setting overly ambitious goals that are difficult to maintain.</span>
                </li>
                <li>
                  <span className="font-medium">Forgetting Irregular Expenses:</span> 
                  <span className="text-muted-foreground"> Not accounting for quarterly or annual bills, holidays, and maintenance costs.</span>
                </li>
                <li>
                  <span className="font-medium">Too Restrictive:</span> 
                  <span className="text-muted-foreground"> Creating a budget with no room for enjoyment or flexibility.</span>
                </li>
                <li>
                  <span className="font-medium">Inconsistent Tracking:</span> 
                  <span className="text-muted-foreground"> Not regularly monitoring spending against budget categories.</span>
                </li>
                <li>
                  <span className="font-medium">Not Adjusting:</span> 
                  <span className="text-muted-foreground"> Failing to revise the budget when life circumstances change.</span>
                </li>
                <li>
                  <span className="font-medium">Going Solo:</span> 
                  <span className="text-muted-foreground"> Not involving all household members in the budgeting process.</span>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="tips">
            <AccordionTrigger className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              <span>Budgeting Tips for Success</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <div>
                  <h4 className="font-medium">Start with Your Current Spending</h4>
                  <p className="text-muted-foreground">
                    Track your actual spending for 1-2 months before creating a formal budget to ensure it's based on reality.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">Include a Miscellaneous Category</h4>
                  <p className="text-muted-foreground">
                    Allow 5-10% of your budget for unexpected expenses or items that don't fit neatly into other categories.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">Automate Where Possible</h4>
                  <p className="text-muted-foreground">
                    Set up automatic transfers for savings and bill payments to reduce the effort needed to maintain your plan.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">Review and Adjust Monthly</h4>
                  <p className="text-muted-foreground">
                    Schedule a monthly budget review to assess performance and make necessary adjustments.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">Use Technology</h4>
                  <p className="text-muted-foreground">
                    Leverage budgeting apps and tools that can sync with your accounts for easier tracking and insights.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">Celebrate Milestones</h4>
                  <p className="text-muted-foreground">
                    Acknowledge and reward yourself when you reach financial goals to stay motivated.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default SimpleBudgetEducationalContent;
