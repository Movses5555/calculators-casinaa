
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator } from 'lucide-react';
import { DiscountResult } from '@/utils/math/discount';
import { formatCurrency } from '@/utils/formatters';
import { CalculationType } from './DiscountInputForm';

interface DiscountResultsDisplayProps {
  result: DiscountResult | null;
  calculationType: CalculationType;
  discountPercentage: string;
}

const DiscountResultsDisplay: React.FC<DiscountResultsDisplayProps> = ({ 
  result, 
  calculationType,
  discountPercentage 
}) => {
  if (!result) return null;
  
  const formattedResult = (() => {
    switch (calculationType) {
      case 'findDiscountedPrice':
        return formatCurrency(result.result);
      case 'findDiscountPercentage':
        return `${result.result.toFixed(2)}%`;
      case 'findOriginalPrice':
        return formatCurrency(result.result);
    }
  })();
  
  const resultLabel = (() => {
    switch (calculationType) {
      case 'findDiscountedPrice':
        return 'Sale Price';
      case 'findDiscountPercentage':
        return 'Discount Percentage';
      case 'findOriginalPrice':
        return 'Original Price';
    }
  })();
  
  return (
    <div className="space-y-4 mt-6">
      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Calculator className="h-5 w-5 mr-2" />
            Discount Calculation Result
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">
              <p className="text-sm text-muted-foreground">
                {resultLabel}
              </p>
              <p className="text-2xl font-bold">
                {formattedResult}
              </p>
            </div>
            
            {result.savings !== undefined && (
              <div className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">
                <p className="text-sm text-muted-foreground">You Save</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(result.savings)}
                </p>
              </div>
            )}
            
            <div className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">
              <p className="text-sm text-muted-foreground">Discount</p>
              <p className="text-2xl font-bold">
                {calculationType === 'findDiscountPercentage' 
                  ? formattedResult 
                  : discountPercentage + '%'}
              </p>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm">
            <p className="text-sm font-medium mb-1">How it works:</p>
            <p className="text-sm text-muted-foreground">{result.explanation}</p>
            <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-900 rounded text-xs font-mono">
              {result.formula}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiscountResultsDisplay;
