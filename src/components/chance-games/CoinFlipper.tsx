
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const CoinFlipper = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [coinSide, setCoinSide] = useState<'heads' | 'tails'>('heads');
  const [flipCount, setFlipCount] = useState(0);
  const [headsCount, setHeadsCount] = useState(0);
  const [tailsCount, setTailsCount] = useState(0);
  const [history, setHistory] = useState<Array<'heads' | 'tails'>>([]);
  
  const flipCoin = () => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    
    // Animate for 2 seconds
    setTimeout(() => {
      const result: 'heads' | 'tails' = Math.random() < 0.5 ? 'heads' : 'tails';
      setCoinSide(result);
      setFlipCount(prevCount => prevCount + 1);
      
      if (result === 'heads') {
        setHeadsCount(prevCount => prevCount + 1);
      } else {
        setTailsCount(prevCount => prevCount + 1);
      }
      
      // Add to history (limited to last 10 flips)
      setHistory(prev => {
        const newHistory = [result, ...prev];
        return newHistory.slice(0, 10) as Array<'heads' | 'tails'>;
      });
      
      setIsFlipping(false);
    }, 2000);
  };
  
  // Calculate percentages
  const headsPercentage = flipCount > 0 ? Math.round((headsCount / flipCount) * 100) : 0;
  const tailsPercentage = flipCount > 0 ? Math.round((tailsCount / flipCount) * 100) : 0;
  
  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative w-48 h-48 sm:w-60 sm:h-60">
        {/* Coin shadow */}
        <div 
          className={cn(
            "absolute -bottom-6 left-1/2 w-40 h-3 bg-black/20 rounded-full blur-md transition-all duration-500",
            isFlipping ? "opacity-50 scale-75" : "opacity-100 scale-100"
          )}
          style={{ transform: 'translateX(-50%)' }}
        ></div>
        
        <motion.div
          className={cn(
            "w-full h-full rounded-full shadow-xl flex items-center justify-center transform-gpu perspective-1000",
            coinSide === 'heads' 
              ? "bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 border-4 border-yellow-300" 
              : "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 border-4 border-yellow-400"
          )}
          style={{
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2), inset 0 5px 10px rgba(255, 255, 255, 0.6), inset 0 -5px 10px rgba(0, 0, 0, 0.1)'
          }}
          animate={{
            rotateX: isFlipping ? [0, 1080] : 0,
            rotateY: isFlipping ? [0, 720] : 0,
            z: isFlipping ? [0, 100, 0] : 0
          }}
          transition={{ 
            duration: 2,
            ease: "easeInOut" 
          }}
        >
          {coinSide === 'heads' ? (
            <div className="relative flex flex-col items-center justify-center w-full h-full">
              {/* Embossed circle */}
              <div className="absolute inset-4 rounded-full border-2 border-yellow-500/30"></div>
              
              {/* Center emblem */}
              <div className="relative z-10 flex flex-col items-center justify-center bg-yellow-300 rounded-full w-1/2 h-1/2 border border-yellow-400">
                <span className="text-3xl font-bold text-yellow-700" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.5)' }}>H</span>
              </div>
              
              {/* Edge texture */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute w-0.5 bg-yellow-500/20 origin-center"
                    style={{ 
                      height: '100%', 
                      left: '50%',
                      transform: `translateX(-50%) rotate(${i * 9}deg)` 
                    }}
                  ></div>
                ))}
              </div>
            </div>
          ) : (
            <div className="relative flex flex-col items-center justify-center w-full h-full">
              {/* Embossed circle */}
              <div className="absolute inset-4 rounded-full border-2 border-yellow-600/30"></div>
              
              {/* Center emblem */}
              <div className="relative z-10 flex flex-col items-center justify-center bg-yellow-500 rounded-full w-1/2 h-1/2 border border-yellow-600">
                <span className="text-3xl font-bold text-yellow-800" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.5)' }}>T</span>
              </div>
              
              {/* Edge texture */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute w-0.5 bg-yellow-600/20 origin-center"
                    style={{ 
                      height: '100%', 
                      left: '50%',
                      transform: `translateX(-50%) rotate(${i * 9}deg)` 
                    }}
                  ></div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
      
      <Button 
        onClick={flipCoin} 
        disabled={isFlipping}
        size="lg"
        className="mt-4"
      >
        {isFlipping ? 'Flipping...' : 'Flip Coin'}
      </Button>
      
      {/* Stats section */}
      {flipCount > 0 && (
        <div className="w-full max-w-md bg-gray-50 rounded-xl p-4 space-y-4">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Total flips: {flipCount}</span>
            <span>Last flip: {coinSide === 'heads' ? 'Heads' : 'Tails'}</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Heads</span>
              <span>{headsCount} ({headsPercentage}%)</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${headsPercentage}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">Tails</span>
              <span>{tailsCount} ({tailsPercentage}%)</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500 rounded-full"
                style={{ width: `${tailsPercentage}%` }}
              ></div>
            </div>
          </div>
          
          {/* Flip history */}
          {history.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Recent flips:</h4>
              <div className="flex flex-wrap gap-1">
                {history.map((flip, index) => (
                  <Badge 
                    key={index} 
                    variant={flip === 'heads' ? 'default' : 'destructive'}
                    className="text-xs"
                  >
                    {flip === 'heads' ? 'H' : 'T'}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CoinFlipper;
