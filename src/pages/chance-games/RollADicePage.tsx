import React from 'react';
import Layout from '@/components/layout/Layout';
import ChanceGamesLayout from '@/components/layout/ChanceGamesLayout';
import DiceRoller from '@/components/chance-games/DiceRoller';
import CalculatorSEOContent from '@/components/seo/CalculatorSEOContent';
import { Dice5 } from 'lucide-react';

const RollADicePage = () => {
  return (
    <Layout>
      <CalculatorSEOContent
        title="Virtual Dice Roller | Roll Dice Online | CalcMaster"
        description="Roll dice online with our virtual dice roller. Perfect for board games, RPGs, and any game that requires dice. Roll multiple dice at once!"
        keywords="dice roller, virtual dice, online dice, roll dice, random dice, RPG dice"
        pageIdentifier="roll-a-dice"
      >
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <header className="mb-8 text-center">
            <div className="inline-flex items-center justify-center p-2 bg-blue-500/10 rounded-full mb-4">
              <Dice5 className="h-6 w-6 text-blue-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              Virtual Dice Roller
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Roll virtual dice online for games, decisions, or just for fun.
            </p>
          </header>
          
          <ChanceGamesLayout
            title="Virtual Dice Roller"
            description="Roll dice online for games, random number generation, or just for fun. Choose from different dice types and roll multiple dice at once."
            gameComponent={<DiceRoller />}
          >
            <h2 className="text-xl font-bold mb-4">About the Virtual Dice Roller</h2>
            
            <p className="mb-4">
              Our Virtual Dice Roller brings the randomness of physical dice to your digital device. Whether you're playing a board game and forgot your dice, need to make a quick decision, or are running a tabletop RPG online, our dice roller provides a fair and random result every time.
            </p>
            
            <h3 className="text-lg font-semibold mb-2">How to Use the Virtual Dice Roller</h3>
            <ol className="list-decimal pl-5 mb-4 space-y-2">
              <li>Select the number of dice you want to roll</li>
              <li>Choose the type of dice (d4, d6, d8, d10, d12, d20, or d100)</li>
              <li>Click the "Roll Dice" button to see your results</li>
              <li>View the individual die results and the sum total</li>
              <li>Roll again as needed</li>
            </ol>
            
            <h3 className="text-lg font-semibold mb-2">Applications and Use Cases</h3>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li><strong>Board Games:</strong> Use for games like Monopoly, Risk, or Backgammon when physical dice aren't available.</li>
              <li><strong>Tabletop RPGs:</strong> Roll different types of dice for Dungeons & Dragons, Pathfinder, or other role-playing games.</li>
              <li><strong>Game Development:</strong> Test random number generation for game mechanics.</li>
              <li><strong>Educational Tools:</strong> Teach probability and statistics with visual dice outcomes.</li>
              <li><strong>Decision Making:</strong> Let chance decide between multiple options when you're undecided.</li>
              <li><strong>Gambling Games:</strong> Practice dice games without real money.</li>
              <li><strong>Random Number Generation:</strong> Generate random numbers for contests, giveaways, or selection processes.</li>
            </ul>
            
            <h3 className="text-lg font-semibold mb-2">The History of Dice</h3>
            <p className="mb-4">
              Dice are among the oldest gaming tools in human history, dating back at least 5,000 years. Archaeological evidence shows that ancient civilizations from Egypt to China used dice made from bone, stone, wood, and other materials for games of chance and divination. The standard six-sided die with opposite faces summing to seven has been a staple in gaming for thousands of years. Today, dice come in many shapes and sizes, from the traditional d6 to the d20 made popular by role-playing games.
            </p>
            
            <h3 className="text-lg font-semibold mb-2">Different Types of Dice</h3>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li><strong>d4 (Tetrahedron):</strong> A four-sided die, shaped like a pyramid with triangular faces.</li>
              <li><strong>d6 (Cube):</strong> The standard six-sided die used in most common games.</li>
              <li><strong>d8 (Octahedron):</strong> An eight-sided die with triangular faces.</li>
              <li><strong>d10 (Pentagonal Trapezohedron):</strong> A ten-sided die often used for percentile rolls.</li>
              <li><strong>d12 (Dodecahedron):</strong> A twelve-sided die with pentagonal faces.</li>
              <li><strong>d20 (Icosahedron):</strong> A twenty-sided die popular in role-playing games.</li>
              <li><strong>d100 or d%:</strong> Represents a hundred-sided die, usually rolled with two d10s (one for tens place, one for ones place).</li>
            </ul>
            
            <h3 className="text-lg font-semibold mb-2">Benefits of Our Virtual Dice Roller</h3>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li><strong>Convenience:</strong> Roll dice anywhere, anytime without carrying physical dice.</li>
              <li><strong>Variety:</strong> Access to multiple types of dice all in one place.</li>
              <li><strong>Fairness:</strong> True random number generation for fair results.</li>
              <li><strong>Speed:</strong> Roll multiple dice simultaneously with instant results.</li>
              <li><strong>Clarity:</strong> Clear visual representation of dice and totals.</li>
              <li><strong>Accessibility:</strong> Usable by anyone with an internet connection.</li>
              <li><strong>History:</strong> Keep track of previous rolls for reference.</li>
            </ul>
            
            <p className="mb-4 italic">
              Whether you're a casual board gamer, a dedicated role-player, or just need a quick random number, our Virtual Dice Roller provides a simple, fast, and reliable way to introduce chance into your activities. Roll the dice and let fate decide!
            </p>
          </ChanceGamesLayout>
        </div>
      </CalculatorSEOContent>
    </Layout>
  );
};

export default RollADicePage;
