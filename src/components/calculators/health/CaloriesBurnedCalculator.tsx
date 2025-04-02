import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Info, Flame, Activity, BarChart3 } from 'lucide-react';
import { calculatorColors } from '@/utils/calculatorColors';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  calculateCaloriesBurned, 
  getActivitiesByCategory, 
  formatCalories,
  getDurationOptions,
  type ActivityFactor,
  type CaloriesBurnedInput,
  type CaloriesBurnedResult,
  activities
} from '@/utils/calculateCaloriesBurned';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const CaloriesBurnedCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<CaloriesBurnedInput>({
    weight: 70,
    weightUnit: 'kg',
    activity: 'walking-moderate',
    activityId: 'walking-moderate',
    duration: 30,
    durationUnit: 'minutes',
    intensity: 'medium',
    useMetric: true,
    activityMet: 3.5
  });
  
  const [results, setResults] = useState<CaloriesBurnedResult | null>(null);
  const [comparisonResults, setComparisonResults] = useState<CaloriesBurnedResult[] | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>('calculator');
  const [selectedCategory, setSelectedCategory] = useState<string>('Walking/Running');
  
  const activitiesByCategory = getActivitiesByCategory();
  const categories = Object.keys(activitiesByCategory);
  
  const handleInputChange = (field: keyof CaloriesBurnedInput, value: any) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const calculateResults = () => {
    try {
      const calculationInput = {
        weight: inputs.weight,
        duration: inputs.duration,
        activityMet: inputs.activityMet || getActivityMetValue(inputs.activityId),
        useMetric: inputs.weightUnit === 'kg'
      };
      
      const result = calculateCaloriesBurned(calculationInput);
      
      const enhancedResult: CaloriesBurnedResult = {
        ...result,
        activity: inputs.activity,
        activityName: getActivityName(inputs.activityId),
        duration: inputs.duration,
        durationUnit: inputs.durationUnit,
        weightUsed: inputs.weight,
        weightUnit: inputs.weightUnit,
        metValue: inputs.activityMet || getActivityMetValue(inputs.activityId)
      };
      
      setResults(enhancedResult);
      
      generateComparisonData();
      
      toast.success("Calories calculated successfully!");
      
      setSelectedTab('results');
    } catch (error) {
      console.error("Error calculating calories:", error);
      toast.error("Error calculating calories. Please check your inputs.");
    }
  };
  
  const getActivityMetValue = (activityId: string): number => {
    const activity = activities.find(a => a.id === activityId);
    return activity?.metValue || 3.5;
  };
  
  const getActivityName = (activityId: string): string => {
    const activity = activities.find(a => a.id === activityId);
    return activity?.name || 'Unknown Activity';
  };
  
  const generateComparisonData = () => {
    const selectedActivity = activitiesByCategory[selectedCategory].find(a => a.id === inputs.activityId);
    if (!selectedActivity) return;
    
    const categoryActivities = activitiesByCategory[selectedCategory]
      .filter(a => a.id !== inputs.activityId)
      .slice(0, 5);
      
    const enhancedComparisonResults: CaloriesBurnedResult[] = [];
    
    for (const activity of categoryActivities) {
      const calculationInput = {
        weight: inputs.weight,
        duration: inputs.duration,
        activityMet: activity.met,
        useMetric: inputs.weightUnit === 'kg'
      };
      
      const result = calculateCaloriesBurned(calculationInput);
      
      enhancedComparisonResults.push({
        ...result,
        activity: activity.id,
        activityName: activity.name,
        duration: inputs.duration,
        durationUnit: inputs.durationUnit,
        weightUsed: inputs.weight,
        weightUnit: inputs.weightUnit,
        metValue: activity.met
      });
    }
    
    setComparisonResults(enhancedComparisonResults);
  };
  
  const getChartData = () => {
    if (!results || !comparisonResults) return [];
    
    return [
      { name: results.activityName, value: results.caloriesBurned },
      ...comparisonResults.map(result => ({
        name: result.activityName,
        value: result.caloriesBurned
      }))
    ];
  };
  
  const getFoodEquivalentData = () => {
    if (!results) return [];
    
    const caloriesInFoods = [
      { name: 'Apple', calories: 95, servings: results.caloriesBurned / 95 },
      { name: 'Banana', calories: 105, servings: results.caloriesBurned / 105 },
      { name: 'Slice of Pizza', calories: 300, servings: results.caloriesBurned / 300 },
      { name: 'Chocolate Bar', calories: 230, servings: results.caloriesBurned / 230 },
      { name: 'Can of Soda', calories: 140, servings: results.caloriesBurned / 140 },
      { name: 'Cheeseburger', calories: 450, servings: results.caloriesBurned / 450 }
    ];
    
    return caloriesInFoods;
  };
  
  const getActivityIntensityLabel = (intensity: string): string => {
    switch (intensity) {
      case 'low': return 'Light effort';
      case 'medium': return 'Moderate effort';
      case 'high': return 'Vigorous effort';
      default: return 'Moderate effort';
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-red-500 to-orange-500 text-white">
        <h2 className="text-2xl font-semibold">Calories Burned Calculator</h2>
        <p className="text-red-100">Calculate how many calories you burn during various activities</p>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="p-6">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="calculator" className="flex items-center justify-center gap-2">
            <Activity size={18} />
            <span>Calculator</span>
          </TabsTrigger>
          <TabsTrigger value="results" className="flex items-center justify-center gap-2" disabled={!results}>
            <BarChart3 size={18} />
            <span>Results</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="weight">Your Weight</Label>
                    <div className="flex mt-1">
                      <Input
                        id="weight"
                        type="number"
                        min={1}
                        value={inputs.weight}
                        onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
                        className="rounded-r-none"
                      />
                      <Select 
                        value={inputs.weightUnit} 
                        onValueChange={(value) => handleInputChange('weightUnit', value as 'kg' | 'lb')}
                      >
                        <SelectTrigger className="w-24 rounded-l-none">
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kg">kg</SelectItem>
                          <SelectItem value="lb">lb</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <div className="flex mt-1">
                      <Input
                        id="duration"
                        type="number"
                        min={1}
                        value={inputs.duration}
                        onChange={(e) => handleInputChange('duration', parseFloat(e.target.value) || 0)}
                        className="rounded-r-none"
                      />
                      <Select 
                        value={inputs.durationUnit} 
                        onValueChange={(value) => handleInputChange('durationUnit', value as 'minutes' | 'hours')}
                      >
                        <SelectTrigger className="w-28 rounded-l-none">
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="minutes">minutes</SelectItem>
                          <SelectItem value="hours">hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="mt-2">
                      <Select
                        value={inputs.duration.toString()}
                        onValueChange={(value) => handleInputChange('duration', parseInt(value))}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Quick duration select" />
                        </SelectTrigger>
                        <SelectContent>
                          {getDurationOptions().map(option => (
                            <SelectItem key={option.value} value={option.value.toString()}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label>Activity Category</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-1">
                    {categories.map(category => (
                      <Button
                        key={category}
                        type="button"
                        variant={selectedCategory === category ? "default" : "outline"}
                        className="h-auto py-2 justify-start text-left"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label>Activity</Label>
                  <Select
                    value={inputs.activityId}
                    onValueChange={(value) => handleInputChange('activityId', value)}
                  >
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Select an activity" />
                    </SelectTrigger>
                    <SelectContent>
                      {activitiesByCategory[selectedCategory]?.map((activity) => (
                        <SelectItem key={activity.id} value={activity.id}>
                          {activity.name} (MET: {activity.met})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <div className="mt-2 text-sm text-gray-500">
                    {activitiesByCategory[selectedCategory]?.find(a => a.id === inputs.activityId)?.description}
                  </div>
                </div>
                
                <div>
                  <Label>Intensity Level</Label>
                  <div className="mt-1">
                    <Select
                      value={inputs.intensity || 'medium'}
                      onValueChange={(value) => handleInputChange('intensity', value as 'low' | 'medium' | 'high')}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select intensity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Light effort</SelectItem>
                        <SelectItem value="medium">Moderate effort</SelectItem>
                        <SelectItem value="high">Vigorous effort</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button onClick={calculateResults} className="w-full mt-4">
                  Calculate Calories Burned
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="bg-gray-50 p-4 rounded-lg text-sm">
            <div className="flex items-start">
              <Info className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
              <div>
                <p className="font-medium mb-1">About MET values</p>
                <p>The Metabolic Equivalent of Task (MET) is a measure of the energy cost of physical activities. One MET is defined as 1 kcal/kg/hour and is roughly equivalent to the energy cost of sitting quietly.</p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="results" className="space-y-6">
          {results && (
            <>
              <Card className="border-0 shadow-md bg-gradient-to-br from-red-500 to-orange-500 text-white">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Flame className="h-8 w-8 mr-2" />
                      <h3 className="text-xl font-semibold">Calories Burned</h3>
                    </div>
                    
                    <div className="text-5xl font-bold my-4">
                      {formatCalories(results.caloriesBurned)}
                    </div>
                    
                    <div className="text-red-100">
                      {results.activityName} • {results.duration} {results.durationUnit} • {getActivityIntensityLabel(inputs.intensity || 'medium')}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-4">Comparison with Similar Activities</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={getChartData()} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" label={{ value: 'Calories', position: 'insideBottom', offset: -5 }} />
                          <YAxis dataKey="name" type="category" width={120} />
                          <Tooltip formatter={(value) => [`${value} calories`, 'Calories Burned']} />
                          <Bar dataKey="value" fill="#ff6b00" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-4">Food Equivalent</h3>
                    <div className="space-y-3">
                      {getFoodEquivalentData().map((food, index) => (
                        <div key={index} className="flex justify-between items-center p-2 rounded bg-gray-50">
                          <div className="font-medium">{food.name}</div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">{food.calories} cal each</div>
                            <div className="font-bold">{food.servings.toFixed(1)} servings</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                      The number of servings you would need to consume to equal the calories burned during your activity.
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Calculation Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>Activity</span>
                      <span className="font-medium">{results.activityName}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>Weight</span>
                      <span className="font-medium">{results.weightUsed} {results.weightUnit}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>Duration</span>
                      <span className="font-medium">{results.duration} {results.durationUnit}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>Intensity</span>
                      <span className="font-medium">{getActivityIntensityLabel(inputs.intensity || 'medium')}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>MET Value</span>
                      <span className="font-medium">{results.metValue}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gray-50 rounded text-sm">
                    <p className="font-medium mb-2">How this is calculated</p>
                    <p>The calories burned calculation uses the MET formula:</p>
                    <p className="font-mono my-2 text-center">Calories = MET × Weight (kg) × Duration (hours)</p>
                    <p>MET (Metabolic Equivalent of Task) represents the energy cost of activities as multiples of resting metabolic rate.</p>
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

export default CaloriesBurnedCalculator;
