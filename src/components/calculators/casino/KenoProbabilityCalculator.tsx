
import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calculator, CheckCircle2, Info, AlertCircle, Ticket } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

type NumberRange = {
  value: number;
  maxSpots: number;
  matches: number[];
  payouts: number[];
};

const KenoProbabilityCalculator: React.FC = () => {
  const [spotsPicked, setSpotsPicked] = useState<string>("5");
  const [betAmount, setBetAmount] = useState<string>("5");
  const [matchesNeeded, setMatchesNeeded] = useState<string>("3");
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [gameType, setGameType] = useState<string>("standard");

  // Keno payout tables (simplified for different spot selections)
  const kenoPayoutTables: Record<string, NumberRange> = {
    "1": { value: 1, maxSpots: 1, matches: [1], payouts: [3] },
    "2": { value: 2, maxSpots: 2, matches: [1, 2], payouts: [1, 9] },
    "3": { value: 3, maxSpots: 3, matches: [2, 3], payouts: [2, 16] },
    "4": { value: 4, maxSpots: 4, matches: [2, 3, 4], payouts: [1, 5, 75] },
    "5": { value: 5, maxSpots: 5, matches: [3, 4, 5], payouts: [3, 12, 810] },
    "6": { value: 6, maxSpots: 6, matches: [3, 4, 5, 6], payouts: [1, 4, 80, 1500] },
    "7": { value: 7, maxSpots: 7, matches: [3, 4, 5, 6, 7], payouts: [1, 2, 18, 335, 8000] },
    "8": { value: 8, maxSpots: 8, matches: [4, 5, 6, 7, 8], payouts: [2, 12, 50, 1500, 25000] },
    "9": { value: 9, maxSpots: 9, matches: [4, 5, 6, 7, 8, 9], payouts: [1, 5, 25, 200, 4000, 40000] },
    "10": { value: 10, maxSpots: 10, matches: [5, 6, 7, 8, 9, 10], payouts: [2, 15, 40, 450, 4250, 100000] }
  };

  // Current payout table based on selected spots
  const currentPayoutTable = kenoPayoutTables[spotsPicked];

  // Generate numbers 1-80 for Keno grid
  const kenoNumbers = useMemo(() => Array.from({ length: 80 }, (_, i) => i + 1), []);

  // Toggle number selection
  const toggleNumber = (number: number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(prev => prev.filter(n => n !== number));
    } else {
      if (selectedNumbers.length < parseInt(spotsPicked)) {
        setSelectedNumbers(prev => [...prev, number]);
      } else {
        toast({
          title: "Maximum spots selected",
          description: `You can only select ${spotsPicked} numbers with your current spots selection.`,
          variant: "destructive"
        });
      }
    }
  };

  // Quick pick - randomly select numbers
  const quickPick = () => {
    const max = parseInt(spotsPicked);
    const shuffled = [...kenoNumbers].sort(() => 0.5 - Math.random());
    setSelectedNumbers(shuffled.slice(0, max));
  };

  // Clear selected numbers
  const clearSelection = () => {
    setSelectedNumbers([]);
  };

  // Calculate probability of hitting exactly k matches out of n spots
  const calculateExactProbability = (spotsSelected: number, matchesHit: number): number => {
    // Total numbers in keno is 80, with 20 numbers drawn
    const totalNumbers = 80;
    const numbersDraw = 20;
    
    // Calculate combinations: C(k, m) * C(n-k, t-m) / C(n, t)
    // Where n = total numbers (80), t = numbers drawn (20), 
    // k = spots selected, m = matches hit
    
    // Calculate binomial coefficient C(n, k)
    const binomialCoeff = (n: number, k: number): number => {
      if (k < 0 || k > n) return 0;
      if (k === 0 || k === n) return 1;
      
      let res = 1;
      for (let i = 1; i <= k; i++) {
        res = res * (n - (i - 1)) / i;
      }
      return res;
    };
    
    const ways_to_select_hits = binomialCoeff(numbersDraw, matchesHit);
    const ways_to_select_misses = binomialCoeff(totalNumbers - numbersDraw, spotsSelected - matchesHit);
    const total_ways = binomialCoeff(totalNumbers, spotsSelected);
    
    return (ways_to_select_hits * ways_to_select_misses) / total_ways;
  };

  // Calculate probability of hitting at least k matches
  const calculateAtLeastProbability = (spotsSelected: number, matchesHit: number): number => {
    let probability = 0;
    for (let i = matchesHit; i <= spotsSelected; i++) {
      probability += calculateExactProbability(spotsSelected, i);
    }
    return probability;
  };

  const spots = parseInt(spotsPicked);
  const matches = parseInt(matchesNeeded);
  const bet = parseFloat(betAmount);

  // Calculate probabilities
  const exactProbability = calculateExactProbability(spots, matches);
  const atLeastProbability = calculateAtLeastProbability(spots, matches);
  
  // Calculate expected payout
  const calculateExpectedPayout = (): number => {
    let expectedValue = 0;
    
    if (currentPayoutTable) {
      for (let i = 0; i < currentPayoutTable.matches.length; i++) {
        const matches = currentPayoutTable.matches[i];
        const payout = currentPayoutTable.payouts[i];
        const probability = calculateExactProbability(spots, matches);
        expectedValue += probability * payout;
      }
    }
    
    return expectedValue;
  };
  
  const expectedPayout = calculateExpectedPayout();
  const houseEdge = 100 * (1 - expectedPayout);
  
  // Find appropriate payout for selected matches
  const findPayout = (matches: number): number => {
    if (!currentPayoutTable) return 0;
    
    const index = currentPayoutTable.matches.findIndex(m => m === matches);
    return index >= 0 ? currentPayoutTable.payouts[index] : 0;
  };
  
  const potentialWin = findPayout(matches) * bet;
  
  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Select Your Keno Options</h3>
            
            <div>
              <Label htmlFor="bet-amount">Bet Amount</Label>
              <div className="relative mt-1">
                <Input
                  id="bet-amount"
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  min="1"
                  step="1"
                  className="pl-8"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              </div>
            </div>
            
            <div>
              <Label htmlFor="spots-picked">Number of Spots</Label>
              <Select 
                value={spotsPicked} 
                onValueChange={(value) => {
                  setSpotsPicked(value);
                  setSelectedNumbers([]);
                  const maxMatch = kenoPayoutTables[value].matches[kenoPayoutTables[value].matches.length - 1];
                  if (parseInt(matchesNeeded) > maxMatch) {
                    setMatchesNeeded(maxMatch.toString());
                  }
                }}
              >
                <SelectTrigger id="spots-picked" className="mt-1">
                  <SelectValue placeholder="Select spots" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(kenoPayoutTables).map((num) => (
                    <SelectItem key={num} value={num}>{num} Spot{parseInt(num) > 1 ? 's' : ''}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="matches-needed">Matches to Calculate</Label>
              <Select 
                value={matchesNeeded} 
                onValueChange={setMatchesNeeded}
              >
                <SelectTrigger id="matches-needed" className="mt-1">
                  <SelectValue placeholder="Select matches" />
                </SelectTrigger>
                <SelectContent>
                  {currentPayoutTable && currentPayoutTable.matches.map((num) => (
                    <SelectItem key={num} value={num.toString()}>{num} Match{num > 1 ? 'es' : ''}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="game-type">Game Type</Label>
              <Select 
                value={gameType} 
                onValueChange={setGameType}
              >
                <SelectTrigger id="game-type" className="mt-1">
                  <SelectValue placeholder="Select game type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="wayTickets">Way Tickets</SelectItem>
                  <SelectItem value="specialTickets">Special Tickets</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex space-x-2 pt-2">
              <Button onClick={quickPick} variant="outline" className="flex-1">
                Quick Pick
              </Button>
              <Button onClick={clearSelection} variant="outline" className="flex-1">
                Clear
              </Button>
            </div>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-lg space-y-4">
            <h3 className="text-lg font-semibold">Probability Results</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded border">
                <p className="text-sm text-gray-500">Exact Probability</p>
                <p className="text-lg font-medium">{(exactProbability * 100).toFixed(4)}%</p>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="text-sm text-gray-500">At Least Probability</p>
                <p className="text-lg font-medium">{(atLeastProbability * 100).toFixed(4)}%</p>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="text-sm text-gray-500">Potential Win</p>
                <p className="text-lg font-medium">${potentialWin.toFixed(2)}</p>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="text-sm text-gray-500">Return on Bet</p>
                <p className="text-lg font-medium">{(potentialWin / bet).toFixed(2)}x</p>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="text-sm text-gray-500">Expected Value</p>
                <p className="text-lg font-medium">{expectedPayout.toFixed(4)}x</p>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="text-sm text-gray-500">House Edge</p>
                <p className="text-lg font-medium text-red-600">{houseEdge.toFixed(2)}%</p>
              </div>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mt-2">
              <h4 className="font-medium text-amber-800 flex items-center">
                <Info className="h-4 w-4 mr-2" />
                Keno Odds Information
              </h4>
              <p className="text-amber-800 text-sm mt-1">
                {spots === 1 && "With a 1-spot ticket, you have a 1 in 4 chance (25%) of matching your number."}
                {spots > 1 && `With a ${spots}-spot ticket, your chances of matching exactly ${matches} numbers are approximately 1 in ${Math.round(1/exactProbability)}.`}
              </p>
            </div>
          </div>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Select Your Keno Numbers</h3>
        <p className="text-sm text-gray-500 mb-4">
          Select {spots} number{spots !== 1 ? 's' : ''} from the board below, or use Quick Pick to generate random numbers.
        </p>
        
        <div className="grid grid-cols-8 md:grid-cols-10 gap-2 mb-6">
          {kenoNumbers.map(number => (
            <button
              key={number}
              onClick={() => toggleNumber(number)}
              className={`
                aspect-square flex items-center justify-center text-sm font-medium rounded-md
                ${selectedNumbers.includes(number) 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}
              `}
            >
              {number}
            </button>
          ))}
        </div>
        
        <div className="bg-slate-50 p-4 rounded-lg">
          <h4 className="font-medium">Your Selected Numbers</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedNumbers.length > 0 ? (
              selectedNumbers.sort((a, b) => a - b).map(number => (
                <span key={number} className="inline-flex items-center justify-center w-9 h-9 bg-purple-600 text-white rounded-full">
                  {number}
                </span>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No numbers selected</p>
            )}
          </div>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Keno Payout Table</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Spots Picked</TableHead>
                {[...Array(10)].map((_, i) => (
                  <TableHead key={i} className="text-center">{i + 1} Match{i > 0 ? 'es' : ''}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(kenoPayoutTables).map(([key, data]) => (
                <TableRow key={key} className={spotsPicked === key ? "bg-purple-50" : ""}>
                  <TableCell className="font-medium">{key}</TableCell>
                  {[...Array(10)].map((_, i) => {
                    const matchIndex = data.matches.indexOf(i + 1);
                    return (
                      <TableCell key={i} className="text-center">
                        {matchIndex >= 0 ? `${data.payouts[matchIndex]}x` : "-"}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Understanding Keno Probability</h3>
        <div className="prose prose-slate max-w-none">
          <p>
            Keno is a lottery-like gambling game often played at casinos. Players select numbers from a pool
            (typically 1-80) and are paid based on how many of their numbers match the 20 numbers drawn.
          </p>
          
          <h4 className="flex items-center mt-4">
            <Ticket className="h-4 w-4 mr-2 text-purple-600" />
            How Keno Works
          </h4>
          
          <p>
            In standard keno, you select between 1 and 10 numbers (spots) from a range of 1 to 80. The casino
            then draws 20 random numbers. Your payout depends on how many of your selected numbers match
            the drawn numbers, with more matches resulting in higher payouts.
          </p>
          
          <h4 className="flex items-center mt-4">
            <Calculator className="h-4 w-4 mr-2 text-purple-600" />
            Understanding the Odds
          </h4>
          
          <p>
            Keno offers a wide range of payouts but generally has a higher house edge compared to other casino games.
            The house edge typically ranges from 20% to 35%, depending on the specific rules and paytable of the casino.
          </p>
          
          <p>
            The odds of hitting all 10 numbers on a 10-spot ticket are approximately 1 in 8.9 million, similar to
            the odds of winning some lottery jackpots. However, most keno games pay out for matching only some
            of your selected numbers, making it possible to win something with much better odds.
          </p>
          
          <h4 className="flex items-center mt-4">
            <CheckCircle2 className="h-4 w-4 mr-2 text-purple-600" />
            Keno Strategy Tips
          </h4>
          
          <ul className="list-disc pl-6 space-y-1">
            <li>Consider playing 4-8 spot tickets, which often offer a good balance between payout potential and winning probability</li>
            <li>Look for casinos with better paytables, as these can significantly reduce the house edge</li>
            <li>Set a budget and stick to it, as keno is primarily a game of chance</li>
            <li>Some players prefer to play the same numbers consistently, while others choose new numbers each game</li>
            <li>Consider "way tickets" which allow you to make multiple bets on different number combinations</li>
          </ul>
          
          <div className="bg-purple-50 p-4 rounded-md mt-4 border border-purple-200">
            <h4 className="font-medium text-purple-800 flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              Important Note About Keno Variations
            </h4>
            <p className="text-purple-800 text-sm">
              Different casinos and online platforms offer variations of keno with different paytables and rules.
              Always check the specific rules and payouts of the keno game you're playing, as they can vary significantly
              and affect your odds and potential returns.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default KenoProbabilityCalculator;
