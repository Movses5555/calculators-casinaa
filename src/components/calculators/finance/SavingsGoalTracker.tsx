
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Target, TrendingUp, Landmark, PiggyBank, Calculator, BarChart } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend, LineChart, Line } from 'recharts';
import { toast } from 'sonner';
import { 
  calculateSavingsGoal,
  formatCurrency,
  formatPercent,
  formatTimeToGoal,
  type SavingsGoalInput,
  type SavingsGoalResult
} from '@/utils/calculateSavingsGoal';
import { calculatorColors } from '@/utils/calculatorColors';
import SavingsGoalEducationalContent from './SavingsGoalEducationalContent';

const SavingsGoalTracker: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"calculator" | "results" | "chart">("calculator");
  const [inputs, setInputs] = useState<SavingsGoalInput>({
    targetAmount: 50000,
    initialDeposit: 5000,
    monthlyContribution: 500,
    interestRate: 5,
    compoundingFrequency: 'monthly'
  });
  
  const [result, setResult] = useState<SavingsGoalResult | null>(null);
  
  const handleInputChange = (field: keyof SavingsGoalInput, value: any) => {
    setInputs(prev => ({
      ...prev,
      [field]: field === 'compoundingFrequency' ? value : Number(value)
    }));
  };
  
  const calculateResults = () => {
    try {
      const calculationResult = calculateSavingsGoal(inputs);
      setResult(calculationResult);
      if (activeTab === "calculator") {
        setActiveTab("results");
      }
      toast.success("Savings goal calculated successfully!");
    } catch (error) {
      console.error("Calculation error:", error);
      toast.error("There was an error with your calculation. Please check your inputs.");
    }
  };
  
  const getChartData = () => {
    if (!result) return [];
    
    // Limit data points to make chart more readable
    const monthlyData = result.monthlyData;
    const totalMonths = monthlyData.length - 1;
    
    // For longer timeframes, sample fewer points to make the chart readable
    let sampleInterval = 1;
    if (totalMonths > 120) {
      sampleInterval = Math.floor(totalMonths / 60); // About 60 points for long timeframes
    } else if (totalMonths > 60) {
      sampleInterval = Math.floor(totalMonths / 30); // About 30 points for medium timeframes
    }
    
    return monthlyData.filter((_, index) => 
      index === 0 || index === totalMonths || index % sampleInterval === 0
    ).map(data => ({
      month: data.month,
      label: formatMonthLabel(data.month),
      balance: data.balance,
      contributions: data.contributions,
      interest: data.interestToDate
    }));
  };
  
  const formatMonthLabel = (month: number): string => {
    if (month === 0) return 'Start';
    
    const years = Math.floor(month / 12);
    const months = month % 12;
    
    if (years === 0) {
      return `${months}m`;
    } else if (months === 0) {
      return `${years}y`;
    } else {
      return `${years}y ${months}m`;
    }
  };
  
  const getBreakdownData = () => {
    if (!result) return [];
    
    return [
      { name: 'Initial Deposit', value: inputs.initialDeposit },
      { name: 'Contributions', value: result.totalDeposits - inputs.initialDeposit },
      { name: 'Interest', value: result.totalInterest },
    ];
  };
  
  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={(tab) => setActiveTab(tab as any)} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calculator" className="flex items-center gap-2">
            <Calculator size={16} />
            <span>Calculator</span>
          </TabsTrigger>
          <TabsTrigger value="results" className="flex items-center gap-2" disabled={!result}>
            <PiggyBank size={16} />
            <span>Results</span>
          </TabsTrigger>
          <TabsTrigger value="chart" className="flex items-center gap-2" disabled={!result}>
            <BarChart size={16} />
            <span>Charts</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator" className="space-y-6 pt-4">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="targetAmount" className="text-base font-medium">
                    Your Savings Goal
                  </Label>
                  <div className="relative mt-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                    <Input
                      id="targetAmount"
                      type="number"
                      value={inputs.targetAmount}
                      onChange={(e) => handleInputChange('targetAmount', e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <Slider
                    value={[inputs.targetAmount]}
                    min={1000}
                    max={1000000}
                    step={1000}
                    onValueChange={(value) => handleInputChange('targetAmount', value[0])}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$1,000</span>
                    <span>$1,000,000</span>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="initialDeposit" className="text-base font-medium">
                    Initial Deposit
                  </Label>
                  <div className="relative mt-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                    <Input
                      id="initialDeposit"
                      type="number"
                      value={inputs.initialDeposit}
                      onChange={(e) => handleInputChange('initialDeposit', e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <Slider
                    value={[inputs.initialDeposit]}
                    min={0}
                    max={inputs.targetAmount * 0.9}
                    step={100}
                    onValueChange={(value) => handleInputChange('initialDeposit', value[0])}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="monthlyContribution" className="text-base font-medium">
                    Monthly Contribution
                  </Label>
                  <div className="relative mt-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                    <Input
                      id="monthlyContribution"
                      type="number"
                      value={inputs.monthlyContribution}
                      onChange={(e) => handleInputChange('monthlyContribution', e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <Slider
                    value={[inputs.monthlyContribution]}
                    min={0}
                    max={5000}
                    step={10}
                    onValueChange={(value) => handleInputChange('monthlyContribution', value[0])}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$0</span>
                    <span>$5,000</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="interestRate" className="text-base font-medium">
                      Annual Interest Rate (%)
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="interestRate"
                        type="number"
                        value={inputs.interestRate}
                        onChange={(e) => handleInputChange('interestRate', e.target.value)}
                        className="pr-8"
                        step="0.1"
                      />
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">%</span>
                    </div>
                    <Slider
                      value={[inputs.interestRate]}
                      min={0}
                      max={15}
                      step={0.1}
                      onValueChange={(value) => handleInputChange('interestRate', value[0])}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0%</span>
                      <span>15%</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="compoundingFrequency" className="text-base font-medium">
                      Compounding Frequency
                    </Label>
                    <Select
                      value={inputs.compoundingFrequency}
                      onValueChange={(value) => handleInputChange('compoundingFrequency', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="annually">Annually</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <Button onClick={calculateResults} className="w-full">
                Calculate Time to Reach Goal
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-green-100 rounded-full">
                  <Target className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Why use a savings goal calculator?</h3>
                  <p className="text-gray-600 mt-1">
                    See how long it will take to reach your savings target based on your initial deposit, 
                    monthly contributions, and estimated interest rate. Adjust your inputs to find the
                    best strategy to meet your financial goals.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="results" className="space-y-6 pt-4">
          {result && (
            <>
              <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                <CardContent className="pt-6">
                  <div className="text-center py-4">
                    <h3 className="text-xl font-medium mb-6">Time to Reach Your Goal</h3>
                    <div className="text-5xl font-bold mb-6">{formatTimeToGoal(result.monthsToGoal)}</div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-sm opacity-80">Target Amount</div>
                        <div className="text-xl font-semibold">{formatCurrency(inputs.targetAmount)}</div>
                      </div>
                      <div>
                        <div className="text-sm opacity-80">Final Balance</div>
                        <div className="text-xl font-semibold">{formatCurrency(result.finalBalance)}</div>
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <div className="text-sm opacity-80">Total Interest Earned</div>
                        <div className="text-xl font-semibold">{formatCurrency(result.totalInterest)}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-4">Balance Composition</h3>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-green-300 mr-2"></div>
                          <span>Initial Deposit</span>
                        </div>
                        <span className="font-medium">{formatCurrency(inputs.initialDeposit)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-blue-300 mr-2"></div>
                          <span>Additional Contributions</span>
                        </div>
                        <span className="font-medium">{formatCurrency(result.totalDeposits - inputs.initialDeposit)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-purple-300 mr-2"></div>
                          <span>Interest Earned</span>
                        </div>
                        <span className="font-medium">{formatCurrency(result.totalInterest)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-100 rounded-lg">
                        <div className="flex items-center font-medium">
                          <span>Final Balance</span>
                        </div>
                        <span className="font-bold">{formatCurrency(result.finalBalance)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-4">Savings Summary</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-500">Monthly Contribution</div>
                          <div className="text-xl font-medium mt-1">{formatCurrency(inputs.monthlyContribution)}</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-500">Interest Rate</div>
                          <div className="text-xl font-medium mt-1">{formatPercent(inputs.interestRate)}</div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500">Total Months to Goal</div>
                        <div className="text-xl font-medium mt-1">{result.monthsToGoal}</div>
                      </div>
                      
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <div className="text-sm font-medium">Compound Interest Benefit</div>
                        <div className="text-lg font-semibold mt-1 text-green-600">
                          {formatCurrency(result.totalInterest)}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {(result.totalInterest / result.finalBalance * 100).toFixed(1)}% of your final balance
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Button onClick={() => setActiveTab("chart")} className="w-full">
                View Detailed Charts
              </Button>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="chart" className="space-y-6 pt-4">
          {result && (
            <>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Growth Over Time</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={getChartData()} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="label" 
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis 
                          tickFormatter={(value) => `$${value.toLocaleString()}`}
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip 
                          formatter={(value) => [`$${Number(value).toLocaleString()}`, undefined]}
                          labelFormatter={(label) => `Time: ${label}`}
                        />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="balance" 
                          name="Total Balance" 
                          stroke={calculatorColors.data.total} 
                          fill={calculatorColors.data.total + "80"} 
                          stackId="1"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Balance Composition</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={getChartData()} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="label" 
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis 
                          tickFormatter={(value) => `$${value.toLocaleString()}`}
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip 
                          formatter={(value) => [`$${Number(value).toLocaleString()}`, undefined]}
                          labelFormatter={(label) => `Time: ${label}`}
                        />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="interest" 
                          name="Interest" 
                          stroke={calculatorColors.data.interest} 
                          fill={calculatorColors.data.interest + "80"}
                          stackId="1"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="contributions" 
                          name="Contributions" 
                          stroke={calculatorColors.data.contributions} 
                          fill={calculatorColors.data.contributions + "80"}
                          stackId="1"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={() => setActiveTab("calculator")}>
                  Back to Calculator
                </Button>
                <Button onClick={() => setActiveTab("results")}>
                  View Results
                </Button>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
      
      <SavingsGoalEducationalContent />
    </div>
  );
};

export default SavingsGoalTracker;
