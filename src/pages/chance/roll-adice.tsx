
import React from 'react';
import Layout from '@/components/layout/Layout';
import RollADice from '@/components/calculators/chance/RollADice';
import CalculatorSEOContent from '@/components/seo/CalculatorSEOContent';

const RollADicePage = () => {
  return (
    <Layout>
      <CalculatorSEOContent
        title="Roll a Dice | Virtual Dice Roller | CalcMaster"
        description="Roll virtual dice with our free online dice roller. Choose the number of dice and sides for board games, RPGs, or decision making."
        keywords="dice roller, virtual dice, online dice, roll dice, random dice, dice simulator, d20 roller, d6 roller"
        pageIdentifier="roll-a-dice"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Roll a Dice</h1>
              <p className="text-gray-600 md:text-lg">
                Virtual dice roller with customizable sides and quantity. Perfect for games or making random decisions.
              </p>
            </div>
            
            <RollADice />
          </div>
        </div>
      </CalculatorSEOContent>
    </Layout>
  );
};

export default RollADicePage;
