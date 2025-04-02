
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calculator, Trash2, Plus, AlertCircle, ChartPie, Trophy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Player {
  id: number;
  name: string;
  chips: number;
  icmValue: number;
  equityPercentage: number;
}

interface Prize {
  position: number;
  amount: number;
  percentage: number;
}

const PokerICMCalculator: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: "Player 1", chips: 10000, icmValue: 0, equityPercentage: 0 },
    { id: 2, name: "Player 2", chips: 8000, icmValue: 0, equityPercentage: 0 },
    { id: 3, name: "Player 3", chips: 5000, icmValue: 0, equityPercentage: 0 }
  ]);
  
  const [prizes, setPrizes] = useState<Prize[]>([
    { position: 1, amount: 1000, percentage: 50 },
    { position: 2, amount: 600, percentage: 30 },
    { position: 3, amount: 400, percentage: 20 }
  ]);
  
  const [prizePool, setPrizePool] = useState<string>("2000");
  const [calculationMode, setCalculationMode] = useState<"amount" | "percentage">("amount");
  const [calculated, setCalculated] = useState<boolean>(false);
  
  const addPlayer = () => {
    const newId = players.length > 0 ? Math.max(...players.map(p => p.id)) + 1 : 1;
    setPlayers([...players, { 
      id: newId, 
      name: `Player ${newId}`, 
      chips: 5000, 
      icmValue: 0, 
      equityPercentage: 0 
    }]);
  };
  
  const removePlayer = (playerId: number) => {
    if (players.length <= 2) {
      toast({
        title: "Cannot Remove Player",
        description: "You need at least 2 players for ICM calculations.",
        variant: "destructive"
      });
      return;
    }
    
    setPlayers(players.filter(player => player.id !== playerId));
  };
  
  const updatePlayerName = (playerId: number, name: string) => {
    setPlayers(players.map(player => 
      player.id === playerId ? { ...player, name } : player
    ));
  };
  
  const updatePlayerChips = (playerId: number, chipsStr: string) => {
    const chips = parseInt(chipsStr, 10) || 0;
    setPlayers(players.map(player => 
      player.id === playerId ? { ...player, chips } : player
    ));
  };
  
  const addPrize = () => {
    const newPosition = prizes.length + 1;
    setPrizes([...prizes, { 
      position: newPosition, 
      amount: 200, 
      percentage: 10 
    }]);
  };
  
  const removePrize = (position: number) => {
    if (prizes.length <= 1) {
      toast({
        title: "Cannot Remove Prize",
        description: "You need at least 1 prize for ICM calculations.",
        variant: "destructive"
      });
      return;
    }
    
    const updatedPrizes = prizes.filter(prize => prize.position !== position)
      .map((prize, index) => ({ ...prize, position: index + 1 }));
    setPrizes(updatedPrizes);
  };
  
  const updatePrizeAmount = (position: number, amountStr: string) => {
    const amount = parseInt(amountStr, 10) || 0;
    setPrizes(prizes.map(prize => 
      prize.position === position ? { ...prize, amount } : prize
    ));
  };
  
  const updatePrizePercentage = (position: number, percentageStr: string) => {
    const percentage = parseFloat(percentageStr) || 0;
    setPrizes(prizes.map(prize => 
      prize.position === position ? { ...prize, percentage } : prize
    ));
  };
  
  const calculateICM = () => {
    const pool = parseFloat(prizePool) || 0;
    
    if (pool <= 0) {
      toast({
        title: "Invalid Prize Pool",
        description: "Please enter a valid prize pool amount greater than zero.",
        variant: "destructive"
      });
      return;
    }
    
    // Validate total percentage is 100% if using percentage mode
    if (calculationMode === "percentage") {
      const totalPercentage = prizes.reduce((sum, prize) => sum + prize.percentage, 0);
      if (Math.abs(totalPercentage - 100) > 0.01) {
        toast({
          title: "Invalid Prize Distribution",
          description: "The total prize distribution should equal 100%.",
          variant: "destructive"
        });
        return;
      }
    }
    
    // Calculate actual prize amounts if using percentage mode
    let actualPrizes: number[] = [];
    if (calculationMode === "percentage") {
      actualPrizes = prizes.map(prize => pool * (prize.percentage / 100));
    } else {
      // Ensure the sum of prize amounts equals the prize pool
      const totalPrizeAmount = prizes.reduce((sum, prize) => sum + prize.amount, 0);
      if (Math.abs(totalPrizeAmount - pool) > 0.01) {
        toast({
          title: "Prize Amounts Don't Match",
          description: `The sum of prize amounts ($${totalPrizeAmount}) does not match the prize pool ($${pool}).`,
          variant: "destructive"
        });
        return;
      }
      actualPrizes = prizes.map(prize => prize.amount);
    }
    
    const totalChips = players.reduce((sum, player) => sum + player.chips, 0);
    if (totalChips <= 0) {
      toast({
        title: "Invalid Chip Distribution",
        description: "Total chips must be greater than zero.",
        variant: "destructive"
      });
      return;
    }
    
    // Calculate ICM values
    const icmResults = calculateICMValues(
      players.map(p => p.chips),
      actualPrizes,
      totalChips
    );
    
    // Update players with ICM values
    const updatedPlayers = players.map((player, index) => ({
      ...player,
      icmValue: icmResults[index] * pool,
      equityPercentage: icmResults[index] * 100
    }));
    
    setPlayers(updatedPlayers);
    setCalculated(true);
    
    toast({
      title: "ICM Calculation Complete",
      description: "The ICM values have been calculated based on chip stacks and prize distribution."
    });
  };
  
  // Recursive ICM algorithm
  const calculateICMValues = (
    stacks: number[],
    payouts: number[],
    totalChips: number
  ): number[] => {
    const numPlayers = stacks.length;
    
    // Base case: if there's only one payout left, distribute proportionally
    if (payouts.length === 1) {
      return stacks.map(stack => (stack / totalChips) * payouts[0]);
    }
    
    // Calculate chance of each player finishing in first place
    const firstPlaceChances = stacks.map(stack => stack / totalChips);
    
    // For each player, calculate ICM value:
    // (Chance of 1st * 1st prize) + (ICM value of remaining players for remaining prizes)
    const icmValues: number[] = Array(numPlayers).fill(0);
    
    for (let i = 0; i < numPlayers; i++) {
      // Probability of winning first place * first prize
      icmValues[i] += firstPlaceChances[i] * payouts[0];
      
      // Calculate ICM for remaining scenarios (player didn't win first)
      if (payouts.length > 1) {
        // Create new stacks without current player
        const remainingStacks = [...stacks];
        remainingStacks.splice(i, 1);
        
        // Create remaining payouts (without first place)
        const remainingPayouts = payouts.slice(1);
        
        // Recursive call for remaining players and payouts
        const remainingTotal = totalChips - stacks[i];
        const remainingICM = calculateICMValues(remainingStacks, remainingPayouts, remainingTotal);
        
        // Add the ICM values for other places, weighted by probability of not winning first
        for (let j = 0, k = 0; j < numPlayers; j++) {
          if (j !== i) {
            icmValues[j] += firstPlaceChances[i] * remainingICM[k++];
          }
        }
      }
    }
    
    return icmValues;
  };
  
  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center">
              <ChartPie className="h-5 w-5 mr-2 text-amber-500" />
              Tournament Information
            </h3>
            
            <div>
              <Label htmlFor="prize-pool" className="text-base">Total Prize Pool</Label>
              <div className="relative mt-1">
                <Input
                  id="prize-pool"
                  type="number"
                  min="0"
                  step="100"
                  value={prizePool}
                  onChange={(e) => setPrizePool(e.target.value)}
                  className="pl-10"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Player Stacks</h4>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={addPlayer}
                  className="h-8"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Player
                </Button>
              </div>
              
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {players.map((player) => (
                  <div key={player.id} className="grid grid-cols-[1fr,auto] gap-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor={`player-name-${player.id}`} className="sr-only">Player Name</Label>
                        <Input
                          id={`player-name-${player.id}`}
                          placeholder="Player Name"
                          value={player.name}
                          onChange={(e) => updatePlayerName(player.id, e.target.value)}
                        />
                      </div>
                      <div className="relative">
                        <Label htmlFor={`player-chips-${player.id}`} className="sr-only">Chip Count</Label>
                        <Input
                          id={`player-chips-${player.id}`}
                          type="number"
                          placeholder="Chip Count"
                          value={player.chips}
                          onChange={(e) => updatePlayerChips(player.id, e.target.value)}
                        />
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removePlayer(player.id)}
                      className="px-2"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Prize Distribution</h4>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={addPrize}
                  className="h-8"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Position
                </Button>
              </div>
              
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {prizes.map((prize) => (
                  <div key={prize.position} className="grid grid-cols-[auto,1fr,1fr,auto] gap-2 items-center">
                    <div className="font-medium text-sm w-8 text-center">
                      {prize.position}.
                    </div>
                    
                    <div className="relative">
                      <Label htmlFor={`prize-amount-${prize.position}`} className="sr-only">Amount</Label>
                      <Input
                        id={`prize-amount-${prize.position}`}
                        type="number"
                        min="0"
                        placeholder="Amount"
                        value={prize.amount}
                        onChange={(e) => updatePrizeAmount(prize.position, e.target.value)}
                        className="pl-8"
                        disabled={calculationMode === "percentage"}
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <Label htmlFor={`prize-percentage-${prize.position}`} className="sr-only">Percentage</Label>
                      <Input
                        id={`prize-percentage-${prize.position}`}
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        placeholder="Percentage"
                        value={prize.percentage}
                        onChange={(e) => updatePrizePercentage(prize.position, e.target.value)}
                        className="pl-8"
                        disabled={calculationMode === "amount"}
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-gray-500">%</span>
                      </div>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removePrize(prize.position)}
                      className="px-2"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => setCalculationMode("amount")} variant={calculationMode === "amount" ? "default" : "outline"} className="flex-1">
                Use Prize Amounts
              </Button>
              <Button onClick={() => setCalculationMode("percentage")} variant={calculationMode === "percentage" ? "default" : "outline"} className="flex-1">
                Use Percentages
              </Button>
            </div>
            
            <Button onClick={calculateICM} className="w-full" size="lg">
              <Calculator className="h-5 w-5 mr-2" />
              Calculate ICM Values
            </Button>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-5 space-y-5">
            <h3 className="text-lg font-semibold flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-amber-500" />
              ICM Results
            </h3>
            
            {calculated ? (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Player</TableHead>
                      <TableHead className="text-right">Chips</TableHead>
                      <TableHead className="text-right">% of Total</TableHead>
                      <TableHead className="text-right">ICM Value</TableHead>
                      <TableHead className="text-right">ICM %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {players
                      .sort((a, b) => b.chips - a.chips)
                      .map(player => {
                        const totalChips = players.reduce((sum, p) => sum + p.chips, 0);
                        const chipPercentage = (player.chips / totalChips) * 100;
                        
                        return (
                          <TableRow key={player.id}>
                            <TableCell>{player.name}</TableCell>
                            <TableCell className="text-right">{player.chips.toLocaleString()}</TableCell>
                            <TableCell className="text-right">{chipPercentage.toFixed(1)}%</TableCell>
                            <TableCell className="text-right">${player.icmValue.toFixed(2)}</TableCell>
                            <TableCell className="text-right">{player.equityPercentage.toFixed(2)}%</TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
                
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">ICM vs. Chip Equity Difference</h4>
                  <div className="space-y-2">
                    {players
                      .sort((a, b) => b.chips - a.chips)
                      .map(player => {
                        const totalChips = players.reduce((sum, p) => sum + p.chips, 0);
                        const chipPercentage = (player.chips / totalChips) * 100;
                        const difference = player.equityPercentage - chipPercentage;
                        
                        return (
                          <div key={player.id} className="flex items-center text-sm">
                            <div className="w-24 truncate">{player.name}:</div>
                            <div className={`ml-2 ${difference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {difference >= 0 ? '+' : ''}{difference.toFixed(2)}%
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                  <div className="text-sm text-amber-800">
                    <p className="font-medium">No ICM values calculated yet</p>
                    <p className="mt-1">
                      Enter the tournament information and click "Calculate ICM Values" to see the results.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-white p-4 border rounded-md">
              <h4 className="text-sm font-medium mb-2">Understanding ICM</h4>
              <p className="text-sm text-gray-600">
                Independent Chip Model (ICM) calculates the "real money" value of your tournament chips by 
                considering your stack relative to others and the prize structure.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                ICM is especially important for making optimal decisions in "bubble" situations, where the 
                difference between cashing and not cashing is significant.
              </p>
            </div>
          </div>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Using ICM for Tournament Strategy</h3>
        <div className="prose prose-slate max-w-none">
          <p>
            The Independent Chip Model (ICM) is a mathematical model used in tournament poker to calculate the value 
            of a player's chips in terms of real money based on the tournament's prize structure.
          </p>
          
          <h4 className="mt-4 font-medium">When to Use ICM Calculations</h4>
          <ul>
            <li><strong>Final Table Play:</strong> When the payout jumps become significant.</li>
            <li><strong>Bubble Situations:</strong> When you're close to making the money.</li>
            <li><strong>Deal Making:</strong> When negotiating a final table deal.</li>
            <li><strong>Satellite Tournaments:</strong> Where all remaining prizes are of equal value.</li>
          </ul>
          
          <h4 className="mt-4 font-medium">Key ICM Concepts</h4>
          <p>
            <strong>Chip Utility:</strong> The value of tournament chips decreases as you accumulate more. 
            Doubling a small stack has more value than doubling a big stack.
          </p>
          <p>
            <strong>Risk Premium:</strong> In tournaments, you should demand a higher equity edge before calling 
            all-in than you would in a cash game, especially in bubble situations.
          </p>
          
          <h4 className="mt-4 font-medium">Practical Applications</h4>
          <ol>
            <li>
              <strong>Push/Fold Ranges:</strong> ICM calculations can help you determine optimal shoving ranges 
              when you're short-stacked.
            </li>
            <li>
              <strong>Calling Ranges:</strong> They also help you determine when to call all-ins from opponents, 
              especially when doing so puts your tournament life at risk.
            </li>
            <li>
              <strong>Deal Making:</strong> Use ICM to ensure you're getting a fair shake in any deal negotiations.
            </li>
          </ol>
          
          <div className="bg-blue-50 p-4 rounded-md border border-blue-200 my-4">
            <h4 className="text-blue-800 font-medium">Example Scenario</h4>
            <p className="text-blue-800 text-sm">
              Imagine a 3-player Sit & Go with prizes of $50, $30, and $20. If all players have equal stacks, they each 
              have 33.3% of the chips, but their ICM equity is not $33.33 each. The ICM equity would be approximately 
              $36, $33, and $31, showing how the first place premium affects real money equity.
            </p>
          </div>
          
          <p>
            Remember that while ICM is a powerful tool, it has limitations. It doesn't account for skill edges, table 
            dynamics, or the meta-game. Use it as a guide, but also trust your poker instincts and adjust based on specific 
            situations.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default PokerICMCalculator;
