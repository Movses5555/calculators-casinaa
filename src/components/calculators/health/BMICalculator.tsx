
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Info, Activity } from 'lucide-react';
import { calculatorColors } from '@/utils/calculatorColors';
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// BMI calculation utility function
const calculateBMI = (weight: number, height: number, unit: 'metric' | 'imperial'): number => {
  if (unit === 'metric') {
    // Weight in kg, height in cm
    return weight / Math.pow(height / 100, 2);
  } else {
    // Weight in lbs, height in inches
    return (weight / Math.pow(height, 2)) * 703;
  }
};

// BMI category determination
const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  if (bmi < 35) return 'Obesity Class I';
  if (bmi < 40) return 'Obesity Class II';
  return 'Obesity Class III';
};

// Color coding for BMI categories
const getBMICategoryColor = (bmi: number): string => {
  if (bmi < 18.5) return '#3B82F6'; // Blue - Underweight
  if (bmi < 25) return '#10B981'; // Green - Normal
  if (bmi < 30) return '#F59E0B'; // Amber - Overweight
  return '#EF4444'; // Red - Obese
};

// Sample data for BMI chart
const getBMIRangeData = () => [
  { name: 'Underweight', range: 'Below 18.5', value: 18.5, fill: '#3B82F6' },
  { name: 'Normal', range: '18.5-24.9', value: 6.4, fill: '#10B981' },
  { name: 'Overweight', range: '25-29.9', value: 4.9, fill: '#F59E0B' },
  { name: 'Obese', range: '30 and Above', value: 10, fill: '#EF4444' },
];

const BMICalculator: React.FC = () => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [bmi, setBMI] = useState<number | null>(null);
  const [bmiCategory, setBMICategory] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleCalculate = () => {
    if (weight > 0 && height > 0) {
      const calculatedBMI = calculateBMI(weight, height, unit);
      setBMI(Number(calculatedBMI.toFixed(1)));
      setBMICategory(getBMICategory(calculatedBMI));
      setShowResults(true);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="chart">BMI Chart</TabsTrigger>
          <TabsTrigger value="info">Information</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold" style={{ color: calculatorColors.text.heading }}>
                Body Mass Index (BMI) Calculator
              </CardTitle>
              <CardDescription>
                Calculate your Body Mass Index (BMI) to determine if you have a healthy body weight for your height.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="unit-system">Unit System</Label>
                  <Select 
                    value={unit} 
                    onValueChange={(value: 'metric' | 'imperial') => setUnit(value)}
                  >
                    <SelectTrigger id="unit-system">
                      <SelectValue placeholder="Select unit system" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                      <SelectItem value="imperial">Imperial (lbs, in)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="weight">
                      Weight ({unit === 'metric' ? 'kg' : 'lbs'})
                    </Label>
                    <div className="flex items-center space-x-4">
                      <Slider
                        id="weight-slider"
                        min={unit === 'metric' ? 30 : 66}
                        max={unit === 'metric' ? 200 : 440}
                        step={unit === 'metric' ? 1 : 1}
                        value={[weight]}
                        onValueChange={(value) => setWeight(value[0])}
                      />
                      <Input
                        id="weight"
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        className="w-20"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="height">
                      Height ({unit === 'metric' ? 'cm' : 'inches'})
                    </Label>
                    <div className="flex items-center space-x-4">
                      <Slider
                        id="height-slider"
                        min={unit === 'metric' ? 100 : 39}
                        max={unit === 'metric' ? 220 : 87}
                        step={unit === 'metric' ? 1 : 1}
                        value={[height]}
                        onValueChange={(value) => setHeight(value[0])}
                      />
                      <Input
                        id="height"
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(Number(e.target.value))}
                        className="w-20"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleCalculate}
                className="w-full"
                variant="default"
              >
                Calculate BMI
              </Button>
            </CardContent>
            
            {showResults && (
              <CardFooter className="flex flex-col space-y-4 border-t p-6">
                <div className="w-full flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium">Your BMI is:</h3>
                    <p className="text-3xl font-bold" style={{ color: getBMICategoryColor(bmi || 0) }}>
                      {bmi}
                    </p>
                    <p className="text-md" style={{ color: getBMICategoryColor(bmi || 0) }}>
                      {bmiCategory}
                    </p>
                  </div>
                  <div className="w-24 h-24 rounded-full flex items-center justify-center" 
                    style={{ backgroundColor: getBMICategoryColor(bmi || 0) + '20', 
                            border: `3px solid ${getBMICategoryColor(bmi || 0)}` }}>
                    <span className="text-2xl font-bold" style={{ color: getBMICategoryColor(bmi || 0) }}>
                      {bmi}
                    </span>
                  </div>
                </div>
                
                <div className="w-full pt-4">
                  <h4 className="font-medium mb-2">What this means:</h4>
                  <p className="text-sm text-gray-600">
                    {bmiCategory === 'Underweight' && "You are underweight. Consider consulting with a healthcare provider about healthy ways to gain weight."}
                    {bmiCategory === 'Normal weight' && "Congratulations! You have a healthy weight for your height. Maintain your current healthy habits."}
                    {bmiCategory === 'Overweight' && "You are overweight. Consider making lifestyle changes such as increasing physical activity and following a balanced diet."}
                    {(bmiCategory === 'Obesity Class I' || bmiCategory === 'Obesity Class II' || bmiCategory === 'Obesity Class III') && "You fall within the obesity range. It's recommended to consult with a healthcare provider about strategies to achieve a healthier weight."}
                  </p>
                </div>
              </CardFooter>
            )}
          </Card>
        </TabsContent>
        
        <TabsContent value="chart">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold" style={{ color: calculatorColors.text.heading }}>
                BMI Categories
              </CardTitle>
              <CardDescription>
                Visual representation of BMI categories and what they mean
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={getBMIRangeData()}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 40]} />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Bar dataKey="value" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-4 h-4 mt-1 rounded-full bg-[#3B82F6]"></div>
                  <div>
                    <h4 className="font-medium">Underweight (BMI below 18.5)</h4>
                    <p className="text-sm text-gray-600">May indicate nutritional deficiency, hormonal imbalance, or other health issues.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-4 h-4 mt-1 rounded-full bg-[#10B981]"></div>
                  <div>
                    <h4 className="font-medium">Normal weight (BMI 18.5-24.9)</h4>
                    <p className="text-sm text-gray-600">Associated with the lowest health risks for most people.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-4 h-4 mt-1 rounded-full bg-[#F59E0B]"></div>
                  <div>
                    <h4 className="font-medium">Overweight (BMI 25-29.9)</h4>
                    <p className="text-sm text-gray-600">May increase risk for health problems such as heart disease and type 2 diabetes.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-4 h-4 mt-1 rounded-full bg-[#EF4444]"></div>
                  <div>
                    <h4 className="font-medium">Obese (BMI 30 and above)</h4>
                    <p className="text-sm text-gray-600">Significantly increases risk for many health issues including cardiovascular disease, diabetes, and certain cancers.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold" style={{ color: calculatorColors.text.heading }}>
                Understanding BMI
              </CardTitle>
              <CardDescription>
                Learn what BMI is and how to interpret your results
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">What is BMI?</h3>
                <p className="text-gray-600">
                  Body Mass Index (BMI) is a screening tool that uses weight and height to estimate body fat and determine if someone is at a healthy weight. It's one of the most widely used methods for assessing body weight categories in adults.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Limitations of BMI</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>BMI does not directly measure body fat or muscle mass</li>
                  <li>Athletes with high muscle mass may have a high BMI but low body fat</li>
                  <li>Older adults may have a "normal" BMI despite having less muscle and more fat</li>
                  <li>BMI may not be accurate for pregnant or breastfeeding women</li>
                  <li>BMI calculations can vary between different ethnic groups</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Why BMI is Important</h3>
                <p className="text-gray-600">
                  Despite its limitations, BMI provides a useful starting point for evaluating weight status. Research shows correlations between BMI ranges and certain health outcomes. It's particularly valuable for tracking weight changes over time or assessing weight trends in large populations.
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Info className="text-blue-500" size={20} />
                  <h4 className="font-medium text-blue-700">Important Note</h4>
                </div>
                <p className="text-sm text-blue-600">
                  BMI is just one factor in determining overall health. For a complete assessment, consult with a healthcare provider who can evaluate other factors such as waist circumference, body composition, family history, and lifestyle factors.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BMICalculator;
