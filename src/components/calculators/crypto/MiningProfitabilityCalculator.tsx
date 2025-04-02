
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle, Zap, DollarSign, Clock, Calculator } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

interface MiningResult {
  daily: number;
  weekly: number;
  monthly: number;
  yearly: number;
  breakEvenDays: number;
  roi: number;
  profitMargin: number;
}

interface ChartData {
  month: number;
  revenue: number;
  cost: number;
  profit: number;
  cumulativeProfit: number;
}

const cryptoOptions = [
  { value: "btc", label: "Bitcoin (BTC)", hashrate: "TH/s", defaultPrice: 60000 },
  { value: "eth", label: "Ethereum (ETH)", hashrate: "MH/s", defaultPrice: 3000 },
  { value: "ltc", label: "Litecoin (LTC)", hashrate: "MH/s", defaultPrice: 100 },
  { value: "xmr", label: "Monero (XMR)", hashrate: "KH/s", defaultPrice: 200 },
  { value: "doge", label: "Dogecoin (DOGE)", hashrate: "MH/s", defaultPrice: 0.1 },
];

// Default mining rewards per unit of hashrate
const miningRateDefaults: Record<string, number> = {
  btc: 0.00001, // BTC per TH/s per day
  eth: 0.0001,  // ETH per MH/s per day
  ltc: 0.001,   // LTC per MH/s per day
  xmr: 0.01,    // XMR per KH/s per day
  doge: 0.1,    // DOGE per MH/s per day
};

const MiningProfitabilityCalculator = () => {
  const [cryptocurrency, setCryptocurrency] = useState("btc");
  const [hashPower, setHashPower] = useState(100);
  const [hashUnit, setHashUnit] = useState("TH/s");
  const [powerConsumption, setPowerConsumption] = useState(3000);
  const [electricityCost, setElectricityCost] = useState(0.12);
  const [cryptoPrice, setCryptoPrice] = useState(60000);
  const [hardwareCost, setHardwareCost] = useState(10000);
  const [miningPoolFee, setMiningPoolFee] = useState(1);
  const [difficultyIncrease, setDifficultyIncrease] = useState(5);
  const [miningResults, setMiningResults] = useState<MiningResult | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  // Update hashrate unit and price when cryptocurrency changes
  useEffect(() => {
    const selectedCrypto = cryptoOptions.find(option => option.value === cryptocurrency);
    if (selectedCrypto) {
      setHashUnit(selectedCrypto.hashrate);
      setCryptoPrice(selectedCrypto.defaultPrice);
    }
  }, [cryptocurrency]);

  // Calculate mining profitability
  const calculateProfitability = () => {
    // Mining reward per day based on hashpower
    const baseRewardPerDay = hashPower * miningRateDefaults[cryptocurrency];
    
    // Power cost per day in USD
    const powerCostPerDay = (powerConsumption / 1000) * electricityCost * 24;
    
    // Pool fee cost
    const poolFeeCost = baseRewardPerDay * cryptoPrice * (miningPoolFee / 100);
    
    // Calculate daily revenue and costs
    const dailyRevenue = baseRewardPerDay * cryptoPrice;
    const dailyCost = powerCostPerDay + poolFeeCost;
    const dailyProfit = dailyRevenue - dailyCost;
    
    // Extrapolate to weekly, monthly, yearly
    const weeklyProfit = dailyProfit * 7;
    const monthlyProfit = dailyProfit * 30;
    const yearlyProfit = dailyProfit * 365;
    
    // Calculate ROI and break-even point
    const roi = (yearlyProfit / hardwareCost) * 100;
    const breakEvenDays = hardwareCost / dailyProfit;
    
    // Profit margin
    const profitMargin = (dailyProfit / dailyRevenue) * 100;
    
    // Create result object
    const result: MiningResult = {
      daily: dailyProfit,
      weekly: weeklyProfit,
      monthly: monthlyProfit,
      yearly: yearlyProfit,
      breakEvenDays: breakEvenDays,
      roi: roi,
      profitMargin: profitMargin
    };
    
    setMiningResults(result);
    
    // Generate chart data for 24 months
    const chartDataPoints: ChartData[] = [];
    let cumulativeProfit = 0;
    
    for (let month = 1; month <= 24; month++) {
      // Account for increasing mining difficulty
      const difficultyFactor = Math.pow(1 - (difficultyIncrease / 100), month);
      const monthlyRevenue = baseRewardPerDay * cryptoPrice * 30 * difficultyFactor;
      const monthlyCost = (powerCostPerDay + poolFeeCost) * 30;
      const monthlyProfitPoint = monthlyRevenue - monthlyCost;
      
      cumulativeProfit += monthlyProfitPoint;
      
      chartDataPoints.push({
        month,
        revenue: monthlyRevenue,
        cost: monthlyCost,
        profit: monthlyProfitPoint,
        cumulativeProfit: cumulativeProfit
      });
    }
    
    setChartData(chartDataPoints);
  };

  // Recalculate when inputs change
  useEffect(() => {
    calculateProfitability();
  }, [
    cryptocurrency, hashPower, powerConsumption, electricityCost, 
    cryptoPrice, hardwareCost, miningPoolFee, difficultyIncrease
  ]);

  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Crypto Mining Profitability Calculator</h2>
      
      <Tabs defaultValue="calculator">
        <TabsList className="mb-6">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="forecast">Profit Forecast</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div>
                <Label htmlFor="cryptocurrency">Cryptocurrency</Label>
                <Select value={cryptocurrency} onValueChange={setCryptocurrency}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a cryptocurrency" />
                  </SelectTrigger>
                  <SelectContent>
                    {cryptoOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="hash-power">Hash Power ({hashUnit})</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Your mining hardware's computational power</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="hash-power"
                  type="number"
                  value={hashPower}
                  onChange={(e) => setHashPower(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="power-consumption">Power Consumption (Watts)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">How much electricity your mining hardware uses</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="power-consumption"
                  type="number"
                  value={powerConsumption}
                  onChange={(e) => setPowerConsumption(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="electricity-cost">Electricity Cost ($ per kWh)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">How much you pay for electricity per kilowatt-hour</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="electricity-cost"
                  type="number"
                  value={electricityCost}
                  onChange={(e) => setElectricityCost(Number(e.target.value))}
                  className="mt-1"
                  step="0.01"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="crypto-price">Crypto Price (USD)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Current market price of the cryptocurrency</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="crypto-price"
                  type="number"
                  value={cryptoPrice}
                  onChange={(e) => setCryptoPrice(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
            </div>
            
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="hardware-cost">Hardware Cost (USD)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">How much you paid for your mining equipment</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="hardware-cost"
                  type="number"
                  value={hardwareCost}
                  onChange={(e) => setHardwareCost(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Mining Pool Fee (%)</Label>
                  <span className="text-sm font-medium">{miningPoolFee}%</span>
                </div>
                <Slider
                  value={[miningPoolFee]}
                  min={0}
                  max={10}
                  step={0.1}
                  onValueChange={(value) => setMiningPoolFee(value[0])}
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Monthly Difficulty Increase (%)</Label>
                  <span className="text-sm font-medium">{difficultyIncrease}%</span>
                </div>
                <Slider
                  value={[difficultyIncrease]}
                  min={0}
                  max={20}
                  step={0.5}
                  onValueChange={(value) => setDifficultyIncrease(value[0])}
                />
              </div>
              
              {miningResults && (
                <div className="bg-gray-50 rounded-lg p-4 mt-4">
                  <h3 className="text-lg font-semibold mb-4">Mining Profitability</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <DollarSign size={14} />
                        Daily Profit
                      </p>
                      <p className={`text-lg font-semibold ${miningResults.daily >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(miningResults.daily)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <DollarSign size={14} />
                        Monthly Profit
                      </p>
                      <p className={`text-lg font-semibold ${miningResults.monthly >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(miningResults.monthly)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock size={14} />
                        Break-even Days
                      </p>
                      <p className="text-lg font-semibold">
                        {miningResults.breakEvenDays > 0 && miningResults.breakEvenDays !== Infinity 
                          ? miningResults.breakEvenDays.toFixed(0) 
                          : '∞'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calculator size={14} />
                        Annual ROI
                      </p>
                      <p className={`text-lg font-semibold ${miningResults.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {miningResults.roi.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm">
                      {miningResults.daily >= 0 
                        ? `With current settings, your mining operation is profitable with a ${miningResults.profitMargin.toFixed(2)}% profit margin.`
                        : `With current settings, your mining operation is not profitable. Consider reducing costs or increasing hash power.`
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="forecast">
          {chartData.length > 0 && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">24-Month Mining Forecast</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chartData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" label={{ value: 'Months', position: 'insideBottomRight', offset: 0 }} />
                      <YAxis 
                        tickFormatter={(value) => `$${value.toLocaleString()}`}
                        label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }}
                      />
                      <RechartsTooltip 
                        formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
                        labelFormatter={(label) => `Month ${label}`}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="cumulativeProfit" 
                        stroke="#3b82f6" 
                        fill="#93c5fd" 
                        name="Cumulative Profit"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#10b981" 
                        fill="#a7f3d0" 
                        name="Monthly Revenue"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="cost" 
                        stroke="#ef4444" 
                        fill="#fca5a5" 
                        name="Monthly Cost"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="p-3 bg-blue-50 rounded-md">
                    <p className="text-xs text-blue-800 font-medium">Cumulative Profit (2 Years)</p>
                    <p className="text-lg font-bold text-blue-700">
                      {formatCurrency(chartData[chartData.length - 1].cumulativeProfit)}
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-md">
                    <p className="text-xs text-green-800 font-medium">First Month Revenue</p>
                    <p className="text-lg font-bold text-green-700">
                      {formatCurrency(chartData[0].revenue)}
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-md">
                    <p className="text-xs text-red-800 font-medium">Last Month Revenue</p>
                    <p className="text-lg font-bold text-red-700">
                      {formatCurrency(chartData[chartData.length - 1].revenue)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Mining Forecast Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium">Difficulty Increase Impact</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      This forecast accounts for a {difficultyIncrease}% monthly increase in mining difficulty, 
                      which reduces your rewards over time as more miners join the network.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium">Hardware Investment</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Your initial hardware investment of {formatCurrency(hardwareCost)} is factored into the ROI 
                      and break-even calculations, but not deducted from the cumulative profit chart.
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-md">
                  <p className="text-sm text-yellow-800">
                    <strong>Important:</strong> This forecast assumes stable electricity costs and cryptocurrency prices. 
                    In reality, crypto prices are highly volatile and can significantly impact profitability.
                    Consider running multiple scenarios with different price assumptions.
                  </p>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Mining Profitability Factors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="text-yellow-500" size={18} />
              <h4 className="text-sm font-medium">Electricity Costs</h4>
            </div>
            <p className="text-xs text-gray-600">
              Often the largest ongoing expense. Lower electricity rates dramatically improve profitability.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="text-green-500" size={18} />
              <h4 className="text-sm font-medium">Crypto Price</h4>
            </div>
            <p className="text-xs text-gray-600">
              Higher cryptocurrency prices increase revenue. Price volatility can significantly impact profits.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="text-blue-500" size={18} />
              <h4 className="text-sm font-medium">Mining Difficulty</h4>
            </div>
            <p className="text-xs text-gray-600">
              Network difficulty typically increases over time, reducing earnings unless you upgrade hardware.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MiningProfitabilityCalculator;
