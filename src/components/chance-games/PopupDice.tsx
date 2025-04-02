
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dices } from 'lucide-react';
import { getRandomInt } from '@/utils/chanceGamesUtils';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import EnhancedDice from './EnhancedDice';

interface PopupDiceProps {
  initialDiceCount?: number;
  maxDiceCount?: number;
}

const PopupDice = ({
  initialDiceCount = 3,
  maxDiceCount = 20
}: PopupDiceProps) => {
  const [diceCount, setDiceCount] = useState(initialDiceCount);
  const [popupDice, setPopupDice] = useState<{ id: number; value: number; x: number; y: number; }[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const addMoreDice = () => {
    if (diceCount < maxDiceCount) {
      setDiceCount(diceCount + 1);
    }
  };

  const removeDice = () => {
    if (diceCount > 1) {
      setDiceCount(diceCount - 1);
    }
  };

  const throwDice = () => {
    if (!containerRef.current) return;
    
    setIsRolling(true);
    
    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;
    
    const newDice = Array.from({ length: diceCount }, (_, i) => ({
      id: Date.now() + i,
      value: getRandomInt(1, 6),
      x: getRandomInt(50, containerWidth - 100),
      y: getRandomInt(50, containerHeight - 100)
    }));
    
    // Simulating a rolling animation
    setTimeout(() => {
      setPopupDice(newDice);
      setIsRolling(false);
    }, 1000);
  };

  useEffect(() => {
    throwDice();
    
    // Add keyboard event for space bar to roll dice
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        throwDice();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [diceCount]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button onClick={removeDice} variant="outline" disabled={diceCount <= 1}>
            -
          </Button>
          <span className="text-lg font-medium">{diceCount} Dice</span>
          <Button onClick={addMoreDice} variant="outline" disabled={diceCount >= maxDiceCount}>
            +
          </Button>
        </div>
        
        <Button 
          onClick={throwDice} 
          size="lg" 
          className="bg-[#1e2630] hover:bg-[#1e2630]/90"
          disabled={isRolling}
        >
          {isRolling ? "Rolling..." : "Pop Dice!"}
        </Button>
      </div>
      
      <div 
        ref={containerRef}
        className="relative bg-gradient-to-br from-green-100 to-blue-100 rounded-lg border border-gray-200 min-h-[300px] md:min-h-[400px] w-full overflow-hidden"
      >
        <AnimatePresence>
          {popupDice.map((dice) => (
            <motion.div
              key={dice.id}
              className="absolute"
              initial={{ 
                opacity: 0, 
                scale: 0, 
                x: containerRef.current ? containerRef.current.offsetWidth / 2 : 0,
                y: containerRef.current ? containerRef.current.offsetHeight : 0 
              }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                x: dice.x, 
                y: dice.y,
                rotate: getRandomInt(-20, 20)
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ 
                type: "spring", 
                bounce: 0.7, 
                duration: 0.8 
              }}
            >
              <EnhancedDice value={dice.value} size="md" isRolling={isRolling} />
            </motion.div>
          ))}
        </AnimatePresence>
        
        <div className="absolute bottom-4 left-4 right-4 text-center text-sm text-gray-500">
          Press Space or click "Pop Dice!" to roll
        </div>
      </div>
      
      <div className="flex justify-center py-4">
        <div className="bg-white px-4 py-2 rounded-full shadow inline-flex space-x-4">
          {Array.from(new Set(popupDice.map(d => d.value))).sort((a, b) => a - b).map((value) => (
            <span key={value} className="flex items-center">
              <div className="w-6 h-6 mr-1 relative">
                <EnhancedDice value={value} size="sm" />
              </div>
              <span className="ml-1 text-sm">
                × {popupDice.filter(d => d.value === value).length}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopupDice;
