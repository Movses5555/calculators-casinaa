
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle, DollarSign, Percent, AlertTriangle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

interface LoanResult {
  loanAmount: number;
  collateralValue: number;
  ltv: number;
  interestAmount: number;
  totalRepayment: number;
  monthlyPayment: number;
  liquidationPrice: number;
}

interface ChartData {
  month: number;
  outstandingBalance: number;
  interestPaid: number;
  principalPaid: number;
}

const collateralOptions = [
  { value: "btc", label: "Bitcoin (BTC)", price: 60000 },
  { value: "eth", label: "Ethereum (ETH)", price: 3000 },
  { value: "usdc", label: "USD Coin (USDC)", price: 1 },
  { value: "usdt", label: "Tether (USDT)", price: 1 },
];

const CryptoLoanCalculator = () => {
  const [collateralType, setCollateralType] = useState("btc");
  const [collateralAmount, setCollateralAmount] = useState(1);
  const [collateralPrice, setCollateralPrice] = useState(60000);
  const [loanAmount, setLoanAmount] = useState(30000);
  const [loanTerm, setLoanTerm] = useState(12);
  const [interestRate, setInterestRate] = useState(8);
  const [ltvRatio, setLtvRatio] = useState(50);
  const [liquidationThreshold, setLiquidationThreshold] = useState(80);
  const [loanResults, setLoanResults] = useState<LoanResult | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  // Update collateral price when type changes
  useEffect(() => {
    const selectedCollateral = collateralOptions.find(option => option.value === collateralType);
    if (selectedCollateral) {
      setCollateralPrice(selectedCollateral.price);
    }
  }, [collateralType]);

  // Calculate max loan amount based on collateral value and LTV
  useEffect(() => {
    const collateralValue = collateralAmount * collateralPrice;
    const maxLoanAmount = collateralValue * (ltvRatio / 100);
    
    // If current loan amount exceeds max, adjust it
    if (loanAmount > maxLoanAmount) {
      setLoanAmount(maxLoanAmount);
    }
  }, [collateralAmount, collateralPrice, ltvRatio]);

  // Calculate loan details
  const calculateLoan = () => {
    const collateralValue = collateralAmount * collateralPrice;
    const currentLtv = (loanAmount / collateralValue) * 100;
    
    // Annual interest rate to monthly
    const monthlyRate = interestRate / 100 / 12;
    
    // Calculate monthly payment (amortization formula)
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / 
                           (Math.pow(1 + monthlyRate, loanTerm) - 1);
    
    // Total interest over loan term
    const totalPayment = monthlyPayment * loanTerm;
    const interestAmount = totalPayment - loanAmount;
    
    // Calculate liquidation price
    const liquidationPrice = (loanAmount / collateralAmount) * (100 / liquidationThreshold);
    
    setLoanResults({
      loanAmount,
      collateralValue,
      ltv: currentLtv,
      interestAmount,
      totalRepayment: totalPayment,
      monthlyPayment,
      liquidationPrice
    });
    
    // Generate amortization schedule for chart
    const amortizationData: ChartData[] = [];
    let remainingBalance = loanAmount;
    let totalInterestPaid = 0;
    let totalPrincipalPaid = 0;
    
    for (let month = 1; month <= loanTerm; month++) {
      const interestForMonth = remainingBalance * monthlyRate;
      const principalForMonth = monthlyPayment - interestForMonth;
      
      remainingBalance -= principalForMonth;
      totalInterestPaid += interestForMonth;
      totalPrincipalPaid += principalForMonth;
      
      amortizationData.push({
        month,
        outstandingBalance: Math.max(0, remainingBalance),
        interestPaid: totalInterestPaid,
        principalPaid: totalPrincipalPaid
      });
    }
    
    setChartData(amortizationData);
  };

  // Recalculate when inputs change
  useEffect(() => {
    calculateLoan();
  }, [
    collateralType, collateralAmount, collateralPrice, 
    loanAmount, loanTerm, interestRate, ltvRatio, liquidationThreshold
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
      <h2 className="text-xl font-semibold mb-6">Crypto Loan Calculator</h2>
      
      <Tabs defaultValue="calculator">
        <TabsList className="mb-6">
          <TabsTrigger value="calculator">Loan Calculator</TabsTrigger>
          <TabsTrigger value="repayment">Repayment Schedule</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div>
                <Label htmlFor="collateral-type">Collateral Cryptocurrency</Label>
                <Select value={collateralType} onValueChange={setCollateralType}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select collateral type" />
                  </SelectTrigger>
                  <SelectContent>
                    {collateralOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="collateral-amount">Collateral Amount</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Amount of cryptocurrency to use as collateral</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="collateral-amount"
                  type="number"
                  value={collateralAmount}
                  onChange={(e) => setCollateralAmount(Number(e.target.value))}
                  className="mt-1"
                  step="0.001"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="collateral-price">Collateral Price (USD)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Current market price of the collateral cryptocurrency</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="collateral-price"
                  type="number"
                  value={collateralPrice}
                  onChange={(e) => setCollateralPrice(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Loan-to-Value Ratio (%)</Label>
                  <span className="text-sm font-medium">{ltvRatio}%</span>
                </div>
                <Slider
                  value={[ltvRatio]}
                  min={1}
                  max={90}
                  step={1}
                  onValueChange={(value) => setLtvRatio(value[0])}
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="loan-amount">Loan Amount (USD)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Amount you want to borrow in USD</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="loan-amount"
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="mt-1"
                  max={collateralAmount * collateralPrice * (ltvRatio / 100)}
                />
              </div>
            </div>
            
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Loan Term (months)</Label>
                  <span className="text-sm font-medium">{loanTerm} months</span>
                </div>
                <Slider
                  value={[loanTerm]}
                  min={1}
                  max={60}
                  step={1}
                  onValueChange={(value) => setLoanTerm(value[0])}
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Annual Interest Rate (%)</Label>
                  <span className="text-sm font-medium">{interestRate}%</span>
                </div>
                <Slider
                  value={[interestRate]}
                  min={0.1}
                  max={25}
                  step={0.1}
                  onValueChange={(value) => setInterestRate(value[0])}
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Liquidation Threshold (%)</Label>
                  <span className="text-sm font-medium">{liquidationThreshold}%</span>
                </div>
                <Slider
                  value={[liquidationThreshold]}
                  min={Math.max(ltvRatio + 5, 10)}
                  max={95}
                  step={1}
                  onValueChange={(value) => setLiquidationThreshold(value[0])}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Collateral will be liquidated if LTV exceeds this threshold
                </p>
              </div>
              
              {loanResults && (
                <div className="bg-gray-50 rounded-lg p-4 mt-4">
                  <h3 className="text-lg font-semibold mb-4">Loan Summary</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <DollarSign size={14} />
                        Collateral Value
                      </p>
                      <p className="text-lg font-semibold">
                        {formatCurrency(loanResults.collateralValue)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Percent size={14} />
                        Current LTV
                      </p>
                      <p className="text-lg font-semibold">
                        {loanResults.ltv.toFixed(2)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <DollarSign size={14} />
                        Monthly Payment
                      </p>
                      <p className="text-lg font-semibold">
                        {formatCurrency(loanResults.monthlyPayment)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <DollarSign size={14} />
                        Total Interest
                      </p>
                      <p className="text-lg font-semibold">
                        {formatCurrency(loanResults.interestAmount)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="text-amber-500" size={18} />
                      <h4 className="text-sm font-medium">Liquidation Price</h4>
                    </div>
                    <p className="text-lg font-semibold text-amber-600 mt-1">
                      ${loanResults.liquidationPrice.toFixed(2)} per {collateralType.toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      If the price of {collateralType.toUpperCase()} falls below this level, your collateral may be liquidated.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="repayment">
          {chartData.length > 0 && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Loan Repayment Schedule</h3>
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
                        dataKey="outstandingBalance" 
                        stroke="#3b82f6" 
                        fill="#93c5fd" 
                        name="Outstanding Balance"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="interestPaid" 
                        stroke="#ef4444" 
                        fill="#fca5a5" 
                        name="Interest Paid"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="principalPaid" 
                        stroke="#10b981" 
                        fill="#a7f3d0" 
                        name="Principal Paid"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="p-3 bg-blue-50 rounded-md">
                    <p className="text-xs text-blue-800 font-medium">Total Loan Repayment</p>
                    <p className="text-lg font-bold text-blue-700">
                      {loanResults && formatCurrency(loanResults.totalRepayment)}
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-md">
                    <p className="text-xs text-red-800 font-medium">Total Interest Cost</p>
                    <p className="text-lg font-bold text-red-700">
                      {loanResults && formatCurrency(loanResults.interestAmount)}
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-md">
                    <p className="text-xs text-green-800 font-medium">Monthly Payment</p>
                    <p className="text-lg font-bold text-green-700">
                      {loanResults && formatCurrency(loanResults.monthlyPayment)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Crypto Loan Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium">How Crypto Loans Work</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Crypto loans allow you to borrow fiat currency (like USD) by using your cryptocurrency as collateral.
                      You maintain ownership of your crypto assets while accessing cash, avoiding potential capital gains taxes
                      that would come from selling.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium">Liquidation Risk</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      If the value of your collateral drops significantly, causing your LTV to exceed the liquidation threshold,
                      the lender may sell part or all of your collateral to cover the loan. This is called liquidation.
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-amber-50 rounded-md">
                  <p className="text-sm text-amber-800">
                    <strong>Important:</strong> Crypto prices are highly volatile. Always borrow less than the maximum allowed
                    to create a safety buffer against price fluctuations. Consider the liquidation price carefully when taking out a loan.
                  </p>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default CryptoLoanCalculator;
