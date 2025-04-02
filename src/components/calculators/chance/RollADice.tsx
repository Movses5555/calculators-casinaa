
import React from 'react';
import DiceRoller from '@/components/chance-games/DiceRoller';

const RollADice = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Roll a Dice</h2>
      <DiceRoller maxDice={6} initialDice={2} animated={true} showSum={true} />
    </div>
  );
};

export default RollADice;
