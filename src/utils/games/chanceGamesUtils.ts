
/**
 * Utilities for chance games
 */

// Type definitions
export interface Card {
  suit: string;
  value: string;
  name: string; // Adding name property for HigherOrLower game
  imageUrl?: string;
  numericValue: number;
}

export interface RouletteNumber {
  number: number | string;
  color: 'red' | 'black' | 'green';
}

export interface DiceRoll {
  value: number;
  id: string;
}

// Utility functions
export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const rollMultipleDice = (count: number = 1, sides: number = 6): DiceRoll[] => {
  return Array.from({ length: count }, (_, index) => ({
    value: getRandomInt(1, sides),
    id: `dice-${index}-${Date.now()}`
  }));
};

export const getDiceSum = (dice: DiceRoll[]): number => {
  return dice.reduce((sum, die) => sum + die.value, 0);
};

// Card deck functions
export const createDeck = (includeJokers: boolean = false): Card[] => {
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  
  const deck: Card[] = [];
  
  for (const suit of suits) {
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      let numericValue = i + 2; // 2-10 have values 2-10
      if (value === 'A') numericValue = 14; // Ace is high (14)
      if (value === 'K') numericValue = 13;
      if (value === 'Q') numericValue = 12;
      if (value === 'J') numericValue = 11;
      
      deck.push({
        suit,
        value,
        name: `${value} of ${suit}`,
        numericValue
      });
    }
  }
  
  if (includeJokers) {
    deck.push({
      suit: 'joker',
      value: 'joker',
      name: 'Joker (Red)',
      numericValue: 15
    });
    deck.push({
      suit: 'joker',
      value: 'joker',
      name: 'Joker (Black)',
      numericValue: 15
    });
  }
  
  return deck;
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Roulette numbers
export const rouletteNumbers: RouletteNumber[] = [
  { number: 0, color: 'green' },
  { number: '00', color: 'green' },
  { number: 1, color: 'red' },
  { number: 2, color: 'black' },
  { number: 3, color: 'red' },
  { number: 4, color: 'black' },
  { number: 5, color: 'red' },
  { number: 6, color: 'black' },
  { number: 7, color: 'red' },
  { number: 8, color: 'black' },
  { number: 9, color: 'red' },
  { number: 10, color: 'black' },
  { number: 11, color: 'black' },
  { number: 12, color: 'red' },
  { number: 13, color: 'black' },
  { number: 14, color: 'red' },
  { number: 15, color: 'black' },
  { number: 16, color: 'red' },
  { number: 17, color: 'black' },
  { number: 18, color: 'red' },
  { number: 19, color: 'red' },
  { number: 20, color: 'black' },
  { number: 21, color: 'red' },
  { number: 22, color: 'black' },
  { number: 23, color: 'red' },
  { number: 24, color: 'black' },
  { number: 25, color: 'red' },
  { number: 26, color: 'black' },
  { number: 27, color: 'red' },
  { number: 28, color: 'black' },
  { number: 29, color: 'black' },
  { number: 30, color: 'red' },
  { number: 31, color: 'black' },
  { number: 32, color: 'red' },
  { number: 33, color: 'black' },
  { number: 34, color: 'red' },
  { number: 35, color: 'black' },
  { number: 36, color: 'red' }
];

// Magic 8 ball responses
export const magic8BallResponses = [
  // Positive answers
  "It is certain.",
  "It is decidedly so.",
  "Without a doubt.",
  "Yes definitely.",
  "You may rely on it.",
  "As I see it, yes.",
  "Most likely.",
  "Outlook good.",
  "Yes.",
  "Signs point to yes.",
  
  // Non-committal answers
  "Reply hazy, try again.",
  "Ask again later.",
  "Better not tell you now.",
  "Cannot predict now.",
  "Concentrate and ask again.",
  
  // Negative answers
  "Don't count on it.",
  "My reply is no.",
  "My sources say no.",
  "Outlook not so good.",
  "Very doubtful."
];

// Utility to get a random element from an array
export const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};
