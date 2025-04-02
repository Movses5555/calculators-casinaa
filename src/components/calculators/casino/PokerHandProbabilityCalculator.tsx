
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calculator, Percent, Award, AlertCircle, ChevronRight, Spade, Heart, Diamond, Club } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface HandProbability {
  hand: string;
  probability: number;
  odds: string;
  description: string;
}

const PokerHandProbabilityCalculator: React.FC = () => {
  const [pokerVariant, setPokerVariant] = useState<'5-card' | 'texas-holdem'>('5-card');
  const [selectedHand, setSelectedHand] = useState<string>('royal-flush');

  // Probabilities for 5-card draw
  const fiveCardProbabilities: Record<string, HandProbability> = {
    'royal-flush': {
      hand: 'Royal Flush',
      probability: 0.000154,
      odds: '649,739 : 1',
      description: 'A, K, Q, J, 10, all in the same suit'
    },
    'straight-flush': {
      hand: 'Straight Flush',
      probability: 0.00139,
      odds: '72,192 : 1',
      description: 'Five consecutive cards of the same suit'
    },
    'four-of-a-kind': {
      hand: 'Four of a Kind',
      probability: 0.02401,
      odds: '4,164 : 1',
      description: 'Four cards of the same rank'
    },
    'full-house': {
      hand: 'Full House',
      probability: 0.1441,
      odds: '693 : 1',
      description: 'Three of a kind plus a pair'
    },
    'flush': {
      hand: 'Flush',
      probability: 0.1965,
      odds: '508 : 1',
      description: 'Five cards of the same suit'
    },
    'straight': {
      hand: 'Straight',
      probability: 0.3925,
      odds: '254 : 1',
      description: 'Five consecutive cards'
    },
    'three-of-a-kind': {
      hand: 'Three of a Kind',
      probability: 2.1128,
      odds: '46.3 : 1',
      description: 'Three cards of the same rank'
    },
    'two-pair': {
      hand: 'Two Pair',
      probability: 4.7539,
      odds: '20.0 : 1',
      description: 'Two different pairs'
    },
    'one-pair': {
      hand: 'One Pair',
      probability: 42.2569,
      odds: '1.37 : 1',
      description: 'Two cards of the same rank'
    },
    'high-card': {
      hand: 'High Card',
      probability: 50.1177,
      odds: '0.995 : 1',
      description: 'No matching cards'
    }
  };

  // Probabilities for Texas Hold'em
  const texasHoldemProbabilities: Record<string, HandProbability> = {
    'royal-flush': {
      hand: 'Royal Flush',
      probability: 0.0032,
      odds: '30,939 : 1',
      description: 'A, K, Q, J, 10, all in the same suit'
    },
    'straight-flush': {
      hand: 'Straight Flush',
      probability: 0.0279,
      odds: '3,589 : 1',
      description: 'Five consecutive cards of the same suit'
    },
    'four-of-a-kind': {
      hand: 'Four of a Kind',
      probability: 0.168,
      odds: '594 : 1',
      description: 'Four cards of the same rank'
    },
    'full-house': {
      hand: 'Full House',
      probability: 2.60,
      odds: '37.5 : 1',
      description: 'Three of a kind plus a pair'
    },
    'flush': {
      hand: 'Flush',
      probability: 3.03,
      odds: '32.1 : 1',
      description: 'Five cards of the same suit (not sequential)'
    },
    'straight': {
      hand: 'Straight',
      probability: 4.62,
      odds: '20.6 : 1',
      description: 'Five consecutive cards'
    },
    'three-of-a-kind': {
      hand: 'Three of a Kind',
      probability: 4.83,
      odds: '19.7 : 1',
      description: 'Three cards of the same rank'
    },
    'two-pair': {
      hand: 'Two Pair',
      probability: 23.5,
      odds: '3.26 : 1',
      description: 'Two different pairs'
    },
    'one-pair': {
      hand: 'One Pair',
      probability: 43.8,
      odds: '1.28 : 1',
      description: 'Two cards of the same rank'
    },
    'high-card': {
      hand: 'High Card',
      probability: 17.4,
      odds: '4.74 : 1',
      description: 'No matching cards'
    }
  };

  const currentProbabilities = pokerVariant === '5-card' ? fiveCardProbabilities : texasHoldemProbabilities;
  const selectedHandData = currentProbabilities[selectedHand];

  const calculateProbabilities = () => {
    toast({
      title: `${selectedHandData.hand} Probability`,
      description: `In ${pokerVariant === '5-card' ? '5-Card Draw' : 'Texas Hold\'em'}, the probability is ${selectedHandData.probability.toFixed(4)}%`,
    });
  };

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="poker-variant" className="text-base">Poker Variant</Label>
              <Select 
                value={pokerVariant} 
                onValueChange={(value: '5-card' | 'texas-holdem') => setPokerVariant(value)}
              >
                <SelectTrigger id="poker-variant" className="w-full mt-2">
                  <SelectValue placeholder="Select poker variant" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="5-card">5-Card Draw</SelectItem>
                  <SelectItem value="texas-holdem">Texas Hold'em</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="hand-type" className="text-base">Hand Type</Label>
              <Select 
                value={selectedHand} 
                onValueChange={(value) => setSelectedHand(value)}
              >
                <SelectTrigger id="hand-type" className="w-full mt-2">
                  <SelectValue placeholder="Select hand type" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px] bg-white">
                  {Object.entries(currentProbabilities).map(([key, data]) => (
                    <SelectItem key={key} value={key}>{data.hand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={calculateProbabilities} className="w-full mt-4">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Probability
            </Button>
          </div>

          <div className="bg-slate-50 p-5 rounded-lg space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Award className="mr-2 h-5 w-5 text-red-600" />
              Hand Probability Results
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center bg-white p-3 rounded border">
                <div>
                  <p className="text-sm text-gray-500">Hand</p>
                  <p className="text-lg font-medium">{selectedHandData.hand}</p>
                </div>
                <div className="flex space-x-1">
                  <Spade className="h-4 w-4" />
                  <Heart className="h-4 w-4 text-red-600" />
                  <Diamond className="h-4 w-4 text-red-600" />
                  <Club className="h-4 w-4" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm text-gray-500">Probability</p>
                  <p className="text-lg font-medium flex items-center">
                    {selectedHandData.probability.toFixed(4)}%
                    <Percent className="h-4 w-4 ml-1" />
                  </p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm text-gray-500">Odds Against</p>
                  <p className="text-lg font-medium">{selectedHandData.odds}</p>
                </div>
              </div>

              <div className="bg-slate-100 p-4 rounded-md border">
                <div className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-slate-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-700">Description:</h4>
                    <p className="text-slate-700">{selectedHandData.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Poker Hand Rankings & Probabilities</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Hand</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>5-Card Probability</TableHead>
              <TableHead>5-Card Odds</TableHead>
              <TableHead>Texas Hold'em Probability</TableHead>
              <TableHead>Texas Hold'em Odds</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(fiveCardProbabilities).map(([key, fiveCardData]) => {
              const holdemData = texasHoldemProbabilities[key];
              return (
                <TableRow key={key} className={selectedHand === key ? "bg-red-50" : ""}>
                  <TableCell className="font-medium">{fiveCardData.hand}</TableCell>
                  <TableCell>{fiveCardData.description}</TableCell>
                  <TableCell>{fiveCardData.probability.toFixed(4)}%</TableCell>
                  <TableCell>{fiveCardData.odds}</TableCell>
                  <TableCell>{holdemData.probability.toFixed(4)}%</TableCell>
                  <TableCell>{holdemData.odds}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Understanding Poker Hand Probabilities</h3>
        <div className="prose prose-slate max-w-none">
          <p>
            Poker hand probabilities are essential for making informed decisions during gameplay. The likelihood of achieving 
            specific hands varies between poker variants due to differences in how cards are dealt and used.
          </p>
          
          <h4 className="flex items-center mt-4">
            <Percent className="h-4 w-4 mr-2 text-red-600" />
            How Probabilities Are Calculated
          </h4>
          
          <p>
            In 5-Card Draw, probabilities are calculated based on drawing 5 cards from a standard 52-card deck. 
            There are 2,598,960 possible 5-card hands.
          </p>
          
          <p>
            In Texas Hold'em, a player uses the best 5-card hand from their 2 hole cards and 5 community cards. 
            This creates different probabilities compared to 5-Card Draw.
          </p>
          
          <h4 className="flex items-center mt-4">
            <AlertCircle className="h-4 w-4 mr-2 text-red-600" />
            Key Differences Between Variants
          </h4>
          
          <p>
            <strong>5-Card Draw:</strong> All five cards are private to each player. A high card is the most common outcome, 
            followed by one pair.
          </p>
          
          <p>
            <strong>Texas Hold'em:</strong> Players share community cards, making better hands more common. One pair is the most 
            common outcome, with high card hands less frequent than in 5-Card Draw.
          </p>
          
          <h4 className="flex items-center mt-4">
            <Award className="h-4 w-4 mr-2 text-red-600" />
            Understanding Odds
          </h4>
          
          <p>
            Odds are expressed as "X : 1", meaning there are X ways to fail for every 1 way to succeed. For example, 
            odds of "20 : 1" mean you'll get the hand once for every 21 attempts on average.
          </p>
          
          <p>
            The rarer the hand, the higher its rank in poker. A Royal Flush is the rarest and highest-ranking hand, 
            while a High Card is the most common and lowest-ranking hand.
          </p>
          
          <div className="bg-red-50 p-4 rounded-md mt-4 border border-red-200">
            <h4 className="font-medium text-red-800 flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              Important Note
            </h4>
            <p className="text-red-800 text-sm">
              These probabilities represent the chances of being dealt a specific hand. In actual gameplay, the 
              probability of ending up with a specific hand may differ due to drawing and discarding strategies 
              in 5-Card Draw, or how community cards are revealed in Texas Hold'em.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PokerHandProbabilityCalculator;
