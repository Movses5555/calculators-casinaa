
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Heart, Diamond, Club, Spade, AlertCircle, BookOpen, Hand, ChevronsUpDown } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

type PlayerHand = {
  value: string;
  cards?: string[];
  isSoft?: boolean;
  isPair?: boolean;
};

type DealerUpcard = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'A';

type DecisionType = 'H' | 'S' | 'D' | 'P' | 'Dh' | 'Ds' | 'Ph' | 'Ps' | 'Rh' | 'Rs';

type StrategyTable = {
  hard: Record<string, Record<DealerUpcard, DecisionType>>;
  soft: Record<string, Record<DealerUpcard, DecisionType>>;
  pairs: Record<string, Record<DealerUpcard, DecisionType>>;
};

const BlackjackStrategyCalculator: React.FC = () => {
  const [playerHand, setPlayerHand] = useState<PlayerHand>({ value: '17+' });
  const [dealerUpcard, setDealerUpcard] = useState<DealerUpcard>('A');
  const [handType, setHandType] = useState<'hard' | 'soft' | 'pair'>('hard');
  const [rules, setRules] = useState<'h17' | 's17'>('h17');
  const [decks, setDecks] = useState<'1' | '2' | '4-8'>('4-8');
  const [doubleAfterSplit, setDoubleAfterSplit] = useState<boolean>(true);
  const [surrender, setSurrender] = useState<boolean>(true);
  const [decision, setDecision] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<'calculator' | 'chart'>('calculator');

  // Basic strategy assuming H17, 4-8 decks, double after split allowed, surrender allowed
  const basicStrategy: StrategyTable = {
    hard: {
      '8-': { '2': 'H', '3': 'H', '4': 'H', '5': 'H', '6': 'H', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
      '9': { '2': 'H', '3': 'D', '4': 'D', '5': 'D', '6': 'D', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
      '10': { '2': 'D', '3': 'D', '4': 'D', '5': 'D', '6': 'D', '7': 'D', '8': 'D', '9': 'D', '10': 'H', 'A': 'H' },
      '11': { '2': 'D', '3': 'D', '4': 'D', '5': 'D', '6': 'D', '7': 'D', '8': 'D', '9': 'D', '10': 'D', 'A': 'H' },
      '12': { '2': 'H', '3': 'H', '4': 'S', '5': 'S', '6': 'S', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
      '13': { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
      '14': { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
      '15': { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'H', '8': 'H', '9': 'H', '10': 'Rh', 'A': 'H' },
      '16': { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'H', '8': 'H', '9': 'Rh', '10': 'Rh', 'A': 'Rh' },
      '17+': { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'S', '8': 'S', '9': 'S', '10': 'S', 'A': 'S' }
    },
    soft: {
      'A,2': { '2': 'H', '3': 'H', '4': 'H', '5': 'Dh', '6': 'Dh', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
      'A,3': { '2': 'H', '3': 'H', '4': 'H', '5': 'Dh', '6': 'Dh', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
      'A,4': { '2': 'H', '3': 'H', '4': 'Dh', '5': 'Dh', '6': 'Dh', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
      'A,5': { '2': 'H', '3': 'H', '4': 'Dh', '5': 'Dh', '6': 'Dh', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
      'A,6': { '2': 'H', '3': 'Dh', '4': 'Dh', '5': 'Dh', '6': 'Dh', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
      'A,7': { '2': 'Ds', '3': 'Ds', '4': 'Ds', '5': 'Ds', '6': 'Ds', '7': 'S', '8': 'S', '9': 'H', '10': 'H', 'A': 'H' },
      'A,8': { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'S', '8': 'S', '9': 'S', '10': 'S', 'A': 'S' },
      'A,9': { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'S', '8': 'S', '9': 'S', '10': 'S', 'A': 'S' }
    },
    pairs: {
      '2,2': { '2': 'Ph', '3': 'Ph', '4': 'P', '5': 'P', '6': 'P', '7': 'P', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
      '3,3': { '2': 'Ph', '3': 'Ph', '4': 'P', '5': 'P', '6': 'P', '7': 'P', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
      '4,4': { '2': 'H', '3': 'H', '4': 'H', '5': 'Ph', '6': 'Ph', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
      '5,5': { '2': 'D', '3': 'D', '4': 'D', '5': 'D', '6': 'D', '7': 'D', '8': 'D', '9': 'D', '10': 'H', 'A': 'H' },
      '6,6': { '2': 'Ph', '3': 'P', '4': 'P', '5': 'P', '6': 'P', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
      '7,7': { '2': 'P', '3': 'P', '4': 'P', '5': 'P', '6': 'P', '7': 'P', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
      '8,8': { '2': 'P', '3': 'P', '4': 'P', '5': 'P', '6': 'P', '7': 'P', '8': 'P', '9': 'P', '10': 'P', 'A': 'P' },
      '9,9': { '2': 'P', '3': 'P', '4': 'P', '5': 'P', '6': 'P', '7': 'S', '8': 'P', '9': 'P', '10': 'S', 'A': 'S' },
      '10,10': { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'S', '8': 'S', '9': 'S', '10': 'S', 'A': 'S' },
      'A,A': { '2': 'P', '3': 'P', '4': 'P', '5': 'P', '6': 'P', '7': 'P', '8': 'P', '9': 'P', '10': 'P', 'A': 'P' }
    }
  };

  // Strategy table for S17 rules
  const s17Strategy: StrategyTable = {
    // Most of the strategy is the same as H17
    hard: { ...basicStrategy.hard },
    soft: { ...basicStrategy.soft },
    pairs: { ...basicStrategy.pairs }
  };
  
  // Adjust for S17 specific differences
  s17Strategy.hard['17+'] = { ...basicStrategy.hard['17+'] };
  s17Strategy.soft['A,8'] = { ...basicStrategy.soft['A,8'] };
  // A few specific rule changes for S17
  s17Strategy.soft['A,7']['A'] = 'S';

  // Single deck adjustments
  const singleDeckAdjustments = (strategy: StrategyTable): StrategyTable => {
    const adjusted = {
      hard: { ...strategy.hard },
      soft: { ...strategy.soft },
      pairs: { ...strategy.pairs }
    };
    
    // Specific adjustments for single deck
    adjusted.hard['11']['A'] = 'D';
    adjusted.hard['15']['10'] = 'H';
    adjusted.pairs['7,7']['8'] = 'P';
    
    return adjusted;
  };

  // Double deck adjustments
  const doubleDeckAdjustments = (strategy: StrategyTable): StrategyTable => {
    const adjusted = {
      hard: { ...strategy.hard },
      soft: { ...strategy.soft },
      pairs: { ...strategy.pairs }
    };
    
    // Specific adjustments for double deck
    adjusted.hard['11']['A'] = 'D';
    adjusted.pairs['7,7']['8'] = 'H';
    
    return adjusted;
  };

  // No double after split adjustments
  const noDoubleAfterSplitAdjustments = (strategy: StrategyTable): StrategyTable => {
    const adjusted = {
      hard: { ...strategy.hard },
      soft: { ...strategy.soft },
      pairs: { ...strategy.pairs }
    };
    
    // Adjust all Ph to P (can't double after split)
    for (const value in adjusted.pairs) {
      for (const card in adjusted.pairs[value]) {
        if (adjusted.pairs[value][card as DealerUpcard] === 'Ph') {
          adjusted.pairs[value][card as DealerUpcard] = 'P';
        }
      }
    }
    
    return adjusted;
  };

  // No surrender adjustments
  const noSurrenderAdjustments = (strategy: StrategyTable): StrategyTable => {
    const adjusted = {
      hard: { ...strategy.hard },
      soft: { ...strategy.soft },
      pairs: { ...strategy.pairs }
    };
    
    // Replace all Rs with H or S
    for (const value in adjusted.hard) {
      for (const card in adjusted.hard[value]) {
        if (adjusted.hard[value][card as DealerUpcard] === 'Rh') {
          adjusted.hard[value][card as DealerUpcard] = 'H';
        } else if (adjusted.hard[value][card as DealerUpcard] === 'Rs') {
          adjusted.hard[value][card as DealerUpcard] = 'S';
        }
      }
    }
    
    return adjusted;
  };

  // Get appropriate strategy based on current rules
  const getStrategy = (): StrategyTable => {
    let strategy = rules === 'h17' ? basicStrategy : s17Strategy;
    
    // Apply deck adjustments
    if (decks === '1') {
      strategy = singleDeckAdjustments(strategy);
    } else if (decks === '2') {
      strategy = doubleDeckAdjustments(strategy);
    }
    
    // Apply DAS adjustments
    if (!doubleAfterSplit) {
      strategy = noDoubleAfterSplitAdjustments(strategy);
    }
    
    // Apply surrender adjustments
    if (!surrender) {
      strategy = noSurrenderAdjustments(strategy);
    }
    
    return strategy;
  };

  // Get decision for current hand
  const getDecision = (): string => {
    const strategy = getStrategy();
    let decision = '';
    
    if (handType === 'hard' && playerHand.value in strategy.hard) {
      decision = strategy.hard[playerHand.value][dealerUpcard];
    } else if (handType === 'soft' && playerHand.value in strategy.soft) {
      decision = strategy.soft[playerHand.value][dealerUpcard];
    } else if (handType === 'pair' && playerHand.value in strategy.pairs) {
      decision = strategy.pairs[playerHand.value][dealerUpcard];
    }
    
    return expandDecision(decision);
  };

  // Expand abbreviated decisions to full text
  const expandDecision = (code: string): string => {
    switch (code) {
      case 'H': return 'Hit';
      case 'S': return 'Stand';
      case 'D': return 'Double if allowed, otherwise Hit';
      case 'Dh': return 'Double if allowed, otherwise Hit';
      case 'Ds': return 'Double if allowed, otherwise Stand';
      case 'P': return 'Split';
      case 'Ph': return 'Split, if Double after Split not allowed then Hit';
      case 'Ps': return 'Split, if Double after Split not allowed then Stand';
      case 'Rh': return surrender ? 'Surrender if allowed, otherwise Hit' : 'Hit';
      case 'Rs': return surrender ? 'Surrender if allowed, otherwise Stand' : 'Stand';
      default: return 'Unknown decision';
    }
  };

  // Calculate optimal decision when user clicks
  const calculateOptimalDecision = () => {
    const optimalDecision = getDecision();
    setDecision(optimalDecision);
    
    toast({
      title: "Optimal Play",
      description: `The optimal play is to ${optimalDecision.toLowerCase()}.`
    });
  };

  // Get color for decision cell
  const getDecisionColor = (decision: DecisionType): string => {
    if (decision.startsWith('H')) return 'bg-red-100';
    if (decision.startsWith('S')) return 'bg-green-100';
    if (decision.startsWith('D')) return 'bg-blue-100';
    if (decision.startsWith('P')) return 'bg-purple-100';
    if (decision.startsWith('R')) return 'bg-yellow-100';
    return '';
  };

  // Get hard totals options
  const getHardTotals = () => {
    return [
      { value: '8-', label: '8 or Less' },
      { value: '9', label: '9' },
      { value: '10', label: '10' },
      { value: '11', label: '11' },
      { value: '12', label: '12' },
      { value: '13', label: '13' },
      { value: '14', label: '14' },
      { value: '15', label: '15' },
      { value: '16', label: '16' },
      { value: '17+', label: '17 or More' }
    ];
  };

  // Get soft totals options
  const getSoftTotals = () => {
    return [
      { value: 'A,2', label: 'A,2 (Soft 13)' },
      { value: 'A,3', label: 'A,3 (Soft 14)' },
      { value: 'A,4', label: 'A,4 (Soft 15)' },
      { value: 'A,5', label: 'A,5 (Soft 16)' },
      { value: 'A,6', label: 'A,6 (Soft 17)' },
      { value: 'A,7', label: 'A,7 (Soft 18)' },
      { value: 'A,8', label: 'A,8 (Soft 19)' },
      { value: 'A,9', label: 'A,9 (Soft 20)' }
    ];
  };

  // Get pairs options
  const getPairTotals = () => {
    return [
      { value: '2,2', label: '2,2' },
      { value: '3,3', label: '3,3' },
      { value: '4,4', label: '4,4' },
      { value: '5,5', label: '5,5' },
      { value: '6,6', label: '6,6' },
      { value: '7,7', label: '7,7' },
      { value: '8,8', label: '8,8' },
      { value: '9,9', label: '9,9' },
      { value: '10,10', label: '10,10' },
      { value: 'A,A', label: 'A,A' }
    ];
  };

  // Reset player hand value when hand type changes
  useEffect(() => {
    if (handType === 'hard') {
      setPlayerHand({ value: '17+' });
    } else if (handType === 'soft') {
      setPlayerHand({ value: 'A,7' });
    } else if (handType === 'pair') {
      setPlayerHand({ value: '8,8' });
    }
  }, [handType]);

  return (
    <div className="space-y-8">
      <Tabs defaultValue="calculator" onValueChange={(value) => setSelectedTab(value as 'calculator' | 'chart')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="chart">Strategy Charts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator" className="space-y-6">
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Game Rules</h3>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="dealer-rule">Dealer Stands On</Label>
                    <Select value={rules} onValueChange={(value: 'h17' | 's17') => setRules(value)}>
                      <SelectTrigger id="dealer-rule">
                        <SelectValue placeholder="Select dealer rule" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="h17">H17 (Hits Soft 17)</SelectItem>
                        <SelectItem value="s17">S17 (Stands on All 17s)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="decks">Number of Decks</Label>
                    <Select value={decks} onValueChange={(value: '1' | '2' | '4-8') => setDecks(value)}>
                      <SelectTrigger id="decks">
                        <SelectValue placeholder="Select number of decks" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Single Deck</SelectItem>
                        <SelectItem value="2">Double Deck</SelectItem>
                        <SelectItem value="4-8">4-8 Decks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="double-after-split"
                      checked={doubleAfterSplit}
                      onChange={() => setDoubleAfterSplit(!doubleAfterSplit)}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                    />
                    <Label htmlFor="double-after-split">Double After Split Allowed</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="surrender"
                      checked={surrender}
                      onChange={() => setSurrender(!surrender)}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                    />
                    <Label htmlFor="surrender">Surrender Allowed</Label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Your Hand</h3>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="hand-type">Hand Type</Label>
                    <Select value={handType} onValueChange={(value: 'hard' | 'soft' | 'pair') => setHandType(value)}>
                      <SelectTrigger id="hand-type">
                        <SelectValue placeholder="Select hand type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hard">Hard Total (No Ace or Ace Counted as 1)</SelectItem>
                        <SelectItem value="soft">Soft Total (Ace Counted as 11)</SelectItem>
                        <SelectItem value="pair">Pair (Two Cards of Same Rank)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="player-hand">Player's Hand</Label>
                    <Select 
                      value={playerHand.value} 
                      onValueChange={(value) => setPlayerHand({ value })}
                    >
                      <SelectTrigger id="player-hand">
                        <SelectValue placeholder="Select player's hand" />
                      </SelectTrigger>
                      <SelectContent>
                        {handType === 'hard' && getHardTotals().map(option => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                        {handType === 'soft' && getSoftTotals().map(option => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                        {handType === 'pair' && getPairTotals().map(option => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="dealer-upcard">Dealer's Upcard</Label>
                    <Select value={dealerUpcard} onValueChange={(value: DealerUpcard) => setDealerUpcard(value)}>
                      <SelectTrigger id="dealer-upcard">
                        <SelectValue placeholder="Select dealer's upcard" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="6">6</SelectItem>
                        <SelectItem value="7">7</SelectItem>
                        <SelectItem value="8">8</SelectItem>
                        <SelectItem value="9">9</SelectItem>
                        <SelectItem value="10">10, J, Q, or K</SelectItem>
                        <SelectItem value="A">Ace</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button onClick={calculateOptimalDecision} className="w-full mt-4">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Optimal Decision
                  </Button>
                </div>
              </div>
            </div>
            
            {decision && (
              <div className="mt-6 p-4 bg-slate-50 rounded-md border">
                <h3 className="text-lg font-semibold mb-2">Optimal Decision</h3>
                <div className="flex items-center">
                  <Hand className="h-5 w-5 mr-2 text-purple-600" />
                  <span className="text-xl font-medium">{decision}</span>
                </div>
                <p className="mt-2 text-sm text-gray-700">
                  This is the mathematically optimal play based on the current game rules and your hand.
                </p>
              </div>
            )}
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Understanding Blackjack Decisions</h3>
            <div className="prose prose-slate max-w-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-red-100 rounded-md">
                  <p className="font-medium">Hit (H)</p>
                  <p className="text-sm">Request another card. Use when your hand is weak and unlikely to win without improvement.</p>
                </div>
                <div className="p-3 bg-green-100 rounded-md">
                  <p className="font-medium">Stand (S)</p>
                  <p className="text-sm">Take no more cards. Use when your hand is strong or when dealer is likely to bust.</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-md">
                  <p className="font-medium">Double Down (D)</p>
                  <p className="text-sm">Double your bet and receive exactly one more card. Use when you have advantage.</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-md">
                  <p className="font-medium">Split (P)</p>
                  <p className="text-sm">Split pair into two hands, matching the original bet. Use for pairs with advantage.</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-md">
                  <p className="font-medium">Surrender (R)</p>
                  <p className="text-sm">Give up half your bet and end the hand. Use when chance of winning is less than 25%.</p>
                </div>
              </div>
              
              <p>
                Basic strategy is the mathematically optimal way to play each hand in blackjack.
                It's calculated based on millions of simulated hands and considers:
              </p>
              
              <ul>
                <li>The player's hand (both cards known to the player)</li>
                <li>The dealer's upcard (the one visible card)</li>
                <li>Specific rules of the game being played</li>
              </ul>
              
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mt-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-amber-800">Important Note</h4>
                    <p className="text-sm text-amber-800">
                      Basic strategy reduces the house edge to approximately 0.5% under typical rules, but doesn't guarantee 
                      you'll win any specific hand or session. It ensures optimal decisions over the long run.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="chart" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-purple-600" />
              Blackjack Basic Strategy Charts
            </h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-700 mb-3">
                These strategy charts show the optimal play for each possible hand. The charts change based on your selected game rules.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
                <div className="p-2 bg-red-100 rounded text-center">
                  <span className="font-medium">H = Hit</span>
                </div>
                <div className="p-2 bg-green-100 rounded text-center">
                  <span className="font-medium">S = Stand</span>
                </div>
                <div className="p-2 bg-blue-100 rounded text-center">
                  <span className="font-medium">D = Double</span>
                </div>
                <div className="p-2 bg-purple-100 rounded text-center">
                  <span className="font-medium">P = Split</span>
                </div>
                <div className="p-2 bg-yellow-100 rounded text-center">
                  <span className="font-medium">R = Surrender</span>
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="hard-totals">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="hard-totals">Hard Totals</TabsTrigger>
                <TabsTrigger value="soft-totals">Soft Totals</TabsTrigger>
                <TabsTrigger value="pairs">Pairs</TabsTrigger>
              </TabsList>
              
              <TabsContent value="hard-totals" className="mt-4">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-28">Player Hand</TableHead>
                        {['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A'].map(card => (
                          <TableHead key={card} className="text-center">
                            {card}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.keys(getStrategy().hard).map(hand => (
                        <TableRow key={hand}>
                          <TableCell className="font-medium">
                            {hand === '8-' ? '8 or less' : hand === '17+' ? '17+' : hand}
                          </TableCell>
                          {['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A'].map(card => {
                            const decision = getStrategy().hard[hand][card as DealerUpcard];
                            return (
                              <TableCell 
                                key={card} 
                                className={`text-center ${getDecisionColor(decision)}`}
                              >
                                {decision}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="soft-totals" className="mt-4">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-28">Player Hand</TableHead>
                        {['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A'].map(card => (
                          <TableHead key={card} className="text-center">
                            {card}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.keys(getStrategy().soft).map(hand => (
                        <TableRow key={hand}>
                          <TableCell className="font-medium">{hand}</TableCell>
                          {['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A'].map(card => {
                            const decision = getStrategy().soft[hand][card as DealerUpcard];
                            return (
                              <TableCell 
                                key={card} 
                                className={`text-center ${getDecisionColor(decision)}`}
                              >
                                {decision}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="pairs" className="mt-4">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-28">Player Pair</TableHead>
                        {['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A'].map(card => (
                          <TableHead key={card} className="text-center">
                            {card}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.keys(getStrategy().pairs).map(hand => (
                        <TableRow key={hand}>
                          <TableCell className="font-medium">{hand}</TableCell>
                          {['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A'].map(card => {
                            const decision = getStrategy().pairs[hand][card as DealerUpcard];
                            return (
                              <TableCell 
                                key={card} 
                                className={`text-center ${getDecisionColor(decision)}`}
                              >
                                {decision}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Strategy Variations by Rules</h3>
            <div className="prose prose-slate max-w-none">
              <p>
                Blackjack strategy varies slightly depending on the specific rules of the game. Here are some key variations:
              </p>
              
              <div className="space-y-3 mt-4">
                <div className="flex items-start">
                  <ChevronsUpDown className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Dealer Hits vs. Stands on Soft 17</h4>
                    <p className="text-sm text-gray-700">
                      When the dealer stands on soft 17 (S17), it's slightly better for the player. With H17 rules (dealer hits), 
                      you should make some adjustments, especially with soft hands against an Ace.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <ChevronsUpDown className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Number of Decks</h4>
                    <p className="text-sm text-gray-700">
                      Fewer decks benefit the player. In single-deck games, you can be more aggressive with doubling 11 against 
                      an Ace and splitting certain pairs.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <ChevronsUpDown className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Double After Split</h4>
                    <p className="text-sm text-gray-700">
                      When double after split is allowed, splitting becomes more advantageous for certain hands, 
                      particularly pairs of 2s, 3s, or 6s.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <ChevronsUpDown className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Surrender Option</h4>
                    <p className="text-sm text-gray-700">
                      When surrender is available, it's optimal to surrender certain hard 15 and 16 hands against strong 
                      dealer upcards, rather than playing them out.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mt-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-amber-800">Note on Card Counting</h4>
                    <p className="text-sm text-amber-800">
                      These strategy charts assume a neutral count and do not account for card counting techniques. 
                      With card counting, optimal strategy can vary based on the current count.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BlackjackStrategyCalculator;
