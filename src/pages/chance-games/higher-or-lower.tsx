
import React from 'react';
import Layout from '@/components/layout/Layout';
import ChanceGamesLayout from '@/components/layout/ChanceGamesLayout';
import HigherOrLower from '@/components/chance-games/HigherOrLower';
import Head from "next/head";
import { ArrowUpDown } from 'lucide-react';

const HigherOrLowerPage = () => {
  return (
    <Layout>
      <Head>
        <title>Higher or Lower Game | Test Your Card Prediction Skills</title>
        <meta name="description" content="Test your intuition with our Higher or Lower card game - guess if the next card will be higher or lower than the current one." />
        <meta name="keywords" content="higher or lower, card game, prediction game, higher lower, probability game, online card game" />
      </Head>
    
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-red-500/10 rounded-full mb-4">
            <ArrowUpDown className="h-6 w-6 text-red-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Higher or Lower Game
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Test your intuition and probability skills by predicting whether the next card will be higher or lower.
          </p>
        </header>
        
        <ChanceGamesLayout
          title="Higher or Lower Game"
          description="Test your intuition with our Higher or Lower card game - guess if the next card will be higher or lower than the current one."
          gameComponent={<HigherOrLower />}
        >
          <h2 className="text-xl font-bold mb-4">About the Higher or Lower Game</h2>
          
          <p className="mb-4">
            The Higher or Lower Game is a classic card guessing game that tests your intuition and probability skills. Each round presents you with a card, and you must guess whether the next card drawn will be higher or lower in value. While simple in concept, the game combines strategy, probability assessment, and a bit of luck for an engaging experience.
          </p>
          
          <h3 className="text-lg font-semibold mb-2">How to Play Higher or Lower</h3>
          <ol className="list-decimal pl-5 mb-4 space-y-2">
            <li>A card is drawn and displayed face-up</li>
            <li>Guess whether the next card will be higher or lower in value</li>
            <li>Click the "Higher" or "Lower" button based on your prediction</li>
            <li>The next card is revealed showing if your guess was correct</li>
            <li>For each correct prediction, your score increases</li>
            <li>The game ends when you make an incorrect guess</li>
            <li>Try to achieve the highest score possible!</li>
          </ol>
          
          <h3 className="text-lg font-semibold mb-2">Card Values and Probability</h3>
          <p className="mb-4">
            Understanding card values improves your chances of winning:
          </p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Cards are ranked from 2 (lowest) to Ace (highest)</li>
            <li>Full ranking: 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King, Ace</li>
            <li>If you see a 7, there are 6 cards lower (2-6) and 6 cards higher (8-A)</li>
            <li>With a 2 showing, always guess "higher" as no card can be lower</li>
            <li>With an Ace showing, always guess "lower" as no card can be higher</li>
            <li>Suits (hearts, diamonds, clubs, spades) don't affect the card value</li>
          </ul>
          
          <h3 className="text-lg font-semibold mb-2">Applications and Use Cases</h3>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li><strong>Quick Entertainment:</strong> Perfect for short breaks or when you have a few minutes to spare.</li>
            <li><strong>Probability Learning:</strong> Teaches basic probability concepts in an engaging format.</li>
            <li><strong>Decision Making Practice:</strong> Improves intuitive decision-making skills under uncertainty.</li>
            <li><strong>Party Games:</strong> Can be played in groups with players taking turns or competing for high scores.</li>
            <li><strong>Brain Training:</strong> Keeps the mind active with quick probability calculations.</li>
            <li><strong>Ice Breakers:</strong> Easy to understand game that can get conversations started in social settings.</li>
          </ul>
          
          <h3 className="text-lg font-semibold mb-2">Strategy Tips</h3>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li><strong>Middle Cards Strategy:</strong> For cards 7-8, consider the remaining deck composition before guessing</li>
            <li><strong>Card Counting:</strong> Keep track of cards that have been played to improve predictions</li>
            <li><strong>Probability Awareness:</strong> Remember that as the deck depletes, probabilities change</li>
            <li><strong>Streak Management:</strong> Consider quitting while ahead if you've built up a good score</li>
            <li><strong>Risk Assessment:</strong> Take more calculated risks early in the game, be more conservative later</li>
          </ul>
          
          <h3 className="text-lg font-semibold mb-2">Benefits of Playing Higher or Lower</h3>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li><strong>Improves Probability Assessment:</strong> Develops intuitive understanding of odds and chances.</li>
            <li><strong>Enhances Decision Making:</strong> Builds skills in making quick decisions under uncertainty.</li>
            <li><strong>Provides Mental Stimulation:</strong> Keeps the mind active with each new card and decision.</li>
            <li><strong>Develops Pattern Recognition:</strong> Helps identify trends and patterns in random events.</li>
            <li><strong>Creates Excitement:</strong> Builds suspense with each card reveal and streak of correct guesses.</li>
          </ul>
          
          <p className="mb-4">
            Whether you're looking to test your luck, improve your probability skills, or simply enjoy a quick game, Higher or Lower offers a perfect blend of chance and strategy. Can you beat your own high score? Only one way to find out - start playing now!
          </p>
        </ChanceGamesLayout>
      </div>
    </Layout>
  );
};

export default HigherOrLowerPage;
