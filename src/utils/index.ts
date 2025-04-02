
/**
 * Root utilities export file
 * Import and re-export all utility modules here
 */

// Core utilities
export { formatCurrency as formatCurrencyRoot, formatNumber, formatPercent as formatPercentRoot } from './formatters';
export { cn } from './utils';
export * from './validation';

// Domain-specific utilities - use namespaced imports to avoid naming conflicts
import * as adminUtils from './admin';
export { adminUtils };

import * as bettingUtils from './betting';
export { bettingUtils };

import * as cryptoUtils from './crypto';
export { cryptoUtils };

import * as financeUtils from './finance';
export { financeUtils };

import * as healthUtils from './health';
export { healthUtils };

import * as mathUtils from './math';
export { mathUtils };

import * as gamesUtils from './games';
export { gamesUtils };

// Backward compatibility exports for components
export { getAllBugs, getBugsByStatus, getBugsByPriority, updateBugStatus, reportBug } from './admin/bugTracker';
export { getRandomInt, rollMultipleDice, getDiceSum, createDeck, shuffleArray, magic8BallResponses, getRandomElement } from './games/chanceGamesUtils';
export { calculateBodyFatPercentage } from './health/bodyFatPercentage';
export { calculateCaloriesBurned } from './health/caloriesBurned';
export { calculateDebtSnowball } from './finance/debtSnowball';
export { calculateDiscount, formatCurrency } from './math/discount';
export { calculateMortgage } from './finance/mortgage';
export { convertNumber, validateInput, getBasePrefix, getBaseSuffix } from './math/numberBase';
export { calculatePace, formatPace, formatTime, convertPace } from './math/pace';
export { calculatePercentage } from './math/percentage';
export { calculateSavingsGoal } from './finance/savingsGoal';
export { calculateBudget, calculateCategoryPercentage } from './finance/budget';

// Fix specific component import with export type
export type { MortgageInput, MortgageResult } from './finance/mortgage';
export type { BudgetCategory, BudgetInput, BudgetResult } from './finance/budget';
export type { DiscountInput, DiscountResult, DiscountCalculationType } from './math/discount';
export type { NumberBaseResult } from './math/numberBase';
export type { PercentageInput, PercentageResult } from './math/percentage';
export type { PaceInput, PaceResult } from './math/pace';
export type { CaloriesBurnedInput, CaloriesBurnedResult, ActivityOption } from './health/caloriesBurned';
export type { BodyFatInput, BodyFatResult } from './health/bodyFatPercentage';
export type { SplitPerson, SplitItem, BillSplitResult } from './math/billSplit';
export type { RouletteNumber, Card, DiceRoll } from './games/chanceGamesUtils';
