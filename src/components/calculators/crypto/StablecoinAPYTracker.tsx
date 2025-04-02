
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import { Search, RefreshCw, Info, ArrowUpRight, Percent, Shield, AlertTriangle, TrendingUp } from "lucide-react";

// Mock stablecoin yield data (in a real app, this would come from an API)
const stablecoinData = [
  // CeFi Platforms
  { 
    coin: "USDC", 
    platform: "Nexo", 
    apy: 8.0, 
    type: "CeFi", 
    lockupPeriod: "30 days", 
    minDeposit: "$100",
    riskLevel: "Medium",
    notes: "Higher rates available with Nexo tokens"
  },
  { 
    coin: "USDT", 
    platform: "Nexo", 
    apy: 8.0, 
    type: "CeFi", 
    lockupPeriod: "30 days", 
    minDeposit: "$100",
    riskLevel: "Medium",
    notes: "Higher rates available with Nexo tokens"
  },
  { 
    coin: "USDC", 
    platform: "BlockFi", 
    apy: 4.5, 
    type: "CeFi", 
    lockupPeriod: "None", 
    minDeposit: "$10",
    riskLevel: "Medium",
    notes: "Rate drops after $40k balance"
  },
  { 
    coin: "DAI", 
    platform: "BlockFi", 
    apy: 4.0, 
    type: "CeFi", 
    lockupPeriod: "None", 
    minDeposit: "$10",
    riskLevel: "Medium",
    notes: "Rate drops after $40k balance"
  },
  { 
    coin: "USDC", 
    platform: "Celsius", 
    apy: 7.1, 
    type: "CeFi", 
    lockupPeriod: "None", 
    minDeposit: "$1",
    riskLevel: "Medium",
    notes: "Higher rates for CEL token holders"
  },
  { 
    coin: "BUSD", 
    platform: "Binance", 
    apy: 6.0, 
    type: "CeFi", 
    lockupPeriod: "90 days", 
    minDeposit: "$100",
    riskLevel: "Low-Medium",
    notes: "Flexible options available at lower rates"
  },
  
  // DeFi Platforms
  { 
    coin: "USDC", 
    platform: "Aave", 
    apy: 1.8, 
    type: "DeFi", 
    lockupPeriod: "None", 
    minDeposit: "Gas fees only",
    riskLevel: "Low",
    notes: "Non-custodial lending protocol"
  },
  { 
    coin: "DAI", 
    platform: "Aave", 
    apy: 2.1, 
    type: "DeFi", 
    lockupPeriod: "None", 
    minDeposit: "Gas fees only",
    riskLevel: "Low",
    notes: "Non-custodial lending protocol"
  },
  { 
    coin: "USDT", 
    platform: "Aave", 
    apy: 1.9, 
    type: "DeFi", 
    lockupPeriod: "None", 
    minDeposit: "Gas fees only",
    riskLevel: "Low",
    notes: "Non-custodial lending protocol"
  },
  { 
    coin: "USDC", 
    platform: "Compound", 
    apy: 1.6, 
    type: "DeFi", 
    lockupPeriod: "None", 
    minDeposit: "Gas fees only",
    riskLevel: "Low",
    notes: "Earn additional COMP tokens"
  },
  { 
    coin: "DAI", 
    platform: "Compound", 
    apy: 1.9, 
    type: "DeFi", 
    lockupPeriod: "None", 
    minDeposit: "Gas fees only",
    riskLevel: "Low",
    notes: "Earn additional COMP tokens"
  },
  { 
    coin: "USDC", 
    platform: "Curve", 
    apy: 3.8, 
    type: "DeFi", 
    lockupPeriod: "None", 
    minDeposit: "Gas fees only",
    riskLevel: "Low-Medium",
    notes: "Liquidity pool returns + CRV rewards"
  },
  { 
    coin: "DAI", 
    platform: "Curve", 
    apy: 3.7, 
    type: "DeFi", 
    lockupPeriod: "None", 
    minDeposit: "Gas fees only",
    riskLevel: "Low-Medium",
    notes: "Liquidity pool returns + CRV rewards"
  },
  { 
    coin: "USDT", 
    platform: "Curve", 
    apy: 3.6, 
    type: "DeFi", 
    lockupPeriod: "None", 
    minDeposit: "Gas fees only",
    riskLevel: "Low-Medium",
    notes: "Liquidity pool returns + CRV rewards"
  },
  { 
    coin: "USDC", 
    platform: "Yearn Finance", 
    apy: 9.2, 
    type: "DeFi", 
    lockupPeriod: "None", 
    minDeposit: "Gas fees only",
    riskLevel: "Medium",
    notes: "Yield optimization protocol"
  },
  { 
    coin: "DAI", 
    platform: "Yearn Finance", 
    apy: 8.5, 
    type: "DeFi", 
    lockupPeriod: "None", 
    minDeposit: "Gas fees only",
    riskLevel: "Medium",
    notes: "Yield optimization protocol"
  },
  
  // DEX Liquidity Mining
  { 
    coin: "USDC", 
    platform: "Uniswap", 
    apy: 15.3, 
    type: "LP", 
    lockupPeriod: "None", 
    minDeposit: "Gas fees only",
    riskLevel: "High",
    notes: "USDC-ETH pair, impermanent loss risk"
  },
  { 
    coin: "DAI", 
    platform: "SushiSwap", 
    apy: 18.7, 
    type: "LP", 
    lockupPeriod: "None", 
    minDeposit: "Gas fees only",
    riskLevel: "High",
    notes: "DAI-ETH pair, earn SUSHI tokens, impermanent loss risk"
  },
  { 
    coin: "USDT", 
    platform: "PancakeSwap", 
    apy: 12.5, 
    type: "LP", 
    lockupPeriod: "None", 
    minDeposit: "Gas fees only",
    riskLevel: "High",
    notes: "USDT-BNB pair on BSC, earn CAKE tokens, impermanent loss risk"
  }
];

// Chart data for APY comparisons
const getChartData = (filter: string) => {
  let filteredData = stablecoinData;
  
  if (filter === "USDC") {
    filteredData = stablecoinData.filter(item => item.coin === "USDC");
  } else if (filter === "DAI") {
    filteredData = stablecoinData.filter(item => item.coin === "DAI");
  } else if (filter === "USDT") {
    filteredData = stablecoinData.filter(item => item.coin === "USDT");
  }
  
  return filteredData.map(item => ({
    platform: item.platform,
    apy: item.apy,
    type: item.type
  }));
};

// Risk level color mapping
const getRiskColor = (risk: string) => {
  switch (risk) {
    case "Low": return "bg-green-100 text-green-800";
    case "Low-Medium": return "bg-blue-100 text-blue-800";
    case "Medium": return "bg-yellow-100 text-yellow-800";
    case "High": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const StablecoinAPYTracker = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCoin, setSelectedCoin] = useState("all");
  const [investmentAmount, setInvestmentAmount] = useState(10000);
  const [sortBy, setSortBy] = useState("apy");
  const [sortDirection, setSortDirection] = useState("desc");
  
  // Filter and sort data
  const filteredData = stablecoinData.filter(item => {
    const matchesCoin = selectedCoin === "all" || item.coin === selectedCoin;
    const matchesSearch = 
      item.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.coin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCoin && matchesSearch;
  }).sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortBy as keyof typeof a] > b[sortBy as keyof typeof b] ? 1 : -1;
    } else {
      return a[sortBy as keyof typeof a] < b[sortBy as keyof typeof b] ? 1 : -1;
    }
  });
  
  // Toggle sort direction
  const toggleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("desc");
    }
  };
  
  // Calculate annual yield based on investment amount
  const calculateYield = (apy: number) => {
    return (investmentAmount * apy / 100).toFixed(2);
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Stablecoin APY Tracker</h2>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <RefreshCw size={14} />
            Last Updated: {new Date().toLocaleDateString()}
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="rates" className="space-y-6">
        <TabsList>
          <TabsTrigger value="rates">Current Rates</TabsTrigger>
          <TabsTrigger value="compare">Compare</TabsTrigger>
          <TabsTrigger value="calculator">Yield Calculator</TabsTrigger>
        </TabsList>
        
        <TabsContent value="rates" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search by platform or coin..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant={selectedCoin === "all" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedCoin("all")}
              >
                All
              </Button>
              <Button 
                variant={selectedCoin === "USDC" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedCoin("USDC")}
              >
                USDC
              </Button>
              <Button 
                variant={selectedCoin === "USDT" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedCoin("USDT")}
              >
                USDT
              </Button>
              <Button 
                variant={selectedCoin === "DAI" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedCoin("DAI")}
              >
                DAI
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => toggleSort("coin")}
                  >
                    Coin
                    {sortBy === "coin" && (
                      <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                    )}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => toggleSort("platform")}
                  >
                    Platform
                    {sortBy === "platform" && (
                      <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                    )}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => toggleSort("apy")}
                  >
                    APY
                    {sortBy === "apy" && (
                      <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                    )}
                  </TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Lockup Period</TableHead>
                  <TableHead>Min. Deposit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.coin}</TableCell>
                    <TableCell>{item.platform}</TableCell>
                    <TableCell className="font-bold text-green-600">{item.apy}%</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {item.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRiskColor(item.riskLevel)}>
                        {item.riskLevel}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.lockupPeriod}</TableCell>
                    <TableCell>{item.minDeposit}</TableCell>
                  </TableRow>
                ))}
                
                {filteredData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                      No results found. Try adjusting your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-md flex">
              <Info className="text-blue-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-blue-800">What are stablecoins?</h3>
                <p className="text-xs text-blue-600 mt-1">
                  Stablecoins are cryptocurrencies designed to minimize price volatility by pegging their value to a stable asset, 
                  like the US dollar. Popular stablecoins include USDC, USDT (Tether), and DAI.
                </p>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-md flex">
              <Percent className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-green-800">What is APY?</h3>
                <p className="text-xs text-green-600 mt-1">
                  Annual Percentage Yield (APY) represents the yearly return on your investment, including compound interest. 
                  Higher APY means better returns, but usually comes with increased risk.
                </p>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-md flex">
              <Shield className="text-yellow-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">Consider the risks</h3>
                <p className="text-xs text-yellow-600 mt-1">
                  Higher yields often come with higher risks. CeFi platforms have counterparty risk, while DeFi protocols may have 
                  smart contract risks. LP positions face impermanent loss risk.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="compare" className="space-y-6">
          <div className="flex justify-center mb-4">
            <div className="flex gap-2">
              <Button 
                variant={selectedCoin === "all" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedCoin("all")}
              >
                All Coins
              </Button>
              <Button 
                variant={selectedCoin === "USDC" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedCoin("USDC")}
              >
                USDC Only
              </Button>
              <Button 
                variant={selectedCoin === "USDT" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedCoin("USDT")}
              >
                USDT Only
              </Button>
              <Button 
                variant={selectedCoin === "DAI" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedCoin("DAI")}
              >
                DAI Only
              </Button>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4">APY Comparison Chart</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getChartData(selectedCoin)}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="platform" 
                    angle={-45}
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis 
                    label={{ value: 'APY (%)', angle: -90, position: 'insideLeft' }}
                  />
                  <RechartsTooltip 
                    formatter={(value) => [`${value}%`, 'APY']}
                  />
                  <Legend />
                  <Bar 
                    dataKey="apy" 
                    name="Annual Percentage Yield" 
                    fill="#10b981" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-sm font-medium mb-2">CeFi vs DeFi</h3>
              <p className="text-xs text-gray-600">
                Centralized Finance (CeFi) platforms like Nexo and BlockFi often offer higher base APYs but require trusting 
                the platform with custody of your funds. Decentralized Finance (DeFi) platforms like Aave and Compound are 
                non-custodial but may have lower base yields and higher gas fees.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-sm font-medium mb-2">Liquidity Pool (LP) Rewards</h3>
              <p className="text-xs text-gray-600">
                Providing liquidity on decentralized exchanges like Uniswap typically offers the highest APYs, but comes with 
                impermanent loss risk when paired with volatile assets. These rates often include governance token rewards that 
                may fluctuate in value.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-sm font-medium mb-2">Rate Fluctuations</h3>
              <p className="text-xs text-gray-600">
                Stablecoin yields vary based on market demand for loans and liquidity. Rates can change frequently, especially in 
                DeFi. High yields are often temporary promotional rates or involve additional risks. Always research before committing large amounts.
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="calculator" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="investment-amount">Investment Amount ($)</Label>
                <Input
                  id="investment-amount"
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-md font-medium mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  How much can you earn?
                </h3>
                <p className="text-sm text-blue-600">
                  Compare potential earnings based on your investment amount across different platforms.
                  The calculator shows simplified annual returns before any taxes or fees.
                </p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-md font-medium mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  Important Considerations
                </h3>
                <ul className="text-xs text-yellow-600 space-y-1 list-disc pl-4">
                  <li>These rates are subject to change and represent current offers</li>
                  <li>Higher APYs usually come with higher risk profiles</li>
                  <li>Some platforms have tiered rates based on deposit amount</li>
                  <li>Consider gas fees for DeFi platforms, especially for smaller amounts</li>
                  <li>Research platform security and insurance policies before investing</li>
                </ul>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Platform</TableHead>
                    <TableHead>Coin</TableHead>
                    <TableHead>APY</TableHead>
                    <TableHead>Annual Yield</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stablecoinData
                    .sort((a, b) => b.apy - a.apy)
                    .slice(0, 10)
                    .map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.platform}</TableCell>
                        <TableCell>{item.coin}</TableCell>
                        <TableCell className="font-bold text-green-600">{item.apy}%</TableCell>
                        <TableCell className="font-bold">${calculateYield(item.apy)}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Investment Strategy Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Diversify Across Platforms</h4>
                <p className="text-xs text-gray-600">
                  Spread your stablecoin investments across multiple platforms to minimize risk. 
                  Consider allocating a portion to lower-risk options like Aave or Compound, with smaller allocations to higher-yield options.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Consider Gas Costs</h4>
                <p className="text-xs text-gray-600">
                  For smaller investments, high Ethereum gas fees can significantly impact returns on DeFi platforms.
                  Consider CeFi platforms or Layer 2 solutions for smaller amounts.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Watch for Promotional Rates</h4>
                <p className="text-xs text-gray-600">
                  Many platforms offer temporary high rates to attract new users. Be prepared to move funds when promotional periods end.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Consider Lock-up Periods</h4>
                <p className="text-xs text-gray-600">
                  Higher APYs often require locking your funds for a set period. Ensure you won't need immediate access to these funds.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 pt-4 border-t text-sm text-gray-500">
        <p>
          Disclaimer: Rates are collected from public sources and may not be up-to-date. Always verify current rates directly with the platform 
          before making investment decisions. This tool is for informational purposes only and does not constitute financial advice.
        </p>
      </div>
    </Card>
  );
};

export default StablecoinAPYTracker;
