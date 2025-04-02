
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

const EVCalculator: React.FC = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-6 w-6" />
            Expected Value (EV) Calculator
          </CardTitle>
          <CardDescription>
            Calculate the expected value of your sports bets to make profitable betting decisions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-6 rounded-md text-center space-y-4">
            <h3 className="text-lg font-medium">Coming Soon</h3>
            <p>
              Our Expected Value Calculator is under development and will be available soon.
              Please check back later for this feature.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EVCalculator;
