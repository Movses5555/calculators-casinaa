
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Diamond, Club, Spade } from 'lucide-react';
import { PlayingCard, CardSuit } from './countingSystemsData';

interface CardDisplayProps {
  card: PlayingCard | null;
  previousCards: PlayingCard[];
}

const CardDisplay: React.FC<CardDisplayProps> = ({ card, previousCards }) => {
  const renderSuitIcon = (suit: CardSuit) => {
    switch (suit) {
      case 'hearts':
        return <Heart className="h-6 w-6 text-red-600 fill-red-600" />;
      case 'diamonds':
        return <Diamond className="h-6 w-6 text-red-600 fill-red-600" />;
      case 'clubs':
        return <Club className="h-6 w-6 text-black" />;
      case 'spades':
        return <Spade className="h-6 w-6 text-black" />;
    }
  };

  const getCardColor = (suit: CardSuit) => {
    return suit === 'hearts' || suit === 'diamonds' ? 'text-red-600' : 'text-black';
  };

  return (
    <div>
      {card && (
        <div className="flex justify-center mb-6">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-48 h-72 bg-white rounded-lg border-2 border-gray-300 shadow-md flex flex-col justify-between p-3"
          >
            <div className="flex justify-between items-center">
              <div className={`text-3xl font-bold ${getCardColor(card.suit)}`}>
                {card.value}
              </div>
              <div>
                {renderSuitIcon(card.suit)}
              </div>
            </div>
            <div className="flex justify-center items-center flex-grow">
              <div className={`text-7xl font-bold ${getCardColor(card.suit)}`}>
                {card.value}
              </div>
            </div>
            <div className="flex justify-between items-center rotate-180">
              <div className={`text-3xl font-bold ${getCardColor(card.suit)}`}>
                {card.value}
              </div>
              <div>
                {renderSuitIcon(card.suit)}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {previousCards.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Previously Dealt Cards</p>
          <div className="flex flex-wrap gap-2 overflow-auto py-1 max-h-20">
            {previousCards.map((card, index) => (
              <div
                key={index}
                className={`w-8 h-12 bg-white rounded border border-gray-300 shadow-sm flex flex-col justify-center items-center ${getCardColor(card.suit)}`}
              >
                <div className="text-xs font-bold">{card.value}</div>
                <div className="h-3 w-3">
                  {renderSuitIcon(card.suit)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardDisplay;
