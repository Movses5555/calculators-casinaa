
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle, DollarSign, Calculator, ArrowRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface TaxResult {
  gainOrLoss: number;
  taxableAmount: number;
  estimatedTax: number;
  effectiveRate: number;
}

const CryptoTaxCalculator = () => {
  const [calculationType, setCalculationType] = useState("capital-gains");
  const [purchasePrice, setPurchasePrice] = useState(30000);
  const [salePrice, setSalePrice] = useState(60000);
  const [quantity, setQuantity] = useState(1);
  const [holdingPeriod, setHoldingPeriod] = useState("long");
  const [incomeType, setIncomeType] = useState("mining");
  const [incomeAmount, setIncomeAmount] = useState(5000);
  const [taxBracket, setTaxBracket] = useState(24);
  const [deductions, setDeductions] = useState(0);
  const [results, setResults] = useState<TaxResult | null>(null);

  const calculateTax = () => {
    let gainOrLoss = 0;
    let taxableAmount = 0;
    let estimatedTax = 0;
    let effectiveRate = 0;
    
    if (calculationType === "capital-gains") {
      // Calculate capital gains or losses
      gainOrLoss = (salePrice - purchasePrice) * quantity;
      
      // Apply different rates based on holding period
      const taxRate = holdingPeriod === "long" ? 15 : taxBracket;
      
      // Only apply tax to gains, not losses
      taxableAmount = Math.max(0, gainOrLoss);
      estimatedTax = taxableAmount * (taxRate / 100);
      
      // Calculate effective tax rate
      effectiveRate = gainOrLoss !== 0 ? (estimatedTax / Math.abs(gainOrLoss)) * 100 : 0;
    } else {
      // Income tax calculation (mining, staking, etc.)
      taxableAmount = Math.max(0, incomeAmount - deductions);
      estimatedTax = taxableAmount * (taxBracket / 100);
      effectiveRate = incomeAmount !== 0 ? (estimatedTax / incomeAmount) * 100 : 0;
      gainOrLoss = incomeAmount; // For display purposes
    }
    
    setResults({
      gainOrLoss,
      taxableAmount,
      estimatedTax,
      effectiveRate
    });
  };

  // Recalculate when inputs change
  useEffect(() => {
    calculateTax();
  }, [
    calculationType, purchasePrice, salePrice, quantity, 
    holdingPeriod, incomeType, incomeAmount, taxBracket, deductions
  ]);

  // Format currency
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
      <h2 className="text-xl font-semibold mb-6">Cryptocurrency Tax Calculator</h2>
      
      <Alert className="mb-6 bg-yellow-50 border-yellow-200">
        <Calculator className="h-4 w-4 text-yellow-600" />
        <AlertTitle>Tax Estimation</AlertTitle>
        <AlertDescription>
          This calculator provides estimates only and should not be considered tax advice. 
          Consult with a tax professional for your specific situation.
        </AlertDescription>
      </Alert>
      
      <Tabs defaultValue="capital-gains" onValueChange={setCalculationType}>
        <TabsList className="mb-6">
          <TabsTrigger value="capital-gains">Capital Gains Tax</TabsTrigger>
          <TabsTrigger value="income">Income Tax (Mining/Staking)</TabsTrigger>
        </TabsList>
        
        <TabsContent value="capital-gains" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="purchase-price">Purchase Price Per Coin ($)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">The price you paid per coin when you acquired it</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="purchase-price"
                  type="number"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sale-price">Sale Price Per Coin ($)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">The price at which you sold or plan to sell each coin</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="sale-price"
                  type="number"
                  value={salePrice}
                  onChange={(e) => setSalePrice(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="quantity">Quantity of Coins</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Number of coins involved in the transaction</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="mt-1"
                  step="0.0001"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="holding-period">Holding Period</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Long-term (held &gt;1 year): typically lower tax rate<br />
                          Short-term (held ≤1 year): typically taxed as ordinary income
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Select value={holdingPeriod} onValueChange={setHoldingPeriod}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select holding period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="long">Long-term (&gt;1 year)</SelectItem>
                    <SelectItem value="short">Short-term (≤1 year)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="tax-bracket">Your Tax Bracket (%)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Your marginal income tax rate (used for short-term gains)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="tax-bracket"
                  type="number"
                  value={taxBracket}
                  onChange={(e) => setTaxBracket(Number(e.target.value))}
                  className="mt-1"
                  min="0"
                  max="50"
                />
              </div>
            </div>
            
            {results && (
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-medium">Tax Estimate Summary</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Initial Investment</p>
                    <p className="text-lg font-semibold">{formatCurrency(purchasePrice * quantity)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sale Value</p>
                    <p className="text-lg font-semibold">{formatCurrency(salePrice * quantity)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Capital Gain/Loss</p>
                    <p className={`text-lg font-semibold ${results.gainOrLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(results.gainOrLoss)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Taxable Amount</p>
                    <p className="text-lg font-semibold">{formatCurrency(results.taxableAmount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Tax</p>
                    <p className="text-lg font-semibold">{formatCurrency(results.estimatedTax)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Effective Tax Rate</p>
                    <p className="text-lg font-semibold">{results.effectiveRate.toFixed(2)}%</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-sm">
                    {results.gainOrLoss >= 0
                      ? `You have a capital gain of ${formatCurrency(results.gainOrLoss)}, with an estimated tax of ${formatCurrency(results.estimatedTax)}.`
                      : `You have a capital loss of ${formatCurrency(Math.abs(results.gainOrLoss))}, which may be used to offset other capital gains.`
                    }
                  </p>
                  <p className="text-sm mt-2">
                    {holdingPeriod === "long" 
                      ? "As a long-term investment (held over 1 year), you qualify for the lower long-term capital gains tax rate."
                      : "As a short-term investment (held for 1 year or less), your gains are taxed as ordinary income at your marginal tax rate."
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="income" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="income-type">Income Source</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Type of cryptocurrency income</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Select value={incomeType} onValueChange={setIncomeType}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select income type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mining">Mining Rewards</SelectItem>
                    <SelectItem value="staking">Staking Rewards</SelectItem>
                    <SelectItem value="airdrops">Airdrops</SelectItem>
                    <SelectItem value="other">Other Income</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="income-amount">Income Amount ($)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Total value of cryptocurrency received as income (in USD at time of receipt)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="income-amount"
                  type="number"
                  value={incomeAmount}
                  onChange={(e) => setIncomeAmount(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="income-tax-bracket">Your Tax Bracket (%)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Your marginal income tax rate</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="income-tax-bracket"
                  type="number"
                  value={taxBracket}
                  onChange={(e) => setTaxBracket(Number(e.target.value))}
                  className="mt-1"
                  min="0"
                  max="50"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="deductions">Deductible Expenses ($)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Expenses that may be deductible (e.g., electricity for mining, equipment)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="deductions"
                  type="number"
                  value={deductions}
                  onChange={(e) => setDeductions(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
            </div>
            
            {results && (
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-medium">Income Tax Estimate</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Income</p>
                    <p className="text-lg font-semibold">{formatCurrency(incomeAmount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Deductible Expenses</p>
                    <p className="text-lg font-semibold">{formatCurrency(deductions)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Taxable Income</p>
                    <p className="text-lg font-semibold">{formatCurrency(results.taxableAmount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tax Bracket</p>
                    <p className="text-lg font-semibold">{taxBracket}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Tax</p>
                    <p className="text-lg font-semibold">{formatCurrency(results.estimatedTax)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Effective Tax Rate</p>
                    <p className="text-lg font-semibold">{results.effectiveRate.toFixed(2)}%</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-sm">
                    For your {incomeType} income of {formatCurrency(incomeAmount)}, after deducting {formatCurrency(deductions)} in expenses,
                    your estimated tax liability is {formatCurrency(results.estimatedTax)}.
                  </p>
                  <p className="text-sm mt-2">
                    Remember that cryptocurrency income is typically taxed as ordinary income at your marginal tax rate,
                    based on the fair market value at the time you received it.
                  </p>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Cryptocurrency Tax Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="text-sm font-medium">Capital Gains/Losses</h4>
            <p className="text-xs text-gray-600 mt-1">
              When you sell cryptocurrency for more than you paid, you realize a capital gain. If you sell for less, you have a capital loss.
              In most countries, capital gains are taxable while capital losses can often offset other gains.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="text-sm font-medium">Tax Rates</h4>
            <p className="text-xs text-gray-600 mt-1">
              Long-term capital gains (assets held for more than a year) typically receive preferential tax rates compared to 
              short-term gains, which are usually taxed as ordinary income at your marginal tax rate.
            </p>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-red-50 rounded-md">
          <p className="text-sm text-red-800">
            <strong>Disclaimer:</strong> This calculator provides estimates only. Tax laws vary by country and may change over time.
            Consult with a tax professional for personalized advice on your cryptocurrency tax obligations.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default CryptoTaxCalculator;
