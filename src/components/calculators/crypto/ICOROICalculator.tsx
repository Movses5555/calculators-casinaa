
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HelpCircle, TrendingUp, BarChart3, DollarSign } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface ICOResult {
  initialInvestment: number;
  currentValue: number;
  roi: number;
  multiplier: number;
  annualizedRoi: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const ICOROICalculator = () => {
  const [icoName, setIcoName] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState(1000);
  const [tokenPurchasePrice, setTokenPurchasePrice] = useState(0.1);
  const [currentTokenPrice, setCurrentTokenPrice] = useState(1);
  const [investmentDate, setInvestmentDate] = useState("");
  const [tokensReceived, setTokensReceived] = useState(0);
  const [results, setResults] = useState<ICOResult | null>(null);

  // Calculate ICO ROI
  const calculateROI = () => {
    // Calculate tokens received in ICO
    const tokens = investmentAmount / tokenPurchasePrice;
    setTokensReceived(tokens);
    
    // Calculate current value of tokens
    const currentValue = tokens * currentTokenPrice;
    
    // Calculate ROI
    const roi = ((currentValue - investmentAmount) / investmentAmount) * 100;
    
    // Calculate multiplier (how many times the investment has grown)
    const multiplier = currentValue / investmentAmount;
    
    // Calculate annualized ROI if investment date is provided
    let annualizedRoi = 0;
    if (investmentDate) {
      const investmentDateObj = new Date(investmentDate);
      const currentDate = new Date();
      const yearsDifference = (currentDate.getTime() - investmentDateObj.getTime()) / (1000 * 60 * 60 * 24 * 365);
      
      if (yearsDifference > 0) {
        // Formula: (1 + Total ROI)^(1/years) - 1
        annualizedRoi = (Math.pow(1 + (roi / 100), 1 / yearsDifference) - 1) * 100;
      }
    }
    
    setResults({
      initialInvestment: investmentAmount,
      currentValue,
      roi,
      multiplier,
      annualizedRoi
    });
  };

  // Recalculate when inputs change
  useEffect(() => {
    calculateROI();
  }, [investmentAmount, tokenPurchasePrice, currentTokenPrice, investmentDate]);

  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  // Prepare data for pie chart
  const getPieData = () => {
    if (!results) return [];
    
    const profit = Math.max(0, results.currentValue - results.initialInvestment);
    const loss = Math.max(0, results.initialInvestment - results.currentValue);
    
    if (profit > 0) {
      return [
        { name: 'Initial Investment', value: results.initialInvestment },
        { name: 'Profit', value: profit },
      ];
    } else {
      return [
        { name: 'Current Value', value: results.currentValue },
        { name: 'Loss', value: loss },
      ];
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">ICO ROI Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="ico-name">ICO/Token Name (Optional)</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Name of the ICO or token project for your reference</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="ico-name"
              type="text"
              value={icoName}
              onChange={(e) => setIcoName(e.target.value)}
              placeholder="e.g., Ethereum, Cardano, Polkadot"
              className="mt-1"
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="investment-amount">Investment Amount ($)</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">How much you invested in the ICO</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="investment-amount"
              type="number"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(Number(e.target.value))}
              className="mt-1"
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="token-purchase-price">Token Purchase Price ($)</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Price per token during the ICO</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="token-purchase-price"
              type="number"
              value={tokenPurchasePrice}
              onChange={(e) => setTokenPurchasePrice(Number(e.target.value))}
              className="mt-1"
              step="0.0001"
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="current-token-price">Current Token Price ($)</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Current market price of the token</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="current-token-price"
              type="number"
              value={currentTokenPrice}
              onChange={(e) => setCurrentTokenPrice(Number(e.target.value))}
              className="mt-1"
              step="0.0001"
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="investment-date">Investment Date (Optional)</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">When you made your ICO investment (for annualized ROI calculation)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="investment-date"
              type="date"
              value={investmentDate}
              onChange={(e) => setInvestmentDate(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
        
        <div className="space-y-5">
          {results && (
            <>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <DollarSign size={14} />
                    Initial Investment
                  </h3>
                  <p className="text-xl font-bold text-gray-900">
                    {formatCurrency(results.initialInvestment)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <DollarSign size={14} />
                    Current Value
                  </h3>
                  <p className="text-xl font-bold text-gray-900">
                    {formatCurrency(results.currentValue)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <TrendingUp size={14} />
                    Return on Investment
                  </h3>
                  <p className={`text-xl font-bold ${results.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {results.roi.toFixed(2)}%
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <BarChart3 size={14} />
                    Multiplier
                  </h3>
                  <p className={`text-xl font-bold ${results.multiplier >= 1 ? 'text-green-600' : 'text-red-600'}`}>
                    {results.multiplier.toFixed(2)}x
                  </p>
                </div>
              </div>
              
              {investmentDate && (
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <h3 className="text-sm font-medium text-blue-800">Annualized ROI</h3>
                  <p className={`text-xl font-bold ${results.annualizedRoi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {results.annualizedRoi.toFixed(2)}% per year
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Based on investment date: {new Date(investmentDate).toLocaleDateString()}
                  </p>
                </div>
              )}
              
              <div>
                <h3 className="text-sm font-medium mb-3">Investment Breakdown</h3>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getPieData()}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {getPieData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="text-sm font-medium mb-2">Summary</h3>
                <p className="text-sm">
                  {icoName && `Your investment in ${icoName} `}
                  {!icoName && 'Your ICO investment '}
                  {results.roi >= 0 
                    ? `has generated a profit of ${formatCurrency(results.currentValue - results.initialInvestment)} (${results.roi.toFixed(2)}% ROI).`
                    : `has resulted in a loss of ${formatCurrency(results.initialInvestment - results.currentValue)} (${Math.abs(results.roi).toFixed(2)}% loss).`
                  }
                </p>
                <p className="text-sm mt-2">
                  You received approximately {tokensReceived.toLocaleString(undefined, { maximumFractionDigits: 2 })} tokens
                  at ${tokenPurchasePrice.toFixed(4)} per token, now worth ${currentTokenPrice.toFixed(4)} each.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Understanding ICO ROI</h3>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            An Initial Coin Offering (ICO) is a fundraising method where new projects sell their underlying crypto tokens
            in exchange for bitcoin, ether, or other cryptocurrencies.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-medium">ROI Calculation</h4>
              <p className="text-xs text-gray-600 mt-1">
                Return on Investment (ROI) measures the performance of an investment by dividing the profit or loss by the 
                amount invested. A positive ROI means your investment has gained value, while a negative ROI indicates a loss.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-medium">Multiplier</h4>
              <p className="text-xs text-gray-600 mt-1">
                The multiplier shows how many times your initial investment has grown. A 1x multiplier means
                your investment has maintained its value. Below 1x means a loss, while above 1x indicates profit.
              </p>
            </div>
          </div>
          <div className="p-4 bg-yellow-50 rounded-md">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> ICO investments are generally considered high-risk. Historical ICO performance
              varies widely - some early investors in successful projects saw returns exceeding 100x, while many ICOs
              resulted in significant losses or complete failures.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ICOROICalculator;
