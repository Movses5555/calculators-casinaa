
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calculator, Percent, DollarSign, BarChart3, Home, Heart, Clock, Divide } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CalculatorItemProps {
  title: string;
  description: string;
  category: string;
  path: string;
  icon: React.ReactNode;
}

const calculatorItems: CalculatorItemProps[] = [
  {
    title: "Percentage Calculator",
    description: "Use our free online percentage calculator for precise results. Learn how to calculate percentages or get quick answers with us.",
    category: "Math",
    path: "/math/percentage-calculator",
    icon: <Percent className="w-5 h-5 text-blue-500" />
  },
  {
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index (BMI) to determine if your weight is in a healthy range for your height.",
    category: "Health",
    path: "/health/bmi-calculator",
    icon: <Heart className="w-5 h-5 text-red-500" />
  },
  {
    title: "Mortgage Calculator",
    description: "Plan your home purchase with our comprehensive mortgage calculator. Adjust parameters to see how they affect your monthly payments.",
    category: "Finance",
    path: "/finance/mortgage-calculator",
    icon: <Home className="w-5 h-5 text-blue-600" />
  },
  {
    title: "Sleep Cycle Calculator",
    description: "Plan your sleep schedule for optimal rest. Find the best times to go to bed or wake up based on sleep cycles.",
    category: "Health",
    path: "/health/sleep-cycle-calculator",
    icon: <Clock className="w-5 h-5 text-purple-500" />
  },
  {
    title: "Simple Budget Planner",
    description: "Create a balanced budget with our easy-to-use calculator. Track income, expenses, and savings targets in one place.",
    category: "Finance",
    path: "/finance/simple-budget-planner",
    icon: <DollarSign className="w-5 h-5 text-green-500" />
  },
  {
    title: "Bill Split Calculator",
    description: "Split restaurant bills, utilities, or group expenses fairly and quickly. Add tax, tip, and individual items with ease.",
    category: "Math",
    path: "/math/bill-split-calculator",
    icon: <Divide className="w-5 h-5 text-orange-500" />
  }
];

const CalculatorItem = ({ item }: { item: CalculatorItemProps }) => {
  return (
    <Card className="h-full hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex flex-col h-full">
          <h3 className="font-semibold text-xl mb-2 flex items-center">
            {item.title}
            <ArrowRight size={16} className="ml-2 text-gray-400" />
          </h3>
          <p className="text-gray-600 text-sm mb-4 flex-grow">
            {item.description}
          </p>
          <div className="mt-auto">
            <div className="flex items-center text-gray-500 text-sm">
              {item.icon}
              <span className="ml-2">{item.category}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const PopularCalculatorsSection = () => {
  return (
    <section className="py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Most Popular Calculators</h2>
          <p className="text-gray-600">Fast and accurate tools for your everyday needs</p>
        </div>
        <Link 
          to="/calculators" 
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <span>View all</span>
          <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {calculatorItems.map((item, index) => (
          <Link key={index} to={item.path}>
            <CalculatorItem item={item} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularCalculatorsSection;
