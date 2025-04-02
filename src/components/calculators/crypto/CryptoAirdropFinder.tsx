
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Search, ExternalLink, Calendar, Gift, Clock, ArrowRight, Wallet, Shield, Info, AlertTriangle } from "lucide-react";

// Mock airdrop data (in a real app, this would come from an API)
const upcomingAirdrops = [
  {
    id: 1,
    name: "Arbitrum Odyssey",
    category: "L2",
    description: "Rewards for users of the Arbitrum L2 network completing weekly tasks.",
    eligibility: "Use Arbitrum network for specified tasks each week",
    status: "Active",
    endDate: "2023-12-31",
    estimatedValue: "$50-500",
    difficulty: "Medium",
    website: "https://arbitrum.io/",
    instructions: "Connect wallet to Arbitrum, complete weekly tasks posted on official Discord"
  },
  {
    id: 2,
    name: "ZKSync Era",
    category: "L2",
    description: "Potential airdrop for early users of the ZKSync Era network.",
    eligibility: "Users who interact with ZKSync Era mainnet",
    status: "Rumored",
    endDate: "Unknown",
    estimatedValue: "Unknown",
    difficulty: "Low",
    website: "https://zksync.io/",
    instructions: "Bridge assets to ZKSync Era, interact with protocols on ZKSync Era"
  },
  {
    id: 3,
    name: "Starknet Token",
    category: "L2",
    description: "Expected token distribution for Starknet users and developers.",
    eligibility: "Users of Starknet L2, developers, early testers",
    status: "Confirmed",
    endDate: "Q2 2023",
    estimatedValue: "$200-1000",
    difficulty: "Medium",
    website: "https://starknet.io/",
    instructions: "Deploy contracts, interact with Starknet protocols, participate in testnet"
  },
  {
    id: 4,
    name: "LayerZero Airdrop",
    category: "Infrastructure",
    description: "Possible airdrop for users of protocols built on LayerZero.",
    eligibility: "Users of Stargate Finance, other LayerZero apps",
    status: "Rumored",
    endDate: "Unknown",
    estimatedValue: "Unknown",
    difficulty: "Medium",
    website: "https://layerzero.network/",
    instructions: "Use Stargate Finance for cross-chain transfers, interact with LayerZero ecosystem apps"
  },
  {
    id: 5,
    name: "Scroll Airdrop",
    category: "L2",
    description: "Potential token distribution for early Scroll testnet participants.",
    eligibility: "Testnet users, developers, community members",
    status: "Rumored",
    endDate: "Unknown",
    estimatedValue: "Unknown",
    difficulty: "Medium",
    website: "https://scroll.io/",
    instructions: "Participate in testnet, deploy contracts, use Scroll Bridge"
  },
  {
    id: 6,
    name: "Celestia Token",
    category: "Infrastructure",
    description: "Expected token launch for the Celestia modular blockchain network.",
    eligibility: "Testnet validators, developers, community members",
    status: "Confirmed",
    endDate: "Q3 2023",
    estimatedValue: "Unknown",
    difficulty: "High",
    website: "https://celestia.org/",
    instructions: "Run a testnet validator node, participate in developer programs"
  },
  {
    id: 7,
    name: "Taiko Token",
    category: "L2",
    description: "Possible airdrop for Taiko's Type 1 ZK-Rollup testnet participants.",
    eligibility: "Early testnet users and contributors",
    status: "Rumored",
    endDate: "Unknown",
    estimatedValue: "Unknown",
    difficulty: "Medium",
    website: "https://taiko.xyz/",
    instructions: "Bridge assets to Taiko testnet, deploy contracts, use dApps in the ecosystem"
  },
  {
    id: 8,
    name: "Mode Network",
    category: "L2",
    description: "Ethereum L2 focused on building sustainable revenue for projects",
    eligibility: "Early users of Mode Network",
    status: "Confirmed",
    endDate: "2023-12-01",
    estimatedValue: "$100-300",
    difficulty: "Low",
    website: "https://www.mode.network/",
    instructions: "Bridge assets to Mode Network, interact with ecosystem dApps"
  }
];

const pastAirdrops = [
  {
    id: 101,
    name: "Arbitrum (ARB)",
    category: "L2",
    description: "Token distribution for early users of the Arbitrum L2 network.",
    eligibility: "Early users, developers, bridge users",
    status: "Completed",
    date: "March 23, 2023",
    estimatedValue: "$500-5000",
    criteria: "Multiple interactions with Arbitrum before specific snapshot dates",
    tokenPrice: "$1.12",
    totalValue: "$1.2B distributed"
  },
  {
    id: 102,
    name: "Optimism (OP)",
    category: "L2",
    description: "Token airdrop for early Optimism users and contributors.",
    eligibility: "Early users, DAO voters, donors",
    status: "Completed",
    date: "May 31, 2022",
    estimatedValue: "$400-25000",
    criteria: "Activity on Optimism, DAO participation, Gitcoin donations",
    tokenPrice: "$1.45",
    totalValue: "$250M distributed"
  },
  {
    id: 103,
    name: "dYdX (DYDX)",
    category: "DEX",
    description: "Token distribution for users of the dYdX decentralized exchange.",
    eligibility: "Platform traders, depositors",
    status: "Completed",
    date: "August 3, 2021",
    estimatedValue: "$1000-50000",
    criteria: "Trading volume, funds deposited",
    tokenPrice: "$10.28",
    totalValue: "$200M distributed"
  },
  {
    id: 104,
    name: "Uniswap (UNI)",
    category: "DEX",
    description: "Retroactive airdrop for users of the Uniswap decentralized exchange.",
    eligibility: "Users who interacted with Uniswap V1 or V2 before September 1, 2020",
    status: "Completed",
    date: "September 16, 2020",
    estimatedValue: "$1200 at launch",
    criteria: "Any interaction with Uniswap contracts",
    tokenPrice: "$2.94",
    totalValue: "$500M distributed"
  },
  {
    id: 105,
    name: "1inch (1INCH)",
    category: "DEX",
    description: "Token distribution for users of the 1inch DEX aggregator.",
    eligibility: "Users who made trades through 1inch",
    status: "Completed",
    date: "December 25, 2020",
    estimatedValue: "$700-10000",
    criteria: "Trading volume, number of trades",
    tokenPrice: "$1.20",
    totalValue: "$84M distributed"
  }
];

// Helper function to get status badge color
const getStatusColor = (status: string) => {
  switch (status) {
    case "Active": return "bg-green-100 text-green-800";
    case "Confirmed": return "bg-blue-100 text-blue-800";
    case "Rumored": return "bg-yellow-100 text-yellow-800";
    case "Completed": return "bg-gray-100 text-gray-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

// Helper function to get difficulty badge color
const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Low": return "bg-green-100 text-green-800";
    case "Medium": return "bg-yellow-100 text-yellow-800";
    case "High": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const CryptoAirdropFinder = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  
  // Filter upcoming airdrops
  const filteredUpcoming = upcomingAirdrops.filter(airdrop => {
    const matchesSearch = 
      airdrop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      airdrop.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || airdrop.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || airdrop.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  // Filter past airdrops
  const filteredPast = pastAirdrops.filter(airdrop => {
    const matchesSearch = 
      airdrop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      airdrop.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || airdrop.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Cryptocurrency Airdrop Finder</h2>
        <div className="flex items-center mt-2 md:mt-0 space-x-2">
          <Badge className="bg-blue-100 text-blue-800">
            Updated: {new Date().toLocaleDateString()}
          </Badge>
        </div>
      </div>
      
      <div className="bg-yellow-50 p-4 rounded-lg mb-6">
        <div className="flex items-start">
          <AlertTriangle className="text-yellow-600 h-5 w-5 mr-2 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-yellow-800">Important Security Notice</h3>
            <p className="text-xs text-yellow-700 mt-1">
              Always verify airdrop information through official project channels. Never connect to suspicious websites or share your seed phrase.
              Most legitimate airdrops don't require deposits or payments. Be cautious of scams posing as airdrops.
            </p>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Airdrops</TabsTrigger>
          <TabsTrigger value="past">Past Airdrops</TabsTrigger>
          <TabsTrigger value="guide">Airdrop Guide</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search airdrops..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant={selectedCategory === "all" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedCategory("all")}
              >
                All
              </Button>
              <Button 
                variant={selectedCategory === "L2" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedCategory("L2")}
              >
                L2
              </Button>
              <Button 
                variant={selectedCategory === "DEX" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedCategory("DEX")}
              >
                DEX
              </Button>
              <Button 
                variant={selectedCategory === "Infrastructure" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedCategory("Infrastructure")}
              >
                Infra
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant={selectedStatus === "all" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedStatus("all")}
              >
                All Status
              </Button>
              <Button 
                variant={selectedStatus === "Active" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedStatus("Active")}
              >
                Active
              </Button>
              <Button 
                variant={selectedStatus === "Confirmed" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedStatus("Confirmed")}
              >
                Confirmed
              </Button>
              <Button 
                variant={selectedStatus === "Rumored" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedStatus("Rumored")}
              >
                Rumored
              </Button>
            </div>
          </div>
          
          {filteredUpcoming.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No airdrops found matching your criteria. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredUpcoming.map(airdrop => (
                <Card key={airdrop.id} className="p-4">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{airdrop.name}</h3>
                        <Badge className={getStatusColor(airdrop.status)}>
                          {airdrop.status}
                        </Badge>
                        <Badge variant="outline">{airdrop.category}</Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4">{airdrop.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-blue-500" />
                          <div>
                            <p className="text-xs text-gray-500">End Date</p>
                            <p className="text-sm font-medium">{airdrop.endDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Gift className="h-4 w-4 text-green-500" />
                          <div>
                            <p className="text-xs text-gray-500">Estimated Value</p>
                            <p className="text-sm font-medium">{airdrop.estimatedValue}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-yellow-500" />
                          <div>
                            <p className="text-xs text-gray-500">Difficulty</p>
                            <p className="text-sm font-medium">
                              <Badge className={getDifficultyColor(airdrop.difficulty)}>
                                {airdrop.difficulty}
                              </Badge>
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm font-medium">Eligibility Criteria:</p>
                        <p className="text-sm text-gray-600">{airdrop.eligibility}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium">How to Participate:</p>
                        <p className="text-sm text-gray-600">{airdrop.instructions}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 md:ml-6 flex md:flex-col justify-end md:justify-start">
                      <a 
                        href={airdrop.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Official Website
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past" className="space-y-6">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search past airdrops..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Est. Value Range</TableHead>
                  <TableHead>Criteria</TableHead>
                  <TableHead>Token Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPast.map(airdrop => (
                  <TableRow key={airdrop.id}>
                    <TableCell className="font-medium">{airdrop.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{airdrop.category}</Badge>
                    </TableCell>
                    <TableCell>{airdrop.date}</TableCell>
                    <TableCell>{airdrop.estimatedValue}</TableCell>
                    <TableCell className="max-w-xs truncate" title={airdrop.criteria}>
                      {airdrop.criteria}
                    </TableCell>
                    <TableCell>{airdrop.tokenPrice}</TableCell>
                  </TableRow>
                ))}
                
                {filteredPast.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                      No results found. Try adjusting your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="guide" className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">What are Crypto Airdrops?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Cryptocurrency airdrops are free distributions of tokens or coins to wallet addresses, typically used as a 
              marketing strategy to increase awareness and adoption of a new cryptocurrency project. Projects may reward early users,
              participants in testnets, or community members with token airdrops.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-md font-medium mb-2">Types of Airdrops</h4>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
                  <li>
                    <span className="font-medium">Standard Airdrops:</span> Tokens distributed to existing holders of a specific cryptocurrency
                  </li>
                  <li>
                    <span className="font-medium">Bounty Airdrops:</span> Tokens given as rewards for completing tasks (social media promotion, bug reports, etc.)
                  </li>
                  <li>
                    <span className="font-medium">Exclusive Airdrops:</span> Tokens distributed to loyal users or early adopters
                  </li>
                  <li>
                    <span className="font-medium">Holder Airdrops:</span> Tokens given to holders of specific tokens in proportion to their holdings
                  </li>
                  <li>
                    <span className="font-medium">Retroactive Airdrops:</span> Tokens distributed to users who used a protocol before its token launch
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-md font-medium mb-2">How to Qualify</h4>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
                  <li>Use new blockchain networks and protocols early</li>
                  <li>Participate in testnet activities and provide feedback</li>
                  <li>Be active in project communities (Discord, Telegram)</li>
                  <li>Hold qualifying tokens or NFTs</li>
                  <li>Bridge assets to new networks</li>
                  <li>Provide liquidity to new DeFi protocols</li>
                  <li>Complete specific tasks required by projects</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Airdrop Hunting Strategy</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-blue-100 text-blue-800 h-6 w-6 rounded-full flex items-center justify-center font-medium text-sm">1</div>
                    <h4 className="font-medium">Create Separate Wallets</h4>
                  </div>
                  <p className="text-xs text-gray-600">
                    Use dedicated wallets for airdrop hunting to keep your main holdings secure.
                    Consider creating multiple wallets for different ecosystems (Ethereum, Solana, etc.)
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-blue-100 text-blue-800 h-6 w-6 rounded-full flex items-center justify-center font-medium text-sm">2</div>
                    <h4 className="font-medium">Focus on New Ecosystems</h4>
                  </div>
                  <p className="text-xs text-gray-600">
                    Prioritize interacting with promising new Layer 1s and Layer 2s.
                    Become an early user of protocols built on these new chains.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-blue-100 text-blue-800 h-6 w-6 rounded-full flex items-center justify-center font-medium text-sm">3</div>
                    <h4 className="font-medium">Natural Usage</h4>
                  </div>
                  <p className="text-xs text-gray-600">
                    Projects increasingly reward organic, natural usage instead of one-time interactions.
                    Use protocols regularly and in meaningful ways.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-blue-100 text-blue-800 h-6 w-6 rounded-full flex items-center justify-center font-medium text-sm">4</div>
                    <h4 className="font-medium">Monitor Announcements</h4>
                  </div>
                  <p className="text-xs text-gray-600">
                    Follow crypto news sources, Twitter accounts, and Discord channels for airdrop announcements.
                    Join community calls and AMAs for hints about future token launches.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-blue-100 text-blue-800 h-6 w-6 rounded-full flex items-center justify-center font-medium text-sm">5</div>
                    <h4 className="font-medium">Budget for Gas Fees</h4>
                  </div>
                  <p className="text-xs text-gray-600">
                    Set aside funds for network transaction fees.
                    Consider the potential ROI of your activities versus the cost of gas fees.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-blue-100 text-blue-800 h-6 w-6 rounded-full flex items-center justify-center font-medium text-sm">6</div>
                    <h4 className="font-medium">Be Consistent</h4>
                  </div>
                  <p className="text-xs text-gray-600">
                    Airdrop hunting is a long-term strategy with uncertain outcomes.
                    Stay persistent and diversify your interactions across multiple promising projects.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg mt-6">
              <h3 className="text-md font-medium mb-2 flex items-center gap-2">
                <AlertTriangle className="text-red-500 h-5 w-5" />
                Airdrop Safety Warnings
              </h3>
              <ul className="list-disc pl-5 text-sm text-red-700 space-y-1">
                <li>Never share your seed phrase or private keys</li>
                <li>Be suspicious of airdrops that require you to send cryptocurrency first</li>
                <li>Verify projects through official channels before participating</li>
                <li>Use hardware wallets when possible for added security</li>
                <li>Be wary of phishing attempts disguised as airdrop announcements</li>
                <li>Avoid connecting your wallet to suspicious websites</li>
                <li>Research token approval permissions before granting them</li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <Separator className="my-6" />
      
      <div className="text-sm text-gray-500">
        <p>
          Disclaimer: The information provided is for general informational purposes only and does not constitute investment advice.
          Cryptocurrency airdrops can involve risks, including security risks and potential tax implications. Research thoroughly before participating.
        </p>
      </div>
    </Card>
  );
};

export default CryptoAirdropFinder;
