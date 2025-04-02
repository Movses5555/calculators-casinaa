
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Calculator, Plus, Trash, RefreshCw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Bet {
  id: number;
  odds: string;
  oddsFormat: "decimal" | "american" | "fractional";
  convertedOdds: number;
}

const ParlayCalculator: React.FC = () => {
  const [stake, setStake] = useState<string>("100");
  const [bets, setBets] = useState<Bet[]>([
    { id: 1, odds: "2.00", oddsFormat: "decimal", convertedOdds: 2.00 },
    { id: 2, odds: "1.50", oddsFormat: "decimal", convertedOdds: 1.50 },
  ]);
  const [nextId, setNextId] = useState<number>(3);

  // Calculation results
  const totalOdds = bets.reduce((acc, bet) => acc * bet.convertedOdds, 1);
  const potentialWinnings = parseFloat(stake) * totalOdds;
  const potentialProfit = potentialWinnings - parseFloat(stake);
  const impliedProbability = (1 / totalOdds) * 100;

  const convertToDecimal = (odds: string, format: "decimal" | "american" | "fractional"): number => {
    switch (format) {
      case "decimal":
        return parseFloat(odds) || 1;
        
      case "american": {
        const americanOdds = parseInt(odds);
        if (isNaN(americanOdds)) return 1;
        
        if (americanOdds > 0) {
          return 1 + (americanOdds / 100);
        } else {
          return 1 + (100 / Math.abs(americanOdds));
        }
      }
        
      case "fractional": {
        if (!odds.includes('/')) return 1;
        
        const [numerator, denominator] = odds.split('/').map(Number);
        if (isNaN(numerator) || isNaN(denominator) || denominator === 0) return 1;
        
        return 1 + (numerator / denominator);
      }
        
      default:
        return 1;
    }
  };

  const handleAddBet = () => {
    setBets([...bets, { id: nextId, odds: "", oddsFormat: "decimal", convertedOdds: 1 }]);
    setNextId(nextId + 1);
  };

  const handleRemoveBet = (id: number) => {
    setBets(bets.filter(bet => bet.id !== id));
  };

  const handleOddsChange = (id: number, odds: string) => {
    setBets(bets.map(bet => {
      if (bet.id === id) {
        const updatedBet = { ...bet, odds };
        updatedBet.convertedOdds = convertToDecimal(odds, bet.oddsFormat);
        return updatedBet;
      }
      return bet;
    }));
  };

  const handleFormatChange = (id: number, format: "decimal" | "american" | "fractional") => {
    setBets(bets.map(bet => {
      if (bet.id === id) {
        const updatedBet = { ...bet, oddsFormat: format };
        updatedBet.convertedOdds = convertToDecimal(bet.odds, format);
        return updatedBet;
      }
      return bet;
    }));
  };

  const handleReset = () => {
    setBets([
      { id: 1, odds: "2.00", oddsFormat: "decimal", convertedOdds: 2.00 },
      { id: 2, odds: "1.50", oddsFormat: "decimal", convertedOdds: 1.50 },
    ]);
    setNextId(3);
    setStake("100");
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-6 w-6" />
            Parlay Calculator
          </CardTitle>
          <CardDescription>
            Calculate your potential winnings for multiple bets in a parlay
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Label htmlFor="stake">Stake Amount</Label>
              <div className="relative mt-1.5">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                <Input
                  id="stake"
                  type="number"
                  min="0.01"
                  step="0.01"
                  className="pl-7"
                  placeholder="Enter stake amount"
                  value={stake}
                  onChange={(e) => setStake(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Bets in Parlay</h3>
                <Button variant="outline" size="sm" onClick={handleAddBet}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Bet
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-14">Leg</TableHead>
                      <TableHead>Odds Format</TableHead>
                      <TableHead>Odds</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bets.map((bet, index) => (
                      <TableRow key={bet.id}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>
                          <Select
                            value={bet.oddsFormat}
                            onValueChange={(value: "decimal" | "american" | "fractional") => 
                              handleFormatChange(bet.id, value)
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="decimal">Decimal</SelectItem>
                              <SelectItem value="american">American</SelectItem>
                              <SelectItem value="fractional">Fractional</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            placeholder={bet.oddsFormat === "fractional" ? "e.g., 3/1" : "Enter odds"}
                            value={bet.odds}
                            onChange={(e) => handleOddsChange(bet.id, e.target.value)}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          {bets.length > 2 && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveBet(bet.id)}
                            >
                              <Trash className="h-4 w-4 text-red-500" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <Button variant="outline" onClick={handleReset} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset Calculator
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Parlay Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm font-medium">Total Parlay Odds</p>
              <p className="text-2xl font-bold">{totalOdds.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm font-medium">Implied Probability</p>
              <p className="text-2xl font-bold">{impliedProbability.toFixed(2)}%</p>
            </div>
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm font-medium">Potential Profit</p>
              <p className="text-2xl font-bold">${isNaN(potentialProfit) ? "0.00" : potentialProfit.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm font-medium">Potential Total Return</p>
              <p className="text-2xl font-bold">${isNaN(potentialWinnings) ? "0.00" : potentialWinnings.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>About Parlay Betting</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">What is a Parlay?</h3>
            <p className="text-sm">A parlay (also called accumulator or combo bet) combines multiple bets into one. All selections must win for the parlay to pay out.</p>
          </div>
          <div>
            <h3 className="font-medium">Higher Risk, Higher Reward</h3>
            <p className="text-sm">Parlays offer higher payouts than individual bets because they're more difficult to win. Each selection added increases both the potential payout and the risk.</p>
          </div>
          <div>
            <h3 className="font-medium">Calculating Parlay Odds</h3>
            <p className="text-sm">Parlay odds are calculated by multiplying the decimal odds of each selection. For example, combining bets with odds of 2.00 and 1.50 gives total odds of 3.00 (2.00 × 1.50).</p>
          </div>
          <div>
            <h3 className="font-medium">Correlated Parlays</h3>
            <p className="text-sm">Most sportsbooks don't allow parlays with correlated outcomes (events that are likely to happen together), as this would give bettors an advantage.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParlayCalculator;
