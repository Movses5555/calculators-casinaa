
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Calculator, ChevronDown, Search } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

// Navigation links for our calculator app
const navLinks = [
  { 
    name: "Finance", 
    emoji: "💰",
    path: "#",
    subLinks: [
      { name: "Mortgage Calculator", path: "/finance/mortgage-calculator" },
      { name: "Savings Goal Tracker", path: "/finance/savings-goal-tracker" },
      { name: "Simple Budget Planner", path: "/finance/simple-budget-planner" },
      { name: "Debt Snowball Tracker", path: "/finance/debt-snowball-tracker" }
    ]
  },
  { 
    name: "Math", 
    emoji: "🧮",
    path: "#",
    subLinks: [
      { name: "Percentage Calculator", path: "/math/percentage-calculator" },
      { name: "Discount Percentage Finder", path: "/math/discount-percentage-finder" },
      { name: "Number Base Converter", path: "/math/number-base-converter" },
      { name: "Pace Calculator", path: "/math/pace-calculator" },
      { name: "Bill Split Calculator", path: "/math/bill-split-calculator" }
    ]
  },
  {
    name: "Casino",
    emoji: "🎰",
    path: "#",
    subLinks: [
      { name: "Roulette Odds Calculator", path: "/casino/roulette-odds-calculator" },
      { name: "Blackjack Strategy", path: "/casino/blackjack-strategy-calculator" },
      { name: "Poker Hand Probability", path: "/casino/poker-hand-probability-calculator" },
      { name: "Slot Machine RTP", path: "/casino/slot-machine-rtp-calculator" }
    ]
  },
  {
    name: "Betting",
    emoji: "🏈",
    path: "#",
    subLinks: [
      { name: "Odds Converter", path: "/betting/odds-converter" },
      { name: "Parlay Calculator", path: "/betting/parlay-calculator" },
      { name: "Kelly Criterion", path: "/betting/kelly-criterion-calculator" },
      { name: "EV Calculator", path: "/betting/ev-calculator" }
    ]
  },
  {
    name: "Crypto",
    emoji: "🪙",
    path: "#",
    subLinks: [
      { name: "Crypto Profit Calculator", path: "/crypto/crypto-profit-calculator" },
      { name: "Crypto Staking Calculator", path: "/crypto/crypto-staking-calculator" },
      { name: "Mining Profitability", path: "/crypto/mining-profitability-calculator" },
      { name: "Bitcoin Halving Countdown", path: "/crypto/bitcoin-halving-countdown" }
    ]
  }
];

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

const TopNav = ({ toggleSidenav }: { toggleSidenav: () => void }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { toggleSidebar } = useSidebar();
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

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
    <header className="sticky top-0 z-50 w-full bg-[#1E2630] border-b border-[#2a3642]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar}
              className="p-2 mr-2 rounded-md text-gray-300 hover:text-[#4ad481] hover:bg-[#2a3642] transition-colors duration-200"
              aria-label="Toggle sidebar navigation"
            >
              <Menu size={24} />
            </button>
            
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/d8aa8a83-a1f8-4057-a349-95f93706b281.png" 
                alt="CalcMaster Logo" 
                className="h-8 w-auto" 
              />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.subLinks ? (
                  <div className="flex items-center cursor-pointer">
                    <button 
                      onClick={() => toggleDropdown(link.name)}
                      className="flex items-center px-3 py-2 rounded-md text-gray-300 hover:text-[#4ad481] hover:bg-[#2a3642] transition-colors duration-200"
                    >
                      <span className="mr-2">{link.emoji}</span>
                      {link.name}
                      <ChevronDown size={16} className={`ml-1 transition-transform duration-200 ${openDropdown === link.name ? "transform rotate-180" : ""}`} />
                    </button>
                    
                    {openDropdown === link.name && (
                      <div className="absolute top-full left-0 mt-1 w-60 bg-[#2a3642] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 p-2 z-50 animate-scale-in">
                        {link.subLinks.map((subLink) => (
                          <Link
                            key={subLink.name}
                            to={subLink.path}
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#394756] hover:text-[#4ad481] rounded-md transition-colors duration-150"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {subLink.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className="px-3 py-2 rounded-md text-gray-300 hover:text-[#4ad481] hover:bg-[#2a3642] transition-colors duration-200"
                  >
                    <span className="mr-2">{link.emoji}</span>
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative" ref={searchRef}>
              <div className="flex items-center bg-[#2a3642] rounded-full px-3 py-1.5">
                <Search size={16} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search calculators..."
                  className="bg-transparent border-none focus:outline-none text-sm w-40 lg:w-60 text-gray-300"
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
              </div>
              
              {showSearchResults && filteredCalculators.length > 0 && (
                <div className="absolute top-full right-0 mt-1 w-72 bg-[#2a3642] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 p-2 z-50 max-h-96 overflow-y-auto">
                  {filteredCalculators.map((calc, index) => (
                    <button
                      key={index}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#394756] hover:text-[#4ad481] rounded-md transition-colors duration-150"
                      onClick={() => handleSearchClick(calc.path)}
                    >
                      <span className="mr-2">{calc.emoji}</span>
                      <span className="font-medium">{calc.name}</span>
                      <span className="text-xs text-gray-400 block ml-6">{calc.categoryTitle}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-gray-300 hover:text-[#4ad481] hover:bg-[#2a3642] transition-colors duration-200"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#1E2630] shadow-md">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.subLinks ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(link.name)}
                      className="w-full flex justify-between items-center px-3 py-2 rounded-md text-gray-300 hover:text-[#4ad481] hover:bg-[#2a3642] transition-colors duration-200"
                    >
                      <div className="flex items-center">
                        <span className="mr-2">{link.emoji}</span>
                        {link.name}
                      </div>
                      <ChevronDown
                        size={16}
                        className={`ml-1 transition-transform duration-200 ${
                          openDropdown === link.name ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>
                    
                    {openDropdown === link.name && (
                      <div className="pl-4 space-y-1 animate-fade-in">
                        {link.subLinks.map((subLink) => (
                          <Link
                            key={subLink.name}
                            to={subLink.path}
                            className="block px-3 py-2 rounded-md text-sm text-gray-400 hover:text-[#4ad481] hover:bg-[#2a3642] transition-colors duration-200"
                            onClick={toggleMobileMenu}
                          >
                            {subLink.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className="block px-3 py-2 rounded-md text-gray-300 hover:text-[#4ad481] hover:bg-[#2a3642] transition-colors duration-200"
                    onClick={toggleMobileMenu}
                  >
                    <span className="mr-2">{link.emoji}</span>
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-2">
              <div className="relative">
                <div className="flex items-center bg-[#2a3642] rounded-md px-3 py-2 mb-2">
                  <Search size={16} className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Search calculators..."
                    className="bg-transparent border-none focus:outline-none text-sm w-full text-gray-300"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowSearchResults(e.target.value.length > 1);
                    }}
                  />
                </div>
                {showSearchResults && filteredCalculators.length > 0 && (
                  <div className="absolute w-full bg-[#2a3642] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 p-2 z-50 max-h-80 overflow-y-auto">
                    {filteredCalculators.map((calc, index) => (
                      <button
                        key={index}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#394756] hover:text-[#4ad481] rounded-md transition-colors duration-150"
                        onClick={() => {
                          handleSearchClick(calc.path);
                          toggleMobileMenu();
                        }}
                      >
                        <span className="mr-2">{calc.emoji}</span>
                        <span className="font-medium">{calc.name}</span>
                        <span className="text-xs text-gray-400 block ml-6">{calc.categoryTitle}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default TopNav;
