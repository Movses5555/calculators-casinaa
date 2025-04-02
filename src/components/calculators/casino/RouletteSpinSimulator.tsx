
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dices, RotateCcw, Loader2, ArrowRight, Calculator, PieChart, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

type RouletteNumber = {
  number: number;
  color: 'red' | 'black' | 'green';
};

type BetResult = {
  betType: string;
  wins: number;
  losses: number;
  winRate: number;
  netProfit: number;
};

const RouletteSpinSimulator: React.FC = () => {
  const [rouletteType, setRouletteType] = useState<'european' | 'american'>('european');
  const [numberOfSpins, setNumberOfSpins] = useState<string>('100');
  const [betAmount, setBetAmount] = useState<string>('10');
  const [selectedBet, setSelectedBet] = useState<string>('red');
  const [simulationResults, setSimulationResults] = useState<RouletteNumber[]>([]);
  const [betResults, setBetResults] = useState<BetResult[]>([]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [showDetailedResults, setShowDetailedResults] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  
  // European roulette has numbers 0-36
  const europeanWheel: RouletteNumber[] = [
    { number: 0, color: 'green' },
    { number: 32, color: 'red' }, { number: 15, color: 'black' }, { number: 19, color: 'red' }, { number: 4, color: 'black' },
    { number: 21, color: 'red' }, { number: 2, color: 'black' }, { number: 25, color: 'red' }, { number: 17, color: 'black' },
    { number: 34, color: 'red' }, { number: 6, color: 'black' }, { number: 27, color: 'red' }, { number: 13, color: 'black' },
    { number: 36, color: 'red' }, { number: 11, color: 'black' }, { number: 30, color: 'red' }, { number: 8, color: 'black' },
    { number: 23, color: 'red' }, { number: 10, color: 'black' }, { number: 5, color: 'red' }, { number: 24, color: 'black' },
    { number: 16, color: 'red' }, { number: 33, color: 'black' }, { number: 1, color: 'red' }, { number: 20, color: 'black' },
    { number: 14, color: 'red' }, { number: 31, color: 'black' }, { number: 9, color: 'red' }, { number: 22, color: 'black' },
    { number: 18, color: 'red' }, { number: 29, color: 'black' }, { number: 7, color: 'red' }, { number: 28, color: 'black' },
    { number: 12, color: 'red' }, { number: 35, color: 'black' }, { number: 3, color: 'red' }, { number: 26, color: 'black' }
  ];
  
  // American roulette adds 00
  const americanWheel: RouletteNumber[] = [
    { number: 0, color: 'green' }, { number: -1, color: 'green' }, // Using -1 to represent 00
    { number: 28, color: 'black' }, { number: 9, color: 'red' }, { number: 26, color: 'black' }, { number: 30, color: 'red' },
    { number: 11, color: 'black' }, { number: 7, color: 'red' }, { number: 20, color: 'black' }, { number: 32, color: 'red' },
    { number: 17, color: 'black' }, { number: 5, color: 'red' }, { number: 22, color: 'black' }, { number: 34, color: 'red' },
    { number: 15, color: 'black' }, { number: 3, color: 'red' }, { number: 24, color: 'black' }, { number: 36, color: 'red' },
    { number: 13, color: 'black' }, { number: 1, color: 'red' }, { number: 27, color: 'black' }, { number: 10, color: 'red' },
    { number: 25, color: 'black' }, { number: 29, color: 'red' }, { number: 12, color: 'black' }, { number: 8, color: 'red' },
    { number: 19, color: 'black' }, { number: 31, color: 'red' }, { number: 18, color: 'black' }, { number: 6, color: 'red' },
    { number: 21, color: 'black' }, { number: 33, color: 'red' }, { number: 16, color: 'black' }, { number: 4, color: 'red' },
    { number: 23, color: 'black' }, { number: 35, color: 'red' }, { number: 14, color: 'black' }, { number: 2, color: 'red' }
  ];
  
  const currentWheel = rouletteType === 'european' ? europeanWheel : americanWheel;
  
  const betTypes = [
    { id: 'red', name: 'Red', payout: 1, description: 'Bet on any red number' },
    { id: 'black', name: 'Black', payout: 1, description: 'Bet on any black number' },
    { id: 'even', name: 'Even', payout: 1, description: 'Bet on any even number (except 0/00)' },
    { id: 'odd', name: 'Odd', payout: 1, description: 'Bet on any odd number (except 0/00)' },
    { id: 'low', name: 'Low (1-18)', payout: 1, description: 'Bet on numbers 1 through 18' },
    { id: 'high', name: 'High (19-36)', payout: 1, description: 'Bet on numbers 19 through 36' },
    { id: 'dozen1', name: 'First Dozen (1-12)', payout: 2, description: 'Bet on numbers 1 through 12' },
    { id: 'dozen2', name: 'Second Dozen (13-24)', payout: 2, description: 'Bet on numbers 13 through 24' },
    { id: 'dozen3', name: 'Third Dozen (25-36)', payout: 2, description: 'Bet on numbers 25 through 36' },
    { id: 'column1', name: 'First Column', payout: 2, description: 'Bet on numbers 1, 4, 7, etc.' },
    { id: 'column2', name: 'Second Column', payout: 2, description: 'Bet on numbers 2, 5, 8, etc.' },
    { id: 'column3', name: 'Third Column', payout: 2, description: 'Bet on numbers 3, 6, 9, etc.' },
    { id: 'straight', name: 'Straight Up (Single Number)', payout: 35, description: 'Bet on any single number' }
  ];
  
  const currentBet = betTypes.find(bet => bet.id === selectedBet) || betTypes[0];
  
  const isBetWinner = (result: RouletteNumber, betType: string): boolean => {
    const num = result.number;
    
    switch (betType) {
      case 'red': return result.color === 'red';
      case 'black': return result.color === 'black';
      case 'even': return num !== 0 && num !== -1 && num % 2 === 0;
      case 'odd': return num !== 0 && num !== -1 && num % 2 === 1;
      case 'low': return num >= 1 && num <= 18;
      case 'high': return num >= 19 && num <= 36;
      case 'dozen1': return num >= 1 && num <= 12;
      case 'dozen2': return num >= 13 && num <= 24;
      case 'dozen3': return num >= 25 && num <= 36;
      case 'column1': return num >= 1 && num <= 36 && (num - 1) % 3 === 0;
      case 'column2': return num >= 1 && num <= 36 && (num - 2) % 3 === 0;
      case 'column3': return num >= 1 && num <= 36 && num % 3 === 0;
      case 'straight': return num === 17; // For simplicity, we're betting on 17
      default: return false;
    }
  };
  
  const simulateSpins = async () => {
    const spins = parseInt(numberOfSpins);
    const bet = parseFloat(betAmount);
    
    if (isNaN(spins) || spins <= 0 || isNaN(bet) || bet <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid positive numbers for spins and bet amount.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSimulating(true);
    setProgress(0);
    setSimulationResults([]);
    
    const results: RouletteNumber[] = [];
    const betStats: Record<string, { wins: number; losses: number; netProfit: number }> = {};
    
    // Initialize bet stats
    betTypes.forEach(bet => {
      betStats[bet.id] = { wins: 0, losses: 0, netProfit: 0 };
    });
    
    // Run simulation in batches to avoid UI freezing
    const batchSize = 100;
    const totalBatches = Math.ceil(spins / batchSize);
    
    for (let batch = 0; batch < totalBatches; batch++) {
      const batchLimit = Math.min(batchSize, spins - (batch * batchSize));
      
      await new Promise<void>(resolve => {
        setTimeout(() => {
          for (let i = 0; i < batchLimit; i++) {
            // Random spin result
            const result = currentWheel[Math.floor(Math.random() * currentWheel.length)];
            results.push(result);
            
            // Calculate bet outcomes for all bet types
            betTypes.forEach(betType => {
              const isWin = isBetWinner(result, betType.id);
              if (isWin) {
                betStats[betType.id].wins++;
                betStats[betType.id].netProfit += bet * betType.payout;
              } else {
                betStats[betType.id].losses++;
                betStats[betType.id].netProfit -= bet;
              }
            });
          }
          
          setProgress(Math.min(((batch + 1) * 100) / totalBatches, 100));
          resolve();
        }, 0);
      });
    }
    
    // Convert bet stats to result format
    const betResultsArray = betTypes.map(betType => {
      const stats = betStats[betType.id];
      return {
        betType: betType.name,
        wins: stats.wins,
        losses: stats.losses,
        winRate: stats.wins / spins,
        netProfit: stats.netProfit
      };
    });
    
    setSimulationResults(results);
    setBetResults(betResultsArray);
    setIsSimulating(false);
    
    toast({
      title: "Simulation Complete",
      description: `Simulated ${spins} spins successfully!`,
    });
  };
  
  // Count occurrences of each number in the results
  const getNumberCounts = () => {
    const counts: Record<string, number> = {};
    
    simulationResults.forEach(result => {
      const key = result.number === -1 ? '00' : result.number.toString();
      counts[key] = (counts[key] || 0) + 1;
    });
    
    return counts;
  };
  
  // Count occurrences of each color in the results
  const getColorCounts = () => {
    const counts: Record<string, number> = { red: 0, black: 0, green: 0 };
    
    simulationResults.forEach(result => {
      counts[result.color] = (counts[result.color] || 0) + 1;
    });
    
    return counts;
  };
  
  // Get top 5 most frequent numbers
  const getHotNumbers = () => {
    const counts = getNumberCounts();
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([num, count]) => ({ number: num, count }));
  };
  
  // Get bottom 5 least frequent numbers
  const getColdNumbers = () => {
    const counts = getNumberCounts();
    return Object.entries(counts)
      .sort((a, b) => a[1] - b[1])
      .slice(0, 5)
      .map(([num, count]) => ({ number: num, count }));
  };
  
  const numberCounts = getNumberCounts();
  const colorCounts = getColorCounts();
  const hotNumbers = getHotNumbers();
  const coldNumbers = getColdNumbers();
  
  // Reset simulation
  const resetSimulation = () => {
    setSimulationResults([]);
    setBetResults([]);
    setProgress(0);
  };
  
  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Dices className="mr-2 h-5 w-5 text-purple-600" />
              Roulette Spin Simulator
            </h3>
            
            <div>
              <Label htmlFor="roulette-type" className="text-base">Roulette Type</Label>
              <Select 
                value={rouletteType} 
                onValueChange={(value: 'european' | 'american') => setRouletteType(value)}
              >
                <SelectTrigger id="roulette-type" className="w-full mt-2">
                  <SelectValue placeholder="Select roulette type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="european">European Roulette (Single Zero)</SelectItem>
                  <SelectItem value="american">American Roulette (Double Zero)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="number-of-spins" className="text-base">Number of Spins</Label>
              <Input
                id="number-of-spins"
                type="number"
                min="1"
                step="100"
                value={numberOfSpins}
                onChange={(e) => setNumberOfSpins(e.target.value)}
                className="mt-2"
              />
              <p className="text-xs text-gray-500 mt-1">Higher numbers provide more accurate results but take longer to simulate</p>
            </div>

            <div>
              <Label htmlFor="bet-amount" className="text-base">Bet Amount ($)</Label>
              <Input
                id="bet-amount"
                type="number"
                min="1"
                step="1"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="bet-type" className="text-base">Bet Type to Highlight</Label>
              <Select 
                value={selectedBet} 
                onValueChange={setSelectedBet}
              >
                <SelectTrigger id="bet-type" className="w-full mt-2">
                  <SelectValue placeholder="Select bet type" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px] bg-white">
                  {betTypes.map((bet) => (
                    <SelectItem key={bet.id} value={bet.id}>{bet.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-1">Results for all bets will be calculated, this just highlights one</p>
            </div>
            
            <div className="pt-2 flex flex-col gap-4">
              <Button 
                onClick={simulateSpins} 
                disabled={isSimulating}
                className="w-full"
              >
                {isSimulating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Simulating...
                  </>
                ) : (
                  <>
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Run Simulation
                  </>
                )}
              </Button>
              
              {simulationResults.length > 0 && (
                <Button 
                  onClick={resetSimulation} 
                  variant="outline"
                  className="w-full"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset Simulation
                </Button>
              )}
            </div>
            
            {isSimulating && (
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Simulating spins...</p>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </div>
          
          <div className="bg-slate-50 p-5 rounded-lg">
            {simulationResults.length > 0 ? (
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center">
                  <Calculator className="h-5 w-5 mr-2 text-purple-600" />
                  Simulation Results
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded border">
                    <p className="text-sm text-gray-500">Total Spins</p>
                    <p className="text-lg font-medium">{simulationResults.length}</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="text-sm text-gray-500">Red/Black/Green Ratio</p>
                    <p className="text-lg font-medium">
                      <span className="text-red-600">{colorCounts.red}</span> / <span className="text-slate-800">{colorCounts.black}</span> / <span className="text-green-600">{colorCounts.green}</span>
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded border">
                    <p className="text-sm text-gray-500">Hot Numbers</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {hotNumbers.map((item) => (
                        <span key={item.number} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">
                          {item.number}: {item.count}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="text-sm text-gray-500">Cold Numbers</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {coldNumbers.map((item) => (
                        <span key={item.number} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {item.number}: {item.count}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium text-gray-700">Selected Bet Performance: {currentBet.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Show All Results</span>
                      <Switch 
                        checked={showDetailedResults} 
                        onCheckedChange={setShowDetailedResults} 
                      />
                    </div>
                  </div>
                  
                  {betResults.length > 0 && (
                    <div>
                      {showDetailedResults ? (
                        <div className="max-h-[300px] overflow-y-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Bet Type</TableHead>
                                <TableHead>Win Rate</TableHead>
                                <TableHead>Net Profit</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {betResults.map((result, index) => (
                                <TableRow key={index} className={result.betType === currentBet.name ? "bg-purple-50" : ""}>
                                  <TableCell className="font-medium">{result.betType}</TableCell>
                                  <TableCell>{(result.winRate * 100).toFixed(2)}%</TableCell>
                                  <TableCell className={result.netProfit >= 0 ? "text-green-600" : "text-red-600"}>
                                    {result.netProfit >= 0 ? "+" : ""}{result.netProfit.toFixed(2)}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <div>
                          {betResults.filter(r => r.betType === currentBet.name).map((result, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Win Rate:</span>
                                <span className="font-medium">{(result.winRate * 100).toFixed(2)}%</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Wins/Losses:</span>
                                <span className="font-medium">{result.wins}/{result.losses}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Net Profit:</span>
                                <span className={`font-medium ${result.netProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
                                  {result.netProfit >= 0 ? "+" : ""}${result.netProfit.toFixed(2)}
                                </span>
                              </div>
                              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${result.netProfit >= 0 ? "bg-green-500" : "bg-red-500"} rounded-full`}
                                  style={{ width: `${Math.min(Math.abs(result.netProfit) / (parseFloat(betAmount) * parseInt(numberOfSpins)) * 100, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-amber-800">
                      <p className="font-medium">About These Results:</p>
                      <p className="mt-1">
                        This simulator provides statistical data based on random number generation. 
                        While it gives insights into expected outcomes, actual casino results may vary. 
                        In the long run, the house always has an edge in roulette.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-8">
                <PieChart className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-gray-500 text-center">Run a simulation to see results here.</p>
                <p className="text-gray-400 text-sm text-center mt-2">
                  You'll be able to view statistics, hot/cold numbers, and bet performance.
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">About Roulette Spin Simulation</h3>
        <div className="prose prose-slate max-w-none">
          <p>
            The Roulette Spin Simulator allows you to virtually simulate thousands of roulette spins to analyze 
            outcomes, test betting strategies, and understand the long-term mathematical expectation of different bets.
          </p>
          
          <h4 className="mt-4 font-medium">How It Works</h4>
          <p>
            This simulator uses a cryptographically secure random number generator to simulate spins on either a 
            European wheel (37 pockets: 0-36) or an American wheel (38 pockets: 0, 00, 1-36). It then tracks and 
            analyzes the outcomes, calculating win rates and expected profits for various betting strategies.
          </p>
          
          <h4 className="mt-4 font-medium">Understanding the Results</h4>
          <ul>
            <li><strong>Hot Numbers:</strong> Numbers that appeared most frequently in the simulation</li>
            <li><strong>Cold Numbers:</strong> Numbers that appeared least frequently in the simulation</li>
            <li><strong>Win Rate:</strong> Percentage of spins where a particular bet would have won</li>
            <li><strong>Net Profit:</strong> Total profit or loss for consistently making a particular bet throughout the simulation</li>
          </ul>
          
          <h4 className="mt-4 font-medium">House Edge in Roulette</h4>
          <p>
            The house edge in roulette comes from the 0 (and 00 in American roulette):
          </p>
          <ul>
            <li><strong>European Roulette:</strong> 2.70% house edge</li>
            <li><strong>American Roulette:</strong> 5.26% house edge</li>
          </ul>
          
          <p>
            This means that for every $100 bet, a player can expect to lose $2.70 on a European wheel or $5.26 on an 
            American wheel over the long run. The simulation results should reflect this mathematical reality when run 
            with a large enough sample size.
          </p>
          
          <div className="bg-purple-50 border border-purple-200 rounded-md p-4 mt-4">
            <h4 className="font-medium text-purple-800 flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              Important Note About Randomness
            </h4>
            <p className="text-purple-800 text-sm">
              No matter what patterns may appear in short-term results, each spin in real roulette is completely 
              independent of previous spins. "Hot" or "cold" numbers have no predictive value for future spins. 
              The simulator helps demonstrate this principle - with enough spins, all numbers will approach the 
              same frequency.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RouletteSpinSimulator;
