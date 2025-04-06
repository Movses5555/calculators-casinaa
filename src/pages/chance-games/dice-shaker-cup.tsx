
import React from 'react';
import Layout from '@/components/layout/Layout';
import ChanceGamesLayout from '@/components/layout/ChanceGamesLayout';
import DiceShakerCup from '@/components/chance-games/DiceShakerCup';
import Head from "next/head";
import { Dice3 } from 'lucide-react';

const DiceShakerCupPage = () => {
  return (
    <Layout>
      <Head>
        <title>Dice Shaker Cup | Online Random Dice Generator</title>
        <meta name="description" content="Shake virtual dice in our digital dice cup. Perfect for board games, RPGs, and games needing random numbers. Shake multiple dice at once!" />
        <meta name="keywords" content="dice cup, dice shaker, random dice, virtual dice cup, online dice, dice generator" />
      </Head>
      
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-orange-500/10 rounded-full mb-4">
            <Dice3 className="h-6 w-6 text-orange-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Dice Shaker Cup
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Shake virtual dice in our interactive digital dice cup for games and random number generation.
          </p>
        </header>
        
        <ChanceGamesLayout
          title="Dice Shaker Cup"
          description="Shake our virtual dice cup to roll multiple dice at once. A digital version of the classic dice cup used in many table games and RPGs."
          gameComponent={<DiceShakerCup />}
        >
          {/* This content provides detailed information about the Dice Shaker Cup feature */}
          <h2 className="text-xl font-bold mb-4">About the Dice Shaker Cup</h2>
          
          <p className="mb-4">
            Our Dice Shaker Cup brings the experience of shaking and rolling dice in a physical cup to the digital world. This virtual dice cup simulates the sound, motion, and randomness of real dice being shaken and cast, providing an immersive experience for board games, role-playing games, or any activity requiring random dice rolls.
          </p>
          
          <h3 className="text-lg font-semibold mb-2">How to Use the Dice Shaker Cup</h3>
          <ol className="list-decimal pl-5 mb-4 space-y-2">
            <li>Select the number and type of dice you want to use</li>
            <li>Click the "Shake Cup" button or use the shake gesture on mobile devices</li>
            <li>Watch and listen as the dice rattle around in the virtual cup</li>
            <li>See the dice roll out onto the surface with realistic physics</li>
            <li>View your results and total score</li>
            <li>Shake again as needed for your game</li>
          </ol>
          
          <h3 className="text-lg font-semibold mb-2">Applications and Use Cases</h3>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li><strong>Board Games:</strong> Use for Yahtzee, Backgammon, Monopoly, and other dice-based board games.</li>
            <li><strong>Role-Playing Games:</strong> Roll multiple dice for RPG systems like Dungeons & Dragons.</li>
            <li><strong>Educational Tools:</strong> Demonstrate probability and statistics with multiple dice rolls.</li>
            <li><strong>Game Nights:</strong> Perfect for virtual game nights when players don't have physical dice.</li>
            <li><strong>Decision Making:</strong> Use dice to make random choices or settle disputes.</li>
            <li><strong>Randomization:</strong> Generate truly random numbers for competitions, drawings, or selections.</li>
            <li><strong>Game Design Testing:</strong> Test dice mechanics for games in development.</li>
          </ul>
          
          <h3 className="text-lg font-semibold mb-2">The History of Dice Cups</h3>
          <p className="mb-4">
            Dice cups, also known as dice shakers or dice towers, have been used for centuries to ensure fair play in dice games. The earliest dice cups were made from animal horn, wood, or leather, and were designed to prevent cheating by ensuring that dice were thoroughly randomized before being cast. In ancient Rome, dice cups (called fritillus) were popular for games of chance, and evidence of their use has been found in excavations of Roman settlements. Today, dice cups remain a popular accessory for board games and are often made from leather, plastic, or wood with felt interiors to dampen noise while shaking.
          </p>
          
          <h3 className="text-lg font-semibold mb-2">Benefits of Our Digital Dice Shaker Cup</h3>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li><strong>Convenience:</strong> No need to search for physical dice or a cup.</li>
            <li><strong>Realistic Experience:</strong> Visual and audio feedback mimics real dice being shaken.</li>
            <li><strong>True Randomness:</strong> Uses cryptographically secure random number generation for fair results.</li>
            <li><strong>Multiple Dice Types:</strong> Access to various dice types in one place.</li>
            <li><strong>No Lost Dice:</strong> Never worry about dice rolling under furniture or getting lost.</li>
            <li><strong>Automatic Calculation:</strong> Instantly see the sum of all dice values.</li>
            <li><strong>History Tracking:</strong> Keep a record of previous rolls for game continuity.</li>
          </ul>
          
          <h3 className="text-lg font-semibold mb-2">Dice Cup Games Around the World</h3>
          <p className="mb-4">
            Various dice cup games are played around the world, each with unique rules and cultural significance:
          </p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li><strong>Yahtzee (USA):</strong> Players roll five dice to make different combinations for points.</li>
            <li><strong>Liar's Dice (Mexico/Latin America):</strong> A bluffing game where players make claims about dice hidden under cups.</li>
            <li><strong>Balut (Philippines):</strong> Similar to Yahtzee but with different scoring combinations.</li>
            <li><strong>Perudo (Peru):</strong> An ancient Incan dice game of strategy and bluffing.</li>
            <li><strong>Kniffel (Germany):</strong> The German version of Yahtzee with slight rule variations.</li>
            <li><strong>Farkle (USA):</strong> A push-your-luck dice game where players risk accumulated points for higher scores.</li>
          </ul>
          
          <p className="mb-4 italic">
            Whether you're playing a traditional board game, trying your hand at an RPG, or just need random numbers, our Dice Shaker Cup provides the tactile joy and randomness of real dice without the hassle of physical components. Shake it up and let the virtual dice decide your fate!
          </p>
        </ChanceGamesLayout>
      </div>
    </Layout>
  );
};

export default DiceShakerCupPage;
