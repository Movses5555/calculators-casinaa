
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getRandomInt } from '@/utils/chanceGamesUtils';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartIcon, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LovesMeNotGame = () => {
  const [yourName, setYourName] = useState('');
  const [crushName, setCrushName] = useState('');
  const [petals, setPetals] = useState<{id: number; removed: boolean; lovesMe: boolean}[]>([]);
  const [currentPetal, setCurrentPetal] = useState(-1);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [result, setResult] = useState<'loves' | 'loves not' | null>(null);
  const [petalCount, setPetalCount] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const { toast } = useToast();

  const startGame = () => {
    if (!yourName.trim() || !crushName.trim()) {
      toast({
        title: "Names required",
        description: "Please enter both names to start the game",
        variant: "destructive"
      });
      return;
    }
    
    // Generate random number of petals (between 5 and 12)
    const count = getRandomInt(5, 12);
    setPetalCount(count);
    
    // Create petals array
    const newPetals = Array.from({ length: count }, (_, i) => ({
      id: i,
      removed: false,
      lovesMe: i % 2 === 0 // Alternating between loves me and loves me not
    }));
    
    setPetals(newPetals);
    setCurrentPetal(-1);
    setGameStarted(true);
    setGameEnded(false);
    setResult(null);
    setAnimationComplete(true);
    
    toast({
      title: "Game started!",
      description: "Click on the petals one by one",
    });
  };

  const pluckPetal = (index: number) => {
    if (petals[index].removed || gameEnded || !animationComplete) return;
    
    setAnimationComplete(false);
    
    const newPetals = [...petals];
    newPetals[index].removed = true;
    setPetals(newPetals);
    
    // Set current petal for animation
    setCurrentPetal(index);
    
    // Check if this was the last petal
    const remainingPetals = newPetals.filter(p => !p.removed);
    if (remainingPetals.length === 0) {
      // Game ended - determine result
      const finalPetal = newPetals[index];
      setResult(finalPetal.lovesMe ? 'loves' : 'loves not');
      setGameEnded(true);
    }
    
    // Allow time for animation to complete
    setTimeout(() => {
      setAnimationComplete(true);
    }, 1500);
  };

  // Set animation as complete initially
  useEffect(() => {
    setAnimationComplete(true);
  }, []);

  // Calculate petal positions in a flower shape
  const getPetalPosition = (index: number, total: number) => {
    const angle = (index / total) * Math.PI * 2;
    const radius = 85; // Distance from center (adjusted to position petals around the larger center)
    
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      rotate: (angle * 180) / Math.PI + 90, // Convert to degrees and add 90 for petal orientation
    };
  };

  // Get a pink/red shade for the petals
  const getPetalColor = (index: number) => {
    const colors = [
      '#FFDEE2', // Soft pink
      '#FFB6C1', // Light pink
      '#FF69B4', // Hot pink
      '#FF1493', // Deep pink
      '#DB7093', // Pale violet red
      '#C71585', // Medium violet red
      '#DC143C', // Crimson
      '#FF4500', // Red-orange
      '#FF6347', // Tomato
      '#FA8072', // Salmon
    ];
    
    return colors[index % colors.length];
  };

  return (
    <div className="flex flex-col items-center space-y-6 max-w-2xl mx-auto">
      {!gameStarted ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-medium mb-4 text-center flex items-center justify-center gap-2">
            <HeartIcon className="h-5 w-5 text-pink-500" />
            Enter Names to Begin
            <HeartIcon className="h-5 w-5 text-pink-500" />
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <Input
                value={yourName}
                onChange={(e) => setYourName(e.target.value)}
                placeholder="Enter your name"
                className="focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Their Name</label>
              <Input
                value={crushName}
                onChange={(e) => setCrushName(e.target.value)}
                placeholder="Enter their name"
                className="focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            
            <Button 
              onClick={startGame} 
              className="w-full bg-pink-500 hover:bg-pink-600"
              disabled={!yourName.trim() || !crushName.trim()}
            >
              Start Game
            </Button>
          </div>
        </motion.div>
      ) : (
        <>
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full text-center mb-4"
          >
            <h3 className="text-2xl font-medium">
              {yourName} <span className="text-pink-500">❤️</span> {crushName}?
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              {gameEnded 
                ? `Final result: ${crushName} ${result === 'loves' ? 'loves' : 'loves not'} ${yourName}!` 
                : 'Click on the petals one by one'}
            </p>
          </motion.div>
          
          <div className="relative w-[350px] h-[350px] flex items-center justify-center">
            {/* Flower center - adjusted size and layers for better appearance */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="absolute w-28 h-28 rounded-full bg-yellow-300 z-10 shadow-lg flex items-center justify-center"
            >
              <div className="bg-yellow-400 w-20 h-20 rounded-full flex items-center justify-center">
                <div className="bg-yellow-500 w-14 h-14 rounded-full flex items-center justify-center">
                  <div className="bg-yellow-600 w-8 h-8 rounded-full"></div>
                </div>
              </div>
            </motion.div>
            
            {/* Petals */}
            <AnimatePresence>
              {petals.map((petal, index) => {
                const position = getPetalPosition(index, petalCount);
                const delay = index * 0.1;
                
                return (
                  <motion.div
                    key={petal.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: petal.removed ? 0 : 1, 
                      scale: petal.removed ? 0 : 1,
                      x: position.x,
                      y: position.y,
                      rotate: position.rotate,
                      transition: {
                        delay: gameStarted && !petal.removed ? delay : 0,
                        type: "spring",
                        stiffness: 200,
                        damping: 15
                      }
                    }}
                    exit={
                      petal.removed && currentPetal === index
                        ? {
                            x: [position.x, position.x * 1.5, window.innerWidth * (position.x > 0 ? 1 : -1)],
                            y: [position.y, position.y - 50, window.innerHeight],
                            rotate: [position.rotate, position.rotate + getRandomInt(-90, 90)],
                            opacity: [1, 1, 0],
                            transition: { duration: 1.5, ease: "easeOut" }
                          }
                        : { opacity: 0, scale: 0 }
                    }
                    className="absolute cursor-pointer"
                    style={{ 
                      transformOrigin: 'center bottom',
                      filter: `drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15))`
                    }}
                    onClick={() => pluckPetal(index)}
                    whileHover={!petal.removed && !gameEnded && animationComplete ? { scale: 1.05 } : {}}
                  >
                    {/* Petal shape */}
                    <div
                      className={`h-32 w-16 origin-bottom rounded-t-full relative ${
                        petal.removed ? 'pointer-events-none' : 'hover:brightness-105'
                      }`}
                      style={{
                        backgroundColor: getPetalColor(index),
                        boxShadow: 'inset 0 0 10px rgba(255,255,255,0.5)',
                      }}
                    >
                      {/* Add subtle texture/detail to petal */}
                      <div className="absolute inset-0 rounded-t-full overflow-hidden">
                        <div className="w-1/2 h-full bg-white/10 rounded-l-full"></div>
                      </div>
                    </div>
                    
                    {/* Show text when plucking */}
                    {petal.removed && currentPetal === index && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: -40 }}
                        exit={{ opacity: 0, y: -60 }}
                        className="absolute top-0 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white px-3 py-1 rounded-full text-sm font-medium shadow-md"
                      >
                        {petal.lovesMe ? (
                          <span className="text-pink-500 flex items-center">
                            Loves me <HeartIcon className="h-3 w-3 ml-1" />
                          </span>
                        ) : (
                          <span className="text-gray-700">Loves me not</span>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          
          {gameEnded && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 text-center"
            >
              <div 
                className={`text-2xl font-bold p-4 mb-4 rounded-xl shadow-md ${
                  result === 'loves' 
                    ? 'bg-pink-50 text-pink-500 border border-pink-200' 
                    : 'bg-gray-50 text-gray-600 border border-gray-200'
                }`}
              >
                {result === 'loves' && <HeartIcon className="inline w-6 h-6 mr-2 animate-pulse" />}
                {crushName} {result === 'loves' ? 'loves' : 'loves not'} {yourName}
                {result === 'loves' && <HeartIcon className="inline w-6 h-6 ml-2 animate-pulse" />}
              </div>
              
              <Button onClick={startGame} className="bg-pink-500 hover:bg-pink-600">
                <RefreshCw className="h-4 w-4 mr-2" />
                Play Again
              </Button>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default LovesMeNotGame;
