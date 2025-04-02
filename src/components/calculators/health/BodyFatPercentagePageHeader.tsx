
import React from 'react';
import { Percent } from 'lucide-react';
import { calculatorColors } from '@/utils/calculatorColors';

const BodyFatPercentagePageHeader: React.FC = () => {
  return (
    <header className="mb-8 text-center">
      <div className="inline-flex items-center justify-center p-2 bg-blue-500/10 rounded-full mb-4">
        <Percent className="h-6 w-6 text-blue-500" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2" style={{ color: calculatorColors.text.heading }}>
        Body Fat Percentage Calculator
      </h1>
      <p className="text-xl max-w-2xl mx-auto px-4" style={{ color: calculatorColors.text.body }}>
        Determine your body composition with our accurate body fat percentage calculator using multiple methods.
      </p>
    </header>
  );
};

export default BodyFatPercentagePageHeader;
