/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Timer, Route, Calculator, Lightbulb, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { calculatorColors } from '@/utils/calculatorColors';
import { 
  calculatePace, 
  convertPace, 
  formatPace, 
  formatTime,
  type PaceInput,
  type PaceResult 
} from '@/utils/calculatePace';
import PaceEducationalContent from './PaceEducationalContent';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Define the calculation type as a type
type CalculationType = 'pace' | 'time' | 'distance';

const PaceCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('calculator');
  const [calculationType, setCalculationType] = useState<CalculationType>('pace');
  const [distance, setDistance] = useState<string>('5');
  const [distanceUnit, setDistanceUnit] = useState<'km' | 'mi'>('km');
  const [hours, setHours] = useState<string>('0');
  const [minutes, setMinutes] = useState<string>('25');
  const [seconds, setSeconds] = useState<string>('0');
  const [paceMinutes, setPaceMinutes] = useState<string>('5');
  const [paceSeconds, setPaceSeconds] = useState<string>('0');
  const [paceUnit, setPaceUnit] = useState<'min/km' | 'min/mi'>('min/km');
  const [result, setResult] = useState<PaceResult | null>(null);
  const [comparisonData, setComparisonData] = useState<any[]>([]);

  // Calculate total seconds from hours, minutes, seconds
  const calculateTotalSeconds = (): number => {
    const h = parseInt(hours) || 0;
    const m = parseInt(minutes) || 0;
    const s = parseInt(seconds) || 0;
    return h * 3600 + m * 60 + s;
  };

  // Calculate total pace seconds
  const calculatePaceSeconds = (): number => {
    const m = parseInt(paceMinutes) || 0;
    const s = parseInt(paceSeconds) || 0;
    return m * 60 + s;
  };

  // Handle calculation
  const handleCalculate = () => {
    try {
      const distanceValue = parseFloat(distance);
      const timeInSeconds = calculateTotalSeconds();
      const paceInSeconds = calculatePaceSeconds();

      // Input validation
      if (calculationType === 'pace' && (distanceValue <= 0 || timeInSeconds <= 0)) {
        toast.error('Please enter valid distance and time values');
        return;
      } else if (calculationType === 'time' && (distanceValue <= 0 || paceInSeconds <= 0)) {
        toast.error('Please enter valid distance and pace values');
        return;
      } else if (calculationType === 'distance' && (timeInSeconds <= 0 || paceInSeconds <= 0)) {
        toast.error('Please enter valid time and pace values');
        return;
      }

      const input: PaceInput = {
        calculationType,
        distance: distanceValue,
        distanceUnit,
        timeInSeconds,
        paceInSeconds,
        paceUnit
      };

      const calculatedResult = calculatePace(input);
      setResult(calculatedResult);
      
      // Generate comparison data for visualization
      generateComparisonData(calculatedResult);
      
      setActiveTab('results');
      toast.success('Calculation complete!');
    } catch (error) {
      toast.error('Calculation failed. Please check your inputs.');
    }
  };

  // Generate comparison data for different paces
  const generateComparisonData = (baseResult: PaceResult) => {
    const comparisonPaces = [];
    
    if (calculationType === 'pace' || calculationType === 'time') {
      // Base distance 
      const baseDistance = baseResult.distance;
      
      // Generate different paces and calculate time
      const paceFactor = baseResult.paceUnit === 'min/km' ? 60 : 60 * 1.60934; // Seconds per unit
      
      // Slower paces
      for (let i = 2; i >= 1; i--) {
        const factor = 1 + (i * 0.1); // 10%, 20% slower
        const adjustedPace = Math.floor((baseResult.paceMinutes * 60 + baseResult.paceSeconds) * factor);
        const paceMin = Math.floor(adjustedPace / 60);
        const paceSec = adjustedPace % 60;
        const totalTime = adjustedPace * baseDistance;
        const hours = Math.floor(totalTime / 3600);
        const minutes = Math.floor((totalTime % 3600) / 60);
        const seconds = Math.floor(totalTime % 60);
        
        comparisonPaces.push({
          label: `${factor.toFixed(1)}x slower`,
          pace: `${paceMin}:${paceSec.toString().padStart(2, '0')}`,
          totalTime: formatTime(hours, minutes, seconds),
          timeInSeconds: totalTime,
          type: 'slower'
        });
      }
      
      // Current pace
      comparisonPaces.push({
        label: 'Your pace',
        pace: formatPace(baseResult.paceMinutes, baseResult.paceSeconds, baseResult.paceUnit),
        totalTime: formatTime(baseResult.hours, baseResult.minutes, baseResult.seconds),
        timeInSeconds: baseResult.hours * 3600 + baseResult.minutes * 60 + baseResult.seconds,
        type: 'current'
      });
      
      // Faster paces
      for (let i = 1; i <= 2; i++) {
        const factor = 1 - (i * 0.1); // 10%, 20% faster
        const adjustedPace = Math.floor((baseResult.paceMinutes * 60 + baseResult.paceSeconds) * factor);
        const paceMin = Math.floor(adjustedPace / 60);
        const paceSec = adjustedPace % 60;
        const totalTime = adjustedPace * baseDistance;
        const hours = Math.floor(totalTime / 3600);
        const minutes = Math.floor((totalTime % 3600) / 60);
        const seconds = Math.floor(totalTime % 60);
        
        comparisonPaces.push({
          label: `${factor.toFixed(1)}x faster`,
          pace: `${paceMin}:${paceSec.toString().padStart(2, '0')}`,
          totalTime: formatTime(hours, minutes, seconds),
          timeInSeconds: totalTime,
          type: 'faster'
        });
      }
      
      setComparisonData(comparisonPaces);
    } else {
      // For distance calculation, generate different distance scenarios
      const basePace = baseResult.paceMinutes * 60 + baseResult.paceSeconds;
      const baseTime = baseResult.hours * 3600 + baseResult.minutes * 60 + baseResult.seconds;
      
      const distances = [
        0.5 * baseResult.distance,
        0.75 * baseResult.distance,
        baseResult.distance,
        1.25 * baseResult.distance,
        1.5 * baseResult.distance
      ];
      
      const comparisonDistances = distances.map(dist => {
        const totalTime = basePace * dist;
        const hours = Math.floor(totalTime / 3600);
        const minutes = Math.floor((totalTime % 3600) / 60);
        const seconds = Math.floor(totalTime % 60);
        
        return {
          label: dist === baseResult.distance 
            ? 'Your distance' 
            : `${dist.toFixed(2)} ${baseResult.distanceUnit}`,
          distance: dist.toFixed(2),
          totalTime: formatTime(hours, minutes, seconds),
          timeInSeconds: totalTime,
          type: dist === baseResult.distance ? 'current' : 'comparison'
        };
      });
      
      setComparisonData(comparisonDistances);
    }
  };

  // Handle form reset
  const handleReset = () => {
    setDistance('5');
    setDistanceUnit('km');
    setHours('0');
    setMinutes('25');
    setSeconds('0');
    setPaceMinutes('5');
    setPaceSeconds('0');
    setPaceUnit('min/km');
    setResult(null);
    setComparisonData([]);
    setActiveTab('calculator');
    toast.success('Calculator reset');
  };

  // Handle unit conversion
  const handleDistanceUnitChange = (newUnit: 'km' | 'mi') => {
    if (distanceUnit === newUnit) return;
    
    const distanceVal = parseFloat(distance);
    if (!isNaN(distanceVal)) {
      if (newUnit === 'km') {
        // mi to km
        setDistance((distanceVal * 1.60934).toFixed(2));
      } else {
        // km to mi
        setDistance((distanceVal / 1.60934).toFixed(2));
      }
    }
    
    setDistanceUnit(newUnit);
    
    // Also update pace unit to match
    if (newUnit === 'km') {
      setPaceUnit('min/km');
    } else {
      setPaceUnit('min/mi');
    }
  };

  // Handle pace unit conversion
  const handlePaceUnitChange = (newUnit: 'min/km' | 'min/mi') => {
    if (paceUnit === newUnit) return;
    
    const paceInSeconds = calculatePaceSeconds();
    if (paceInSeconds > 0) {
      const convertedPace = convertPace(paceInSeconds, paceUnit, newUnit);
      setPaceMinutes(Math.floor(convertedPace / 60).toString());
      setPaceSeconds(Math.floor(convertedPace % 60).toString());
    }
    
    setPaceUnit(newUnit);
  };

  // Render functions for conditional elements
  const shouldShowDistanceInput = () => {
    return calculationType === 'pace' || calculationType === 'time';
  };

  const shouldShowTimeInput = () => {
    return calculationType === 'pace' || calculationType === 'distance';
  };

  const shouldShowPaceInput = () => {
    return calculationType === 'time' || calculationType === 'distance';
  };

  const isDistanceInputDisabled = () => {
    return calculationType === 'distance';
  };

  const isTimeInputDisabled = () => {
    return calculationType === 'time';
  };

  const isPaceInputDisabled = () => {
    return calculationType === 'pace';
  };

  return (
    <div className="space-y-8">
      <Tabs defaultValue="calculator" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calculator" className="flex items-center gap-2">
            <Calculator size={16} />
            <span>Calculator</span>
          </TabsTrigger>
          <TabsTrigger value="learn" className="flex items-center gap-2">
            <Lightbulb size={16} />
            <span>Learn</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pace Calculator</CardTitle>
              <CardDescription>Calculate pace, time, or distance for running and walking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">What do you want to calculate?</Label>
                  <RadioGroup 
                    value={calculationType} 
                    onValueChange={(value) => setCalculationType(value as CalculationType)}
                    className="flex flex-wrap gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pace" id="calc-pace" />
                      <Label htmlFor="calc-pace" className="cursor-pointer">Pace</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="time" id="calc-time" />
                      <Label htmlFor="calc-time" className="cursor-pointer">Time</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="distance" id="calc-distance" />
                      <Label htmlFor="calc-distance" className="cursor-pointer">Distance</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {shouldShowDistanceInput() && (
                  <div className="space-y-2">
                    <Label htmlFor="distance">Distance</Label>
                    <div className="flex gap-2">
                      <Input
                        id="distance"
                        type="number"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                        disabled={isDistanceInputDisabled()}
                        className="flex-1"
                      />
                      <Select
                        value={distanceUnit}
                        onValueChange={(value) => handleDistanceUnitChange(value as 'km' | 'mi')}
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="km">km</SelectItem>
                          <SelectItem value="mi">mi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
                
                {shouldShowTimeInput() && (
                  <div className="space-y-2">
                    <Label>Time</Label>
                    <div className="flex gap-2">
                      <div className="w-1/3">
                        <Label htmlFor="hours" className="text-xs">Hours</Label>
                        <Input
                          id="hours"
                          type="number"
                          min="0"
                          max="99"
                          value={hours}
                          onChange={(e) => setHours(e.target.value)}
                          disabled={isTimeInputDisabled()}
                        />
                      </div>
                      <div className="w-1/3">
                        <Label htmlFor="minutes" className="text-xs">Minutes</Label>
                        <Input
                          id="minutes"
                          type="number"
                          min="0"
                          max="59"
                          value={minutes}
                          onChange={(e) => setMinutes(e.target.value)}
                          disabled={isTimeInputDisabled()}
                        />
                      </div>
                      <div className="w-1/3">
                        <Label htmlFor="seconds" className="text-xs">Seconds</Label>
                        <Input
                          id="seconds"
                          type="number"
                          min="0"
                          max="59"
                          value={seconds}
                          onChange={(e) => setSeconds(e.target.value)}
                          disabled={isTimeInputDisabled()}
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {shouldShowPaceInput() && (
                  <div className="space-y-2">
                    <Label>Pace</Label>
                    <div className="flex gap-2">
                      <div className="w-1/3">
                        <Label htmlFor="paceMinutes" className="text-xs">Minutes</Label>
                        <Input
                          id="paceMinutes"
                          type="number"
                          min="0"
                          value={paceMinutes}
                          onChange={(e) => setPaceMinutes(e.target.value)}
                          disabled={isPaceInputDisabled()}
                        />
                      </div>
                      <div className="w-1/3">
                        <Label htmlFor="paceSeconds" className="text-xs">Seconds</Label>
                        <Input
                          id="paceSeconds"
                          type="number"
                          min="0"
                          max="59"
                          value={paceSeconds}
                          onChange={(e) => setPaceSeconds(e.target.value)}
                          disabled={isPaceInputDisabled()}
                        />
                      </div>
                      <div className="w-1/3">
                        <Label htmlFor="paceUnit" className="text-xs">Unit</Label>
                        <Select
                          value={paceUnit}
                          onValueChange={(value) => handlePaceUnitChange(value as 'min/km' | 'min/mi')}
                          disabled={isPaceInputDisabled()}
                        >
                          <SelectTrigger id="paceUnit">
                            <SelectValue placeholder="Unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="min/km">min/km</SelectItem>
                            <SelectItem value="min/mi">min/mi</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex gap-2 pt-2">
                  <Button onClick={handleCalculate} className="flex-1">
                    Calculate
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    Reset
                  </Button>
                </div>
                
                {result && (
                  <Card className="mt-4">
                    <CardContent className="pt-6">
                      <div className="text-center space-y-4">
                        <h3 className="text-xl font-semibold">Result</h3>
                        
                        {calculationType === 'pace' && (
                          <div className="flex flex-col items-center">
                            <div className="text-sm text-muted-foreground">Your pace</div>
                            <div className="text-3xl font-bold">
                              {result.paceMinutes}:{result.paceSeconds.toString().padStart(2, '0')} {result.paceUnit}
                            </div>
                          </div>
                        )}
                        
                        {calculationType === 'time' && (
                          <div className="flex flex-col items-center">
                            <div className="text-sm text-muted-foreground">Total time</div>
                            <div className="text-3xl font-bold">
                              {formatTime(result.hours, result.minutes, result.seconds)}
                            </div>
                          </div>
                        )}
                        
                        {calculationType === 'distance' && (
                          <div className="flex flex-col items-center">
                            <div className="text-sm text-muted-foreground">Total distance</div>
                            <div className="text-3xl font-bold">
                              {result.distance} {result.distanceUnit}
                            </div>
                          </div>
                        )}
                        
                        <div className="grid grid-cols-3 gap-4 pt-2">
                          <div className="bg-gray-50 p-3 rounded-md">
                            <div className="text-xs text-muted-foreground">Distance</div>
                            <div className="font-medium">{result.distance} {result.distanceUnit}</div>
                          </div>
                          
                          <div className="bg-gray-50 p-3 rounded-md">
                            <div className="text-xs text-muted-foreground">Time</div>
                            <div className="font-medium">{formatTime(result.hours, result.minutes, result.seconds)}</div>
                          </div>
                          
                          <div className="bg-gray-50 p-3 rounded-md">
                            <div className="text-xs text-muted-foreground">Pace</div>
                            <div className="font-medium">{result.paceMinutes}:{result.paceSeconds.toString().padStart(2, '0')} {result.paceUnit}</div>
                          </div>
                        </div>
                        
                        <Button className="mt-4" onClick={() => setActiveTab('results')}>
                          View Detailed Results
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="results" className="space-y-6 pt-4">
          {result ? (
            <>
              <Card className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                <CardContent className="pt-6 pb-6">
                  <div className="text-center">
                    <h3 className="text-xl font-medium mb-2">
                      {calculationType === 'pace' 
                        ? 'Your Pace' 
                        : calculationType === 'time' 
                        ? 'Your Time' 
                        : 'Your Distance'}
                    </h3>
                    <div className="text-4xl font-bold mb-2">
                      {calculationType === 'pace' 
                        ? `${result.paceMinutes}:${result.paceSeconds.toString().padStart(2, '0')} ${result.paceUnit}`
                        : calculationType === 'time'
                        ? formatTime(result.hours, result.minutes, result.seconds)
                        : `${result.distance} ${result.distanceUnit}`}
                    </div>
                    
                    <div className="flex justify-center items-center space-x-2 text-sm opacity-90">
                      {calculationType !== 'distance' && (
                        <span>For {result.distance} {result.distanceUnit}</span>
                      )}
                      
                      {calculationType !== 'pace' && (
                        <span>
                          At {result.paceMinutes}:{result.paceSeconds.toString().padStart(2, '0')} {result.paceUnit}
                        </span>
                      )}
                      
                      {calculationType !== 'time' && (
                        <span>
                          Takes {formatTime(result.hours, result.minutes, result.seconds)}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{calculationType === 'distance' ? 'Distance Comparison' : 'Pace Comparison'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={comparisonData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="label" />
                          <YAxis unit="s" />
                          <Tooltip 
                            formatter={(value) => [
                              typeof value === 'number' 
                                ? formatTime(
                                    Math.floor(value / 3600),
                                    Math.floor((value % 3600) / 60),
                                    Math.floor(value % 60)
                                  )
                                : value,
                              'Time'
                            ]}
                            labelFormatter={(label) => `${label}`}
                          />
                          <Bar 
                            dataKey="timeInSeconds" 
                            fill={calculatorColors.chart.primary}
                            name="Time" 
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>{calculationType === 'distance' ? 'Distance Breakdown' : 'Pace Breakdown'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {comparisonData.map((item, index) => (
                        <div 
                          key={index}
                          className={`flex justify-between items-center p-3 rounded-lg ${
                            item.type === 'current' 
                              ? 'bg-blue-50 border border-blue-200' 
                              : item.type === 'faster' 
                              ? 'bg-green-50' 
                              : item.type === 'slower' 
                              ? 'bg-amber-50'
                              : 'bg-gray-50'
                          }`}
                        >
                          <div>
                            <div className="font-medium">{item.label}</div>
                            {calculationType !== 'distance' ? (
                              <div className="text-sm text-muted-foreground">Pace: {item.pace}</div>
                            ) : (
                              <div className="text-sm text-muted-foreground">Distance: {item.distance} {result.distanceUnit}</div>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{item.totalTime}</div>
                            {item.type === 'current' && (
                              <Badge variant="outline" className="mt-1">Current</Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={() => setActiveTab('calculator')}>
                  Back to Calculator
                </Button>
                <Button variant="outline" onClick={handleReset}>
                  Reset
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No calculations yet. Please use the calculator to see results.</p>
              <Button className="mt-4" onClick={() => setActiveTab('calculator')}>
                Go to Calculator
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="learn">
          <PaceEducationalContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaceCalculator;
