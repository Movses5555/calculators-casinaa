
import React, { useState } from 'react';
import { Home, DollarSign, Percent, Calendar, PiggyBank } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Calculator } from 'lucide-react';

export interface MortgageFormData {
  propertyPrice: number;
  downPayment: number;
  loanTerm: number;
  interestRate: number;
}

interface MortgageInputFormProps {
  formData: MortgageFormData;
  downPaymentPercent: number;
  isCalculating: boolean;
  onInputChange: (field: keyof MortgageFormData, value: string | number) => void;
  onDownPaymentPercentChange: (value: number[]) => void;
  onCalculate: () => void;
}

const MortgageInputForm: React.FC<MortgageInputFormProps> = ({
  formData,
  downPaymentPercent,
  isCalculating,
  onInputChange,
  onDownPaymentPercentChange,
  onCalculate
}) => {
  return (
    <Card className="shadow-subtle">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Home className="mr-2 h-5 w-5 text-primary" />
          Mortgage Details
        </CardTitle>
        <CardDescription>
          Enter your mortgage details to calculate your monthly payment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="propertyPrice" className="flex items-center">
            <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
            Property Price
          </Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="propertyPrice"
              type="text"
              className="pl-8"
              value={formData.propertyPrice.toLocaleString()}
              onChange={(e) => onInputChange('propertyPrice', e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="downPayment" className="flex items-center">
            <PiggyBank className="mr-1 h-4 w-4 text-muted-foreground" />
            Down Payment ({downPaymentPercent.toFixed(0)}%)
          </Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="downPayment"
              type="text"
              className="pl-8"
              value={formData.downPayment.toLocaleString()}
              onChange={(e) => onInputChange('downPayment', e.target.value)}
            />
          </div>
          <Slider
            defaultValue={[downPaymentPercent]}
            max={50}
            step={1}
            className="my-2"
            onValueChange={onDownPaymentPercentChange}
            value={[downPaymentPercent]}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="loanTerm" className="flex items-center">
            <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
            Loan Term (Years)
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {[15, 20, 30].map((term) => (
              <Button
                key={term}
                type="button"
                variant={formData.loanTerm === term ? "default" : "outline"}
                className={formData.loanTerm === term ? "bg-primary" : ""}
                onClick={() => onInputChange('loanTerm', term)}
              >
                {term} Years
              </Button>
            ))}
          </div>
          <div className="relative mt-2">
            <Input
              id="loanTerm"
              type="number"
              value={formData.loanTerm}
              onChange={(e) => onInputChange('loanTerm', e.target.value)}
              min={1}
              max={50}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="interestRate" className="flex items-center">
            <Percent className="mr-1 h-4 w-4 text-muted-foreground" />
            Interest Rate (%)
          </Label>
          <div className="relative">
            <Input
              id="interestRate"
              type="text"
              value={formData.interestRate}
              onChange={(e) => onInputChange('interestRate', e.target.value)}
            />
            <Percent className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
          </div>
          <Slider
            defaultValue={[formData.interestRate]}
            max={10}
            step={0.1}
            className="my-2"
            onValueChange={(value) => onInputChange('interestRate', value[0])}
            value={[formData.interestRate]}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span>5%</span>
            <span>10%</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          onClick={onCalculate}
          disabled={isCalculating}
          variant="blue"
        >
          <Calculator className="mr-2 h-4 w-4" />
          {isCalculating ? 'Calculating...' : 'Calculate Mortgage'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MortgageInputForm;
