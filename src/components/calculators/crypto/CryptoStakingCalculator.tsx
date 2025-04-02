
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HelpCircle, Calendar, DollarSign, Percent } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

interface StakingReward {
  month: number;
  totalStaked: number;
  monthlyReward: number;
  cumulativeReward: number;
  totalValue: number;
}

const compoundingOptions = [
  { value: "none", label: "None (Simple)" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "yearly", label: "Yearly" }
];

const CryptoStakingCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [stakingAPY, setStakingAPY] = useState(5);
  const [stakingDuration, setStakingDuration] = useState(12);
  const [compoundingPeriod, setCompoundingPeriod] = useState("none");
  const [rewardsData, setRewardsData] = useState<StakingReward[]>([]);
  const [priceAppreciation, setPriceAppreciation] = useState(0);

  // Calculate staking rewards
  const calculateRewards = () => {
    let data: StakingReward[] = [];
    let totalStaked = initialInvestment;
    let cumulativeReward = 0;
    
    // Convert annual rate to the appropriate period rate
    const dailyRate = stakingAPY / 100 / 365;
    const weeklyRate = stakingAPY / 100 / 52;
    const monthlyRate = stakingAPY / 100 / 12;
    const quarterlyRate = stakingAPY / 100 / 4;
    const yearlyRate = stakingAPY / 100;
    
    // Calculate monthly price appreciation rate (if any)
    const monthlyPriceRate = priceAppreciation > 0 ? Math.pow(1 + priceAppreciation / 100, 1/12) - 1 : 0;
    
    for (let month = 1; month <= stakingDuration; month++) {
      let monthlyReward = 0;
      
      // Calculate rewards based on compounding period
      switch (compoundingPeriod) {
        case "daily":
          totalStaked = totalStaked * Math.pow(1 + dailyRate, 30); // 30 days in a month
          monthlyReward = totalStaked - (month === 1 ? initialInvestment : data[month - 2].totalStaked);
          break;
        case "weekly":
          totalStaked = totalStaked * Math.pow(1 + weeklyRate, 4); // ~4 weeks in a month
          monthlyReward = totalStaked - (month === 1 ? initialInvestment : data[month - 2].totalStaked);
          break;
        case "monthly":
          monthlyReward = totalStaked * monthlyRate;
          totalStaked += monthlyReward;
          break;
        case "quarterly":
          if (month % 3 === 0) {
            monthlyReward = totalStaked * quarterlyRate;
            totalStaked += monthlyReward;
          }
          break;
        case "yearly":
          if (month % 12 === 0) {
            monthlyReward = totalStaked * yearlyRate;
            totalStaked += monthlyReward;
          }
          break;
        case "none":
        default:
          // Simple interest (no compounding)
          monthlyReward = initialInvestment * monthlyRate;
          totalStaked = initialInvestment;
          break;
      }
      
      cumulativeReward += monthlyReward;
      
      // Apply price appreciation to the total value
      const priceMultiplier = Math.pow(1 + monthlyPriceRate, month);
      const totalValue = (totalStaked) * priceMultiplier;
      
      data.push({
        month,
        totalStaked,
        monthlyReward,
        cumulativeReward,
        totalValue
      });
    }
    
    setRewardsData(data);
  };

  // Recalculate whenever inputs change
  useEffect(() => {
    calculateRewards();
  }, [initialInvestment, stakingAPY, stakingDuration, compoundingPeriod, priceAppreciation]);

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
      <h2 className="text-xl font-semibold mb-6">Crypto Staking Rewards Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="initial-investment">Initial Investment ($)</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">The amount of cryptocurrency you plan to stake (in USD value)</p>
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
              <Label>Staking APY (%)</Label>
              <span className="text-sm font-medium">{stakingAPY}%</span>
            </div>
            <Slider
              value={[stakingAPY]}
              min={0.1}
              max={50}
              step={0.1}
              onValueChange={(value) => setStakingAPY(value[0])}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Staking Duration (months)</Label>
              <span className="text-sm font-medium">{stakingDuration} months</span>
            </div>
            <Slider
              value={[stakingDuration]}
              min={1}
              max={60}
              step={1}
              onValueChange={(value) => setStakingDuration(value[0])}
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="compounding-period">Compounding Period</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">How often your staking rewards are reinvested</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Select value={compoundingPeriod} onValueChange={setCompoundingPeriod}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select compounding period" />
              </SelectTrigger>
              <SelectContent>
                {compoundingOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Expected Annual Price Appreciation (%)</Label>
              <span className="text-sm font-medium">{priceAppreciation}%</span>
            </div>
            <Slider
              value={[priceAppreciation]}
              min={-50}
              max={200}
              step={1}
              onValueChange={(value) => setPriceAppreciation(value[0])}
            />
          </div>
        </div>

        <div className="space-y-6">
          {rewardsData.length > 0 && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-green-800 flex items-center gap-1">
                    <Percent size={14} />
                    Total Staking Rewards
                  </h3>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(rewardsData[rewardsData.length - 1].cumulativeReward)}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-800 flex items-center gap-1">
                    <DollarSign size={14} />
                    Final Value
                  </h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(rewardsData[rewardsData.length - 1].totalValue)}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Rewards Growth Over Time</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={rewardsData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" label={{ value: 'Months', position: 'insideBottomRight', offset: 0 }} />
                      <YAxis 
                        tickFormatter={(value) => `$${value.toLocaleString()}`}
                        label={{ value: 'Value ($)', angle: -90, position: 'insideLeft' }}
                      />
                      <RechartsTooltip 
                        formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
                        labelFormatter={(label) => `Month ${label}`}
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
                        dataKey="cumulativeReward" 
                        stroke="#10b981" 
                        fill="#a7f3d0" 
                        name="Cumulative Rewards"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Understanding Staking Rewards</h3>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Staking is a process of actively participating in transaction validation on a proof-of-stake (PoS) blockchain.
            It's similar to mining but requires users to hold and "stake" their cryptocurrencies to become validators.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-medium">Compounding Effects</h4>
              <p className="text-xs text-gray-600 mt-1">
                Compounding your staking rewards (reinvesting them) can significantly increase your returns over time.
                The more frequently you compound, the greater the potential growth.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-medium">Price Appreciation Impact</h4>
              <p className="text-xs text-gray-600 mt-1">
                This calculator accounts for potential cryptocurrency price changes, which can dramatically affect your 
                staking returns when valued in USD.
              </p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Staking rewards vary widely between different cryptocurrencies and platforms. 
              Some staking providers may charge fees that aren't accounted for in this calculator.
              Always research specific staking conditions for your chosen cryptocurrency.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CryptoStakingCalculator;
