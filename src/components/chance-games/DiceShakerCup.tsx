import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Dices, RotateCw } from 'lucide-react';
import { getRandomInt, rollMultipleDice, getDiceSum, DiceRoll } from '@/utils/games/chanceGamesUtils';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/hooks/use-toast';

interface DiceShakerCupProps {
  initialDiceCount?: number;
}

const DiceShakerCup = ({ initialDiceCount = 5 }: DiceShakerCupProps) => {
  const [diceCount] = useState(initialDiceCount);
  const [diceValues, setDiceValues] = useState<DiceRoll[]>([]);
  const [isShaking, setIsShaking] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [shakingIntensity, setShakingIntensity] = useState(0);
  const shakingTimer = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    audioRef.current = new Audio('/shake-sound.mp3');
    
    // Initial roll
    const initialValues = rollMultipleDice(diceCount, 6);
    setDiceValues(initialValues);
    setIsRevealed(false);
    
    // Listen for device motion if available
    if (window.DeviceMotionEvent) {
      const handleMotion = (event: DeviceMotionEvent) => {
        // Calculate acceleration magnitude
        const acceleration = event.accelerationIncludingGravity;
        if (acceleration && acceleration.x && acceleration.y && acceleration.z) {
          const magnitude = Math.sqrt(
            acceleration.x ** 2 + acceleration.y ** 2 + acceleration.z ** 2
          );
          
          // If there's significant movement, shake the dice
          if (magnitude > 15 && !isShaking) {
            shakeDice();
          }
        }
      };
      
      window.addEventListener('devicemotion', handleMotion);
      
      return () => {
        window.removeEventListener('devicemotion', handleMotion);
        if (shakingTimer.current) {
          clearInterval(shakingTimer.current);
        }
      };
    }
  }, [diceCount]);

  const shakeDice = () => {
    if (isShaking) return;
    
    setIsShaking(true);
    setIsRevealed(false);
    setShakingIntensity(5);
    
    // Play shaking sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
    
    // Simulate shaking animation
    let shakeTime = 0;
    shakingTimer.current = setInterval(() => {
      shakeTime += 100;
      
      // Randomly change dice values during shaking
      const shakingValues = rollMultipleDice(diceCount, 6);
      setDiceValues(shakingValues);
      
      // Gradually reduce shaking intensity
      if (shakeTime > 700) {
        setShakingIntensity(prev => Math.max(0, prev - 1));
      }
      
      // End shaking
      if (shakeTime >= 1500) {
        if (shakingTimer.current) clearInterval(shakingTimer.current);
        
        const finalValues = rollMultipleDice(diceCount, 6);
        setDiceValues(finalValues);
        setIsShaking(false);
        
        // Show toast with results
        toast({
          title: "Dice Rolled!",
          description: `You rolled: ${finalValues.map(die => die.value).join(', ')}${finalValues.length > 1 ? ` (Sum: ${getDiceSum(finalValues)})` : ''}`,
        });
      }
    }, 100);
  };

  const revealDice = () => {
    if (isShaking) return;
    setIsRevealed(true);
  };

  const getDiceIcon = (value: number) => {
    const iconProps = {
      className: "w-12 h-12 md:w-16 md:h-16",
    };
    
    switch (value) {
      case 1: return <Dice1 {...iconProps} />;
      case 2: return <Dice2 {...iconProps} />;
      case 3: return <Dice3 {...iconProps} />;
      case 4: return <Dice4 {...iconProps} />;
      case 5: return <Dice5 {...iconProps} />;
      case 6: return <Dice6 {...iconProps} />;
      default: return <Dices {...iconProps} />;
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="text-center mb-4">
        <h3 className="text-xl font-medium mb-2">Shake Cup to Roll Dice</h3>
        <p className="text-sm text-gray-500">
          {isRevealed 
            ? "Here are your dice results"
            : isShaking 
              ? "Shaking the cup..."
              : "Click 'Shake Cup' or physically shake your device"}
        </p>
      </div>
      
      <div className="relative w-72 h-72 md:w-96 md:h-96">
        {/* Cup Container */}
        <motion.div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 h-64 md:w-80 md:h-80"
          animate={{
            x: isShaking ? [-5, 5, -3, 3, 0][Math.floor(Math.random() * 5)] * shakingIntensity : 0,
            y: isShaking ? [-3, 4, -2, 3, 0][Math.floor(Math.random() * 5)] * shakingIntensity : 0,
            rotate: isShaking ? [-2, 2, -1, 1, 0][Math.floor(Math.random() * 5)] * shakingIntensity : 0
          }}
          transition={{ type: "spring", damping: 10 }}
        >
          {/* Cup Top */}
          <AnimatePresence>
            {!isRevealed && (
              <motion.div
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ type: "spring", damping: 15 }}
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
              >
                <div 
                  className="bg-[#1e2630] rounded-t-full w-48 h-44 md:w-64 md:h-56 flex items-center justify-center transform -rotate-[5deg] shadow-lg"
                  style={{
                    background: 'linear-gradient(45deg, #1e2630 0%, #2c3e50 100%)',
                  }}
                >
                  <div className="relative w-24 h-24 md:w-32 md:h-32">
                    <div className="absolute inset-0 bg-[#cfdae5] rounded-full opacity-10"></div>
                    <div className="absolute inset-2 bg-[#cfdae5] rounded-full opacity-20"></div>
                    <div className="absolute inset-4 bg-[#cfdae5] rounded-full opacity-30"></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cup Bottom with Dice */}
          <div className="absolute bottom-0 left-0 w-full">
            <div 
              className="bg-[#1e2630] rounded-b-full w-48 h-28 md:w-64 md:h-32 mx-auto flex items-center justify-center shadow-lg"
              style={{
                background: 'linear-gradient(45deg, #1e2630 0%, #2c3e50 100%)',
              }}
            >
              <div 
                className="bg-[#cfdae5] rounded-full w-40 h-24 md:w-56 md:h-28 flex items-center justify-center opacity-90"
                style={{
                  background: 'linear-gradient(45deg, #cfdae5 0%, #e8f0f7 100%)',
                }}
              >
                {/* Dice Area */}
                <AnimatePresence>
                  {(isRevealed || isShaking) && (
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ type: "spring", damping: 12 }}
                      className="flex flex-wrap gap-2 justify-center"
                    >
                      {diceValues.map((die) => (
                        <motion.div
                          key={die.id}
                          className="bg-white rounded-lg p-1 shadow-lg"
                          animate={{
                            x: isShaking ? Math.random() * 10 - 5 : 0,
                            y: isShaking ? Math.random() * 10 - 5 : 0,
                            rotate: isShaking ? Math.random() * 30 - 15 : 0,
                            scale: isShaking ? 0.9 + Math.random() * 0.2 : 1
                          }}
                          transition={{ type: "spring", damping: 10 }}
                        >
                          {getDiceIcon(die.value)}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="flex gap-4">
        <Button 
          onClick={shakeDice} 
          disabled={isShaking}
          size="lg"
          className="bg-[#1e2630] hover:bg-[#1e2630]/90 min-w-[140px]"
        >
          {isShaking ? (
            <span className="flex items-center">
              <RotateCw className="w-5 h-5 mr-2 animate-spin" />
              Shaking...
            </span>
          ) : (
            "Shake Cup"
          )}
        </Button>
        
        <Button 
          onClick={revealDice} 
          disabled={isShaking || isRevealed}
          size="lg"
          variant="outline"
        >
          Reveal Dice
        </Button>
      </div>
      
      {isRevealed && diceValues.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-4"
        >
          <div className="text-2xl font-bold mb-2">
            You rolled: {diceValues.map(die => die.value).join(', ')}
          </div>
          {diceValues.length > 1 && (
            <div className="text-xl text-gray-600">
              Total: {getDiceSum(diceValues)}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default DiceShakerCup;
