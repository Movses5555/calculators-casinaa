import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";

interface Category {
  id: string;
  title: string;
  emoji: string;
  links: { name: string; path: string }[];
}

const categories: Category[] = [
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
      { name: "Roll a Dice", path: "/chance/roll-a-dice" },
      { name: "Pop-up Dice", path: "/chance-games/pop-up-dice" },
      { name: "Name Picker Wheel", path: "/chance/name-picker-wheel" },
      { name: "Dice Shaker Cup", path: "/chance-games/dice-shaker-cup" },
      { name: "Magic 8 Ball", path: "/chance-games/magic-8-ball" },
      { name: "Roulette Wheel", path: "/chance-games/roulette-wheel" },
      { name: "Higher or Lower Game", path: "/chance-games/higher-or-lower" },
      { name: "He Loves Me Not Game", path: "/chance-games/he-loves-me-he-loves-me-not-game" },
      { name: "Flip a Coin", path: "/chance/flip-a-coin" },
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
  {
    id: "preview",
    title: "Development & Preview",
    emoji: "⚡",
    links: [
      { name: "Next.js Preview", path: "/nextjs" },
    ],
  },
];

interface SidenavProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidenav = ({ isOpen, onClose }: SidenavProps) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["finance"]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => 
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#1E2630] text-gray-200">
      <div className="flex items-center justify-between p-4 border-b border-[#2a3642]">
        <Link to="/" className="flex items-center space-x-2" onClick={handleLinkClick}>
          <span className="text-2xl">🧮</span>
          <span className="text-lg font-semibold text-gray-100">CalcMaster</span>
        </Link>
      </div>

      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {categories.map((category, index) => (
          <React.Fragment key={category.id}>
            <div className="section-wrapper">
              <div className="sidebar-accordion">
                <Collapsible
                  open={expandedCategories.includes(category.id)}
                  onOpenChange={() => toggleCategory(category.id)}
                >
                  <div className="accordion">
                    <div className="header">
                      <CollapsibleTrigger className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-[#2a3642] hover:text-[#4ad481] transition-colors duration-200">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{category.emoji}</span>
                          <span className="sidebar-accordion-title">{category.title}</span>
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                            expandedCategories.includes(category.id) ? "transform rotate-180" : ""
                          }`}
                        />
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="sidebar-content pl-10 pr-2 py-2 space-y-1">
                      {category.links.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          className="block px-3 py-2 text-sm text-gray-400 rounded-md hover:bg-[#2a3642] hover:text-[#4ad481] transition-colors duration-200"
                          onClick={handleLinkClick}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              </div>
            </div>
            {index < categories.length - 1 && (
              <Separator className="my-2 bg-[#2a3642]" />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="p-4 border-t border-[#2a3642]">
        <p className="text-xl font-medium text-center text-white">
          ⚡by Casinaa
        </p>
      </div>
    </div>
  );
};

export default Sidenav;
