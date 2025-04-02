
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PercentIcon, DollarSign, Calculator, ArrowRight, RefreshCw } from 'lucide-react';

export interface FormValues {
  originalPrice: string;
  discountedPrice: string;
  discountPercentage: string;
}

export type CalculationType = 'findDiscountedPrice' | 'findDiscountPercentage' | 'findOriginalPrice';

interface DiscountInputFormProps {
  calculationType: CalculationType;
  formValues: FormValues;
  isCalculating: boolean;
  onCalculationTypeChange: (value: string) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCalculate: () => void;
  onReset: () => void;
  onQuickDiscountSelect: (percent: number) => void;
}

const DiscountInputForm: React.FC<DiscountInputFormProps> = ({
  calculationType,
  formValues,
  isCalculating,
  onCalculationTypeChange,
  onInputChange,
  onCalculate,
  onReset,
  onQuickDiscountSelect
}) => {
  
  const renderInputFields = () => {
    switch (calculationType) {
      case 'findDiscountedPrice':
        return (
          <>
            <div>
              <Label htmlFor="originalPrice">Original Price ($)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="originalPrice"
                  name="originalPrice"
                  placeholder="100.00"
                  className="pl-8"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={formValues.originalPrice}
                  onChange={onInputChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="discountPercentage">Discount Percentage (%)</Label>
              <div className="relative">
                <PercentIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="discountPercentage"
                  name="discountPercentage"
                  placeholder="25"
                  className="pl-8"
                  type="number"
                  min="0.01"
                  max="100"
                  step="0.01"
                  value={formValues.discountPercentage}
                  onChange={onInputChange}
                />
              </div>
            </div>
          </>
        );
        
      case 'findDiscountPercentage':
        return (
          <>
            <div>
              <Label htmlFor="originalPrice">Original Price ($)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="originalPrice"
                  name="originalPrice"
                  placeholder="100.00"
                  className="pl-8"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={formValues.originalPrice}
                  onChange={onInputChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="discountedPrice">Sale Price ($)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="discountedPrice"
                  name="discountedPrice"
                  placeholder="75.00"
                  className="pl-8"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={formValues.discountedPrice}
                  onChange={onInputChange}
                />
              </div>
            </div>
          </>
        );
        
      case 'findOriginalPrice':
        return (
          <>
            <div>
              <Label htmlFor="discountedPrice">Sale Price ($)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="discountedPrice"
                  name="discountedPrice"
                  placeholder="75.00"
                  className="pl-8"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={formValues.discountedPrice}
                  onChange={onInputChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="discountPercentage">Discount Percentage (%)</Label>
              <div className="relative">
                <PercentIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="discountPercentage"
                  name="discountPercentage"
                  placeholder="25"
                  className="pl-8"
                  type="number"
                  min="0.01"
                  max="100"
                  step="0.01"
                  value={formValues.discountPercentage}
                  onChange={onInputChange}
                />
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Discount Calculator</CardTitle>
          <CardDescription>
            Calculate discounts, sale prices, and original prices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="calculationType">What do you want to calculate?</Label>
            <Tabs 
              defaultValue={calculationType}
              value={calculationType} 
              onValueChange={onCalculationTypeChange}
              className="w-full mt-2"
            >
              <TabsList className="grid grid-cols-1 md:grid-cols-3 w-full">
                <TabsTrigger value="findDiscountPercentage" className="py-2">
                  <span className="flex items-center">
                    <PercentIcon className="h-4 w-4 mr-2" />
                    <span>Discount Rate</span>
                  </span>
                </TabsTrigger>
                <TabsTrigger value="findDiscountedPrice" className="py-2">
                  <span className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    <span>Sale Price</span>
                  </span>
                </TabsTrigger>
                <TabsTrigger value="findOriginalPrice" className="py-2">
                  <span className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    <span>Original Price</span>
                  </span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="space-y-4 pt-2">
            {renderInputFields()}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button 
            type="submit" 
            className="w-full" 
            onClick={onCalculate}
            disabled={isCalculating}
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculate
          </Button>
          
          <Button 
            type="button" 
            variant="outline" 
            className="w-full"
            onClick={onReset}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Common Discount Percentages</CardTitle>
          <CardDescription>
            Quick reference for popular discounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {[10, 15, 20, 25, 30, 40, 50, 75].map(percent => (
              <Button
                key={percent}
                variant="outline"
                className="flex justify-between w-full"
                onClick={() => onQuickDiscountSelect(percent)}
              >
                <span>{percent}% OFF</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiscountInputForm;
