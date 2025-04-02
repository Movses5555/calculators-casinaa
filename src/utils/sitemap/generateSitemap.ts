
import path from 'path';
import { generateSitemap } from './sitemapGenerator';

// Base URL of your website
const BASE_URL = 'https://moneymetricsmania.com';

// Get all routes from the application
const allRoutes = [
  '/',
  '/calculators',
  '/nextjs',
  // Finance Calculator Routes
  '/finance/mortgage-calculator',
  '/finance/savings-goal-tracker',
  '/finance/simple-budget-planner',
  '/finance/debt-snowball-tracker',
  // Health Calculator Routes
  '/health/bmi-calculator',
  '/health/sleep-cycle-calculator',
  '/health/calories-burned-calculator',
  '/health/body-fat-percentage-calculator',
  // Math Calculator Routes
  '/math/percentage-calculator',
  '/math/discount-percentage-finder',
  '/math/number-base-converter',
  '/math/pace-calculator',
  '/math/bill-split-calculator',
  // Random Tools Routes
  '/random/stopwatch-timer',
  '/random/timer',
  '/random/time-zone-converter',
  '/random/text-character-counter',
  '/random/daily-affirmation-generator',
  // Chance Games Routes
  '/chance/roll-a-dice',
  '/chance/flip-a-coin',
  '/chance/name-picker-wheel',
  // Casino Calculator Routes
  '/casino/roulette-odds-calculator',
  '/casino/roulette-spin-simulator',
  '/casino/blackjack-strategy-calculator',
  '/casino/blackjack-card-counter',
  '/casino/poker-hand-probability-calculator',
  '/casino/poker-icm-calculator',
  '/casino/craps-payout-calculator',
  '/casino/slot-machine-rtp-calculator',
  '/casino/baccarat-odds-calculator',
  '/casino/keno-probability-calculator',
  // Crypto Calculator Routes
  '/crypto/crypto-profit-calculator',
  '/crypto/crypto-staking-calculator',
  '/crypto/mining-profitability-calculator',
  '/crypto/ico-roi-calculator',
  '/crypto/crypto-tax-calculator',
  '/crypto/gas-fee-tracker',
  '/crypto/bitcoin-halving-countdown',
  '/crypto/crypto-airdrop-finder',
  '/crypto/defi-yield-farming-calculator',
  '/crypto/stablecoin-apy-tracker',
  '/crypto/crypto-loan-calculator',
  // Sports Betting Calculator Routes
  '/betting/odds-converter',
  '/betting/parlay-calculator',
  '/betting/bet-hedging-calculator',
  '/betting/kelly-criterion-calculator',
  '/betting/ev-calculator',
  '/betting/sure-bet-calculator',
  '/betting/over-under-calculator',
  '/betting/acca-calculator',
  '/betting/handicap-calculator',
  '/betting/lay-bet-calculator',
  '/betting/bankroll-tracker',
  '/betting/staking-plan-calculator',
];

// Define custom priorities for certain routes
const customPriorities: Record<string, number> = {
  '/calculators': 0.9,
  '/finance/mortgage-calculator': 0.8,
  '/finance/savings-goal-tracker': 0.8,
  '/finance/simple-budget-planner': 0.8,
  '/health/bmi-calculator': 0.8,
  '/math/percentage-calculator': 0.8,
  '/betting/odds-converter': 0.8,
  '/betting/parlay-calculator': 0.8,
  '/betting/kelly-criterion-calculator': 0.8,
  '/nextjs': 0.5, // Lower priority for the development preview
};

// Run the sitemap generator
export const runSitemapGenerator = () => {
  generateSitemap({
    baseUrl: BASE_URL,
    outputPath: path.resolve('public', 'sitemap.xml'),
    routes: allRoutes,
    excludePatterns: [/\/admin\/.*/],
    defaultLastmod: new Date().toISOString().split('T')[0],
    defaultChangefreq: 'monthly',
    defaultPriority: 0.7,
    customPriorities,
  });
};

// Remove the Node.js specific code that was causing the error
// if (require.main === module) {
//   runSitemapGenerator();
// }
