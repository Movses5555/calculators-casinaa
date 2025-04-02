
export type CardValue = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';
export type CardSuit = 'hearts' | 'diamonds' | 'clubs' | 'spades';

export interface PlayingCard {
  value: CardValue;
  suit: CardSuit;
  count: number; // The count value of this card
  id: string; // Unique identifier for each card
}

export interface CountingSystem {
  name: string;
  description: string;
  values: Record<CardValue, number>;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

// Counting systems
export const countingSystems: Record<string, CountingSystem> = {
  hiLo: {
    name: 'Hi-Lo',
    description: 'The most popular counting system, assigns -1, 0, or +1 to each card.',
    values: {
      'A': -1, '2': 1, '3': 1, '4': 1, '5': 1, '6': 1, 
      '7': 0, '8': 0, '9': 0, '10': -1, 'J': -1, 'Q': -1, 'K': -1
    },
    difficulty: 'Easy'
  },
  ko: {
    name: 'KO (Knockout)',
    description: 'An unbalanced system that starts at 0 and doesn\'t require true count conversion.',
    values: {
      'A': -1, '2': 1, '3': 1, '4': 1, '5': 1, '6': 1, '7': 1,
      '8': 0, '9': 0, '10': -1, 'J': -1, 'Q': -1, 'K': -1
    },
    difficulty: 'Easy'
  },
  hiOpt1: {
    name: 'Hi-Opt I',
    description: 'Ignores aces for better betting correlation. Good for intermediate players.',
    values: {
      'A': 0, '2': 0, '3': 1, '4': 1, '5': 1, '6': 1, '7': 0,
      '8': 0, '9': 0, '10': -1, 'J': -1, 'Q': -1, 'K': -1
    },
    difficulty: 'Medium'
  },
  hiOpt2: {
    name: 'Hi-Opt II',
    description: 'Complex system with improved betting correlation and playing efficiency.',
    values: {
      'A': 0, '2': 1, '3': 1, '4': 2, '5': 2, '6': 1, '7': 1,
      '8': 0, '9': 0, '10': -2, 'J': -2, 'Q': -2, 'K': -2
    },
    difficulty: 'Hard'
  },
  omega2: {
    name: 'Omega II',
    description: 'Advanced system with multiple count values for better accuracy.',
    values: {
      'A': 0, '2': 1, '3': 1, '4': 2, '5': 2, '6': 2, '7': 1,
      '8': 0, '9': -1, '10': -2, 'J': -2, 'Q': -2, 'K': -2
    },
    difficulty: 'Hard'
  }
};

// Generate a unique ID for each card
const generateCardId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Create a standard 52-card deck
export const createDeck = (selectedSystem: string): PlayingCard[] => {
  const singleDeck: PlayingCard[] = [];
  const suits: CardSuit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
  const values: CardValue[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  
  // Create a single 52-card deck
  for (const suit of suits) {
    for (const value of values) {
      singleDeck.push({
        value,
        suit,
        count: countingSystems[selectedSystem].values[value],
        id: generateCardId()
      });
    }
  }
  
  // Create multiple decks total for a typical blackjack shoe (6 decks)
  const multipleDeck: PlayingCard[] = [];
  for (let i = 0; i < 6; i++) {
    for (const suit of suits) {
      for (const value of values) {
        multipleDeck.push({
          value,
          suit,
          count: countingSystems[selectedSystem].values[value],
          id: generateCardId()
        });
      }
    }
  }
  
  return shuffleDeck(multipleDeck);
};

// Shuffle deck using Fisher-Yates algorithm
export const shuffleDeck = (deck: PlayingCard[]): PlayingCard[] => {
  // Create a new copy of the deck
  const shuffled = [...deck];
  
  // Fisher-Yates shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
};
