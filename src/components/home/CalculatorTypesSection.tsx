
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Interfaces for our data structure
interface CalculatorLink {
  name: string;
  path: string;
  isPopular?: boolean;
}

interface CalculatorCategory {
  title: string;
  emoji: string;
  links: CalculatorLink[];
}

// Data for calculator categories
const calculatorCategories: CalculatorCategory[] = [
  {
    title: "Finance Calculators",
    emoji: "💰",
    links: [
      { name: "Mortgage Calculator", path: "/finance/mortgage-calculator", isPopular: true },
      { name: "Savings Goal Tracker", path: "/finance/savings-goal-tracker" },
      { name: "Simple Budget Planner", path: "/finance/simple-budget-planner" },
      { name: "Debt Snowball Tracker", path: "/finance/debt-snowball-tracker" },
    ]
  },
  {
    title: "Mathematics Calculators",
    emoji: "🧮",
    links: [
      { name: "Percentage Calculator", path: "/math/percentage-calculator", isPopular: true },
      { name: "Discount Percentage Finder", path: "/math/discount-percentage-finder" },
      { name: "Number Base Converter", path: "/math/number-base-converter" },
      { name: "Pace Calculator", path: "/math/pace-calculator" },
      { name: "Bill Split Calculator", path: "/math/bill-split-calculator" },
    ]
  },
  {
    title: "Health & Fitness Calculators",
    emoji: "❤️",
    links: [
      { name: "BMI Calculator", path: "/health/bmi-calculator", isPopular: true },
      { name: "Sleep Cycle Calculator", path: "/health/sleep-cycle-calculator" },
      { name: "Calories Burned Calculator", path: "/health/calories-burned-calculator" },
      { name: "Body Fat Percentage Calculator", path: "/health/body-fat-percentage-calculator" },
    ]
  },
  {
    title: "Crypto & Blockchain",
    emoji: "🪙",
    links: [
      { name: "Crypto Profit Calculator", path: "/crypto/crypto-profit-calculator", isPopular: true },
      { name: "Crypto Staking Calculator", path: "/crypto/crypto-staking-calculator" },
      { name: "Mining Profitability", path: "/crypto/mining-profitability-calculator" },
      { name: "ICO ROI Calculator", path: "/crypto/ico-roi-calculator" },
      { name: "Bitcoin Halving Countdown", path: "/crypto/bitcoin-halving-countdown" },
    ]
  },
  {
    title: "Statistics Calculators",
    emoji: "📊",
    links: [
      { name: "Mean, Median, Mode", path: "/" },
      { name: "Standard Deviation", path: "/", isPopular: true },
      { name: "Probability Calculator", path: "/" },
    ]
  },
  {
    title: "Miscellaneous Calculators",
    emoji: "🧩",
    links: [
      { name: "Random Number Generator", path: "/" },
      { name: "Date Calculator", path: "/" },
      { name: "Time Zone Converter", path: "/" },
    ]
  }
];

const CalculatorTypesSection = () => {
  return (
    <section className="py-14 bg-[#2a3642] text-white w-full" aria-labelledby="calculator-categories-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-3 px-3 py-1 text-sm bg-[#58d081] hover:bg-[#48b46c] text-white" variant="outline">Explore Our Collection</Badge>
          <h2 id="calculator-categories-heading" className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4 text-white">
            Calculator Categories
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mt-4">
            Browse through our various calculator categories to find the perfect tool for your needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {calculatorCategories.map((category, index) => (
            <Card 
              key={index} 
              className="group overflow-hidden border-none bg-[#36454f] shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-5">
                  <div className="rounded-full w-16 h-16 flex items-center justify-center bg-[#1e2630]/60 text-4xl shadow-lg">
                    <span role="img" aria-label={category.title}>{category.emoji}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                </div>
                
                <ul className="space-y-1">
                  {category.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        to={link.path} 
                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#1e2630] group/link transition-all duration-200"
                        aria-label={`Go to ${link.name} calculator`}
                      >
                        <span className={`${link.isPopular ? "font-medium text-white" : "text-gray-300"} flex items-center`}>
                          {link.name}
                          {link.isPopular && (
                            <Badge variant="outline" className="ml-2.5 text-xs py-0 border-[#58d081]/40 text-[#58d081]">Popular</Badge>
                          )}
                        </span>
                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover/link:text-white transition-all duration-200 transform group-hover/link:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CalculatorTypesSection;
