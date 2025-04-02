
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Percent } from 'lucide-react';
import { PercentageInput, PercentageResult, calculatePercentage } from '@/utils/calculatePercentage';
import PercentageEducationalContent from './PercentageEducationalContent';

const PercentageCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('percentOfNumber');
  const [inputs, setInputs] = useState<Record<string, PercentageInput>>({
    percentOfNumber: { calculation: 'percentOfNumber', value1: 10, value2: 100 },
    percentChange: { calculation: 'percentChange', value1: 100, value2: 120 },
    findPercent: { calculation: 'findPercent', value1: 20, value2: 100 }
  });
  
  const [results, setResults] = useState<Record<string, PercentageResult>>({
    percentOfNumber: calculatePercentage(inputs.percentOfNumber),
    percentChange: calculatePercentage(inputs.percentChange),
    findPercent: calculatePercentage(inputs.findPercent)
  });
  
  const handleInputChange = (calc: string, field: 'value1' | 'value2', value: string) => {
    const parsedValue = parseFloat(value) || 0;
    
    setInputs(prev => ({
      ...prev,
      [calc]: {
        ...prev[calc as keyof typeof prev],
        [field]: parsedValue
      }
    }));
  };
  
  const calculateResult = (calc: string) => {
    try {
      const result = calculatePercentage(inputs[calc as keyof typeof inputs]);
      setResults(prev => ({
        ...prev,
        [calc]: result
      }));
    } catch (error) {
      console.error("Error calculating percentage:", error);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="percentOfNumber" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="percentOfNumber">
              Percentage of Number
            </TabsTrigger>
            <TabsTrigger value="percentChange">
              Percentage Change
            </TabsTrigger>
            <TabsTrigger value="findPercent">
              Find Percentage
            </TabsTrigger>
          </TabsList>
          
          {/* Percentage of Number */}
          <TabsContent value="percentOfNumber">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Percent className="mr-2 h-5 w-5 text-primary" />
                  Calculate Percentage of a Number
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-12 gap-4 items-end">
                  <div className="col-span-3">
                    <Label htmlFor="percent">Percentage</Label>
                    <div className="relative">
                      <Input
                        id="percent"
                        type="number"
                        value={inputs.percentOfNumber.value1}
                        onChange={(e) => handleInputChange('percentOfNumber', 'value1', e.target.value)}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <Percent className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-1 flex justify-center items-center text-lg font-medium">
                    of
                  </div>
                  
                  <div className="col-span-4">
                    <Label htmlFor="number">Number</Label>
                    <Input
                      id="number"
                      type="number"
                      value={inputs.percentOfNumber.value2}
                      onChange={(e) => handleInputChange('percentOfNumber', 'value2', e.target.value)}
                    />
                  </div>
                  
                  <div className="col-span-1 flex justify-center items-center text-lg font-medium">
                    =
                  </div>
                  
                  <div className="col-span-3">
                    <Button 
                      onClick={() => calculateResult('percentOfNumber')}
                      className="w-full"
                    >
                      <Calculator className="mr-2 h-4 w-4" />
                      Calculate
                    </Button>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="text-lg font-medium text-blue-900">
                    Result: {results.percentOfNumber.result.toFixed(2)}
                  </div>
                  <div className="text-sm text-blue-700 mt-1">
                    {results.percentOfNumber.explanation}
                  </div>
                  <div className="text-xs text-blue-600 mt-2 font-mono bg-blue-100 p-2 rounded">
                    {results.percentOfNumber.formula}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Percentage Change */}
          <TabsContent value="percentChange">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Percent className="mr-2 h-5 w-5 text-primary" />
                  Calculate Percentage Change
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-12 gap-4 items-end">
                  <div className="col-span-4">
                    <Label htmlFor="from">From</Label>
                    <Input
                      id="from"
                      type="number"
                      value={inputs.percentChange.value1}
                      onChange={(e) => handleInputChange('percentChange', 'value1', e.target.value)}
                    />
                  </div>
                  
                  <div className="col-span-1 flex justify-center items-center text-lg font-medium">
                    to
                  </div>
                  
                  <div className="col-span-4">
                    <Label htmlFor="to">To</Label>
                    <Input
                      id="to"
                      type="number"
                      value={inputs.percentChange.value2}
                      onChange={(e) => handleInputChange('percentChange', 'value2', e.target.value)}
                    />
                  </div>
                  
                  <div className="col-span-3">
                    <Button 
                      onClick={() => calculateResult('percentChange')}
                      className="w-full"
                    >
                      <Calculator className="mr-2 h-4 w-4" />
                      Calculate
                    </Button>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="text-lg font-medium text-blue-900">
                    Result: {Math.abs(results.percentChange.result).toFixed(2)}% 
                    {results.percentChange.result >= 0 ? 'increase' : 'decrease'}
                  </div>
                  <div className="text-sm text-blue-700 mt-1">
                    {results.percentChange.explanation}
                  </div>
                  <div className="text-xs text-blue-600 mt-2 font-mono bg-blue-100 p-2 rounded">
                    {results.percentChange.formula}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Find Percentage */}
          <TabsContent value="findPercent">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Percent className="mr-2 h-5 w-5 text-primary" />
                  Find What Percentage X is of Y
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-12 gap-4 items-end">
                  <div className="col-span-4">
                    <Label htmlFor="value">X is what percent</Label>
                    <Input
                      id="value"
                      type="number"
                      value={inputs.findPercent.value1}
                      onChange={(e) => handleInputChange('findPercent', 'value1', e.target.value)}
                    />
                  </div>
                  
                  <div className="col-span-1 flex justify-center items-center text-lg font-medium">
                    of
                  </div>
                  
                  <div className="col-span-4">
                    <Label htmlFor="total">Y</Label>
                    <Input
                      id="total"
                      type="number"
                      value={inputs.findPercent.value2}
                      onChange={(e) => handleInputChange('findPercent', 'value2', e.target.value)}
                    />
                  </div>
                  
                  <div className="col-span-3">
                    <Button 
                      onClick={() => calculateResult('findPercent')}
                      className="w-full"
                    >
                      <Calculator className="mr-2 h-4 w-4" />
                      Calculate
                    </Button>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="text-lg font-medium text-blue-900">
                    Result: {results.findPercent.result.toFixed(2)}%
                  </div>
                  <div className="text-sm text-blue-700 mt-1">
                    {results.findPercent.explanation}
                  </div>
                  <div className="text-xs text-blue-600 mt-2 font-mono bg-blue-100 p-2 rounded">
                    {results.findPercent.formula}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8">
          <PercentageEducationalContent />
        </div>
      </div>
    </div>
  );
};

export default PercentageCalculator;
