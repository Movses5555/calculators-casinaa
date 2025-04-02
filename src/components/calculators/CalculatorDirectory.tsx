import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Heart, DollarSign, Percent, Dice1, Bitcoin, Target, Timer, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

type CalculatorCategory = 'all' | 'finance' | 'health' | 'math' | 'chance' | 'crypto' | 'betting' | 'random';

interface CalculatorItem {
  name: string;
  path: string;
  description: string;
  category: CalculatorCategory;
  icon: React.ReactNode;
  isPopular?: boolean;
}

const calculators: CalculatorItem[] = [
  // Finance Calculators
  {
    name: "Mortgage Calculator",
    path: "/finance/mortgage-calculator",
    description: "Calculate monthly mortgage payments, interest rates, and amortization schedules",
    category: "finance",
    icon: <DollarSign className="h-5 w-5 text-blue-500" />,
    isPopular: true
  },
  {
    name: "Savings Goal Tracker",
    path: "/finance/savings-goal-tracker",
    description: "Set and track financial savings goals with customized plans",
    category: "finance",
    icon: <DollarSign className="h-5 w-5 text-green-500" />,
    isPopular: true
  },
  {
    name: "Simple Budget Planner",
    path: "/finance/simple-budget-planner",
    description: "Create a personal or household budget with income and expense tracking",
    category: "finance",
    icon: <DollarSign className="h-5 w-5 text-emerald-500" />,
    isPopular: true
  },
  {
    name: "Debt Snowball Tracker",
    path: "/finance/debt-snowball-tracker",
    description: "Plan and visualize your debt payoff strategy using the snowball method",
    category: "finance",
    icon: <DollarSign className="h-5 w-5 text-cyan-500" />,
    isPopular: false
  },
  
  // Health Calculators
  {
    name: "BMI Calculator",
    path: "/health/bmi-calculator",
    description: "Calculate your Body Mass Index based on height and weight",
    category: "health",
    icon: <Heart className="h-5 w-5 text-red-500" />,
    isPopular: true
  },
  {
    name: "Sleep Cycle Calculator",
    path: "/health/sleep-cycle-calculator",
    description: "Find optimal sleep and wake times based on natural sleep cycles",
    category: "health",
    icon: <Heart className="h-5 w-5 text-indigo-500" />,
    isPopular: true
  },
  {
    name: "Calories Burned Calculator",
    path: "/health/calories-burned-calculator",
    description: "Estimate calories burned during various physical activities",
    category: "health",
    icon: <Heart className="h-5 w-5 text-orange-500" />,
    isPopular: false
  },
  {
    name: "Body Fat Percentage Calculator",
    path: "/health/body-fat-percentage-calculator",
    description: "Estimate your body fat percentage using various measurement methods",
    category: "health",
    icon: <Heart className="h-5 w-5 text-purple-500" />,
    isPopular: false
  },
  
  // Math Calculators
  {
    name: "Percentage Calculator",
    path: "/math/percentage-calculator",
    description: "Calculate percentages, increases, decreases, and proportions",
    category: "math",
    icon: <Percent className="h-5 w-5 text-blue-600" />,
    isPopular: true
  },
  {
    name: "Discount Percentage Finder",
    path: "/math/discount-percentage-finder",
    description: "Calculate sale prices, discounts, and savings on purchases",
    category: "math",
    icon: <Percent className="h-5 w-5 text-green-600" />,
    isPopular: false
  },
  {
    name: "Number Base Converter",
    path: "/math/number-base-converter",
    description: "Convert numbers between decimal, binary, hexadecimal and other bases",
    category: "math",
    icon: <Calculator className="h-5 w-5 text-gray-600" />,
    isPopular: false
  },
  {
    name: "Pace Calculator",
    path: "/math/pace-calculator",
    description: "Calculate running, walking, or cycling pace, distance, and time",
    category: "math",
    icon: <Calculator className="h-5 w-5 text-indigo-600" />,
    isPopular: false
  },
  {
    name: "Bill Split Calculator",
    path: "/math/bill-split-calculator",
    description: "Split restaurant bills or group expenses with tip and tax calculations",
    category: "math",
    icon: <Calculator className="h-5 w-5 text-amber-600" />,
    isPopular: true
  },
  
  // Random Tools
  {
    name: "Online Stopwatch",
    path: "/random/stopwatch-timer",
    description: "Precision stopwatch with lap time tracking and customizable display",
    category: "random",
    icon: <Clock className="h-5 w-5 text-blue-500" />,
    isPopular: false
  },
  {
    name: "Timer",
    path: "/random/timer",
    description: "Countdown timer with alarm and multiple preset options",
    category: "random",
    icon: <Timer className="h-5 w-5 text-red-500" />,
    isPopular: false
  },
  {
    name: "Time Zone Converter",
    path: "/random/time-zone-converter",
    description: "Convert time between different time zones around the world",
    category: "random",
    icon: <Clock className="h-5 w-5 text-green-500" />,
    isPopular: false
  },
  {
    name: "Text Character Counter",
    path: "/random/text-character-counter",
    description: "Count characters, words, sentences, and paragraphs in your text",
    category: "random",
    icon: <Calculator className="h-5 w-5 text-purple-500" />,
    isPopular: false
  },
  {
    name: "Daily Affirmation Generator",
    path: "/random/daily-affirmation-generator",
    description: "Generate positive affirmations to boost your mood and mindset",
    category: "random",
    icon: <Calculator className="h-5 w-5 text-pink-500" />,
    isPopular: false
  },
  
  // Games of Chance
  {
    name: "Roll a Dice",
    path: "/chance-games/roll-a-dice",
    description: "Roll virtual dice with customizable sides and quantity",
    category: "chance",
    icon: <Dice1 className="h-5 w-5 text-amber-500" />,
    isPopular: false
  },
  {
    name: "Flip a Coin",
    path: "/chance-games/flip-a-coin",
    description: "Virtual coin flip with heads or tails outcome",
    category: "chance",
    icon: <Dice1 className="h-5 w-5 text-yellow-500" />,
    isPopular: false
  },
  {
    name: "Name Picker Wheel",
    path: "/chance-games/name-picker-wheel",
    description: "Randomly select names from a list using a spinning wheel",
    category: "chance",
    icon: <Dice1 className="h-5 w-5 text-green-500" />,
    isPopular: false
  },
  
  // Crypto Calculators
  {
    name: "Crypto Profit Calculator",
    path: "/crypto/crypto-profit-calculator",
    description: "Calculate profit or loss on cryptocurrency investments",
    category: "crypto",
    icon: <Bitcoin className="h-5 w-5 text-orange-500" />,
    isPopular: false
  },
  {
    name: "Crypto Staking Calculator",
    path: "/crypto/crypto-staking-calculator",
    description: "Calculate potential rewards from staking various cryptocurrencies",
    category: "crypto",
    icon: <Bitcoin className="h-5 w-5 text-blue-500" />,
    isPopular: false
  },
  {
    name: "Gas Fee Tracker",
    path: "/crypto/gas-fee-tracker",
    description: "Track Ethereum gas fees and optimize transaction timing",
    category: "crypto",
    icon: <Bitcoin className="h-5 w-5 text-purple-500" />,
    isPopular: false
  },
  
  // Betting Calculators
  {
    name: "Odds Converter",
    path: "/betting/odds-converter",
    description: "Convert between decimal, fractional, American, and implied probability odds formats",
    category: "betting",
    icon: <Target className="h-5 w-5 text-red-500" />,
    isPopular: false
  },
  {
    name: "Parlay Calculator",
    path: "/betting/parlay-calculator",
    description: "Calculate potential payouts for parlay bets across multiple events",
    category: "betting",
    icon: <Target className="h-5 w-5 text-green-500" />,
    isPopular: false
  },
  {
    name: "Kelly Criterion Calculator",
    path: "/betting/kelly-criterion-calculator",
    description: "Optimize bet sizes using the Kelly Criterion formula",
    category: "betting",
    icon: <Target className="h-5 w-5 text-blue-500" />,
    isPopular: false
  }
];

const CalculatorDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState<CalculatorCategory>('all');

  const filteredCalculators = calculators.filter(calc => {
    const matchesSearch = calc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          calc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = currentCategory === 'all' || calc.category === currentCategory;
    return matchesSearch && matchesCategory;
  });

  const popularCalculators = calculators.filter(calc => calc.isPopular);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">All Calculators & Tools</h1>
          <p className="text-gray-600 md:text-lg max-w-3xl mx-auto">
            Explore our collection of free online calculators and tools designed to help with daily calculations,
            financial planning, health monitoring, and more. No signup required, instant results.
          </p>
        </div>

        <div className="mb-8">
          <Input
            type="search"
            placeholder="Search calculators and tools..."
            className="w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all" onValueChange={(value) => setCurrentCategory(value as CalculatorCategory)}>
          <TabsList className="mb-6 flex w-full flex-wrap justify-start overflow-x-auto">
            <TabsTrigger value="all" className="px-4">All Tools</TabsTrigger>
            <TabsTrigger value="finance" className="px-4">Finance</TabsTrigger>
            <TabsTrigger value="health" className="px-4">Health</TabsTrigger>
            <TabsTrigger value="math" className="px-4">Math</TabsTrigger>
            <TabsTrigger value="random" className="px-4">Random</TabsTrigger>
            <TabsTrigger value="chance" className="px-4">Games of Chance</TabsTrigger>
            <TabsTrigger value="crypto" className="px-4">Crypto</TabsTrigger>
            <TabsTrigger value="betting" className="px-4">Betting</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            {searchTerm === '' && currentCategory === 'all' && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Popular Calculators</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {popularCalculators.map((calc, index) => (
                    <CalculatorCard key={`popular-${index}`} calculator={calc} highlight={false} />
                  ))}
                </div>
              </div>
            )}

            <div className={searchTerm === '' && currentCategory === 'all' ? '' : 'mt-6'}>
              <h2 className="text-2xl font-bold mb-4">
                {searchTerm ? 'Search Results' : 'All Calculators & Tools'}
              </h2>
              
              {filteredCalculators.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCalculators.map((calc, index) => (
                    <CalculatorCard 
                      key={index} 
                      calculator={calc} 
                      highlight={searchTerm !== ''} 
                      searchTerm={searchTerm}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No calculators found matching your search.</p>
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="mt-2 text-blue-500 hover:underline"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          </TabsContent>

          {['finance', 'health', 'math', 'random', 'chance', 'crypto', 'betting'].map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCalculators.map((calc, index) => (
                  <CalculatorCard 
                    key={index} 
                    calculator={calc} 
                    highlight={searchTerm !== ''} 
                    searchTerm={searchTerm}
                  />
                ))}
              </div>
              {filteredCalculators.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No calculators found matching your search.</p>
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="mt-2 text-blue-500 hover:underline"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      <div className="mt-16 bg-gray-50 border-t border-gray-200 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Why Use Our Calculators?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <div className="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free to Use</h3>
              <p className="text-gray-600">All our calculators are completely free with no hidden fees or signup requirements.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Instant Results</h3>
              <p className="text-gray-600">Get immediate calculations and insights without waiting or refreshing the page.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Accurate & Reliable</h3>
              <p className="text-gray-600">Our calculators use proven formulas and algorithms to ensure accurate results every time.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto mt-16 px-4">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-lg">Are these calculators really free?</h3>
            <p className="mt-2 text-gray-600">Yes, all our calculators and tools are completely free to use without any hidden charges or premium features.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-lg">Do I need to create an account?</h3>
            <p className="mt-2 text-gray-600">No account is required. You can use all our calculators instantly without signing up or providing any personal information.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-lg">How accurate are these calculators?</h3>
            <p className="mt-2 text-gray-600">Our calculators are designed for high accuracy using industry-standard formulas. However, they are provided for informational purposes only and should not replace professional advice.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-lg">Can I suggest a new calculator?</h3>
            <p className="mt-2 text-gray-600">Absolutely! We welcome suggestions for new calculators. Please contact us through our feedback form with your ideas.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CalculatorCardProps {
  calculator: CalculatorItem;
  highlight: boolean;
  searchTerm?: string;
}

const CalculatorCard = ({ calculator, highlight, searchTerm = '' }: CalculatorCardProps) => {
  const highlightText = (text: string) => {
    if (!highlight || !searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? <span key={index} className="bg-yellow-200">{part}</span> : part
    );
  };

  return (
    <Link 
      to={calculator.path} 
      className={cn(
        "block p-4 border rounded-lg transition-all hover:shadow-md bg-white",
        calculator.isPopular ? "border-blue-200 hover:border-blue-300" : "border-gray-200 hover:border-gray-300"
      )}
    >
      <div className="flex items-start">
        <div className={cn(
          "p-2 rounded-full mr-3",
          calculator.category === 'finance' ? "bg-blue-100" :
          calculator.category === 'health' ? "bg-red-100" :
          calculator.category === 'math' ? "bg-green-100" :
          calculator.category === 'chance' ? "bg-amber-100" :
          calculator.category === 'crypto' ? "bg-orange-100" :
          calculator.category === 'betting' ? "bg-purple-100" :
          "bg-gray-100"
        )}>
          {calculator.icon}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">
            {highlightText(calculator.name)}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {highlightText(calculator.description)}
          </p>
          <div className="mt-2 text-xs">
            <span className={cn(
              "px-2 py-1 rounded-full text-xs capitalize",
              calculator.category === 'finance' ? "bg-blue-50 text-blue-700" :
              calculator.category === 'health' ? "bg-red-50 text-red-700" :
              calculator.category === 'math' ? "bg-green-50 text-green-700" :
              calculator.category === 'chance' ? "bg-amber-50 text-amber-700" :
              calculator.category === 'crypto' ? "bg-orange-50 text-orange-700" :
              calculator.category === 'betting' ? "bg-purple-50 text-purple-700" :
              "bg-gray-50 text-gray-700"
            )}>
              {calculator.category}
            </span>
            {calculator.isPopular && (
              <span className="ml-2 bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                Popular
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CalculatorDirectory;
