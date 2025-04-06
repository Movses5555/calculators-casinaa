
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Calculator, DollarSign, Percent, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const KellyCriterionCalculator: React.FC = () => {
  const [bankroll, setBankroll] = useState<string>("1000");
  const [odds, setOdds] = useState<string>("2.00");
  const [oddsFormat, setOddsFormat] = useState<string>("decimal");
  const [winProbability, setWinProbability] = useState<number>(55);
  const [kellyFraction, setKellyFraction] = useState<number>(100);

  // Convert odds to decimal format
  const getDecimalOdds = (): number => {
    const oddsValue = parseFloat(odds);
    
    switch (oddsFormat) {
      case "decimal":
        return oddsValue > 1 ? oddsValue : 0;
        
      case "american":
        if (isNaN(oddsValue)) return 0;
        return oddsValue > 0 
          ? 1 + (oddsValue / 100) 
          : 1 + (100 / Math.abs(oddsValue));
        
      case "fractional": {
        if (!odds.includes('/')) return 0;
        const [numerator, denominator] = odds.split('/').map(Number);
        if (isNaN(numerator) || isNaN(denominator) || denominator === 0) return 0;
        return 1 + (numerator / denominator);
      }
      default:
        return 0;
    }
  };

  // Calculate Kelly Criterion
  const calculateKelly = (): number => {
    const decimalOdds = getDecimalOdds();
    if (decimalOdds <= 1) return 0;
    
    const probability = winProbability / 100;
    const lossProbability = 1 - probability;
    
    // Kelly formula: (bp - q) / b
    // where b = decimal odds - 1, p = probability of win, q = probability of loss
    const b = decimalOdds - 1;
    const kellyPercentage = ((b * probability) - lossProbability) / b;
    
    // Apply the kelly fraction (for conservative betting)
    return Math.max(0, kellyPercentage * (kellyFraction / 100));
  };

  const kellyPercentage = calculateKelly();
  const betAmount = (parseFloat(bankroll) * kellyPercentage) || 0;
  const isNegativeEV = kellyPercentage <= 0;

  // Format odds for display
  const formatOddsForDisplay = (): string => {
    const decimalOdds = getDecimalOdds();
    if (decimalOdds <= 1) return "Invalid odds";
    
    switch (oddsFormat) {
      case "decimal":
        return decimalOdds.toFixed(2);
        
      case "american": {
        const americanOdds = parseFloat(odds);
        return americanOdds > 0 ? `+${americanOdds}` : `${americanOdds}`;
      }
        
      case "fractional":
        return odds;
        
      default:
        return "Invalid format";
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-6 w-6" />
            Kelly Criterion Calculator
          </CardTitle>
          <CardDescription>
            Calculate the optimal bet size to maximize long-term growth of your bankroll
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="bankroll">Current Bankroll</Label>
            <div className="relative mt-1.5">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <DollarSign className="h-4 w-4" />
              </span>
              <Input
                id="bankroll"
                type="number"
                min="0"
                step="1"
                className="pl-8"
                placeholder="Enter your bankroll amount"
                value={bankroll}
                onChange={(e) => setBankroll(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Betting Odds Format</Label>
              <Select
                value={oddsFormat}
                onValueChange={setOddsFormat}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="decimal">Decimal (e.g., 2.50)</SelectItem>
                  <SelectItem value="american">American (e.g., +150, -200)</SelectItem>
                  <SelectItem value="fractional">Fractional (e.g., 3/2)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="odds">Betting Odds</Label>
              <Input
                id="odds"
                placeholder={oddsFormat === "fractional" ? "e.g., 3/1" : "Enter odds"}
                value={odds}
                onChange={(e) => setOdds(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                {oddsFormat === "decimal" ? "Must be greater than 1.00" : 
                 oddsFormat === "american" ? "E.g., +150 for favorites, -200 for underdogs" :
                 "Format as numerator/denominator (e.g., 3/1)"}
              </p>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center">
              <Label htmlFor="win-probability">Win Probability: {winProbability}%</Label>
              <span className="text-sm font-medium">{winProbability}%</span>
            </div>
            <Slider
              id="win-probability"
              min={1}
              max={99}
              step={1}
              value={[winProbability]}
              onValueChange={(value) => setWinProbability(value[0])}
              className="mt-2"
            />
            <p className="text-xs text-gray-500 mt-1">
              Your estimated probability that this bet will win
            </p>
          </div>
          
          <div>
            <div className="flex justify-between items-center">
              <Label htmlFor="kelly-fraction">Kelly Fraction: {kellyFraction}%</Label>
              <span className="text-sm font-medium">{kellyFraction}%</span>
            </div>
            <Slider
              id="kelly-fraction"
              min={1}
              max={100}
              step={1}
              value={[kellyFraction]}
              onValueChange={(value) => setKellyFraction(value[0])}
              className="mt-2"
            />
            <p className="text-xs text-gray-500 mt-1">
              Many bettors use a fraction of the Kelly Criterion (e.g., 50%) to reduce variance
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Kelly Criterion Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isNegativeEV && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This bet has negative expected value. The Kelly Criterion suggests not placing this bet.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm font-medium">Odds</p>
              <p className="text-2xl font-bold">{formatOddsForDisplay()}</p>
              <p className="text-xs text-gray-500">
                {oddsFormat === "decimal" ? "Decimal format" : 
                 oddsFormat === "american" ? "American format" : 
                 "Fractional format"}
              </p>
            </div>
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm font-medium">Win Probability</p>
              <p className="text-2xl font-bold">{winProbability}%</p>
              <p className="text-xs text-gray-500">Your estimated chance of winning</p>
            </div>
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm font-medium">Kelly Percentage</p>
              <p className="text-2xl font-bold flex items-center">
                {kellyPercentage <= 0 ? "0.00" : (kellyPercentage * 100).toFixed(2)}
                <Percent className="h-4 w-4 ml-1" />
              </p>
              <p className="text-xs text-gray-500">{kellyFraction < 100 ? `${kellyFraction}% of full Kelly` : "Full Kelly"}</p>
            </div>
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm font-medium">Recommended Bet</p>
              <p className="text-2xl font-bold">${betAmount.toFixed(2)}</p>
              <p className="text-xs text-gray-500">
                {isNegativeEV ? "Not recommended" : `${kellyPercentage <= 0 ? "0.00" : (kellyPercentage * 100).toFixed(2)}% of bankroll`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>The Kelly Criterion Explained</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">What is the Kelly Criterion?</h3>
            <p className="text-sm">The Kelly Criterion is a formula that determines the optimal size of a series of bets to maximize long-term growth. It was developed by John L. Kelly Jr. while working at Bell Labs in 1956.</p>
          </div>
          <div>
            <h3 className="font-medium">The Formula</h3>
            <p className="text-sm">The Kelly formula is: (bp - q) / b<br/>
            Where:<br/>
            b = the decimal odds - 1 (or your net winnings expressed as a fraction of your stake)<br/>
            p = the probability of winning<br/>
            q = the probability of losing (1 - p)</p>
          </div>
          <div>
            <h3 className="font-medium">Fractional Kelly</h3>
            <p className="text-sm">Many professionals use a fraction of the Kelly bet (like 1/2 or 1/4) to reduce variance while still growing their bankroll. This is known as "Fractional Kelly" betting.</p>
          </div>
          <div>
            <h3 className="font-medium">Limitations</h3>
            <p className="text-sm">The Kelly Criterion assumes you know the exact probability of winning, which is rarely the case in real-world betting. It also assumes your edge is static and doesn't account for psychological factors.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KellyCriterionCalculator;
