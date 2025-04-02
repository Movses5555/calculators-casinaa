
import React from 'react';
import { Target } from 'lucide-react';
import { calculatorColors } from '@/utils/calculatorColors';

const SavingsGoalTrackerHeader: React.FC = () => {
  return (
    <header className="mb-8 text-center">
      <div className="inline-flex items-center justify-center p-2 bg-green-500/10 rounded-full mb-4">
        <Target className="h-6 w-6 text-green-500" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2" style={{ color: calculatorColors.text.heading }}>
        Savings Goal Tracker
      </h1>
      <p className="text-xl max-w-2xl mx-auto px-4" style={{ color: calculatorColors.text.body }}>
        Calculate how long it will take to reach your savings goals and visualize your progress.
      </p>
    </header>
  );
};

export default SavingsGoalTrackerHeader;
