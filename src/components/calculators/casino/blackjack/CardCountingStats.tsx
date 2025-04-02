
import React from 'react';
import { Timer } from 'lucide-react';

interface CardCountingStatsProps {
  cardsDealt: number;
  runningCount: number;
  exerciseMode: 'practice' | 'quiz' | 'speed';
  score: { correct: number; incorrect: number };
  remainingTime: number;
}

const CardCountingStats: React.FC<CardCountingStatsProps> = ({
  cardsDealt,
  runningCount,
  exerciseMode,
  score,
  remainingTime
}) => {
  const getCountColor = (count: number) => {
    if (count > 0) return 'text-green-600';
    if (count < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getTrueCount = (): number => {
    // Approximate decks remaining (6 total decks, 52 cards per deck)
    const totalCards = 6 * 52;
    const cardsRemaining = totalCards - cardsDealt;
    const decksRemaining = Math.max(0.1, cardsRemaining / 52);
    return Math.round((runningCount / decksRemaining) * 10) / 10;
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <div className="text-center">
          <p className="text-sm text-gray-500">Cards Dealt</p>
          <p className="text-xl font-semibold">{cardsDealt}</p>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-500">Running Count</p>
          <p className={`text-xl font-semibold ${getCountColor(runningCount)}`}>
            {exerciseMode === 'quiz' ? '?' : runningCount}
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-500">True Count</p>
          <p className={`text-xl font-semibold ${getCountColor(getTrueCount())}`}>
            {exerciseMode === 'quiz' ? '?' : getTrueCount()}
          </p>
        </div>
        
        {exerciseMode === 'speed' && (
          <div className="text-center">
            <p className="text-sm text-gray-500">Time</p>
            <div className="flex items-center">
              <Timer className="h-4 w-4 mr-1 text-amber-500" />
              <p className="text-xl font-semibold">{remainingTime}s</p>
            </div>
          </div>
        )}
      </div>
      
      {(exerciseMode === 'quiz' || exerciseMode === 'speed') && (
        <div className="mt-4 flex justify-center space-x-8">
          <div className="text-center">
            <p className="text-sm text-gray-500">Correct</p>
            <p className="text-xl font-semibold text-green-600">{score.correct}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Incorrect</p>
            <p className="text-xl font-semibold text-red-600">{score.incorrect}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Accuracy</p>
            <p className="text-xl font-semibold">
              {score.correct + score.incorrect > 0 
                ? `${Math.round((score.correct / (score.correct + score.incorrect)) * 100)}%` 
                : '0%'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardCountingStats;
