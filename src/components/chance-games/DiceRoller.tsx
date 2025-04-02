import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dices, RotateCw, History } from 'lucide-react';
import { getRandomInt, rollMultipleDice, getDiceSum, DiceRoll } from '@/utils/games/chanceGamesUtils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import EnhancedDice from './EnhancedDice';

interface DiceRollerProps {
  maxDice?: number;
  initialDice?: number;
  animated?: boolean;
  showSum?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const DiceRoller = ({
  maxDice = 6,
  initialDice = 2,
  animated = true,
  showSum = true,
  size = 'md',
}: DiceRollerProps) => {
  const [numberOfDice, setNumberOfDice] = useState(initialDice);
  const [diceValues, setDiceValues] = useState<DiceRoll[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [history, setHistory] = useState<{ values: DiceRoll[], sum: number }[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Roll the dice on component mount
  useEffect(() => {
    handleRoll();
  }, []);

  const handleRoll = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    
    // Animation effect for rolling
    if (animated) {
      const animationDuration = 1500;
      const framesPerSecond = 15;
      const totalFrames = animationDuration / (1000 / framesPerSecond);
      let frame = 0;
      
      const animateRoll = () => {
        // Generate random values for animation
        setDiceValues(rollMultipleDice(numberOfDice, 6));
        
        frame += 1;
        
        if (frame < totalFrames) {
          setTimeout(animateRoll, 1000 / framesPerSecond);
        } else {
          // Final values
          const finalValues = rollMultipleDice(numberOfDice, 6);
          setDiceValues(finalValues);
          
          // Add to history
          setHistory(prev => [
            { values: finalValues, sum: getDiceSum(finalValues) },
            ...prev.slice(0, 9) // Keep last 10 rolls
          ]);
          
          setIsRolling(false);
        }
      };
      
      animateRoll();
    } else {
      // No animation, just set final values
      const finalValues = rollMultipleDice(numberOfDice, 6);
      setDiceValues(finalValues);
      
      // Add to history
      setHistory(prev => [
        { values: finalValues, sum: getDiceSum(finalValues) },
        ...prev.slice(0, 9)
      ]);
      
      setIsRolling(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-end justify-between">
        <div className="space-y-4">
          <div>
            <Label htmlFor="diceCount" className="block mb-2 text-sm font-medium">Number of Dice</Label>
            <Select 
              value={numberOfDice.toString()} 
              onValueChange={(value) => setNumberOfDice(parseInt(value))}
            >
              <SelectTrigger className="w-24" id="diceCount">
                <SelectValue placeholder="1" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: maxDice }, (_, i) => i + 1).map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button 
          onClick={handleRoll} 
          disabled={isRolling}
          size="lg" 
          className="bg-[#1e2630] hover:bg-[#1e2630]/90 px-8"
        >
          {isRolling ? "Rolling..." : "Roll Dice"} 
          <RotateCw className={`ml-2 ${isRolling ? 'animate-spin' : ''}`} />
        </Button>
      </div>
      
      <div className="relative min-h-[200px] bg-[#f8f9fa] rounded-xl p-6 flex items-center justify-center">
        <AnimatePresence>
          <div className="flex flex-wrap gap-6 justify-center">
            {diceValues.map((dice, index) => (
              <motion.div
                key={dice.id || `dice-${index}`}
                initial={{ scale: 0.5, rotate: -180, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  rotate: 0,
                  opacity: 1,
                  x: isRolling ? [getRandomInt(-10, 10), getRandomInt(-5, 5), 0] : 0,
                  y: isRolling ? [getRandomInt(-10, 10), getRandomInt(-5, 5), 0] : 0
                }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ 
                  duration: 0.5
                }}
              >
                <EnhancedDice value={dice.value} size={size} isRolling={isRolling} />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
      
      {showSum && diceValues.length > 1 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-2xl font-bold mt-2 bg-[#f0f4f8] rounded-lg py-2"
        >
          Total: {getDiceSum(diceValues)}
        </motion.div>
      )}
      
      {history.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">Recent Rolls</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowHistory(!showHistory)}
              className="text-sm"
            >
              <History className="h-4 w-4 mr-1" />
              {showHistory ? 'Hide History' : 'Show History'}
            </Button>
          </div>
          
          {showHistory && (
            <Card className="p-4">
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {history.map((roll, index) => (
                  <div key={index} className="bg-[#f8f9fa] p-3 rounded-lg flex items-center">
                    <span className="text-sm font-medium text-gray-500 w-8">#{index + 1}:</span>
                    <div className="flex flex-wrap gap-1 mx-2">
                      {roll.values.map((die) => (
                        <span 
                          key={die.id} 
                          className="inline-flex items-center justify-center w-7 h-7 text-center bg-white rounded-md border border-gray-300 shadow-sm"
                        >
                          {die.value}
                        </span>
                      ))}
                    </div>
                    {roll.values.length > 1 && (
                      <span className="text-sm font-medium ml-auto">Sum: {roll.sum}</span>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default DiceRoller;
