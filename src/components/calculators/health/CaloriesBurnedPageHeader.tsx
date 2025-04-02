
import React from 'react';
import { Flame } from 'lucide-react';
import { calculatorColors } from '@/utils/calculatorColors';

const CaloriesBurnedPageHeader: React.FC = () => {
  return (
    <header className="mb-8 text-center">
      <div className="inline-flex items-center justify-center p-2 bg-red-500/10 rounded-full mb-4">
        <Flame className="h-6 w-6 text-red-500" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2" style={{ color: calculatorColors.text.heading }}>
        Calories Burned Calculator
      </h1>
      <p className="text-xl max-w-2xl mx-auto px-4" style={{ color: calculatorColors.text.body }}>
        Calculate the calories you burn during exercise, sports, and daily activities based on your weight and duration.
      </p>
    </header>
  );
};

export default CaloriesBurnedPageHeader;
