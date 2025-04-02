
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Calculator, HandCoins, Users } from 'lucide-react';

const BillSplitEducationalContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            About Bill Splitting
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Bill splitting is the process of dividing expenses among multiple people, such as friends, roommates, or colleagues. 
            This calculator helps you fairly distribute costs based on different splitting methods.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 font-medium mb-2">
                <Calculator className="h-4 w-4 text-amber-500" />
                Equal Splitting
              </div>
              <p className="text-sm text-gray-600">
                Divides the bill equally among all participants. The simplest method when everyone has consumed roughly the same amount.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 font-medium mb-2">
                <HandCoins className="h-4 w-4 text-amber-500" />
                Percentage-Based
              </div>
              <p className="text-sm text-gray-600">
                Allocates costs based on predefined percentages. Useful when people should pay different proportions of the total.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 font-medium mb-2">
                <Users className="h-4 w-4 text-amber-500" />
                Itemized Splitting
              </div>
              <p className="text-sm text-gray-600">
                Splits costs based on what each person ordered or consumed. The most precise method for fair cost distribution.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Tips for Fair Bill Splitting</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="bg-amber-100 text-amber-700 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              <p><strong>Be transparent:</strong> Clearly communicate how the bill will be split before ordering.</p>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-amber-100 text-amber-700 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              <p><strong>Consider consumption:</strong> If someone doesn't drink alcohol or ordered significantly less, adjust their share accordingly.</p>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-amber-100 text-amber-700 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
              <p><strong>Include all costs:</strong> Remember to include tax and tip in your calculations for the most accurate split.</p>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-amber-100 text-amber-700 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
              <p><strong>Round sensibly:</strong> When dealing with odd amounts, round up to make payments easier, or have one person cover the difference.</p>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-amber-100 text-amber-700 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">5</span>
              <p><strong>Use technology:</strong> Payment apps like Venmo, Cash App, or PayPal make transferring money quick and easy.</p>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillSplitEducationalContent;
