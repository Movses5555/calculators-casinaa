import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calculator, CheckCircle, AlertCircle, DollarSign, Percent } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

type BetType = {
  name: string;
  payout: string;
  winProbability: number;
  houseEdge: number;
};

const RouletteOddsCalculator: React.FC = () => {
  const [rouletteType, setRouletteType] = useState<'european' | 'american'>('european');
  const [betAmount, setBetAmount] = useState<string>('10');
  const [selectedBet, setSelectedBet] = useState<string>('straight');

  // Roulette bet types with their payouts and probabilities
  const europeanBets: Record<string, BetType> = {
    straight: { name: 'Straight Up (Single Number)', payout: '35 to 1', winProbability: 1/37, houseEdge: 2.70 },
    split: { name: 'Split (2 Numbers)', payout: '17 to 1', winProbability: 2/37, houseEdge: 2.70 },
    street: { name: 'Street (3 Numbers)', payout: '11 to 1', winProbability: 3/37, houseEdge: 2.70 },
    corner: { name: 'Corner (4 Numbers)', payout: '8 to 1', winProbability: 4/37, houseEdge: 2.70 },
    sixLine: { name: 'Six Line (6 Numbers)', payout: '5 to 1', winProbability: 6/37, houseEdge: 2.70 },
    column: { name: 'Column (12 Numbers)', payout: '2 to 1', winProbability: 12/37, houseEdge: 2.70 },
    dozen: { name: 'Dozen (12 Numbers)', payout: '2 to 1', winProbability: 12/37, houseEdge: 2.70 },
    red: { name: 'Red', payout: '1 to 1', winProbability: 18/37, houseEdge: 2.70 },
    black: { name: 'Black', payout: '1 to 1', winProbability: 18/37, houseEdge: 2.70 },
    even: { name: 'Even', payout: '1 to 1', winProbability: 18/37, houseEdge: 2.70 },
    odd: { name: 'Odd', payout: '1 to 1', winProbability: 18/37, houseEdge: 2.70 },
    high: { name: 'High (19-36)', payout: '1 to 1', winProbability: 18/37, houseEdge: 2.70 },
    low: { name: 'Low (1-18)', payout: '1 to 1', winProbability: 18/37, houseEdge: 2.70 },
  };

  const americanBets: Record<string, BetType> = {
    straight: { name: 'Straight Up (Single Number)', payout: '35 to 1', winProbability: 1/38, houseEdge: 5.26 },
    split: { name: 'Split (2 Numbers)', payout: '17 to 1', winProbability: 2/38, houseEdge: 5.26 },
    street: { name: 'Street (3 Numbers)', payout: '11 to 1', winProbability: 3/38, houseEdge: 5.26 },
    corner: { name: 'Corner (4 Numbers)', payout: '8 to 1', winProbability: 4/38, houseEdge: 5.26 },
    fiveNumber: { name: 'Five Number (0, 00, 1, 2, 3)', payout: '6 to 1', winProbability: 5/38, houseEdge: 7.89 },
    sixLine: { name: 'Six Line (6 Numbers)', payout: '5 to 1', winProbability: 6/38, houseEdge: 5.26 },
    column: { name: 'Column (12 Numbers)', payout: '2 to 1', winProbability: 12/38, houseEdge: 5.26 },
    dozen: { name: 'Dozen (12 Numbers)', payout: '2 to 1', winProbability: 12/38, houseEdge: 5.26 },
    red: { name: 'Red', payout: '1 to 1', winProbability: 18/38, houseEdge: 5.26 },
    black: { name: 'Black', payout: '1 to 1', winProbability: 18/38, houseEdge: 5.26 },
    even: { name: 'Even', payout: '1 to 1', winProbability: 18/38, houseEdge: 5.26 },
    odd: { name: 'Odd', payout: '1 to 1', winProbability: 18/38, houseEdge: 5.26 },
    high: { name: 'High (19-36)', payout: '1 to 1', winProbability: 18/38, houseEdge: 5.26 },
    low: { name: 'Low (1-18)', payout: '1 to 1', winProbability: 18/38, houseEdge: 5.26 },
  };

  const currentBets = rouletteType === 'european' ? europeanBets : americanBets;
  const currentBet = currentBets[selectedBet];

  const calculateOdds = () => {
    const amount = parseFloat(betAmount);
    
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Bet Amount",
        description: "Please enter a valid positive bet amount.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Calculation Complete",
      description: "Odds calculation has been updated.",
    });
  };

  const parsePayoutRatio = (payoutStr: string): number => {
    const [win, bet] = payoutStr.split(' to ').map(Number);
    return win / bet;
  };

  const calculateWinAmount = (amount: number, payoutRatio: number): number => {
    return amount * payoutRatio;
  };

  const amount = parseFloat(betAmount) || 0;
  const payoutRatio = parsePayoutRatio(currentBet.payout);
  const potentialWin = calculateWinAmount(amount, payoutRatio);
  const expectedValue = (currentBet.winProbability * potentialWin) - (amount * (1 - currentBet.winProbability));

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
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
              <Label htmlFor="bet-type" className="text-base">Bet Type</Label>
              <Select 
                value={selectedBet} 
                onValueChange={(value) => setSelectedBet(value)}
              >
                <SelectTrigger id="bet-type" className="w-full mt-2">
                  <SelectValue placeholder="Select bet type" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px] bg-white">
                  {Object.entries(currentBets).map(([key, bet]) => (
                    <SelectItem key={key} value={key}>{bet.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="bet-amount" className="text-base">Bet Amount</Label>
              <div className="relative mt-2">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="bet-amount"
                  type="number"
                  min="0"
                  step="1"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Button onClick={calculateOdds} className="w-full mt-4">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Odds
            </Button>
          </div>

          <div className="bg-slate-50 p-5 rounded-lg space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-purple-600" />
              Odds Results
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded border">
                <p className="text-sm text-gray-500">Potential Win</p>
                <p className="text-lg font-medium">${potentialWin.toFixed(2)}</p>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="text-sm text-gray-500">Win Probability</p>
                <p className="text-lg font-medium">{(currentBet.winProbability * 100).toFixed(2)}%</p>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="text-sm text-gray-500">Expected Value</p>
                <p className={`text-lg font-medium ${expectedValue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${expectedValue.toFixed(2)}
                </p>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="text-sm text-gray-500">House Edge</p>
                <p className="text-lg font-medium text-red-600">{currentBet.houseEdge.toFixed(2)}%</p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                <p className="text-sm text-amber-800">
                  The house edge means that for every $100 bet, you can expect to lose ${currentBet.houseEdge.toFixed(2)} over time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 overflow-hidden">
        <h3 className="text-lg font-semibold mb-4">Comparison of Roulette Bets</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Bet Type</TableHead>
                <TableHead>Payout</TableHead>
                <TableHead>Win Probability</TableHead>
                <TableHead>House Edge</TableHead>
                <TableHead>Expected Value (per $100)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.values(currentBets).map((bet, index) => {
                const evPer100 = -1 * bet.houseEdge;
                return (
                  <TableRow key={index} className={selectedBet === Object.keys(currentBets)[index] ? "bg-purple-50" : ""}>
                    <TableCell className="font-medium">{bet.name}</TableCell>
                    <TableCell>{bet.payout}</TableCell>
                    <TableCell>{(bet.winProbability * 100).toFixed(2)}%</TableCell>
                    <TableCell>{bet.houseEdge.toFixed(2)}%</TableCell>
                    <TableCell className="text-red-600">-${evPer100.toFixed(2)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Understanding Roulette Odds</h3>
        <div className="prose prose-slate max-w-none">
          <p>
            Roulette is a classic casino game where players bet on where a ball will land on a spinning wheel. 
            The odds vary between European roulette (single zero) and American roulette (double zero).
          </p>
          
          <h4 className="flex items-center mt-4">
            <Percent className="h-4 w-4 mr-2 text-purple-600" />
            How Odds Are Calculated
          </h4>
          
          <p>
            In European roulette, the wheel has 37 pockets (numbers 0-36), while American roulette has 38 pockets 
            (0, 00, and 1-36). The additional "00" in American roulette increases the house edge.
          </p>
          
          <p>
            The probability of winning a bet is calculated by dividing the number of ways to win by the total number 
            of possible outcomes. For example, a straight-up bet on a single number in European roulette has a 
            1/37 (2.70%) chance of winning.
          </p>
          
          <h4 className="flex items-center mt-4">
            <AlertCircle className="h-4 w-4 mr-2 text-purple-600" />
            House Edge Explained
          </h4>
          
          <p>
            The house edge is the percentage of each bet that the casino expects to keep over the long run. In European 
            roulette, the house edge is 2.70% for most bets, while in American roulette it's 5.26% (and 7.89% for the 
            five-number bet).
          </p>
          
          <p>
            This means that for every $100 wagered on European roulette, the player can expect to lose $2.70 on average, 
            while for American roulette, the expected loss is $5.26.
          </p>
          
          <h4 className="flex items-center mt-4">
            <CheckCircle className="h-4 w-4 mr-2 text-purple-600" />
            Best Bets in Roulette
          </h4>
          
          <p>
            All bets in European roulette have the same house edge of 2.70%, except for specialty bets. In American 
            roulette, most bets have a 5.26% house edge, but the five-number bet (0, 00, 1, 2, 3) has a higher house 
            edge of 7.89%, making it the worst bet on the table.
          </p>
          
          <p>
            For the best odds, choose European roulette over American roulette when possible, and avoid the five-number 
            bet in American roulette.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default RouletteOddsCalculator;
