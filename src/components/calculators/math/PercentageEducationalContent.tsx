
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Percent, Calculator, Brain, School } from 'lucide-react';

const PercentageEducationalContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="basics" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basics">Percentage Basics</TabsTrigger>
          <TabsTrigger value="formulas">Formulas</TabsTrigger>
          <TabsTrigger value="examples">Real-world Examples</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basics" className="pt-4 space-y-4">
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="bg-purple-100 p-2 rounded-full">
                <Percent className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-lg">What is a Percentage?</h3>
                <p className="text-gray-600">
                  A percentage is a number expressed as a fraction of 100. The word comes from the Latin 
                  'per centum', meaning 'by the hundred'. For example, 50% means 50 out of 100, or half of the total.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Key Concepts</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>
                  <span className="font-medium">Converting to Decimal:</span> To convert a percentage to a decimal, 
                  divide by 100. Example: 25% = 25 ÷ 100 = 0.25
                </li>
                <li>
                  <span className="font-medium">Converting to Fraction:</span> To convert a percentage to a fraction, 
                  put it over 100 and simplify. Example: 25% = 25/100 = 1/4
                </li>
                <li>
                  <span className="font-medium">Percentage of a Number:</span> To find a percentage of a number, 
                  convert the percentage to a decimal and multiply. Example: 25% of 80 = 0.25 × 80 = 20
                </li>
              </ul>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="bg-blue-100 p-2 rounded-full">
                <School className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Why Percentages Are Useful</h3>
                <p className="text-gray-600">
                  Percentages allow us to compare quantities with different bases. They're used in finance (interest rates, 
                  discounts), statistics (probability, growth rates), and everyday life (grades, taxes, tipping).
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="formulas" className="pt-4 space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-3">Finding a Percentage of a Number</h3>
            <div className="font-mono text-center p-2 bg-white rounded border border-gray-200 mb-3">
              Result = (Percentage ÷ 100) × Number
            </div>
            <p className="text-gray-600 text-sm">
              Example: 20% of 150 = (20 ÷ 100) × 150 = 0.2 × 150 = 30
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-3">Finding What Percentage One Number is of Another</h3>
            <div className="font-mono text-center p-2 bg-white rounded border border-gray-200 mb-3">
              Percentage = (Part ÷ Whole) × 100
            </div>
            <p className="text-gray-600 text-sm">
              Example: 15 is what % of 60? (15 ÷ 60) × 100 = 0.25 × 100 = 25%
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-3">Percentage Change (Increase or Decrease)</h3>
            <div className="font-mono text-center p-2 bg-white rounded border border-gray-200 mb-3">
              % Change = ((New Value - Original Value) ÷ |Original Value|) × 100
            </div>
            <p className="text-gray-600 text-sm">
              Example: Price increased from $80 to $100.<br />
              % Change = ((100 - 80) ÷ 80) × 100 = (20 ÷ 80) × 100 = 0.25 × 100 = 25% increase
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <h3 className="font-medium mb-2">Percentage Point vs. Percentage Change</h3>
            <p className="text-gray-600 text-sm">
              A <span className="font-medium">percentage point</span> is the arithmetic difference between two percentages. 
              For example, if an interest rate rises from 5% to 7%, it's a 2 percentage point increase.
            </p>
            <p className="text-gray-600 text-sm mt-2">
              A <span className="font-medium">percentage change</span> is the relative change between the old and new values.
              In the same example, the percentage change would be ((7 - 5) ÷ 5) × 100 = 40% increase.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="examples" className="pt-4 space-y-4">
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Sales and Discounts</h3>
              <div className="space-y-2 text-gray-600 text-sm">
                <p><span className="font-medium">Original price:</span> $80</p>
                <p><span className="font-medium">Discount:</span> 25%</p>
                <p><span className="font-medium">Discount amount:</span> 25% of $80 = 0.25 × $80 = $20</p>
                <p><span className="font-medium">Sale price:</span> $80 - $20 = $60</p>
                
                <div className="pt-2 mt-2 border-t border-gray-200">
                  <p><span className="font-medium">Alternatively:</span> Sale price = Original price × (1 - Discount/100)</p>
                  <p>$80 × (1 - 25/100) = $80 × 0.75 = $60</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Tipping at Restaurants</h3>
              <div className="space-y-2 text-gray-600 text-sm">
                <p><span className="font-medium">Bill amount:</span> $120</p>
                <p><span className="font-medium">Tip percentage:</span> 18%</p>
                <p><span className="font-medium">Tip amount:</span> 18% of $120 = 0.18 × $120 = $21.60</p>
                <p><span className="font-medium">Total payment:</span> $120 + $21.60 = $141.60</p>
                
                <div className="pt-2 mt-2 border-t border-gray-200">
                  <p><span className="font-medium">Quick tip calculation:</span> Move the decimal point left one digit and multiply.</p>
                  <p>For a 20% tip on $120: $12 × 2 = $24</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Tax Calculations</h3>
              <div className="space-y-2 text-gray-600 text-sm">
                <p><span className="font-medium">Purchase price:</span> $250</p>
                <p><span className="font-medium">Sales tax rate:</span> 7.5%</p>
                <p><span className="font-medium">Tax amount:</span> 7.5% of $250 = 0.075 × $250 = $18.75</p>
                <p><span className="font-medium">Total cost:</span> $250 + $18.75 = $268.75</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PercentageEducationalContent;
