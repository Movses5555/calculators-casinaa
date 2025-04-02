
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calculator, DollarSign, Info, AlertCircle, Dice5 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

type BetType = {
  name: string;
  payout: string;
  houseEdge: number;
  description: string;
  winCondition: string;
};

const CrapsPayoutCalculator: React.FC = () => {
  const [betType, setBetType] = useState<string>('passLine');
  const [betAmount, setBetAmount] = useState<string>('10');
  
  const betTypes: Record<string, BetType> = {
    passLine: { 
      name: 'Pass Line', 
      payout: '1 to 1', 
      houseEdge: 1.41, 
      description: 'One of the most common bets. Bet on the shooter winning.',
      winCondition: 'Win on 7 or 11 on come out roll. Lose on 2, 3, or 12. If any other number rolls, it becomes the point and you win if that number is rolled again before a 7.'
    },
    dontPass: { 
      name: 'Don\'t Pass', 
      payout: '1 to 1', 
      houseEdge: 1.36, 
      description: 'The opposite of Pass Line. Bet against the shooter.',
      winCondition: 'Win on 2 or 3 on come out roll. Lose on 7 or 11. 12 is typically a push. If a point is established, you win if 7 comes before the point.'
    },
    come: { 
      name: 'Come', 
      payout: '1 to 1', 
      houseEdge: 1.41, 
      description: 'Like a Pass Line bet, but made after the come out roll.',
      winCondition: 'Same as Pass Line, but can be made at any time after a point is established.'
    },
    dontCome: { 
      name: 'Don\'t Come', 
      payout: '1 to 1', 
      houseEdge: 1.36, 
      description: 'Like a Don\'t Pass bet, but made after the come out roll.',
      winCondition: 'Same as Don\'t Pass, but can be made at any time after a point is established.'
    },
    place4or10: { 
      name: 'Place 4 or 10', 
      payout: '9 to 5', 
      houseEdge: 6.67, 
      description: 'Bet that 4 or 10 will be rolled before a 7.',
      winCondition: 'Win if 4 or 10 (whichever you bet on) is rolled before a 7. Lose if 7 is rolled before your number.'
    },
    place5or9: { 
      name: 'Place 5 or 9', 
      payout: '7 to 5', 
      houseEdge: 4.00, 
      description: 'Bet that 5 or 9 will be rolled before a 7.',
      winCondition: 'Win if 5 or 9 (whichever you bet on) is rolled before a 7. Lose if 7 is rolled before your number.'
    },
    place6or8: { 
      name: 'Place 6 or 8', 
      payout: '7 to 6', 
      houseEdge: 1.52, 
      description: 'Bet that 6 or 8 will be rolled before a 7.',
      winCondition: 'Win if 6 or 8 (whichever you bet on) is rolled before a 7. Lose if 7 is rolled before your number.'
    },
    field: { 
      name: 'Field', 
      payout: '1 to 1 (2 and 12 pay more)', 
      houseEdge: 5.56, 
      description: 'One-roll bet that covers numbers 2, 3, 4, 9, 10, 11, 12.',
      winCondition: 'Win if next roll is 2, 3, 4, 9, 10, 11, or 12. Typically 2 pays 2:1 and 12 pays 3:1. Lose on 5, 6, 7, or 8.'
    },
    anyCraps: { 
      name: 'Any Craps', 
      payout: '7 to 1', 
      houseEdge: 11.11, 
      description: 'One-roll bet that next roll will be 2, 3, or 12.',
      winCondition: 'Win if next roll is 2, 3, or 12. Lose on any other number.'
    },
    any7: { 
      name: 'Any 7', 
      payout: '4 to 1', 
      houseEdge: 16.67, 
      description: 'One-roll bet that next roll will be 7.',
      winCondition: 'Win if next roll is 7. Lose on any other number.'
    },
    hardway4: { 
      name: 'Hard 4', 
      payout: '7 to 1', 
      houseEdge: 11.11, 
      description: 'Bet that 4 will be rolled as a pair of 2s before a 7 or any other 4.',
      winCondition: 'Win if a pair of 2s is rolled before a 7 or an "easy" 4 (3-1).'
    },
    hardway6: { 
      name: 'Hard 6', 
      payout: '9 to 1', 
      houseEdge: 9.09, 
      description: 'Bet that 6 will be rolled as a pair of 3s before a 7 or any other 6.',
      winCondition: 'Win if a pair of 3s is rolled before a 7 or an "easy" 6 (5-1, 4-2).'
    },
    hardway8: { 
      name: 'Hard 8', 
      payout: '9 to 1', 
      houseEdge: 9.09, 
      description: 'Bet that 8 will be rolled as a pair of 4s before a 7 or any other 8.',
      winCondition: 'Win if a pair of 4s is rolled before a 7 or an "easy" 8 (6-2, 5-3).'
    },
    hardway10: { 
      name: 'Hard 10', 
      payout: '7 to 1', 
      houseEdge: 11.11, 
      description: 'Bet that 10 will be rolled as a pair of 5s before a 7 or any other 10.',
      winCondition: 'Win if a pair of 5s is rolled before a 7 or an "easy" 10 (6-4).'
    },
    hornBet: { 
      name: 'Horn Bet', 
      payout: 'Varies', 
      houseEdge: 12.50, 
      description: 'One-roll bet split equally among 2, 3, 11, and 12.',
      winCondition: 'Win if next roll is 2, 3, 11, or 12. Lose on any other number. Payout depends on which of these numbers is rolled.'
    },
    aceDeuce: { 
      name: 'Ace Deuce (3)', 
      payout: '15 to 1', 
      houseEdge: 11.11, 
      description: 'One-roll bet that next roll will be 3.',
      winCondition: 'Win if next roll is 3. Lose on any other number.'
    },
    yoEleven: { 
      name: 'Yo (11)', 
      payout: '15 to 1', 
      houseEdge: 11.11, 
      description: 'One-roll bet that next roll will be 11.',
      winCondition: 'Win if next roll is 11. Lose on any other number.'
    },
    bigRed: { 
      name: 'Big Red (7)', 
      payout: '4 to 1', 
      houseEdge: 16.67, 
      description: 'One-roll bet that next roll will be 7.',
      winCondition: 'Win if next roll is 7. Lose on any other number. Same as Any 7.'
    },
  };

  const currentBet = betTypes[betType];

  const calculatePayout = () => {
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
      title: "Payout Calculated",
      description: `Your potential win on a ${currentBet.name} bet is $${calculateWinAmount(amount, currentBet.payout).toFixed(2)}`,
    });
  };

  const parsePayoutRatio = (payoutStr: string): number => {
    if (payoutStr === 'Varies') return 0;
    
    const [win, bet] = payoutStr.split(' to ').map(Number);
    return win / bet;
  };

  const calculateWinAmount = (amount: number, payoutStr: string): number => {
    if (payoutStr === 'Varies') {
      return amount * 0.8;
    }
    
    const payoutRatio = parsePayoutRatio(payoutStr);
    return amount * payoutRatio;
  };

  const amount = parseFloat(betAmount) || 0;
  const winAmount = calculateWinAmount(amount, currentBet.payout);
  
  const isHornBet = betType === 'hornBet';
  const hornLowWin = isHornBet ? amount * 3 : null;
  const hornHighWin = isHornBet ? amount * 4 : null;

  const expectedValuePercent = -currentBet.houseEdge;
  const expectedValue = (amount * expectedValuePercent) / 100;

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="bet-type" className="text-base">Craps Bet Type</Label>
              <Select 
                value={betType} 
                onValueChange={(value) => setBetType(value)}
              >
                <SelectTrigger id="bet-type" className="w-full mt-2">
                  <SelectValue placeholder="Select bet type" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px] bg-white">
                  {Object.entries(betTypes).map(([key, bet]) => (
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

            <Button onClick={calculatePayout} className="w-full mt-4">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Payout
            </Button>
          </div>

          <div className="bg-slate-50 p-5 rounded-lg space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Dice5 className="mr-2 h-5 w-5 text-red-600" />
              Payout Results
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm text-gray-500">Bet Type</p>
                  <p className="text-lg font-medium">{currentBet.name}</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm text-gray-500">Payout Ratio</p>
                  <p className="text-lg font-medium">{currentBet.payout}</p>
                </div>
                
                {isHornBet ? (
                  <>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm text-gray-500">Win on 3 or 11</p>
                      <p className="text-lg font-medium">${hornLowWin?.toFixed(2)}</p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm text-gray-500">Win on 2 or 12</p>
                      <p className="text-lg font-medium">${hornHighWin?.toFixed(2)}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm text-gray-500">Potential Win</p>
                      <p className="text-lg font-medium">${winAmount.toFixed(2)}</p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm text-gray-500">Total Return</p>
                      <p className="text-lg font-medium">${(amount + winAmount).toFixed(2)}</p>
                    </div>
                  </>
                )}
                
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm text-gray-500">House Edge</p>
                  <p className="text-lg font-medium text-red-600">{currentBet.houseEdge.toFixed(2)}%</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm text-gray-500">Expected Value</p>
                  <p className="text-lg font-medium text-red-600">-${Math.abs(expectedValue).toFixed(2)}</p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                <h4 className="font-medium text-amber-800 flex items-center">
                  <Info className="h-4 w-4 mr-2" />
                  Win Condition
                </h4>
                <p className="text-amber-800 text-sm mt-1">{currentBet.winCondition}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 overflow-hidden">
        <h3 className="text-lg font-semibold mb-4">Craps Bets Comparison</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Bet Type</TableHead>
                <TableHead>Payout</TableHead>
                <TableHead>House Edge</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(betTypes).map(([key, bet]) => (
                <TableRow key={key} className={betType === key ? "bg-red-50" : ""}>
                  <TableCell className="font-medium">{bet.name}</TableCell>
                  <TableCell>{bet.payout}</TableCell>
                  <TableCell>{bet.houseEdge.toFixed(2)}%</TableCell>
                  <TableCell className="max-w-md">{bet.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Understanding Craps Bets</h3>
        <div className="prose prose-slate max-w-none">
          <p>
            Craps is a dice game where players bet on the outcome of the roll, or a series of rolls, of a pair of dice.
            The game offers a wide variety of bets with different payouts and house edges.
          </p>
          
          <h4 className="flex items-center mt-4">
            <Dice5 className="h-4 w-4 mr-2 text-red-600" />
            Basic Gameplay
          </h4>
          
          <p>
            Craps is played in rounds. The first roll in a round is called the "come out roll." Based on this roll, the game
            either ends immediately or continues with the shooter trying to roll a specific number (the "point") before rolling a 7.
          </p>
          
          <h4 className="flex items-center mt-4">
            <Info className="h-4 w-4 mr-2 text-red-600" />
            Best Bets in Craps
          </h4>
          
          <p>
            The Pass Line, Don't Pass, Come, and Don't Come bets have the lowest house edge in craps, followed by the Place 6 or 8 bet. 
            These bets provide the best value for players.
          </p>
          
          <p>
            One-roll proposition bets like Any 7, Any Craps, or Hardway bets have much higher house edges and generally should be avoided 
            by players seeking to optimize their chances.
          </p>
          
          <h4 className="flex items-center mt-4">
            <AlertCircle className="h-4 w-4 mr-2 text-red-600" />
            Understanding House Edge
          </h4>
          
          <p>
            The house edge represents the casino's mathematical advantage. For example, a house edge of 1.41% means that 
            for every $100 wagered, the casino expects to keep $1.41 on average over the long run.
          </p>
          
          <p>
            Craps offers some of the best odds in the casino, particularly with Pass Line and Don't Pass bets, especially when 
            combined with free odds bets (which have no house edge).
          </p>
          
          <div className="bg-red-50 p-4 rounded-md mt-4 border border-red-200">
            <h4 className="font-medium text-red-800 flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              Important Note About Odds Bets
            </h4>
            <p className="text-red-800 text-sm">
              This calculator doesn't include free odds bets, which are additional bets that can be placed after a point is established.
              Odds bets have no house edge (0%) and pay true odds. Taking odds when playing Pass Line or Come, and laying odds when playing
              Don't Pass or Don't Come, can significantly lower the overall house edge of your craps play.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CrapsPayoutCalculator;
