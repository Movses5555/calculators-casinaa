
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, RefreshCw, ArrowRightLeft } from "lucide-react";

const OddsConverter: React.FC = () => {
  const [decimal, setDecimal] = useState<string>("");
  const [fractional, setFractional] = useState<string>("");
  const [american, setAmerican] = useState<string>("");
  const [implied, setImplied] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("decimal");

  const convertFromDecimal = (value: number) => {
    if (isNaN(value) || value <= 0) return;

    // Convert to American
    let americanValue: number;
    if (value >= 2) {
      americanValue = (value - 1) * 100;
    } else {
      americanValue = -100 / (value - 1);
    }
    setAmerican(Math.round(americanValue).toString());

    // Convert to fractional
    const decimal = value - 1;
    let numerator = decimal;
    let denominator = 1;
    // Find a common fraction representation
    const precision = 0.001; // Desired precision
    for (let i = 1; i <= 100; i++) {
      const testNumerator = Math.round(decimal * i);
      const testVal = testNumerator / i;
      if (Math.abs(testVal - decimal) < precision) {
        numerator = testNumerator;
        denominator = i;
        break;
      }
    }
    setFractional(`${numerator}/${denominator}`);

    // Convert to implied probability
    const impliedProb = (1 / value) * 100;
    setImplied(impliedProb.toFixed(2));
  };

  const convertFromFractional = (fractionalStr: string) => {
    if (!fractionalStr.includes('/')) return;

    const [numerator, denominator] = fractionalStr.split('/').map(Number);
    if (isNaN(numerator) || isNaN(denominator) || denominator === 0) return;

    const decimalValue = (numerator / denominator) + 1;
    setDecimal(decimalValue.toFixed(2));
    convertFromDecimal(decimalValue);
  };

  const convertFromAmerican = (americanStr: string) => {
    const americanValue = Number(americanStr);
    if (isNaN(americanValue)) return;

    let decimalValue: number;
    if (americanValue > 0) {
      decimalValue = (americanValue / 100) + 1;
    } else {
      decimalValue = (100 / Math.abs(americanValue)) + 1;
    }
    setDecimal(decimalValue.toFixed(2));
    convertFromDecimal(decimalValue);
  };

  const convertFromImplied = (impliedStr: string) => {
    const impliedValue = Number(impliedStr);
    if (isNaN(impliedValue) || impliedValue <= 0 || impliedValue >= 100) return;

    const decimalValue = 100 / impliedValue;
    setDecimal(decimalValue.toFixed(2));
    convertFromDecimal(decimalValue);
  };

  const handleConvert = () => {
    switch (activeTab) {
      case "decimal":
        convertFromDecimal(Number(decimal));
        break;
      case "fractional":
        convertFromFractional(fractional);
        break;
      case "american":
        convertFromAmerican(american);
        break;
      case "implied":
        convertFromImplied(implied);
        break;
    }
  };

  const handleReset = () => {
    setDecimal("");
    setFractional("");
    setAmerican("");
    setImplied("");
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-6 w-6" />
            Sports Betting Odds Converter
          </CardTitle>
          <CardDescription>
            Convert between decimal, fractional, American, and implied probability odds formats
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="decimal">Decimal</TabsTrigger>
              <TabsTrigger value="fractional">Fractional</TabsTrigger>
              <TabsTrigger value="american">American</TabsTrigger>
              <TabsTrigger value="implied">Implied %</TabsTrigger>
            </TabsList>
            
            <div className="mt-6 space-y-4">
              <TabsContent value="decimal">
                <div className="space-y-2">
                  <Label htmlFor="decimal-odds">Decimal Odds</Label>
                  <Input
                    id="decimal-odds"
                    type="number"
                    step="0.01"
                    min="1.01"
                    placeholder="e.g., 2.50"
                    value={decimal}
                    onChange={(e) => setDecimal(e.target.value)}
                  />
                  <p className="text-sm text-gray-500">Enter a value greater than 1.00</p>
                </div>
              </TabsContent>
              
              <TabsContent value="fractional">
                <div className="space-y-2">
                  <Label htmlFor="fractional-odds">Fractional Odds</Label>
                  <Input
                    id="fractional-odds"
                    placeholder="e.g., 3/2 or 1/5"
                    value={fractional}
                    onChange={(e) => setFractional(e.target.value)}
                  />
                  <p className="text-sm text-gray-500">Enter in format like "3/1" or "1/5"</p>
                </div>
              </TabsContent>
              
              <TabsContent value="american">
                <div className="space-y-2">
                  <Label htmlFor="american-odds">American Odds</Label>
                  <Input
                    id="american-odds"
                    type="number"
                    placeholder="e.g., +150 or -200"
                    value={american}
                    onChange={(e) => setAmerican(e.target.value)}
                  />
                  <p className="text-sm text-gray-500">Enter a positive or negative value (e.g. +150 or -200)</p>
                </div>
              </TabsContent>
              
              <TabsContent value="implied">
                <div className="space-y-2">
                  <Label htmlFor="implied-odds">Implied Probability (%)</Label>
                  <Input
                    id="implied-odds"
                    type="number"
                    step="0.1"
                    min="0.1"
                    max="99.9"
                    placeholder="e.g., 40.0"
                    value={implied}
                    onChange={(e) => setImplied(e.target.value)}
                  />
                  <p className="text-sm text-gray-500">Enter a percentage between 0.1 and 99.9</p>
                </div>
              </TabsContent>
              
              <div className="flex space-x-2 pt-4">
                <Button 
                  onClick={handleConvert} 
                  className="flex-1"
                >
                  <ArrowRightLeft className="mr-2 h-4 w-4" />
                  Convert
                </Button>
                <Button 
                  onClick={handleReset} 
                  variant="outline" 
                  className="flex-1"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conversion Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm font-medium">Decimal Odds</p>
              <p className="text-2xl font-bold">{decimal || "—"}</p>
            </div>
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm font-medium">Fractional Odds</p>
              <p className="text-2xl font-bold">{fractional || "—"}</p>
            </div>
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm font-medium">American Odds</p>
              <p className="text-2xl font-bold">{american ? (Number(american) > 0 ? `+${american}` : american) : "—"}</p>
            </div>
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm font-medium">Implied Probability</p>
              <p className="text-2xl font-bold">{implied ? `${implied}%` : "—"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>Understanding Betting Odds</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Decimal Odds (European)</h3>
              <p className="text-sm">Represents the amount you win for every $1 wagered, including your stake. E.g., odds of 2.50 means a $100 bet would return $250 ($150 profit plus $100 stake).</p>
            </div>
            <div>
              <h3 className="font-medium">Fractional Odds (UK)</h3>
              <p className="text-sm">Shows the profit relative to your stake. E.g., 3/1 means you win $3 for every $1 wagered (plus your stake back).</p>
            </div>
            <div>
              <h3 className="font-medium">American Odds (US)</h3>
              <p className="text-sm">For favorites (negative numbers): Shows how much you need to bet to win $100. E.g., -200 means you must bet $200 to win $100.<br/>
              For underdogs (positive numbers): Shows how much you win if you bet $100. E.g., +150 means a $100 bet wins $150.</p>
            </div>
            <div>
              <h3 className="font-medium">Implied Probability</h3>
              <p className="text-sm">The conversion of odds to a percentage, showing the implied chance of an outcome occurring according to the bookmaker.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OddsConverter;
