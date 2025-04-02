
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { calculatorColors } from '@/utils/calculatorColors';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from 'recharts';
import { toast } from 'sonner';
import { Weight, Ruler, Users, Percent, Activity, Info } from 'lucide-react';
import { 
  calculateBodyFatPercentage, 
  getBodyFatCategory, 
  BodyFatInput, 
  BodyFatResult
} from '@/utils/calculateBodyFatPercentage';

const BodyFatPercentageCalculator: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('calculator');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [method, setMethod] = useState<'navy' | 'jackson-pollock' | 'three-site'>('navy');
  
  const [inputs, setInputs] = useState<BodyFatInput>({
    weight: 70,
    weightUnit: 'kg',
    height: 175,
    heightUnit: 'cm',
    age: 30,
    gender: 'male',
    waist: 85,
    neck: 38,
    hip: 0,
    chest: 0,
    thigh: 0,
    abdominal: 0,
    measurementUnit: 'cm',
    method: 'navy',
    useMetric: true
  });
  
  const [results, setResults] = useState<BodyFatResult | null>(null);
  
  const handleInputChange = (field: keyof BodyFatInput, value: any) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleGenderChange = (value: 'male' | 'female') => {
    setGender(value);
    setInputs(prev => ({
      ...prev,
      gender: value
    }));
  };
  
  const calculateResults = () => {
    try {
      // Fix: Pass only one argument to calculateBodyFatPercentage
      const result = calculateBodyFatPercentage({
        ...inputs,
        method: method as any // Ensure method is passed correctly
      });
      
      // Add the totalWeight property that's expected in the interface
      const enhancedResult: BodyFatResult = {
        ...result,
        totalWeight: inputs.weight
      };
      
      setResults(enhancedResult);
      toast.success("Body fat percentage calculated successfully!");
      setSelectedTab('results');
    } catch (error) {
      console.error("Error calculating body fat percentage:", error);
      toast.error("Error calculating body fat percentage. Please check your inputs.");
    }
  };
  
  const getPieChartData = () => {
    if (!results) return [];
    
    return [
      { name: 'Fat Mass', value: results.fatMass },
      { name: 'Lean Mass', value: results.leanMass }
    ];
  };
  
  const getChartColors = () => {
    return [calculatorColors.chart.fat, calculatorColors.chart.lean];
  };
  
  const formatWeight = (weight: number): string => {
    return `${weight.toFixed(1)} ${inputs.weightUnit}`;
  };
  
  const formatPercentage = (value: number): string => {
    return `${value.toFixed(1)}%`;
  };
  
  
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
        <h2 className="text-2xl font-semibold">Body Fat Percentage Calculator</h2>
        <p className="text-blue-100">Calculate your body fat percentage using different measurement methods</p>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="p-6">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="calculator" className="flex items-center justify-center gap-2">
            <Percent size={18} />
            <span>Calculator</span>
          </TabsTrigger>
          <TabsTrigger value="results" className="flex items-center justify-center gap-2" disabled={!results}>
            <Activity size={18} />
            <span>Results</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <Label>Gender</Label>
                  <div className="grid grid-cols-2 gap-4 mt-1">
                    <Button
                      type="button"
                      variant={gender === 'male' ? "default" : "outline"}
                      className={gender === 'male' ? "bg-blue-500 hover:bg-blue-600" : ""}
                      onClick={() => handleGenderChange('male')}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Male
                    </Button>
                    <Button
                      type="button"
                      variant={gender === 'female' ? "default" : "outline"}
                      className={gender === 'female' ? "bg-pink-500 hover:bg-pink-600" : ""}
                      onClick={() => handleGenderChange('female')}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Female
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label>Calculation Method</Label>
                  <Select
                    value={method}
                    onValueChange={(value) => setMethod(value as 'navy' | 'jackson-pollock' | 'three-site')}
                  >
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="navy">U.S. Navy Method</SelectItem>
                      <SelectItem value="jackson-pollock">Jackson-Pollock 3-Site</SelectItem>
                      <SelectItem value="three-site">3-Site Skinfold</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="mt-2 text-sm text-gray-500">
                    {method === 'navy' && "Uses waist, neck, and hip (females) circumference measurements. Quick and easy."}
                    {method === 'jackson-pollock' && "Uses skinfold measurements at chest, abdomen, and thigh. More accurate."}
                    {method === 'three-site' && "Uses skinfold measurements at different sites based on gender. Most accurate."}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={inputs.age}
                      onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                      className="mt-1"
                      min={18}
                      max={99}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="height">Height</Label>
                    <div className="flex mt-1">
                      <Input
                        id="height"
                        type="number"
                        value={inputs.height}
                        onChange={(e) => handleInputChange('height', parseFloat(e.target.value) || 0)}
                        className="rounded-r-none"
                      />
                      <Select 
                        value={inputs.heightUnit} 
                        onValueChange={(value) => handleInputChange('heightUnit', value as 'cm' | 'in')}
                      >
                        <SelectTrigger className="w-24 rounded-l-none border-l-0">
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cm">cm</SelectItem>
                          <SelectItem value="in">in</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="weight">Weight</Label>
                    <div className="flex mt-1">
                      <Input
                        id="weight"
                        type="number"
                        value={inputs.weight}
                        onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
                        className="rounded-r-none"
                      />
                      <Select 
                        value={inputs.weightUnit} 
                        onValueChange={(value) => handleInputChange('weightUnit', value as 'kg' | 'lb')}
                      >
                        <SelectTrigger className="w-24 rounded-l-none border-l-0">
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kg">kg</SelectItem>
                          <SelectItem value="lb">lb</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label className="text-lg font-medium">Body Measurements</Label>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="neck">Neck Circumference</Label>
                        <div className="flex mt-1">
                          <Input
                            id="neck"
                            type="number"
                            value={inputs.neck}
                            onChange={(e) => handleInputChange('neck', parseFloat(e.target.value) || 0)}
                            className="rounded-r-none"
                          />
                          <Select 
                            value={inputs.measurementUnit} 
                            onValueChange={(value) => handleInputChange('measurementUnit', value as 'cm' | 'in')}
                          >
                            <SelectTrigger className="w-24 rounded-l-none border-l-0">
                              <SelectValue placeholder="Unit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cm">cm</SelectItem>
                              <SelectItem value="in">in</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="waist">Waist Circumference</Label>
                        <Input
                          id="waist"
                          type="number"
                          value={inputs.waist}
                          onChange={(e) => handleInputChange('waist', parseFloat(e.target.value) || 0)}
                          className="mt-1"
                        />
                      </div>
                      
                      {(gender === 'female' && method === 'navy') && (
                        <div>
                          <Label htmlFor="hip">Hip Circumference</Label>
                          <Input
                            id="hip"
                            type="number"
                            value={inputs.hip}
                            onChange={(e) => handleInputChange('hip', parseFloat(e.target.value) || 0)}
                            className="mt-1"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {(method === 'jackson-pollock' || method === 'three-site') && (
                    <div className="space-y-4">
                      <Label className="text-lg font-medium">Skinfold Measurements</Label>
                      <div className="space-y-3">
                        {(gender === 'male' && (method === 'jackson-pollock' || method === 'three-site')) && (
                          <div>
                            <Label htmlFor="chest">Chest Skinfold</Label>
                            <Input
                              id="chest"
                              type="number"
                              value={inputs.chest}
                              onChange={(e) => handleInputChange('chest', parseFloat(e.target.value) || 0)}
                              className="mt-1"
                            />
                          </div>
                        )}
                        
                        {method === 'jackson-pollock' && (
                          <div>
                            <Label htmlFor="abdominal">Abdominal Skinfold</Label>
                            <Input
                              id="abdominal"
                              type="number"
                              value={inputs.abdominal}
                              onChange={(e) => handleInputChange('abdominal', parseFloat(e.target.value) || 0)}
                              className="mt-1"
                            />
                          </div>
                        )}
                        
                        {(method === 'jackson-pollock' || method === 'three-site') && (
                          <div>
                            <Label htmlFor="thigh">Thigh Skinfold</Label>
                            <Input
                              id="thigh"
                              type="number"
                              value={inputs.thigh}
                              onChange={(e) => handleInputChange('thigh', parseFloat(e.target.value) || 0)}
                              className="mt-1"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                <Button onClick={calculateResults} className="w-full mt-4">
                  Calculate Body Fat Percentage
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="bg-gray-50 p-4 rounded-lg text-sm">
            <div className="flex items-start">
              <Info className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
              <div>
                <p className="font-medium mb-1">Measurement Tips</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Measure at the same time of day, preferably in the morning</li>
                  <li>For waist circumference, measure at the narrowest point</li>
                  <li>For hip circumference, measure at the widest point</li>
                  <li>For skinfold measurements, use calipers and measure on the right side of the body</li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="results" className="space-y-6">
          {results && (
            <>
              <Card className="border-0 shadow-md bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Percent className="h-8 w-8 mr-2" />
                      <h3 className="text-xl font-semibold">Body Fat Percentage</h3>
                    </div>
                    
                    <div className="text-5xl font-bold my-4">
                      {formatPercentage(results.bodyFatPercentage)}
                    </div>
                    
                    <div className="text-blue-100">
                      {results.category} • {gender === 'male' ? 'Male' : 'Female'} • {inputs.age} years
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-4">Body Composition</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={getPieChartData()}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                          >
                            {getPieChartData().map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={getChartColors()[index % getChartColors().length]} />
                            ))}
                          </Pie>
                          <RechartsTooltip formatter={(value) => [`${formatWeight(value as number)}`, 'Weight']} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-4">Your Results Explained</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 rounded bg-gray-50">
                        <div className="font-medium">Body Fat Percentage</div>
                        <div className="font-bold">{formatPercentage(results.bodyFatPercentage)}</div>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded bg-gray-50">
                        <div className="font-medium">Category</div>
                        <div className="font-bold">{results.category}</div>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded bg-gray-50">
                        <div className="font-medium">Fat Mass</div>
                        <div className="font-bold">{formatWeight(results.fatMass)}</div>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded bg-gray-50">
                        <div className="font-medium">Lean Mass</div>
                        <div className="font-bold">{formatWeight(results.leanMass)}</div>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded bg-gray-50">
                        <div className="font-medium">Total Weight</div>
                        <div className="font-bold">{formatWeight(results.totalWeight)}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Body Fat Categories</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Category</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Men</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Women</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-2 text-sm">Essential Fat</td>
                          <td className="px-4 py-2 text-sm">2-5%</td>
                          <td className="px-4 py-2 text-sm">10-13%</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm">Athletes</td>
                          <td className="px-4 py-2 text-sm">6-13%</td>
                          <td className="px-4 py-2 text-sm">14-20%</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm">Fitness</td>
                          <td className="px-4 py-2 text-sm">14-17%</td>
                          <td className="px-4 py-2 text-sm">21-24%</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm">Average</td>
                          <td className="px-4 py-2 text-sm">18-24%</td>
                          <td className="px-4 py-2 text-sm">25-31%</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm">Obese</td>
                          <td className="px-4 py-2 text-sm">25%+</td>
                          <td className="px-4 py-2 text-sm">32%+</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-center">
                <Button 
                  onClick={() => setSelectedTab('calculator')} 
                  variant="outline"
                  className="mr-2"
                >
                  Back to Calculator
                </Button>
                <Button onClick={calculateResults}>
                  Recalculate
                </Button>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BodyFatPercentageCalculator;
