import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { XCircle, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import CardDisplay from './CardDisplay';
import { PlayingCard, createDeck, shuffleDeck } from './countingSystemsData';
import { toast } from '@/hooks/use-toast';
import { reportBug } from '@/utils/bugTracker';

interface CardDeckProps {
  isRunning: boolean;
  selectedSystem: string;
  exerciseMode: 'practice' | 'quiz' | 'speed';
  speed: number;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  updateRunningCount: (cardCount: number) => void;
  remainingTime: number;
  setRemainingTime: React.Dispatch<React.SetStateAction<number>>;
  handleReset: () => void;
}

const CardDeck: React.FC<CardDeckProps> = ({
  isRunning,
  selectedSystem,
  exerciseMode,
  speed,
  error,
  setError,
  updateRunningCount,
  remainingTime,
  setRemainingTime,
  handleReset
}) => {
  const [deck, setDeck] = useState<PlayingCard[]>([]);
  const [currentCard, setCurrentCard] = useState<PlayingCard | null>(null);
  const [displayedCards, setDisplayedCards] = useState<PlayingCard[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const speedTimerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/card-flip.mp3');
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    try {
      console.log("Creating new deck with system:", selectedSystem);
      const freshDeck = createDeck(selectedSystem);
      console.log(`New deck created with ${freshDeck.length} cards`);
      
      setDeck(freshDeck);
      setCurrentCard(null);
      setDisplayedCards([]);
      setError(null);

      reportBug("BUG-001", "Card randomization issue in BlackjackCardCounter");
    } catch (err) {
      console.error("Error creating deck:", err);
      setError("Failed to initialize the deck. Please try again.");
    }
  }, [selectedSystem, setError]);

  useEffect(() => {
    if (!isRunning) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setCurrentCard(null);
    }
  }, [isRunning]);

  useEffect(() => {
    if (isRunning && exerciseMode === 'speed') {
      speedTimerRef.current = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1) {
            clearInterval(speedTimerRef.current!);
            handleReset();
            toast({
              title: "Time's up!",
              description: "Your speed drill has ended."
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (speedTimerRef.current) {
        clearInterval(speedTimerRef.current);
        speedTimerRef.current = null;
      }
    };
  }, [isRunning, exerciseMode, handleReset, setRemainingTime]);

  useEffect(() => {
    if (isRunning && exerciseMode === 'practice') {
      dealNextCard();
    } else if (!isRunning) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRunning, exerciseMode]);

  const dealNextCard = () => {
    if (!isRunning || deck.length === 0) {
      if (deck.length === 0 && isRunning) {
        toast({
          title: "Deck Empty",
          description: "All cards have been dealt. Reset to start again."
        });
        handleReset();
      }
      return;
    }

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }

    const newCard = deck[0];
    const newDeck = [...deck.slice(1)];

    console.log(`Dealing card: ${newCard.value} of ${newCard.suit} (ID: ${newCard.id}), count: ${newCard.count}`);
    console.log(`Remaining deck size: ${newDeck.length}`);
    
    setDeck(newDeck);
    setCurrentCard(newCard);
    setDisplayedCards(prev => [newCard, ...prev.slice(0, 7)]);
    
    if (exerciseMode !== 'quiz') {
      updateRunningCount(newCard.count);
    }
    
    if (exerciseMode === 'practice') {
      timerRef.current = setTimeout(() => {
        dealNextCard();
      }, speed * 1000);
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="w-48 h-72 bg-red-50 rounded-lg border-2 border-red-200 flex items-center justify-center p-4">
          <div className="text-center">
            <XCircle className="h-10 w-10 text-red-500 mx-auto mb-2" />
            <p className="text-red-600 font-medium">{error}</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-4" 
              onClick={handleReset}
            >
              <RotateCcw className="h-3 w-3 mr-1" /> Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentCard && isRunning) {
    return (
      <div className="flex justify-center mb-6">
        <div onClick={dealNextCard} className="cursor-pointer">
          <div className="w-48 h-72 bg-gray-100 rounded-lg border-2 border-gray-200 flex items-center justify-center">
            <motion.p 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-gray-400 text-center"
            >
              {exerciseMode === 'practice' 
                ? "Dealing..." 
                : "Tap to deal a card"}
            </motion.p>
          </div>
        </div>
      </div>
    );
  }

  if (!currentCard && !isRunning) {
    return (
      <div className="flex justify-center mb-6">
        <div className="w-48 h-72 bg-gray-100 rounded-lg border-2 border-gray-200 flex items-center justify-center">
          <p className="text-gray-400 text-center">
            Press Start to begin
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <CardDisplay card={currentCard} previousCards={displayedCards.slice(1)} />
      
      {(exerciseMode === 'quiz' || exerciseMode === 'speed') && currentCard && (
        <Button 
          onClick={dealNextCard} 
          className="mt-4"
          variant="secondary"
        >
          Deal Next Card
        </Button>
      )}
    </div>
  );
};

export default CardDeck;
