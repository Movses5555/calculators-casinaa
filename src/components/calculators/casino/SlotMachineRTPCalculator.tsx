
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calculator, AlertCircle, Percent, DollarSign, Timer, TrendingDown } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Slider } from '@/components/ui/slider';

const SlotMachineRTPCalculator: React.FC = () => {
  const [rtpPercentage, setRtpPercentage] = useState<number>(92);
  const [betAmount, setBetAmount] = useState<string>('1');
  const [spinsPerHour, setSpinsPerHour] = useState<string>('600');
  const [hoursPlayed, setHoursPlayed] = useState<string>('4');
  const [volatility, setVolatility] = useState<'low' | 'medium' | 'high'>('medium');
  
  const calculateRTP = () => {
    const bet = parseFloat(betAmount);
    const spins = parseFloat(spinsPerHour);
    const hours = parseFloat(hoursPlayed);
    
    if (isNaN(bet) || bet <= 0 || isNaN(spins) || spins <= 0 || isNaN(hours) || hours <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid positive numbers for all fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Calculation Complete",
      description: `Expected loss over ${hours} hours: $${expectedLoss.toFixed(2)}`,
    });
  };

  // Calculations
  const bet = parseFloat(betAmount) || 1;
  const spins = parseFloat(spinsPerHour) || 600;
  const hours = parseFloat(hoursPlayed) || 4;
  const totalSpins = spins * hours;
  const totalWagered = bet * totalSpins;
  const houseEdge = (100 - rtpPercentage) / 100;
  const expectedLoss = totalWagered * houseEdge;
  const expectedReturn = totalWagered * (rtpPercentage / 100);
  
  // Volatility adjustment for standard deviation
  const getVolatilityMultiplier = () => {
    switch (volatility) {
      case 'low': return 3;
      case 'medium': return 6;
      case 'high': return 10;
      default: return 6;
    }
  };
  
  const volatilityMultiplier = getVolatilityMultiplier();
  const standardDeviation = Math.sqrt(totalSpins) * volatilityMultiplier * bet * (houseEdge / 3);
  
  // Probability of breaking even or winning
  const zScore = expectedLoss / standardDeviation;
  const probabilityOfProfit = 1 - normalCDF(zScore);
  
  // Normal cumulative distribution function (approximation)
  function normalCDF(x: number): number {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp(-x * x / 2);
    const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    if (x > 0) return 1 - p;
    return p;
  }

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Slot Machine Settings</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between">
                  <Label htmlFor="rtp-percentage">Return to Player (RTP)</Label>
                  <span className="text-sm font-medium">{rtpPercentage}%</span>
                </div>
                <Slider
                  id="rtp-percentage"
                  value={[rtpPercentage]}
                  min={80}
                  max={99}
                  step={0.5}
                  onValueChange={(values) => setRtpPercentage(values[0])}
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">Typical slot machines have 85-98% RTP</p>
              </div>
              
              <div>
                <Label htmlFor="bet-amount">Bet Amount Per Spin</Label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="bet-amount"
                    type="number"
                    min="0.01"
                    step="0.25"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="spins-per-hour">Spins Per Hour</Label>
                <div className="relative mt-1">
                  <Timer className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="spins-per-hour"
                    type="number"
                    min="1"
                    max="1200"
                    value={spinsPerHour}
                    onChange={(e) => setSpinsPerHour(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Average is 400-800 spins per hour</p>
              </div>
              
              <div>
                <Label htmlFor="hours-played">Hours Played</Label>
                <Input
                  id="hours-played"
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={hoursPlayed}
                  onChange={(e) => setHoursPlayed(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="volatility">Slot Volatility/Variance</Label>
                <Select 
                  value={volatility} 
                  onValueChange={(value: 'low' | 'medium' | 'high') => setVolatility(value)}
                >
                  <SelectTrigger id="volatility" className="w-full mt-1">
                    <SelectValue placeholder="Select volatility" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="low">Low (Frequent Small Wins)</SelectItem>
                    <SelectItem value="medium">Medium (Balanced)</SelectItem>
                    <SelectItem value="high">High (Rare Big Wins)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">Higher volatility means more risk but bigger potential payouts</p>
              </div>
              
              <Button onClick={calculateRTP} className="w-full">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Expected Returns
              </Button>
            </div>
          </div>
          
          <div className="bg-slate-50 p-5 rounded-lg space-y-6">
            <h3 className="text-lg font-semibold flex items-center">
              <Percent className="mr-2 h-5 w-5 text-green-600" />
              RTP Analysis Results
            </h3>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm text-gray-500">Total Spins</p>
                  <p className="text-lg font-medium">{totalSpins.toLocaleString()}</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm text-gray-500">Total Wagered</p>
                  <p className="text-lg font-medium">${totalWagered.toFixed(2)}</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm text-gray-500">Expected Return</p>
                  <p className="text-lg font-medium">${expectedReturn.toFixed(2)}</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm text-gray-500">Expected Loss</p>
                  <p className="text-lg font-medium text-red-600">-${expectedLoss.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded border">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">House Edge:</span>
                  <span className="text-sm font-bold text-red-600">{houseEdge * 100}%</span>
                </div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-500 rounded-full" 
                    style={{ width: `${houseEdge * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm font-medium text-gray-700">Return to Player:</span>
                  <span className="text-sm font-bold text-green-600">{rtpPercentage}%</span>
                </div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full" 
                    style={{ width: `${rtpPercentage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">Cost per Hour of Play:</p>
                  <p className="text-md font-medium text-red-600">
                    ${(expectedLoss / hours).toFixed(2)}/hr
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">Chance of Breaking Even or Winning:</p>
                  <p className="text-md font-medium text-amber-600">
                    {(probabilityOfProfit * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium">Important Note:</p>
                  <p className="mt-1">
                    This calculator provides statistical expectations based on the RTP percentage. Individual 
                    sessions may vary significantly due to the random nature of slots and their volatility.
                    In the short term, your actual results could be very different from these calculations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <TrendingDown className="mr-2 h-5 w-5 text-green-600" />
          RTP by Casino Type
        </h3>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Casino Type</TableHead>
              <TableHead>Typical RTP Range</TableHead>
              <TableHead>House Edge</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Land-Based Casino (Las Vegas Strip)</TableCell>
              <TableCell>88% - 92%</TableCell>
              <TableCell>8% - 12%</TableCell>
              <TableCell>Higher minimum bets, usually $1 or more</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Land-Based Casino (Downtown/Off-Strip)</TableCell>
              <TableCell>90% - 95%</TableCell>
              <TableCell>5% - 10%</TableCell>
              <TableCell>Often better odds than Strip casinos</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Online Casinos</TableCell>
              <TableCell>94% - 98%</TableCell>
              <TableCell>2% - 6%</TableCell>
              <TableCell>Generally better RTP due to lower operating costs</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Video Poker</TableCell>
              <TableCell>96% - 99.5%</TableCell>
              <TableCell>0.5% - 4%</TableCell>
              <TableCell>Among the best odds in the casino with optimal play</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Progressive Jackpot Slots</TableCell>
              <TableCell>88% - 94%</TableCell>
              <TableCell>6% - 12%</TableCell>
              <TableCell>Base RTP is lower; jackpot contribution increases overall RTP</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Understanding Slot Machine RTP</h3>
        <div className="prose prose-slate max-w-none">
          <p>
            Return to Player (RTP) is a percentage that indicates how much of all wagered money a slot machine 
            will pay back to players over time. For example, a slot with a 95% RTP will, on average, return $95 
            for every $100 wagered.
          </p>
          
          <h4 className="mt-4 font-medium">How RTP Works</h4>
          <p>
            It's important to understand that RTP is calculated over millions of spins. In the short term, you could experience results 
            significantly different from the theoretical RTP. This is due to the variance (volatility) of the game and the random 
            nature of slot outcomes.
          </p>
          
          <h4 className="mt-4 font-medium">Volatility and Its Impact</h4>
          <p>
            Volatility (or variance) measures how much and how often a slot pays:
          </p>
          <ul>
            <li><strong>Low volatility slots</strong> offer frequent but smaller wins, providing a steadier gameplay experience.</li>
            <li><strong>Medium volatility slots</strong> balance between win frequency and payout size.</li>
            <li><strong>High volatility slots</strong> pay less frequently but offer the chance for larger wins, leading to more significant bankroll swings.</li>
          </ul>
          
          <h4 className="mt-4 font-medium">RTP vs. House Edge</h4>
          <p>
            House edge is simply 100% minus the RTP. For example, a slot with a 94% RTP has a 6% house edge, 
            meaning the casino expects to keep 6% of all money wagered on that machine in the long run.
          </p>
          
          <h4 className="mt-4 font-medium">Finding High RTP Slots</h4>
          <p>
            Many online casinos publish the RTP for their slot games. Land-based casinos typically do not display this 
            information openly, but you can often find it online. Generally, online slots offer higher RTPs than their 
            physical counterparts.
          </p>
          
          <div className="bg-green-50 border border-green-200 rounded-md p-4 mt-4">
            <h4 className="font-medium text-green-800 flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              Responsible Gambling Tip
            </h4>
            <p className="text-green-800 text-sm">
              Always set a budget before you play and stick to it. Remember that even with high RTP slots, 
              the house always has an edge in the long run. Play for entertainment, not as a way to make money.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SlotMachineRTPCalculator;
