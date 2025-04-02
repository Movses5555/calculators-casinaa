
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Play, RotateCcw, Brain, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import CountingSystemsGuide from './blackjack/CountingSystemsGuide';
import CardDeck from './blackjack/CardDeck';
import CardCountingStats from './blackjack/CardCountingStats';
import CardDisplay from './blackjack/CardDisplay';
import { CountingSystem, countingSystems } from './blackjack/countingSystemsData';

const BlackjackCardCounter: React.FC = () => {
  const [selectedSystem, setSelectedSystem] = useState<string>('hiLo');
  const [exerciseMode, setExerciseMode] = useState<'practice' | 'quiz' | 'speed'>('practice');
  const [isRunning, setIsRunning] = useState(false);
  const [runningCount, setRunningCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [cardsDealt, setCardsDealt] = useState(0);
  const [speed, setSpeed] = useState(3); // seconds per card
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [remainingTime, setRemainingTime] = useState(60); // 60 second timer for speed mode
  
  const handleStartExercise = () => {
    // Reset states
    setRunningCount(0);
    setUserCount(0);
    setCardsDealt(0);
    setError(null);
    setScore({ correct: 0, incorrect: 0 });
    setIsRunning(true);
    
    console.log(`Starting exercise with ${selectedSystem} system in ${exerciseMode} mode at speed ${speed}`);
    
    if (exerciseMode === 'speed') {
      setRemainingTime(60);
    }
    
    toast({
      title: "Exercise Started",
      description: `Using the ${countingSystems[selectedSystem].name} counting system.`
    });
  };
  
  const handleResetExercise = () => {
    setIsRunning(false);
    setRunningCount(0);
    setUserCount(0);
    setCardsDealt(0);
    setError(null);
    console.log("Exercise reset");
    
    toast({
      title: "Exercise Reset",
      description: "All progress has been reset."
    });
  };
  
  const handleCountChange = (increment: number) => {
    setUserCount(prev => prev + increment);
    
    if (exerciseMode === 'quiz') {
      // Logic for quiz mode
      const correct = userCount + increment === runningCount;
      setScore(prev => ({
        correct: prev.correct + (correct ? 1 : 0),
        incorrect: prev.incorrect + (correct ? 0 : 1)
      }));
      
      toast({
        title: correct ? "Correct!" : "Incorrect",
        description: correct 
          ? "Good job! Your count is accurate." 
          : `The correct running count is ${runningCount}.`,
        variant: correct ? "default" : "destructive"
      });
    }
  };

  const updateRunningCount = (cardCount: number) => {
    setRunningCount(prev => prev + cardCount);
    setCardsDealt(prev => prev + 1);
  };

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Brain className="h-5 w-5 mr-2 text-purple-600" />
              Blackjack Card Counting Trainer
            </h3>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="counting-system" className="text-base">Counting System</Label>
                <Select 
                  value={selectedSystem} 
                  onValueChange={setSelectedSystem}
                  disabled={isRunning}
                >
                  <SelectTrigger id="counting-system" className="w-full mt-1">
                    <SelectValue placeholder="Select counting system" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {Object.entries(countingSystems).map(([key, system]) => (
                      <SelectItem key={key} value={key}>
                        {system.name} ({system.difficulty})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="exercise-mode" className="text-base">Exercise Mode</Label>
                <Select 
                  value={exerciseMode} 
                  onValueChange={(value: 'practice' | 'quiz' | 'speed') => setExerciseMode(value)}
                  disabled={isRunning}
                >
                  <SelectTrigger id="exercise-mode" className="w-full mt-1">
                    <SelectValue placeholder="Select exercise mode" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="practice">Practice Mode (Watch and Learn)</SelectItem>
                    <SelectItem value="quiz">Quiz Mode (Test Your Counting)</SelectItem>
                    <SelectItem value="speed">Speed Drill (60 Second Challenge)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {exerciseMode === 'practice' && (
                <div>
                  <Label htmlFor="speed" className="text-base">Card Speed</Label>
                  <Select 
                    value={speed.toString()} 
                    onValueChange={(value) => setSpeed(parseInt(value))}
                    disabled={isRunning}
                  >
                    <SelectTrigger id="speed" className="w-full mt-1">
                      <SelectValue placeholder="Select card speed" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="1">Fast (1 second)</SelectItem>
                      <SelectItem value="2">Medium (2 seconds)</SelectItem>
                      <SelectItem value="3">Slow (3 seconds)</SelectItem>
                      <SelectItem value="5">Very Slow (5 seconds)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            
            <CountingSystemsGuide selectedSystem={selectedSystem} />
            
            <div className="pt-2 flex gap-3">
              {!isRunning ? (
                <Button 
                  onClick={handleStartExercise} 
                  className="flex-1"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start {exerciseMode === 'practice' ? 'Practice' : exerciseMode === 'quiz' ? 'Quiz' : 'Speed Drill'}
                </Button>
              ) : (
                <Button 
                  onClick={handleResetExercise} 
                  variant="destructive"
                  className="flex-1"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              )}
            </div>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-md">
            <CardCountingStats 
              cardsDealt={cardsDealt}
              runningCount={runningCount}
              exerciseMode={exerciseMode}
              score={score}
              remainingTime={remainingTime}
            />
            
            <CardDeck 
              isRunning={isRunning}
              selectedSystem={selectedSystem}
              exerciseMode={exerciseMode}
              speed={speed}
              error={error}
              setError={setError}
              updateRunningCount={updateRunningCount}
              remainingTime={remainingTime}
              setRemainingTime={setRemainingTime}
              handleReset={handleResetExercise}
            />
            
            {exerciseMode !== 'practice' && isRunning && (
              <div className="flex justify-center space-x-4 mb-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-6"
                  onClick={() => handleCountChange(-1)}
                >
                  -1
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-6"
                  onClick={() => handleCountChange(0)}
                >
                  0
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-6"
                  onClick={() => handleCountChange(1)}
                >
                  +1
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Card Counting Strategy Guide</h3>
        <div className="prose prose-slate max-w-none">
          <p>
            Card counting is a strategy used primarily in blackjack to determine when the player has a statistical advantage over the house. 
            By keeping track of the ratio of high to low cards remaining in the deck, a player can make more informed betting and playing decisions.
          </p>
          
          <h4 className="text-md font-medium mt-4">Key Concepts</h4>
          
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Running Count:</strong> The sum of the assigned values of cards that have been dealt.
            </li>
            <li>
              <strong>True Count:</strong> The running count divided by the number of decks remaining. This compensates for playing with multiple decks.
            </li>
            <li>
              <strong>Betting Correlation (BC):</strong> How well a counting system correlates with optimal betting decisions.
            </li>
            <li>
              <strong>Playing Efficiency (PE):</strong> How well a system correlates with correct strategy deviations.
            </li>
          </ul>
          
          <h4 className="text-md font-medium mt-4">How to Use Card Counting in Real Games</h4>
          
          <ol className="list-decimal pl-5 space-y-2">
            <li>Start with a count of 0 when a new shoe begins.</li>
            <li>Add or subtract the assigned values as cards are dealt.</li>
            <li>Convert the running count to a true count by dividing by decks remaining.</li>
            <li>Increase your bets when the true count is positive (especially +2 or higher).</li>
            <li>Decrease your bets or sit out hands when the true count is negative.</li>
            <li>Adjust your playing strategy for certain hands based on the true count.</li>
          </ol>
          
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 my-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-800">
                <strong>Important:</strong> Card counting is legal but casinos may ask counters to leave or ban them from playing. 
                Be discreet with your counting and bet sizing. This trainer is for educational purposes only.
              </p>
            </div>
          </div>
          
          <h4 className="text-md font-medium mt-4">Practice Tips</h4>
          
          <ul className="list-disc pl-5 space-y-2">
            <li>Master one counting system completely before trying others.</li>
            <li>Practice counting down a full deck in under 30 seconds.</li>
            <li>Add distractions gradually as you improve (music, conversation, etc.).</li>
            <li>Practice converting running count to true count quickly.</li>
            <li>Study basic strategy perfectly before applying count-based deviations.</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default BlackjackCardCounter;
