
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const MortgageTips: React.FC = () => {
  return (
    <Card className="shadow-subtle bg-[#e5e7eb]">
      <CardHeader>
        <CardTitle className="text-lg">Mortgage Tips</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li className="flex items-start">
            <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm">A larger down payment can significantly reduce your monthly payments and total interest.</span>
          </li>
          <li className="flex items-start">
            <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm">Even a slightly lower interest rate can save you thousands over the life of the loan.</span>
          </li>
          <li className="flex items-start">
            <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm">Consider a shorter loan term to pay less total interest, but be prepared for higher monthly payments.</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default MortgageTips;
