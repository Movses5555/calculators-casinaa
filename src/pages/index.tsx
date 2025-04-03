
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Helmet } from "react-helmet";
import Layout from "../components/layout/Layout";
import PopularGamesSection from "../components/home/PopularGamesSection";
import CalculatorTypesSection from "../components/home/CalculatorTypesSection";
import BestCasinosSection from "../components/home/BestCasinosSection";
import PopularCalculatorsSection from "../components/home/PopularCalculatorsSection";

// Get all calculators from all categories for search functionality
const allCalculators = (() => {
  // Import all categories from Sidenav.tsx categories array
  const categories = [
    {
      id: "math",
      title: "Math & General Calculators",
      emoji: "🧮",
      links: [
        { name: "Percentage Calculator", path: "/math/percentage-calculator" },
        { name: "Discount Percentage Finder", path: "/math/discount-percentage-finder" },
        { name: "Number Base Converter", path: "/math/number-base-converter" },
        { name: "Pace Calculator", path: "/math/pace-calculator" },
        { name: "Bill Split Calculator", path: "/math/bill-split-calculator" },
      ],
    },
    {
      id: "casino",
      title: "Casino Calculators",
      emoji: "🎰",
      links: [
        { name: "Roulette Odds Calculator", path: "/casino/roulette-odds-calculator" },
        { name: "Roulette Spin Simulator", path: "/casino/roulette-spin-simulator" },
        { name: "Blackjack Strategy Calculator", path: "/casino/blackjack-strategy-calculator" },
        { name: "Blackjack Card Counter", path: "/casino/blackjack-card-counter" },
        { name: "Poker Hand Probability", path: "/casino/poker-hand-probability-calculator" },
        { name: "Poker ICM Calculator", path: "/casino/poker-icm-calculator" },
        { name: "Craps Payout Calculator", path: "/casino/craps-payout-calculator" },
        { name: "Slot Machine RTP Calculator", path: "/casino/slot-machine-rtp-calculator" },
        { name: "Baccarat Odds Calculator", path: "/casino/baccarat-odds-calculator" },
        { name: "Keno Probability Calculator", path: "/casino/keno-probability-calculator" },
      ],
    },
    {
      id: "betting",
      title: "Sports Betting Calculators",
      emoji: "🏈",
      links: [
        { name: "Odds Converter", path: "/betting/odds-converter" },
        { name: "Parlay Calculator", path: "/betting/parlay-calculator" },
        { name: "Kelly Criterion Calculator", path: "/betting/kelly-criterion-calculator" },
        { name: "Bet Hedging Calculator", path: "/betting/bet-hedging-calculator" },
        { name: "Expected Value Calculator", path: "/betting/ev-calculator" },
        { name: "Sure Bet Calculator", path: "/betting/sure-bet-calculator" },
        { name: "Over/Under Calculator", path: "/betting/over-under-calculator" },
        { name: "Acca Calculator", path: "/betting/acca-calculator" },
        { name: "Handicap Calculator", path: "/betting/handicap-calculator" },
        { name: "Lay Bet Calculator", path: "/betting/lay-bet-calculator" },
        { name: "Bankroll Tracker", path: "/betting/bankroll-tracker" },
        { name: "Loss Recovery Calculator", path: "/betting/loss-recovery-calculator" },
        { name: "Staking Plan Calculator", path: "/betting/staking-plan-calculator" },
        { name: "Martingale Calculator", path: "/betting/martingale-calculator" },
        { name: "Fibonacci Calculator", path: "/betting/fibonacci-calculator" },
        { name: "Stop Loss Calculator", path: "/betting/stop-loss-calculator" },
      ],
    },
    {
      id: "chance",
      title: "Games of Chance",
      emoji: "🎲",
      links: [
        { name: "Roll a Dice", path: "/chance-games/roll-a-dice" },
        { name: "Pop-up Dice", path: "/chance-games/pop-up-dice" },
        { name: "Name Picker Wheel", path: "/chance-games/name-picker-wheel" },
        { name: "Dice Shaker Cup", path: "/chance-games/dice-shaker-cup" },
        { name: "Magic 8 Ball", path: "/chance-games/magic-8-ball" },
        { name: "Roulette Wheel", path: "/chance-games/roulette-wheel" },
        { name: "Higher or Lower Game", path: "/chance-games/higher-or-lower" },
        { name: "He Loves Me Not Game", path: "/chance-games/he-loves-me-he-loves-me-not-game" },
        { name: "Flip a Coin", path: "/chance-games/flip-a-coin" },
      ],
    },
    {
      id: "finance",
      title: "Finance Calculators",
      emoji: "💰",
      links: [
        { name: "Mortgage Calculator", path: "/finance/mortgage-calculator" },
        { name: "Savings Goal Tracker", path: "/finance/savings-goal-tracker" },
        { name: "Simple Budget Planner", path: "/finance/simple-budget-planner" },
        { name: "Debt Snowball Tracker", path: "/finance/debt-snowball-tracker" },
      ],
    },
    {
      id: "health",
      title: "Health & Fitness",
      emoji: "❤️",
      links: [
        { name: "BMI Calculator", path: "/health/bmi-calculator" },
        { name: "Sleep Cycle Calculator", path: "/health/sleep-cycle-calculator" },
        { name: "Calories Burned Calculator", path: "/health/calories-burned-calculator" },
        { name: "Body Fat Percentage Calculator", path: "/health/body-fat-percentage-calculator" },
      ],
    },
    {
      id: "crypto",
      title: "Crypto & Blockchain",
      emoji: "🪙",
      links: [
        { name: "Crypto Profit Calculator", path: "/crypto/crypto-profit-calculator" },
        { name: "Crypto Staking Calculator", path: "/crypto/crypto-staking-calculator" },
        { name: "Mining Profitability", path: "/crypto/mining-profitability-calculator" },
        { name: "ICO ROI Calculator", path: "/crypto/ico-roi-calculator" },
        { name: "Crypto Tax Calculator", path: "/crypto/crypto-tax-calculator" },
        { name: "Gas Fee Tracker", path: "/crypto/gas-fee-tracker" },
        { name: "Bitcoin Halving Countdown", path: "/crypto/bitcoin-halving-countdown" },
        { name: "Crypto Airdrop Finder", path: "/crypto/crypto-airdrop-finder" },
        { name: "DeFi Yield Farming", path: "/crypto/defi-yield-farming-calculator" },
        { name: "Stablecoin APY Tracker", path: "/crypto/stablecoin-apy-tracker" },
        { name: "Crypto Loan Calculator", path: "/crypto/crypto-loan-calculator" },
      ],
    },
    {
      id: "random",
      title: "Random Tools",
      emoji: "🔄",
      links: [
        { name: "Online Stopwatch", path: "/random/stopwatch-timer" },
        { name: "Timer", path: "/random/timer" },
        { name: "Time Zone Converter", path: "/random/time-zone-converter" },
        { name: "Text Character Counter", path: "/random/text-character-counter" },
        { name: "Daily Affirmation Generator", path: "/random/daily-affirmation-generator" },
      ],
    },
  ];

  // Flatten all calculator links from all categories
  return categories.reduce((acc, category) => {
    return [...acc, ...category.links.map(link => ({
      ...link,
      category: category.id,
      categoryTitle: category.title,
      emoji: category.emoji
    }))];
  }, []);
})();

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const filteredCalculators = searchTerm.length > 1 
    ? allCalculators.filter(calc => 
        calc.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSearchClick = (path: string) => {
    navigate(path);
    setSearchTerm("");
    setShowSearchResults(false);
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Money Metrics Mania - Calculator Tools for Everyone</title>
        <meta name="description" content="From basic math to complex financial calculations, we have the tools you need to make informed decisions and solve problems quickly." />
        <meta name="keywords" content="calculators, financial calculators, mortgage calculator, math tools, online calculators" />
        <link rel="canonical" href="/" />
        <meta property="og:title" content="Money Metrics Mania - Calculator Tools for Everyone" />
        <meta property="og:description" content="Powerful calculator tools for finance, math, statistics, measurements and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/" />
      </Helmet>
      
      {/* Hero Section */}
      <section className="py-10 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Simple & Powerful Calculators <span className="text-calculator-primary">For Everyone</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            From basic math to complex financial calculations, we have the tools you need to make informed decisions and solve problems quickly.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto bg-white p-4 rounded-xl shadow-subtle mb-8">
            <div className="relative" ref={searchRef}>
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} aria-hidden="true" />
              <input
                type="text"
                placeholder="Search calculators and tools..."
                className="w-full py-4 pl-12 pr-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-calculator-primary focus:border-transparent transition-all"
                aria-label="Search calculators and tools"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSearchResults(e.target.value.length > 1);
                }}
                onFocus={() => {
                  if (searchTerm.length > 1) {
                    setShowSearchResults(true);
                  }
                }}
              />
              
              {showSearchResults && filteredCalculators.length > 0 && (
                <div className="absolute left-0 right-0 mt-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 p-2 z-50 max-h-96 overflow-y-auto">
                  {filteredCalculators.map((calc, index) => (
                    <button
                      key={index}
                      className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-150"
                      onClick={() => handleSearchClick(calc.path)}
                    >
                      <span className="mr-2">{calc.emoji}</span>
                      <span className="font-medium">{calc.name}</span>
                      <span className="text-xs text-gray-500 block ml-6">{calc.categoryTitle}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <PopularGamesSection />
      <CalculatorTypesSection />
      <BestCasinosSection />
      <PopularCalculatorsSection />

      {/* CTA Section */}
      <section className="mb-16">
        <div className="max-w-6xl mx-auto bg-[#0F1923] rounded-2xl overflow-hidden relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white rounded-full"></div>
            <div className="absolute -left-10 -bottom-10 w-60 h-60 bg-white rounded-full"></div>
          </div>
          <div className="relative z-10 py-16 px-8 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Create a Free Account Today
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Save your calculation history, access premium calculators, and sync across all your devices.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-[#0F1923] px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all">
                Sign Up for Free
              </button>
              <button className="bg-transparent border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
