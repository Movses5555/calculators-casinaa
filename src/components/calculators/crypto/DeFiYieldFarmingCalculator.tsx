
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HelpCircle, TrendingUp, Percent, Coins, ArrowDown } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

interface YieldFarmingResult {
  initialInvestment: number;
  annualYield: number;
  dailyYield: number;
  firstYearTotal: number;
  impermanentLoss: number;
  netProfit: number;
  apy: number;
}

interface ChartData {
  day: number;
  totalValue: number;
  yieldEarned: number;
  impermanentLoss: number;
}

const DeFiYieldFarmingCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [baseAPY, setBaseAPY] = useState(20);
  const [tokenAPY, setTokenAPY] = useState(80);
  const [compoundFrequency, setCompoundFrequency] = useState("daily");
  const [impermanentLossRisk, setImpermanentLossRisk] = useState(5);
  const [duration, setDuration] = useState(365);
  const [priceVolatility, setPriceVolatility] = useState(30);
  const [results, setResults] = useState<YieldFarmingResult | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  // Calculate yield farming results
  const calculateYield = () => {
    // Calculate compounding frequency multiplier
    let periodsPerYear;
    switch (compoundFrequency) {
      case "daily": periodsPerYear = 365; break;
      case "weekly": periodsPerYear = 52; break;
      case "monthly": periodsPerYear = 12; break;
      case "quarterly": periodsPerYear = 4; break;
      case "yearly": periodsPerYear = 1; break;
      default: periodsPerYear = 365;
    }

    // Combined APY (base + token rewards)
    const combinedAPR = baseAPY + tokenAPY;
    
    // Calculate APY from APR with compounding
    const apy = Math.pow(1 + (combinedAPR / 100) / periodsPerYear, periodsPerYear) - 1;
    const apyPercent = apy * 100;
    
    // Calculate daily yield rate (assuming daily compounding for simplicity)
    const dailyRate = Math.pow(1 + apy, 1/365) - 1;
    const dailyYield = initialInvestment * dailyRate;
    
    // Estimate impermanent loss based on price volatility and IL risk factor
    // This is a simplified model - actual IL depends on specific asset price movements
    const ilFactor = (impermanentLossRisk / 100) * (priceVolatility / 100);
    const impermanentLoss = initialInvestment * ilFactor;
    
    // Calculate first year total assuming daily compounding
    const firstYearTotal = initialInvestment * Math.pow(1 + dailyRate, 365);
    const annualYield = firstYearTotal - initialInvestment;
    
    // Calculate net profit after impermanent loss
    const netProfit = annualYield - impermanentLoss;
    
    setResults({
      initialInvestment,
      annualYield,
      dailyYield,
      firstYearTotal,
      impermanentLoss,
      netProfit,
      apy: apyPercent
    });
    
    // Generate chart data for visualization
    const newChartData: ChartData[] = [];
    let currentValue = initialInvestment;
    let totalYield = 0;
    
    // Generate data points for each day or week based on duration
    const interval = duration <= 365 ? 1 : 7; // Use daily or weekly data points
    const maxPoints = 100; // Maximum number of data points to keep chart readable
    const skipFactor = Math.max(1, Math.floor(duration / maxPoints / interval));
    
    for (let day = 0; day <= duration; day += interval) {
      // Only add data point if it's a multiple of skipFactor or the first/last day
      if (day % (skipFactor * interval) === 0 || day === 0 || day === duration) {
        // Calculate compound interest up to this day
        currentValue = initialInvestment * Math.pow(1 + dailyRate, day);
        totalYield = currentValue - initialInvestment;
        
        // Calculate impermanent loss at this point (progressive)
        // Simplified: IL grows with time and volatility
        const dayFactor = day / duration;
        const currentIL = impermanentLoss * dayFactor;
        
        newChartData.push({
          day,
          totalValue: currentValue - currentIL,
          yieldEarned: totalYield,
          impermanentLoss: currentIL
        });
      }
    }
    
    setChartData(newChartData);
  };

  // Recalculate when inputs change
  useEffect(() => {
    calculateYield();
  }, [
    initialInvestment, baseAPY, tokenAPY, compoundFrequency,
    impermanentLossRisk, duration, priceVolatility
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
      <h2 className="text-xl font-semibold mb-6">DeFi Yield Farming Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="initial-investment">Initial Investment (USD)</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Amount you plan to deposit in the yield farming protocol</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="initial-investment"
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
              className="mt-1"
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Base APY (%)</Label>
              <span className="text-sm font-medium">{baseAPY}%</span>
            </div>
            <Slider
              value={[baseAPY]}
              min={0}
              max={100}
              step={0.1}
              onValueChange={(value) => setBaseAPY(value[0])}
            />
            <p className="text-xs text-gray-500 mt-1">
              Trading fees, interest, or other base rewards
            </p>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Token Rewards APY (%)</Label>
              <span className="text-sm font-medium">{tokenAPY}%</span>
            </div>
            <Slider
              value={[tokenAPY]}
              min={0}
              max={500}
              step={1}
              onValueChange={(value) => setTokenAPY(value[0])}
            />
            <p className="text-xs text-gray-500 mt-1">
              Additional yield from governance or incentive tokens
            </p>
          </div>
          
          <div>
            <Label htmlFor="compound-frequency">Compound Frequency</Label>
            <Select value={compoundFrequency} onValueChange={setCompoundFrequency}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select compound frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Impermanent Loss Risk (%)</Label>
              <span className="text-sm font-medium">{impermanentLossRisk}%</span>
            </div>
            <Slider
              value={[impermanentLossRisk]}
              min={0}
              max={50}
              step={1}
              onValueChange={(value) => setImpermanentLossRisk(value[0])}
            />
            <p className="text-xs text-gray-500 mt-1">
              Higher for volatile token pairs (e.g., ETH/altcoin), lower for stablecoin pairs
            </p>
          </div>
        </div>
        
        <div className="space-y-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Price Volatility (%)</Label>
              <span className="text-sm font-medium">{priceVolatility}%</span>
            </div>
            <Slider
              value={[priceVolatility]}
              min={0}
              max={200}
              step={1}
              onValueChange={(value) => setPriceVolatility(value[0])}
            />
            <p className="text-xs text-gray-500 mt-1">
              Expected price movement between tokens in the liquidity pool
            </p>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Time Period (days)</Label>
              <span className="text-sm font-medium">{duration} days</span>
            </div>
            <Slider
              value={[duration]}
              min={1}
              max={730}  // 2 years
              step={1}
              onValueChange={(value) => setDuration(value[0])}
            />
          </div>
          
          {results && (
            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <h3 className="text-lg font-semibold mb-4">Yield Farming Results</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Percent size={14} />
                    Effective APY
                  </p>
                  <p className="text-xl font-semibold text-green-600">
                    {results.apy.toFixed(2)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Coins size={14} />
                    Daily Yield
                  </p>
                  <p className="text-xl font-semibold">
                    {formatCurrency(results.dailyYield)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <TrendingUp size={14} />
                    Annual Yield
                  </p>
                  <p className="text-xl font-semibold">
                    {formatCurrency(results.annualYield)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <ArrowDown size={14} />
                    Impermanent Loss Est.
                  </p>
                  <p className="text-xl font-semibold text-red-600">
                    {formatCurrency(results.impermanentLoss)}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-md font-semibold">Net Profit (after IL)</h4>
                <p className={`text-xl font-bold ${results.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(results.netProfit)}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Expected total value after {duration} days: {formatCurrency(results.initialInvestment + results.netProfit)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {chartData.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Projected Returns</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="day" 
                  label={{ value: 'Days', position: 'insideBottomRight', offset: 0 }} 
                />
                <YAxis 
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                  label={{ value: 'Value ($)', angle: -90, position: 'insideLeft' }}
                />
                <RechartsTooltip 
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
                  labelFormatter={(label) => `Day ${label}`}
                />
                <Area 
                  type="monotone" 
                  dataKey="totalValue" 
                  stroke="#3b82f6" 
                  fill="#93c5fd" 
                  name="Total Value"
                />
                <Area 
                  type="monotone" 
                  dataKey="yieldEarned" 
                  stroke="#10b981" 
                  fill="#a7f3d0" 
                  name="Yield Earned"
                />
                <Area 
                  type="monotone" 
                  dataKey="impermanentLoss" 
                  stroke="#ef4444" 
                  fill="#fca5a5" 
                  name="Impermanent Loss"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      
      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Understanding DeFi Yield Farming</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="text-sm font-medium">What is Yield Farming?</h4>
            <p className="text-xs text-gray-600 mt-1">
              Yield farming (or liquidity mining) is a way to generate rewards with cryptocurrency holdings by providing
              liquidity to DeFi protocols. In return, you receive trading fees, interest, and often additional token rewards.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="text-sm font-medium">Impermanent Loss Explained</h4>
            <p className="text-xs text-gray-600 mt-1">
              Impermanent loss occurs when the price ratio of tokens in a liquidity pool changes compared to when you deposited them.
              The more volatile the tokens, the higher the potential impermanent loss.
            </p>
          </div>
        </div>
        
        <div className="p-4 bg-amber-50 rounded-md mt-4">
          <p className="text-sm text-amber-800">
            <strong>Important:</strong> Yield farming involves significant risks including smart contract vulnerabilities,
            impermanent loss, and market risks. APYs can change rapidly based on token prices and protocol participation.
            This calculator provides estimates only.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default DeFiYieldFarmingCalculator;
