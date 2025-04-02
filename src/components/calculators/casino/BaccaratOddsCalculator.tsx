
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calculator, AlertCircle, DollarSign, ChartPie, BriefcaseBusiness, WalletCards } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const BaccaratOddsCalculator: React.FC = () => {
  const [betAmount, setBetAmount] = useState<string>('100');
  const [numberOfHands, setNumberOfHands] = useState<string>('100');

  // Fixed baccarat odds - these are standard in most casinos
  const baccaratBets = {
    banker: {
      probability: 0.4586, // 45.86%
      payout: 0.95, // 1:1 minus 5% commission
      houseEdge: 0.0106 // 1.06%
    },
    player: {
      probability: 0.4462, // 44.62%
      payout: 1, // 1:1
      houseEdge: 0.0124 // 1.24%
    },
    tie: {
      probability: 0.0952, // 9.52%
      payout: 8, // 8:1
      houseEdge: 0.1439 // 14.39%
    },
    bankerPair: {
      probability: 0.0744, // 7.44%
      payout: 11, // 11:1
      houseEdge: 0.1158 // 11.58%
    },
    playerPair: {
      probability: 0.0744, // 7.44%
      payout: 11, // 11:1
      houseEdge: 0.1158 // 11.58%
    },
    super6: {
      probability: 0.1429, // 14.29% (of banker wins)
      payout: 12, // 12:1
      houseEdge: 0.1657 // 16.57%
    },
    dragonBonus: {
      probability: 0.0020, // 0.2% (for natural 9 over natural 8)
      payout: 30, // 30:1
      houseEdge: 0.0980 // 9.8% (average for all Dragon Bonus bets)
    }
  };

  const calculateOdds = () => {
    const amount = parseFloat(betAmount);
    const hands = parseFloat(numberOfHands);
    
    if (isNaN(amount) || amount <= 0 || isNaN(hands) || hands <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid positive numbers for bet amount and number of hands.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Calculation Complete",
      description: "Odds calculation has been updated."
    });
  };

  const calculateExpectedValue = (betType: keyof typeof baccaratBets): number => {
    const amount = parseFloat(betAmount) || 0;
    const hands = parseFloat(numberOfHands) || 0;
    const { probability, payout, houseEdge } = baccaratBets[betType];
    
    const win = amount * payout * probability * hands;
    const lose = amount * (1 - probability) * hands;
    return win - lose;
  };

  const calculateExpectedLoss = (betType: keyof typeof baccaratBets): number => {
    const amount = parseFloat(betAmount) || 0;
    const hands = parseFloat(numberOfHands) || 0;
    return amount * hands * baccaratBets[betType].houseEdge;
  };

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <BriefcaseBusiness className="h-5 w-5 mr-2 text-purple-600" />
              Baccarat Odds Calculator
            </h3>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="bet-amount" className="text-base">Bet Amount</Label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="bet-amount"
                    type="number"
                    min="1"
                    step="1"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">Enter your standard bet amount</p>
              </div>
              
              <div>
                <Label htmlFor="number-of-hands" className="text-base">Number of Hands</Label>
                <Input
                  id="number-of-hands"
                  type="number"
                  min="1"
                  step="1"
                  value={numberOfHands}
                  onChange={(e) => setNumberOfHands(e.target.value)}
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">How many hands you plan to play</p>
              </div>
              
              <Button onClick={calculateOdds} className="w-full mt-2">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Odds
              </Button>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium">What this calculator shows:</p>
                  <p className="mt-1">
                    This calculator helps you understand the odds, house edge, and expected losses for 
                    different baccarat bets. It lets you see how your bankroll might perform over a 
                    specific number of hands.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50 p-5 rounded-lg">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <WalletCards className="h-5 w-5 mr-2 text-purple-600" />
              Expected Value & House Edge
            </h3>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-700">
                Based on a bet of ${parseFloat(betAmount) || 0} over {parseFloat(numberOfHands) || 0} hands:
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm text-gray-500">Expected Loss (Banker)</p>
                  <p className="text-lg font-medium text-red-600">
                    ${calculateExpectedLoss('banker').toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">House Edge: 1.06%</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm text-gray-500">Expected Loss (Player)</p>
                  <p className="text-lg font-medium text-red-600">
                    ${calculateExpectedLoss('player').toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">House Edge: 1.24%</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm text-gray-500">Expected Loss (Tie)</p>
                  <p className="text-lg font-medium text-red-600">
                    ${calculateExpectedLoss('tie').toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">House Edge: 14.39%</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm text-gray-500">Expected Loss (Pairs)</p>
                  <p className="text-lg font-medium text-red-600">
                    ${calculateExpectedLoss('playerPair').toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">House Edge: 11.58%</p>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 mt-2">
                <p>
                  <strong>Best Bet:</strong> Banker (1.06% house edge), despite the 5% commission.
                </p>
                <p>
                  <strong>Second Best:</strong> Player (1.24% house edge), without commission.
                </p>
                <p>
                  <strong>Avoid:</strong> Tie and Side Bets (all have house edges over 10%).
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 overflow-hidden">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <ChartPie className="h-5 w-5 mr-2 text-purple-600" />
          Baccarat Bet Comparison
        </h3>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[170px]">Bet Type</TableHead>
                <TableHead>Probability</TableHead>
                <TableHead>Payout</TableHead>
                <TableHead>House Edge</TableHead>
                <TableHead>Expected Loss per $100</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-green-50">
                <TableCell className="font-medium">Banker</TableCell>
                <TableCell>{(baccaratBets.banker.probability * 100).toFixed(2)}%</TableCell>
                <TableCell>1:1 (5% commission)</TableCell>
                <TableCell>{(baccaratBets.banker.houseEdge * 100).toFixed(2)}%</TableCell>
                <TableCell className="text-red-600">${(baccaratBets.banker.houseEdge * 100).toFixed(2)}</TableCell>
                <TableCell>Best bet despite commission</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Player</TableCell>
                <TableCell>{(baccaratBets.player.probability * 100).toFixed(2)}%</TableCell>
                <TableCell>1:1</TableCell>
                <TableCell>{(baccaratBets.player.houseEdge * 100).toFixed(2)}%</TableCell>
                <TableCell className="text-red-600">${(baccaratBets.player.houseEdge * 100).toFixed(2)}</TableCell>
                <TableCell>Second-best option</TableCell>
              </TableRow>
              <TableRow className="bg-red-50">
                <TableCell className="font-medium">Tie</TableCell>
                <TableCell>{(baccaratBets.tie.probability * 100).toFixed(2)}%</TableCell>
                <TableCell>8:1</TableCell>
                <TableCell>{(baccaratBets.tie.houseEdge * 100).toFixed(2)}%</TableCell>
                <TableCell className="text-red-600">${(baccaratBets.tie.houseEdge * 100).toFixed(2)}</TableCell>
                <TableCell>High house edge, avoid</TableCell>
              </TableRow>
              <TableRow className="bg-red-50">
                <TableCell className="font-medium">Player Pair</TableCell>
                <TableCell>{(baccaratBets.playerPair.probability * 100).toFixed(2)}%</TableCell>
                <TableCell>11:1</TableCell>
                <TableCell>{(baccaratBets.playerPair.houseEdge * 100).toFixed(2)}%</TableCell>
                <TableCell className="text-red-600">${(baccaratBets.playerPair.houseEdge * 100).toFixed(2)}</TableCell>
                <TableCell>Side bet, high house edge</TableCell>
              </TableRow>
              <TableRow className="bg-red-50">
                <TableCell className="font-medium">Banker Pair</TableCell>
                <TableCell>{(baccaratBets.bankerPair.probability * 100).toFixed(2)}%</TableCell>
                <TableCell>11:1</TableCell>
                <TableCell>{(baccaratBets.bankerPair.houseEdge * 100).toFixed(2)}%</TableCell>
                <TableCell className="text-red-600">${(baccaratBets.bankerPair.houseEdge * 100).toFixed(2)}</TableCell>
                <TableCell>Side bet, high house edge</TableCell>
              </TableRow>
              <TableRow className="bg-red-50">
                <TableCell className="font-medium">Super 6</TableCell>
                <TableCell>{(baccaratBets.super6.probability * 100).toFixed(2)}%</TableCell>
                <TableCell>12:1</TableCell>
                <TableCell>{(baccaratBets.super6.houseEdge * 100).toFixed(2)}%</TableCell>
                <TableCell className="text-red-600">${(baccaratBets.super6.houseEdge * 100).toFixed(2)}</TableCell>
                <TableCell>Side bet, very high house edge</TableCell>
              </TableRow>
              <TableRow className="bg-red-50">
                <TableCell className="font-medium">Dragon Bonus</TableCell>
                <TableCell>Varies</TableCell>
                <TableCell>Up to 30:1</TableCell>
                <TableCell>{(baccaratBets.dragonBonus.houseEdge * 100).toFixed(2)}%</TableCell>
                <TableCell className="text-red-600">${(baccaratBets.dragonBonus.houseEdge * 100).toFixed(2)}</TableCell>
                <TableCell>Side bet, high house edge</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Understanding Baccarat Odds and Strategy</h3>
        <div className="prose prose-slate max-w-none">
          <p>
            Baccarat is one of the simplest casino games to play but understanding its odds and expected returns can help you make more informed betting decisions.
          </p>
          
          <h4 className="mt-4 font-medium">Basic Baccarat Rules</h4>
          <p>
            In baccarat, you bet on either the "Player" or "Banker" hand to win, or on a "Tie" between the two. Cards 2-9 are worth face value, 10s and face cards are worth 0, and Aces are worth 1. The hand value is the right digit of the sum (e.g., a hand totaling 15 is worth 5).
          </p>
          
          <h4 className="mt-4 font-medium">Understanding the House Edge</h4>
          <p>
            The house edge represents the average percentage of each bet that the casino expects to keep over time:
          </p>
          <ul>
            <li><strong>Banker bet:</strong> 1.06% house edge (5% commission on wins)</li>
            <li><strong>Player bet:</strong> 1.24% house edge (no commission)</li>
            <li><strong>Tie bet:</strong> 14.39% house edge (8:1 payout)</li>
            <li><strong>Pair bets:</strong> 11.58% house edge (11:1 payout)</li>
          </ul>
          
          <h4 className="mt-4 font-medium">Optimal Baccarat Strategy</h4>
          <p>
            The mathematically optimal strategy for baccarat is simple:
          </p>
          <ol>
            <li><strong>Always bet on the Banker.</strong> Despite the 5% commission, this has the lowest house edge.</li>
            <li><strong>If you don't want to pay commission, bet on Player.</strong> The difference is small (0.18%).</li>
            <li><strong>Never bet on Tie or Pairs.</strong> These bets have very high house edges.</li>
            <li><strong>Ignore patterns.</strong> Each hand is independent; previous results have no influence on future outcomes.</li>
          </ol>
          
          <h4 className="mt-4 font-medium">Bankroll Management</h4>
          <p>
            Despite the relatively low house edge on Banker and Player bets, baccarat is still a negative expectation game. Good bankroll management is essential:
          </p>
          <ul>
            <li>Set a budget for your session and stick to it</li>
            <li>Use flat betting rather than progressive systems</li>
            <li>Avoid chasing losses</li>
            <li>Consider taking breaks after winning streaks to lock in profits</li>
          </ul>
          
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mt-4">
            <p className="text-sm text-amber-800">
              <strong>Important:</strong> No betting system can overcome the house edge in the long run. The best approach is to view baccarat as entertainment, not a way to make money. Play responsibly and enjoy the game's elegant simplicity.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BaccaratOddsCalculator;
