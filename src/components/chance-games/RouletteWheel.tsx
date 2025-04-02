
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { getRandomInt } from '@/utils/games/chanceGamesUtils';
import { rouletteNumbers, type RouletteNumber } from '@/utils/games/chanceGamesUtils';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/hooks/use-toast';
import { Clock, RotateCcw, History } from 'lucide-react';
import { Card } from '@/components/ui/card';

const RouletteWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<RouletteNumber | null>(null);
  const [history, setHistory] = useState<RouletteNumber[]>([]);
  const [showStats, setShowStats] = useState(false);
  const [ballPosition, setBallPosition] = useState({ x: 0, y: -180 });
  const wheelRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    audioRef.current = new Audio('/roulette-spin.mp3');
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const stats = {
    red: history.filter(item => item.color === 'red').length,
    black: history.filter(item => item.color === 'black').length,
    green: history.filter(item => item.color === 'green').length,
    even: history.filter(item => typeof item.number === 'number' && item.number % 2 === 0 && item.number !== 0).length,
    odd: history.filter(item => typeof item.number === 'number' && item.number % 2 !== 0).length,
    low: history.filter(item => typeof item.number === 'number' && item.number >= 1 && item.number <= 18).length,
    high: history.filter(item => typeof item.number === 'number' && item.number >= 19 && item.number <= 36).length,
  };

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setResult(null);
    
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
    
    // Generate a random result index first
    const resultIndex = getRandomInt(0, rouletteNumbers.length - 1);
    const selectedNumber = rouletteNumbers[resultIndex];
    
    // Calculate the angle needed to land on this number
    const degreesPerNumber = 360 / rouletteNumbers.length;
    const targetAngle = (360 - (resultIndex * degreesPerNumber)) % 360;
    
    // Add enough full rotations (at least 5) plus the target angle
    const spinAngle = 1800 + getRandomInt(0, 360) + targetAngle;
    setRotation(prev => prev + spinAngle);
    
    // Reset ball position for animation start
    setBallPosition({ x: 0, y: -180 });
    
    setTimeout(() => {
      setResult(selectedNumber);
      setHistory(prev => [selectedNumber, ...prev.slice(0, 19)]);
      setIsSpinning(false);
      
      // Calculate the exact position for the ball to land on the winning number
      const angle = (resultIndex * degreesPerNumber + degreesPerNumber / 2 - 90) * (Math.PI / 180);
      
      // Use a consistent radius that keeps the ball on the wheel
      const ballRadius = 160; // Reduced to ensure ball stays visible on wheel
      const x = ballRadius * Math.cos(angle);
      const y = ballRadius * Math.sin(angle);
      
      // Set the final ball position
      setBallPosition({ x, y });
      
      toast({
        title: "Result",
        description: `The ball landed on ${selectedNumber.number} ${selectedNumber.color}`
      });
    }, 4000);
  };

  const segmentAngle = 360 / rouletteNumbers.length;
  
  const generateWheelSegments = () => {
    return rouletteNumbers.map((number, index) => {
      const startAngle = index * segmentAngle;
      const endAngle = startAngle + segmentAngle;
      
      const startRad = (startAngle - 90) * (Math.PI / 180);
      const endRad = (endAngle - 90) * (Math.PI / 180);
      
      const radius = 240;
      const x1 = radius * Math.cos(startRad);
      const y1 = radius * Math.sin(startRad);
      const x2 = radius * Math.cos(endRad);
      const y2 = radius * Math.sin(endRad);
      
      const largeArcFlag = segmentAngle > 180 ? 1 : 0;
      const pathData = `
        M 0 0
        L ${x1} ${y1}
        A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
        Z
      `;
      
      const fillColor = number.color === 'red' ? '#f44336' : 
                        number.color === 'black' ? '#263238' : 
                        '#4caf50';
      
      return (
        <path 
          key={index} 
          d={pathData} 
          fill={fillColor}
          stroke="#fff"
          strokeWidth="1"
        />
      );
    });
  };
  
  const generateNumberLabels = () => {
    return rouletteNumbers.map((number, index) => {
      const angle = index * segmentAngle + segmentAngle / 2;
      const angleRad = (angle - 90) * (Math.PI / 180);
      
      const radius = 200;
      const x = radius * Math.cos(angleRad);
      const y = radius * Math.sin(angleRad);
      
      return (
        <text
          key={index}
          x={x}
          y={y}
          fill="#e5e5e5"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="20"
          fontWeight="bold"
          transform={`rotate(${angle}, ${x}, ${y})`}
        >
          {number.number}
        </text>
      );
    });
  };

  return (
    <div className="flex flex-col items-center space-y-6 md:space-y-8">
      <div className="w-full max-w-3xl bg-[#1e2630] rounded-xl p-6 shadow-xl">
        <div className="relative w-full max-w-lg mx-auto aspect-square">
          <motion.div
            ref={wheelRef}
            className="w-full h-full rounded-full overflow-hidden relative border-8 border-[#cfdae5] shadow-[0_0_20px_rgba(0,0,0,0.3)]"
            animate={{ rotate: rotation }}
            transition={{ duration: 4, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ 
              transformOrigin: 'center center',
              background: 'radial-gradient(circle, #2c3e50 0%, #1e2630 100%)'
            }}
          >
            <svg 
              width="100%" 
              height="100%" 
              viewBox="-250 -250 500 500"
              style={{ position: 'absolute', top: 0, left: 0 }}
            >
              <g>
                {generateWheelSegments()}
                {generateNumberLabels()}
              </g>
            </svg>
            
            <div className="absolute inset-2 rounded-full border-4 border-[#cfdae5] z-10"></div>
            
            {/* Ball */}
            <motion.div 
              className="absolute w-4 h-4 rounded-full bg-white shadow-md z-20"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
              animate={{
                // Direct position calculation based on state
                x: ballPosition.x,
                y: ballPosition.y
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: isSpinning ? 4 : 0.5
              }}
            />
          </motion.div>
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#cfdae5] border-4 border-[#1e2630] z-30 flex items-center justify-center shadow-lg">
            <Clock className="w-8 h-8 text-[#1e2630]" />
          </div>
        </div>
      </div>
      
      <div className="flex gap-4">
        <Button 
          onClick={spinWheel} 
          disabled={isSpinning}
          size="lg"
          className="bg-[#1e2630] hover:bg-[#1e2630]/90 min-w-[160px]"
        >
          {isSpinning ? (
            <>
              <div className="animate-spin mr-2">
                <RotateCcw className="h-5 w-5" />
              </div>
              Spinning...
            </>
          ) : (
            <>Spin Wheel</>
          )}
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          onClick={() => setShowStats(!showStats)}
        >
          <History className="h-5 w-5 mr-2" />
          {showStats ? 'Hide Stats' : 'Show Stats'}
        </Button>
      </div>
      
      {result && (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`text-3xl font-bold mt-2 px-8 py-4 rounded-xl shadow-lg ${
            result.color === 'red' 
              ? 'bg-red-600 text-white' 
              : result.color === 'black' 
                ? 'bg-black text-white' 
                : 'bg-green-600 text-white'
          }`}
        >
          {result.number}
        </motion.div>
      )}
      
      <AnimatePresence>
        {showStats && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full overflow-hidden"
          >
            <Card className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-red-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-red-600">{stats.red}</div>
                  <div className="text-sm text-gray-600">Red</div>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-white">{stats.black}</div>
                  <div className="text-sm text-gray-400">Black</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.green}</div>
                  <div className="text-sm text-gray-600">Green (0)</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{history.length}</div>
                  <div className="text-sm text-gray-600">Total Spins</div>
                </div>
                
                <div className="col-span-2 md:col-span-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-lg font-bold">{stats.even}</div>
                      <div className="text-sm text-gray-600">Even</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-lg font-bold">{stats.odd}</div>
                      <div className="text-sm text-gray-600">Odd</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-lg font-bold">{stats.low}</div>
                      <div className="text-sm text-gray-600">1-18</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-lg font-bold">{stats.high}</div>
                      <div className="text-sm text-gray-600">19-36</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <History className="h-4 w-4" />
                  Recent Results
                </h3>
                <div className="flex flex-wrap gap-2">
                  {history.map((item, index) => (
                    <div 
                      key={index} 
                      className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold text-white ${
                        item.color === 'red' 
                          ? 'bg-red-600' 
                          : item.color === 'black' 
                            ? 'bg-black' 
                            : 'bg-green-600'
                      }`}
                    >
                      {item.number}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      
      <style>
        {`
          @keyframes ballSpin {
            0% {
              transform: translateX(-50%) rotate(0deg) translateY(0) translateX(0);
            }
            10% {
              transform: translateX(-50%) rotate(180deg) translateY(-120px) translateX(30px);
            }
            20% {
              transform: translateX(-50%) rotate(360deg) translateY(-100px) translateX(-50px);
            }
            30% {
              transform: translateX(-50%) rotate(720deg) translateY(-80px) translateX(40px);
            }
            40% {
              transform: translateX(-50%) rotate(1080deg) translateY(-60px) translateX(-30px);
            }
            50% {
              transform: translateX(-50%) rotate(1440deg) translateY(-40px) translateX(20px);
            }
            75% {
              transform: translateX(-50%) rotate(2160deg) translateY(-20px) translateX(-10px);
            }
            100% {
              transform: translateX(-50%) rotate(2520deg) translateY(0) translateX(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default RouletteWheel;
