import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { createDeck, shuffleArray, Card } from '@/utils/chanceGamesUtils';

const HigherOrLower = () => {
  const [deck, setDeck] = useState<Card[]>([]);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [nextCard, setNextCard] = useState<Card | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const newDeck = shuffleArray(createDeck());
    const firstCard = newDeck.pop();
    const secondCard = newDeck.pop();
    
    if (firstCard && secondCard) {
      setDeck(newDeck);
      setCurrentCard(firstCard);
      setNextCard(secondCard);
      setIsRevealed(false);
      setScore(0);
      setGameOver(false);
      setMessage('Will the next card be higher or lower?');
    }
  };

  const makeGuess = (guess: 'higher' | 'lower') => {
    if (!currentCard || !nextCard || gameOver) return;
    
    setIsRevealed(true);
    
    let isCorrect = false;
    
    if (guess === 'higher' && nextCard.value > currentCard.value) {
      isCorrect = true;
    } else if (guess === 'lower' && nextCard.value < currentCard.value) {
      isCorrect = true;
    } else if (nextCard.value === currentCard.value) {
      isCorrect = true;
      setMessage('Same value! You got lucky!');
    }
    
    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > bestScore) {
        setBestScore(newScore);
      }
      setMessage('Correct! Keep going!');
      
      setTimeout(() => {
        if (deck.length > 0) {
          const newNextCard = deck.pop();
          const newDeck = [...deck];
          
          if (newNextCard) {
            setCurrentCard(nextCard);
            setNextCard(newNextCard);
            setDeck(newDeck);
            setIsRevealed(false);
            setMessage('Will the next card be higher or lower?');
          }
        } else {
          setMessage('You won! You completed the entire deck!');
          setGameOver(true);
        }
      }, 1500);
    } else {
      setMessage('Wrong guess! Game over.');
      setGameOver(true);
    }
  };

  const getCardDisplay = (card: Card | null, isVisible: boolean) => {
    if (!card || !isVisible) {
      return (
        <div className="w-36 h-48 md:w-48 md:h-64 bg-white rounded-lg border-2 border-gray-300 flex items-center justify-center">
          <div className="w-full h-full bg-gray-100 rounded-lg m-1 flex items-center justify-center">
            <span className="text-4xl">?</span>
          </div>
        </div>
      );
    }
    
    const suitColor = card.suit === 'hearts' || card.suit === 'diamonds' ? 'text-red-600' : 'text-black';
    const suitSymbol = {
      'hearts': '♥',
      'diamonds': '♦',
      'clubs': '♣',
      'spades': '♠'
    }[card.suit];
    
    return (
      <div className="w-36 h-48 md:w-48 md:h-64 bg-white rounded-lg border-2 border-gray-300 flex items-center justify-center p-2">
        <div className="w-full h-full bg-white rounded-lg border border-gray-200 flex flex-col items-center justify-between p-2">
          <div className={`self-start ${suitColor} font-bold`}>
            {card.name}
            <span className="ml-1">{suitSymbol}</span>
          </div>
          <div className={`text-4xl md:text-6xl ${suitColor}`}>
            {suitSymbol}
          </div>
          <div className={`self-end ${suitColor} font-bold transform rotate-180`}>
            {card.name}
            <span className="ml-1">{suitSymbol}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="text-center mb-2">
        <h3 className="text-lg font-medium">Higher or Lower</h3>
        <p className="text-sm text-gray-500">{message}</p>
      </div>
      
      <div className="flex flex-col items-center md:flex-row md:space-x-8 space-y-4 md:space-y-0">
        {getCardDisplay(currentCard, true)}
        
        <motion.div 
          initial={{ rotateY: 180 }}
          animate={{ rotateY: isRevealed ? 0 : 180 }}
          transition={{ duration: 0.6 }}
          style={{ perspective: 1000 }}
        >
          {getCardDisplay(nextCard, isRevealed)}
        </motion.div>
      </div>
      
      <div className="flex space-x-4">
        <Button 
          onClick={() => makeGuess('lower')} 
          disabled={isRevealed || gameOver}
          size="lg"
          variant="outline"
          className="w-28"
        >
          Lower
        </Button>
        
        <Button 
          onClick={() => makeGuess('higher')} 
          disabled={isRevealed || gameOver}
          size="lg"
          className="w-28"
        >
          Higher
        </Button>
      </div>
      
      {gameOver && (
        <Button onClick={startNewGame} variant="default">
          Start New Game
        </Button>
      )}
      
      <div className="flex justify-between w-full max-w-xs px-4 py-2 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-sm text-gray-500">Score</div>
          <div className="text-2xl font-bold">{score}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500">Best</div>
          <div className="text-2xl font-bold">{bestScore}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500">Cards Left</div>
          <div className="text-2xl font-bold">{deck.length}</div>
        </div>
      </div>
    </div>
  );
};

export default HigherOrLower;
