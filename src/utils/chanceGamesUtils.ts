
/**
 * Compatibility export for chance games utils
 */

export { 
  getRandomInt, 
  rollMultipleDice, 
  getDiceSum, 
  createDeck, 
  shuffleArray, 
  rouletteNumbers, 
  magic8BallResponses, 
  getRandomElement 
} from './games/chanceGamesUtils';

export type { 
  Card, 
  RouletteNumber,
  DiceRoll
} from './games/chanceGamesUtils';
