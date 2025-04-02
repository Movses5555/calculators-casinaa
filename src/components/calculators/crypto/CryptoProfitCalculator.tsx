
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRight, HelpCircle, TrendingUp, TrendingDown } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CryptoProfitResult {
  initialInvestment: number;
  finalValue: number;
  profit: number;
  roi: number;
  isProfit: boolean;
}

const CryptoProfitCalculator = () => {
  const [calculationType, setCalculationType] = useState("profit");
  const [initialPrice, setInitialPrice] = useState(50000);
  const [finalPrice, setFinalPrice] = useState(60000);
  const [investmentAmount, setInvestmentAmount] = useState(1000);
  const [coinAmount, setCoinAmount] = useState(0.02);
  const [priceChangePercent, setPriceChangePercent] = useState(20);
  const [results, setResults] = useState<CryptoProfitResult | null>(null);

  // Calculate profit based on current inputs
  const calculateProfit = () => {
    if (calculationType === "profit") {
      // Direct calculation with initial and final prices
      const initialInvestment = investmentAmount;
      const coinsPurchased = initialInvestment / initialPrice;
      const finalValue = coinsPurchased * finalPrice;
      const profit = finalValue - initialInvestment;
      const roi = (profit / initialInvestment) * 100;

      setResults({
        initialInvestment,
        finalValue,
        profit,
        roi,
        isProfit: profit >= 0
      });
    } else {
      // Calculation based on coin amount and price change
      const initialValue = coinAmount * initialPrice;
      const finalValue = coinAmount * finalPrice;
      const profit = finalValue - initialValue;
      const roi = initialValue > 0 ? (profit / initialValue) * 100 : 0;

      setResults({
        initialInvestment: initialValue,
        finalValue,
        profit,
        roi,
        isProfit: profit >= 0
      });
    }
  };

  // Update final price when price change percent is modified
  useEffect(() => {
    if (calculationType === "profit") {
      const newFinalPrice = initialPrice * (1 + priceChangePercent / 100);
      setFinalPrice(newFinalPrice);
    }
  }, [initialPrice, priceChangePercent, calculationType]);

  // Run calculation whenever inputs change
  useEffect(() => {
    calculateProfit();
  }, [initialPrice, finalPrice, investmentAmount, coinAmount, calculationType]);

  return (
    <Card className="p-6">
      <Tabs defaultValue="profit" onValueChange={setCalculationType}>
        <TabsList className="mb-6">
          <TabsTrigger value="profit">Calculate by Investment</TabsTrigger>
          <TabsTrigger value="coin">Calculate by Coin Amount</TabsTrigger>
        </TabsList>

        <TabsContent value="profit" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="investment-amount">Investment Amount ($)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">How much money you plan to invest in cryptocurrency</p>
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
                  <Label htmlFor="initial-price">Entry Price ($)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">The price of the cryptocurrency when you buy it</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="initial-price"
                  type="number"
                  value={initialPrice}
                  onChange={(e) => setInitialPrice(Number(e.target.value))}
                  className="mt-1"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Price Change (%)</Label>
                  <span className="text-sm font-medium">{priceChangePercent}%</span>
                </div>
                <Slider
                  value={[priceChangePercent]}
                  min={-100}
                  max={1000}
                  step={1}
                  onValueChange={(value) => setPriceChangePercent(value[0])}
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="final-price">Exit Price ($)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">The price of the cryptocurrency when you sell it</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="final-price"
                  type="number"
                  value={finalPrice.toFixed(2)}
                  onChange={(e) => setFinalPrice(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
            </div>

            {results && (
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-medium">Profit Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Initial Investment</p>
                    <p className="text-lg font-semibold">${results.initialInvestment.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Final Value</p>
                    <p className="text-lg font-semibold">${results.finalValue.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Profit/Loss</p>
                    <p className={`text-lg font-semibold flex items-center gap-1 ${results.isProfit ? 'text-green-600' : 'text-red-600'}`}>
                      {results.isProfit ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      ${Math.abs(results.profit).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">ROI</p>
                    <p className={`text-lg font-semibold ${results.isProfit ? 'text-green-600' : 'text-red-600'}`}>
                      {results.roi.toFixed(2)}%
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-sm">
                    {results.isProfit 
                      ? `At a ${finalPrice.toFixed(2)} selling price, your investment of $${results.initialInvestment.toFixed(2)} would be worth $${results.finalValue.toFixed(2)}, resulting in a profit of $${results.profit.toFixed(2)}.`
                      : `At a ${finalPrice.toFixed(2)} selling price, your investment of $${results.initialInvestment.toFixed(2)} would be worth $${results.finalValue.toFixed(2)}, resulting in a loss of $${Math.abs(results.profit).toFixed(2)}.`
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="coin" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="coin-amount">Coin Amount</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">How many coins you own or plan to buy</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="coin-amount"
                  type="number"
                  value={coinAmount}
                  onChange={(e) => setCoinAmount(Number(e.target.value))}
                  className="mt-1"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="coin-initial-price">Entry Price ($)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">The price of the cryptocurrency when you buy it</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="coin-initial-price"
                  type="number"
                  value={initialPrice}
                  onChange={(e) => setInitialPrice(Number(e.target.value))}
                  className="mt-1"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="coin-final-price">Exit Price ($)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">The price of the cryptocurrency when you sell it</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="coin-final-price"
                  type="number"
                  value={finalPrice}
                  onChange={(e) => setFinalPrice(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
            </div>

            {results && (
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-medium">Profit Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Initial Value</p>
                    <p className="text-lg font-semibold">${results.initialInvestment.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Final Value</p>
                    <p className="text-lg font-semibold">${results.finalValue.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Profit/Loss</p>
                    <p className={`text-lg font-semibold flex items-center gap-1 ${results.isProfit ? 'text-green-600' : 'text-red-600'}`}>
                      {results.isProfit ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      ${Math.abs(results.profit).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">ROI</p>
                    <p className={`text-lg font-semibold ${results.isProfit ? 'text-green-600' : 'text-red-600'}`}>
                      {results.roi.toFixed(2)}%
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-sm">
                    {results.isProfit 
                      ? `If you sell ${coinAmount} coins at $${finalPrice.toFixed(2)} each, you would make a profit of $${results.profit.toFixed(2)}.`
                      : `If you sell ${coinAmount} coins at $${finalPrice.toFixed(2)} each, you would incur a loss of $${Math.abs(results.profit).toFixed(2)}.`
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-medium mb-4">How to Use This Calculator</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Choose whether to calculate by investment amount or by coin amount.</li>
          <li>Enter your investment amount or coin quantity.</li>
          <li>Set the entry price - how much the coin costs when you buy it.</li>
          <li>Adjust the exit price or use the price change slider to see potential profits or losses.</li>
          <li>View your potential profit or loss and return on investment (ROI).</li>
        </ol>
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> This calculator doesn't account for trading fees, taxes, or other costs that may affect your actual profit.
            Results are for estimation purposes only.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default CryptoProfitCalculator;
