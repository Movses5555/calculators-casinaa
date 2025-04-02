
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { LineChartIcon, Wallet, BarChart3, Zap, Clock, InfoIcon, ExternalLink, ArrowUpRight } from "lucide-react";

// Mock data for gas prices (in a real app, this would come from an API)
const ethereumGasData = [
  { priority: "Low", gwei: 25, usd: 1.25, estimatedTime: "5-10 min" },
  { priority: "Medium", gwei: 35, usd: 1.75, estimatedTime: "2-5 min" },
  { priority: "High", gwei: 50, usd: 2.5, estimatedTime: "< 2 min" },
  { priority: "Urgent", gwei: 100, usd: 5.0, estimatedTime: "< 30 sec" }
];

const polygonGasData = [
  { priority: "Low", gwei: 50, usd: 0.05, estimatedTime: "5-10 min" },
  { priority: "Medium", gwei: 80, usd: 0.08, estimatedTime: "2-5 min" },
  { priority: "High", gwei: 120, usd: 0.12, estimatedTime: "< 2 min" },
  { priority: "Urgent", gwei: 200, usd: 0.20, estimatedTime: "< 30 sec" }
];

const arbitrumGasData = [
  { priority: "Low", gwei: 0.1, usd: 0.25, estimatedTime: "5-10 min" },
  { priority: "Medium", gwei: 0.15, usd: 0.35, estimatedTime: "2-5 min" },
  { priority: "High", gwei: 0.25, usd: 0.55, estimatedTime: "< 2 min" },
  { priority: "Urgent", gwei: 0.5, usd: 1.1, estimatedTime: "< 30 sec" }
];

const optimismGasData = [
  { priority: "Low", gwei: 0.05, usd: 0.15, estimatedTime: "5-10 min" },
  { priority: "Medium", gwei: 0.1, usd: 0.3, estimatedTime: "2-5 min" },
  { priority: "High", gwei: 0.2, usd: 0.6, estimatedTime: "< 2 min" },
  { priority: "Urgent", gwei: 0.4, usd: 1.2, estimatedTime: "< 30 sec" }
];

// Mock historical data
const historicalGasData = [
  { time: "00:00", ethereum: 25, polygon: 45, arbitrum: 0.1, optimism: 0.05 },
  { time: "06:00", ethereum: 30, polygon: 60, arbitrum: 0.12, optimism: 0.08 },
  { time: "12:00", ethereum: 45, polygon: 85, arbitrum: 0.18, optimism: 0.12 },
  { time: "18:00", ethereum: 38, polygon: 70, arbitrum: 0.15, optimism: 0.1 },
  { time: "00:00", ethereum: 28, polygon: 55, arbitrum: 0.11, optimism: 0.07 },
  { time: "06:00", ethereum: 32, polygon: 65, arbitrum: 0.13, optimism: 0.09 },
  { time: "12:00", ethereum: 50, polygon: 90, arbitrum: 0.2, optimism: 0.15 },
  { time: "18:00", ethereum: 40, polygon: 75, arbitrum: 0.16, optimism: 0.11 },
  { time: "00:00", ethereum: 35, polygon: 60, arbitrum: 0.14, optimism: 0.08 }
];

// Common transaction types and their gas estimates
const transactionTypes = [
  { name: "ETH Transfer", ethereum: 21000, polygon: 21000, arbitrum: 21000, optimism: 21000 },
  { name: "ERC-20 Transfer", ethereum: 65000, polygon: 65000, arbitrum: 65000, optimism: 65000 },
  { name: "Swap on DEX", ethereum: 180000, polygon: 180000, arbitrum: 180000, optimism: 180000 },
  { name: "NFT Mint", ethereum: 150000, polygon: 150000, arbitrum: 150000, optimism: 150000 },
  { name: "NFT Transfer", ethereum: 85000, polygon: 85000, arbitrum: 85000, optimism: 85000 },
  { name: "Add Liquidity", ethereum: 250000, polygon: 250000, arbitrum: 250000, optimism: 250000 }
];

const GasFeeTracker = () => {
  const [activeNetwork, setActiveNetwork] = useState("ethereum");
  const [transactionType, setTransactionType] = useState("ETH Transfer");
  const [customGasLimit, setCustomGasLimit] = useState("21000");
  const [estimatedCosts, setEstimatedCosts] = useState<{[key: string]: number}>({});

  // Get gas data for the active network
  const getActiveGasData = () => {
    switch (activeNetwork) {
      case "ethereum": return ethereumGasData;
      case "polygon": return polygonGasData;
      case "arbitrum": return arbitrumGasData;
      case "optimism": return optimismGasData;
      default: return ethereumGasData;
    }
  };

  // Calculate estimated costs when inputs change
  useEffect(() => {
    const gasLimit = Number(customGasLimit);
    if (!isNaN(gasLimit) && gasLimit > 0) {
      const gasData = getActiveGasData();
      const costs = {};
      
      gasData.forEach(data => {
        costs[data.priority.toLowerCase()] = (data.gwei * gasLimit / 1000000000) * 1800; // Assuming ETH price of $1800
      });
      
      setEstimatedCosts(costs);
    }
  }, [customGasLimit, activeNetwork]);

  // Update gas limit when transaction type changes
  useEffect(() => {
    const txType = transactionTypes.find(t => t.name === transactionType);
    if (txType) {
      setCustomGasLimit(txType[activeNetwork as keyof typeof txType].toString());
    }
  }, [transactionType, activeNetwork]);

  // Render network color badge
  const renderNetworkBadge = (network: string) => {
    const colors = {
      ethereum: "bg-blue-100 text-blue-800",
      polygon: "bg-purple-100 text-purple-800",
      arbitrum: "bg-blue-100 text-blue-800",
      optimism: "bg-red-100 text-red-800"
    };
    
    return (
      <Badge className={colors[network as keyof typeof colors]}>
        {network.charAt(0).toUpperCase() + network.slice(1)}
      </Badge>
    );
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Blockchain Gas Fee Tracker</h2>
        <div className="flex items-center mt-2 md:mt-0 space-x-2">
          <Select value={activeNetwork} onValueChange={setActiveNetwork}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Select network" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ethereum">Ethereum</SelectItem>
              <SelectItem value="polygon">Polygon</SelectItem>
              <SelectItem value="arbitrum">Arbitrum</SelectItem>
              <SelectItem value="optimism">Optimism</SelectItem>
            </SelectContent>
          </Select>
          {renderNetworkBadge(activeNetwork)}
        </div>
      </div>
      
      <Tabs defaultValue="current" className="space-y-6">
        <TabsList>
          <TabsTrigger value="current">Current Gas Prices</TabsTrigger>
          <TabsTrigger value="calculator">Gas Calculator</TabsTrigger>
          <TabsTrigger value="historical">Historical Chart</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current" className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-lg font-medium mb-2">
              <Zap className="text-yellow-500" />
              <h3>Live Gas Prices for {activeNetwork.charAt(0).toUpperCase() + activeNetwork.slice(1)}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Gas prices update approximately every 15 seconds. Last updated: {new Date().toLocaleTimeString()}
            </p>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Priority</TableHead>
                  <TableHead>Gas Price (Gwei)</TableHead>
                  <TableHead>Est. Cost (USD)</TableHead>
                  <TableHead>Est. Wait Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getActiveGasData().map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Badge variant={data.priority === "Low" ? "outline" : 
                              data.priority === "Medium" ? "secondary" : 
                              data.priority === "High" ? "default" : 
                              "destructive"}>
                        {data.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{data.gwei}</TableCell>
                    <TableCell>${data.usd.toFixed(2)}</TableCell>
                    <TableCell>{data.estimatedTime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-md font-medium mb-2 flex items-center gap-2">
                <InfoIcon className="h-4 w-4" />
                What is Gas?
              </h3>
              <p className="text-sm text-gray-600">
                Gas is the fee required to perform a transaction or execute a contract on a blockchain network.
                Fees are paid in the network's native cryptocurrency and are used to compensate miners or validators
                who process and validate transactions.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-md font-medium mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                When to Transact?
              </h3>
              <p className="text-sm text-gray-600">
                Gas prices are typically lowest during weekends and off-peak hours (late night/early morning in US/Europe time zones).
                For non-urgent transactions, consider scheduling them during these periods to save on fees.
              </p>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 mt-4">
            <p className="flex items-center gap-1">
              <ExternalLink className="h-4 w-4" />
              For real-time gas data, you can also check:
              <a href="https://etherscan.io/gastracker" className="text-blue-600 hover:underline flex items-center" target="_blank" rel="noopener noreferrer">
                Etherscan Gas Tracker
                <ArrowUpRight className="h-3 w-3 ml-1" />
              </a>
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="calculator" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="transaction-type">Transaction Type</Label>
                <Select value={transactionType} onValueChange={setTransactionType}>
                  <SelectTrigger id="transaction-type" className="mt-1">
                    <SelectValue placeholder="Select transaction type" />
                  </SelectTrigger>
                  <SelectContent>
                    {transactionTypes.map((type, index) => (
                      <SelectItem key={index} value={type.name}>{type.name}</SelectItem>
                    ))}
                    <SelectItem value="custom">Custom Gas Limit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="gas-limit">Gas Limit</Label>
                <Input
                  id="gas-limit"
                  type="number"
                  value={customGasLimit}
                  onChange={(e) => setCustomGasLimit(e.target.value)}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Gas limit represents the maximum amount of computational work required for your transaction.
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium mb-2">Network Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Network:</span>
                    <span className="font-medium">{activeNetwork.charAt(0).toUpperCase() + activeNetwork.slice(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Base Fee:</span>
                    <span className="font-medium">{getActiveGasData()[1].gwei} Gwei</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Network Load:</span>
                    <span className="font-medium">
                      {getActiveGasData()[1].gwei > getActiveGasData()[0].gwei * 1.5 ? "High" : "Normal"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-md font-medium mb-4">Estimated Transaction Cost</h3>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Priority</TableHead>
                    <TableHead>Gas Price</TableHead>
                    <TableHead>Est. Cost</TableHead>
                    <TableHead>Wait Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getActiveGasData().map((data, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Badge variant={data.priority === "Low" ? "outline" : 
                                data.priority === "Medium" ? "secondary" : 
                                data.priority === "High" ? "default" : 
                                "destructive"}>
                          {data.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{data.gwei} Gwei</TableCell>
                      <TableCell>
                        ${((data.gwei * Number(customGasLimit) / 1000000000) * 1800).toFixed(4)}
                      </TableCell>
                      <TableCell>{data.estimatedTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200 text-sm text-yellow-800">
                <div className="flex items-start">
                  <InfoIcon className="h-4 w-4 mt-0.5 mr-2" />
                  <p>
                    These estimates are based on current network conditions and may vary. The actual gas used might be 
                    less than the gas limit you set, but you'll be charged for the full gas limit as a safety measure.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mt-4">
            <h3 className="text-md font-medium mb-2">Gas Saving Tips</h3>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>Use Layer 2 solutions like Arbitrum or Optimism for lower fees</li>
              <li>Batch multiple transactions together when possible</li>
              <li>Consider using gas-efficient smart contracts and dApps</li>
              <li>For non-urgent transactions, wait for periods of low network congestion</li>
              <li>Some wallets offer gas fee optimizations - explore these options in your wallet settings</li>
            </ul>
          </div>
        </TabsContent>
        
        <TabsContent value="historical" className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="flex items-center gap-2 text-lg font-medium mb-2">
              <BarChart3 className="text-blue-500" />
              Historical Gas Price Trends
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Gas prices over the last 48 hours across major networks
            </p>
            
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={historicalGasData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis label={{ value: 'Gas Price (Gwei)', angle: -90, position: 'insideLeft' }} />
                  <RechartsTooltip />
                  <Line 
                    type="monotone" 
                    dataKey={activeNetwork} 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-md font-medium mb-2 flex items-center gap-2">
                <LineChartIcon className="h-4 w-4" />
                Gas Price Patterns
              </h3>
              <p className="text-sm text-gray-600">
                Gas prices tend to follow predictable patterns. They are usually highest during peak trading hours
                in Asian, European, and American markets. NFT drops, major token launches, and market volatility 
                can cause unexpected spikes.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-md font-medium mb-2 flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Compare Networks
              </h3>
              <p className="text-sm text-gray-600">
                Layer 2 solutions like Arbitrum and Optimism, as well as sidechains like Polygon, offer significantly 
                lower gas fees compared to Ethereum mainnet, making them ideal for smaller transactions and frequent traders.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default GasFeeTracker;
