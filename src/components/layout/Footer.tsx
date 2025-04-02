import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Facebook, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

// Group calculators by category for the footer
const calculatorCategories = [
  {
    name: "Finance",
    links: [
      { name: "Mortgage Calculator", path: "/finance/mortgage-calculator" },
      { name: "Savings Goal Tracker", path: "/finance/savings-goal-tracker" },
      { name: "Simple Budget Planner", path: "/finance/simple-budget-planner" },
      { name: "Debt Snowball Tracker", path: "/finance/debt-snowball-tracker" }
    ]
  },
  {
    name: "Math",
    links: [
      { name: "Percentage Calculator", path: "/math/percentage-calculator" },
      { name: "Discount Percentage Finder", path: "/math/discount-percentage-finder" },
      { name: "Number Base Converter", path: "/math/number-base-converter" },
      { name: "Pace Calculator", path: "/math/pace-calculator" },
      { name: "Bill Split Calculator", path: "/math/bill-split-calculator" }
    ]
  },
  {
    name: "Casino",
    links: [
      { name: "Roulette Odds Calculator", path: "/casino/roulette-odds-calculator" },
      { name: "Blackjack Strategy", path: "/casino/blackjack-strategy-calculator" },
      { name: "Poker Hand Probability", path: "/casino/poker-hand-probability-calculator" },
      { name: "Slot Machine RTP", path: "/casino/slot-machine-rtp-calculator" },
      { name: "Baccarat Odds Calculator", path: "/casino/baccarat-odds-calculator" },
      { name: "Keno Probability Calculator", path: "/casino/keno-probability-calculator" }
    ]
  },
  {
    name: "Betting",
    links: [
      { name: "Odds Converter", path: "/betting/odds-converter" },
      { name: "Parlay Calculator", path: "/betting/parlay-calculator" },
      { name: "Kelly Criterion", path: "/betting/kelly-criterion-calculator" },
      { name: "EV Calculator", path: "/betting/ev-calculator" },
      { name: "Bet Hedging Calculator", path: "/betting/bet-hedging-calculator" }
    ]
  },
  {
    name: "Crypto",
    links: [
      { name: "Crypto Profit Calculator", path: "/crypto/crypto-profit-calculator" },
      { name: "Crypto Staking Calculator", path: "/crypto/crypto-staking-calculator" },
      { name: "Mining Profitability", path: "/crypto/mining-profitability-calculator" },
      { name: "Bitcoin Halving Countdown", path: "/crypto/bitcoin-halving-countdown" },
      { name: "Gas Fee Tracker", path: "/crypto/gas-fee-tracker" }
    ]
  },
  {
    name: "Random Tools",
    links: [
      { name: "Online Stopwatch", path: "/random/stopwatch-timer" },
      { name: "Timer", path: "/random/timer" },
      { name: "Time Zone Converter", path: "/random/time-zone-converter" },
      { name: "Text Character Counter", path: "/random/text-character-counter" },
      { name: "Daily Affirmation Generator", path: "/random/daily-affirmation-generator" }
    ]
  },
  {
    name: "Games of Chance",
    links: [
      { name: "Roll a Dice", path: "/chance-games/roll-a-dice" },
      { name: "Flip a Coin", path: "/chance-games/flip-a-coin" },
      { name: "Name Picker Wheel", path: "/chance-games/name-picker-wheel" }
    ]
  }
];

const Footer = () => {
  return (
    <footer className="bg-[#1E2630] text-gray-200 border-t border-[#2a3642]">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-8">
          {/* Brand section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/d8aa8a83-a1f8-4057-a349-95f93706b281.png" 
                alt="CalcMaster Logo" 
                className="h-8 w-auto" 
              />
            </Link>
            <p className="mt-2 text-sm text-gray-400">
              Powerful, free online calculators for every need. Quick, accurate results for your financial, health, and mathematical calculations.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#4ad481] transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#4ad481] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#4ad481] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#4ad481] transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Calculator Categories */}
          <div className="col-span-1 md:col-span-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {calculatorCategories.map((category) => (
              <div key={category.name} className={category.name === "Games of Chance" ? "col-span-2 sm:col-span-1" : ""}>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  {category.name}
                </h3>
                <ul className="mt-4 space-y-2">
                  {category.links.map((link, idx) => (
                    <li key={idx}>
                      <Link to={link.path} className="text-sm text-gray-400 hover:text-[#4ad481] transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-[#2a3642]">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} CalcMaster. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <Button
                variant="outline"
                size="sm"
                className="bg-[#2a3642] text-white hover:bg-[#3a4656] border-[#394756]"
              >
                Subscribe to Newsletter
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
