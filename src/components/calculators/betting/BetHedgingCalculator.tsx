
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

const BetHedgingCalculator: React.FC = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-6 w-6" />
            Bet Hedging Calculator
          </CardTitle>
          <CardDescription>
            Calculate how to hedge your bets to guarantee profit or minimize loss
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-6 rounded-md text-center space-y-4">
            <h3 className="text-lg font-medium">Coming Soon</h3>
            <p>
              Our Bet Hedging Calculator is under development and will be available soon.
              Please check back later for this feature.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BetHedgingCalculator;
