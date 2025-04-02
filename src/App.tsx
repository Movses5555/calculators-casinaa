
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MortgageCalculatorPage from "./pages/finance/MortgageCalculatorPage";
import BMICalculatorPage from "./pages/health/BMICalculatorPage";
import SleepCycleCalculatorPage from "./pages/health/SleepCycleCalculatorPage";
import CaloriesBurnedCalculatorPage from "./pages/health/CaloriesBurnedCalculatorPage";
import BodyFatPercentageCalculatorPage from "./pages/health/BodyFatPercentageCalculatorPage";
import SavingsGoalTrackerPage from "./pages/finance/SavingsGoalTrackerPage";
import SimpleBudgetPlannerPage from "./pages/finance/SimpleBudgetPlannerPage";
import DebtSnowballTrackerPage from "./pages/finance/DebtSnowballTrackerPage";
import PercentageCalculatorPage from "./pages/math/PercentageCalculatorPage";
import DiscountPercentageFinderPage from "./pages/math/DiscountPercentageFinderPage";
import NumberBaseConverterPage from "./pages/math/NumberBaseConverterPage";
import PaceCalculatorPage from "./pages/math/PaceCalculatorPage";
import BillSplitCalculatorPage from "./pages/math/BillSplitCalculatorPage";
import BugTrackerPage from "./pages/admin/BugTrackerPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import FeatureToolsPage from "@/pages/admin/FeatureToolsPage";
import SponsoredListingsPage from "@/pages/admin/SponsoredListingsPage";
import PromoSpacesPage from "@/pages/admin/PromoSpacesPage";
import SettingsPage from "@/pages/admin/SettingsPage";
import CalculatorsPage from "@/pages/calculators/CalculatorsPage";
import OnlineStopwatchPage from "@/pages/random/OnlineStopwatchPage";
import TimerPage from "@/pages/random/TimerPage";
import TimeZoneConverterPage from "@/pages/random/TimeZoneConverterPage";
import TextCharacterCounterPage from "@/pages/random/TextCharacterCounterPage";
import DailyAffirmationGeneratorPage from "@/pages/random/DailyAffirmationGeneratorPage";
import RollADicePage from "@/pages/chance/RollADicePage";
import FlipACoinPage from "@/pages/chance/FlipACoinPage";
import NamePickerWheelPage from "@/pages/chance/NamePickerWheelPage";
import RouletteOddsCalculatorPage from "@/pages/casino/RouletteOddsCalculatorPage";
import RouletteSpinSimulatorPage from "@/pages/casino/RouletteSpinSimulatorPage";
import BlackjackStrategyCalculatorPage from "@/pages/casino/BlackjackStrategyCalculatorPage";
import BlackjackCardCounterPage from "@/pages/casino/BlackjackCardCounterPage";
import PokerHandProbabilityCalculatorPage from "@/pages/casino/PokerHandProbabilityCalculatorPage";
import PokerICMCalculatorPage from "@/pages/casino/PokerICMCalculatorPage";
import CrapsPayoutCalculatorPage from "@/pages/casino/CrapsPayoutCalculatorPage";
import SlotMachineRTPCalculatorPage from "@/pages/casino/SlotMachineRTPCalculatorPage";
import BaccaratOddsCalculatorPage from "@/pages/casino/BaccaratOddsCalculatorPage";
import KenoProbabilityCalculatorPage from "@/pages/casino/KenoProbabilityCalculatorPage";
import CryptoProfitCalculatorPage from "@/pages/crypto/CryptoProfitCalculatorPage";
import CryptoStakingCalculatorPage from "@/pages/crypto/CryptoStakingCalculatorPage";
import MiningProfitabilityCalculatorPage from "@/pages/crypto/MiningProfitabilityCalculatorPage";
import ICOROICalculatorPage from "@/pages/crypto/ICOROICalculatorPage";
import CryptoTaxCalculatorPage from "@/pages/crypto/CryptoTaxCalculatorPage";
import GasFeeTrackerPage from "@/pages/crypto/GasFeeTrackerPage";
import BitcoinHalvingCountdownPage from "@/pages/crypto/BitcoinHalvingCountdownPage";
import CryptoAirdropFinderPage from "@/pages/crypto/CryptoAirdropFinderPage";
import DeFiYieldFarmingCalculatorPage from "@/pages/crypto/DeFiYieldFarmingCalculatorPage";
import StablecoinAPYTrackerPage from "@/pages/crypto/StablecoinAPYTrackerPage";
import CryptoLoanCalculatorPage from "@/pages/crypto/CryptoLoanCalculatorPage";
import OddsConverterPage from "@/pages/betting/OddsConverterPage";
import ParlayCalculatorPage from "@/pages/betting/ParlayCalculatorPage";
import BetHedgingCalculatorPage from "@/pages/betting/BetHedgingCalculatorPage";
import KellyCriterionCalculatorPage from "@/pages/betting/KellyCriterionCalculatorPage";
import EVCalculatorPage from "@/pages/betting/EVCalculatorPage";
import ContentManagementPage from "@/pages/admin/ContentManagementPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/calculators" element={<CalculatorsPage />} />
          
          {/* Finance Routes */}
          <Route path="/finance/mortgage-calculator" element={<MortgageCalculatorPage />} />
          <Route path="/finance/savings-goal-tracker" element={<SavingsGoalTrackerPage />} />
          <Route path="/finance/simple-budget-planner" element={<SimpleBudgetPlannerPage />} />
          <Route path="/finance/debt-snowball-tracker" element={<DebtSnowballTrackerPage />} />
          
          {/* Health Routes */}
          <Route path="/health/bmi-calculator" element={<BMICalculatorPage />} />
          <Route path="/health/sleep-cycle-calculator" element={<SleepCycleCalculatorPage />} />
          <Route path="/health/calories-burned-calculator" element={<CaloriesBurnedCalculatorPage />} />
          <Route path="/health/body-fat-percentage-calculator" element={<BodyFatPercentageCalculatorPage />} />
          
          {/* Math Routes */}
          <Route path="/math/percentage-calculator" element={<PercentageCalculatorPage />} />
          <Route path="/math/discount-percentage-finder" element={<DiscountPercentageFinderPage />} />
          <Route path="/math/number-base-converter" element={<NumberBaseConverterPage />} />
          <Route path="/math/pace-calculator" element={<PaceCalculatorPage />} />
          <Route path="/math/bill-split-calculator" element={<BillSplitCalculatorPage />} />
          
          {/* Random Tools Routes */}
          <Route path="/random/stopwatch-timer" element={<OnlineStopwatchPage />} />
          <Route path="/random/timer" element={<TimerPage />} />
          <Route path="/random/time-zone-converter" element={<TimeZoneConverterPage />} />
          <Route path="/random/text-character-counter" element={<TextCharacterCounterPage />} />
          <Route path="/random/daily-affirmation-generator" element={<DailyAffirmationGeneratorPage />} />
          
          {/* Chance Games Routes */}
          <Route path="/chance/roll-a-dice" element={<RollADicePage />} />
          <Route path="/chance/flip-a-coin" element={<FlipACoinPage />} />
          <Route path="/chance/name-picker-wheel" element={<NamePickerWheelPage />} />
          
          {/* Legacy Chance Games Routes - Redirects */}
          <Route path="/chance-games/roll-a-dice" element={<Navigate to="/chance/roll-a-dice" replace />} />
          <Route path="/chance-games/flip-a-coin" element={<Navigate to="/chance/flip-a-coin" replace />} />
          <Route path="/chance-games/name-picker-wheel" element={<Navigate to="/chance/name-picker-wheel" replace />} />
          
          {/* Casino Routes */}
          <Route path="/casino/roulette-odds-calculator" element={<RouletteOddsCalculatorPage />} />
          <Route path="/casino/roulette-spin-simulator" element={<RouletteSpinSimulatorPage />} />
          <Route path="/casino/blackjack-strategy-calculator" element={<BlackjackStrategyCalculatorPage />} />
          <Route path="/casino/blackjack-card-counter" element={<BlackjackCardCounterPage />} />
          <Route path="/casino/poker-hand-probability-calculator" element={<PokerHandProbabilityCalculatorPage />} />
          <Route path="/casino/poker-icm-calculator" element={<PokerICMCalculatorPage />} />
          <Route path="/casino/craps-payout-calculator" element={<CrapsPayoutCalculatorPage />} />
          <Route path="/casino/slot-machine-rtp-calculator" element={<SlotMachineRTPCalculatorPage />} />
          <Route path="/casino/baccarat-odds-calculator" element={<BaccaratOddsCalculatorPage />} />
          <Route path="/casino/keno-probability-calculator" element={<KenoProbabilityCalculatorPage />} />
          
          {/* Crypto Routes */}
          <Route path="/crypto/crypto-profit-calculator" element={<CryptoProfitCalculatorPage />} />
          <Route path="/crypto/crypto-staking-calculator" element={<CryptoStakingCalculatorPage />} />
          <Route path="/crypto/mining-profitability-calculator" element={<MiningProfitabilityCalculatorPage />} />
          <Route path="/crypto/ico-roi-calculator" element={<ICOROICalculatorPage />} />
          <Route path="/crypto/crypto-tax-calculator" element={<CryptoTaxCalculatorPage />} />
          <Route path="/crypto/gas-fee-tracker" element={<GasFeeTrackerPage />} />
          <Route path="/crypto/bitcoin-halving-countdown" element={<BitcoinHalvingCountdownPage />} />
          <Route path="/crypto/crypto-airdrop-finder" element={<CryptoAirdropFinderPage />} />
          <Route path="/crypto/defi-yield-farming-calculator" element={<DeFiYieldFarmingCalculatorPage />} />
          <Route path="/crypto/stablecoin-apy-tracker" element={<StablecoinAPYTrackerPage />} />
          <Route path="/crypto/crypto-loan-calculator" element={<CryptoLoanCalculatorPage />} />
          
          {/* Betting Routes */}
          <Route path="/betting/odds-converter" element={<OddsConverterPage />} />
          <Route path="/betting/parlay-calculator" element={<ParlayCalculatorPage />} />
          <Route path="/betting/bet-hedging-calculator" element={<BetHedgingCalculatorPage />} />
          <Route path="/betting/kelly-criterion-calculator" element={<KellyCriterionCalculatorPage />} />
          <Route path="/betting/ev-calculator" element={<EVCalculatorPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<ProtectedRoute><Navigate to="/admin/dashboard" replace /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}>
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="bug-tracker" element={<BugTrackerPage />} />
            <Route path="feature-tools" element={<FeatureToolsPage />} />
            <Route path="sponsored-listings" element={<SponsoredListingsPage />} />
            <Route path="promo-spaces" element={<PromoSpacesPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="content-management" element={<ContentManagementPage />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
