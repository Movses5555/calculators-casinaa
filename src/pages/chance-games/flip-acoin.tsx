
import React from 'react';
import Layout from '@/components/layout/Layout';
import ChanceGamesLayout from '@/components/layout/ChanceGamesLayout';
import CoinFlipper from '@/components/chance-games/CoinFlipper';
import Head from "next/head";
import { CircleDollarSign } from 'lucide-react';

const FlipACoinPage = () => {
  return (
    <Layout>
      <Head>
        <title>Virtual Coin Flip | Online Heads or Tails</title>
        <meta name="description" content="Flip a virtual coin online to make quick decisions, settle debates, or just have fun with this digital version of the classic coin toss." />
        <meta name="keywords" content="coin flip, virtual coin, heads or tails, coin toss, online coin flip, random coin" />
      </Head>
    
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-yellow-500/10 rounded-full mb-4">
            <CircleDollarSign className="h-6 w-6 text-yellow-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Virtual Coin Flip
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Flip a virtual coin online for quick decisions, games, or settling friendly debates.
          </p>
        </header>
        
        <ChanceGamesLayout
          title="Virtual Coin Flip"
          description="Flip a virtual coin online to make quick decisions, settle debates, or just have fun with this digital version of the classic coin toss."
          gameComponent={<CoinFlipper />}
        >
          <h2 className="text-xl font-bold mb-4">About the Virtual Coin Flip</h2>
          
          <p className="mb-4">
            Our Virtual Coin Flip tool brings the age-old practice of coin tossing to the digital world. For thousands of years, people have been flipping coins to make decisions, settle disputes, or determine outcomes based on chance. This digital version provides a fair, random result every time, without needing to carry physical change.
          </p>
          
          <h3 className="text-lg font-semibold mb-2">How to Use the Virtual Coin Flip</h3>
          <ol className="list-decimal pl-5 mb-4 space-y-2">
            <li>Click the "Flip Coin" button to start the animation</li>
            <li>Watch as the coin spins in the air with realistic 3D motion</li>
            <li>The coin will land showing either heads or tails</li>
            <li>View your result clearly displayed below the coin</li>
            <li>Statistics automatically track your flip history</li>
            <li>Flip again as many times as needed</li>
          </ol>
          
          <h3 className="text-lg font-semibold mb-2">Applications and Use Cases</h3>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li><strong>Decision Making:</strong> Quickly resolve simple either/or choices when you're genuinely undecided.</li>
            <li><strong>Settling Disputes:</strong> Fairly determine outcomes for minor disagreements or choices.</li>
            <li><strong>Games and Sports:</strong> Determine who goes first in games, sports, or competitions.</li>
            <li><strong>Teaching Probability:</strong> Demonstrate concepts of chance, odds, and random distribution.</li>
            <li><strong>Team Selection:</strong> Assign team captains or divide groups randomly.</li>
            <li><strong>Randomization:</strong> Generate truly random binary outcomes for any process requiring randomness.</li>
            <li><strong>Ice Breakers:</strong> Use in group settings for random selection or to determine speaking order.</li>
          </ul>
          
          <h3 className="text-lg font-semibold mb-2">The Science and History of Coin Flipping</h3>
          <p className="mb-4">
            Coin flipping has a rich history dating back to ancient Rome, where it was called "navia aut caput" (ship or head), referring to the images depicted on Roman coins. The practice has been used throughout history for everything from making important decisions to starting football games.
          </p>
          <p className="mb-4">
            While we often think of coin flips as having exactly 50/50 odds, physics research has shown that physical coin tosses have a slight bias toward landing on the same face they started on. Our digital coin flip removes this bias, providing truly random results with each flip.
          </p>
          
          <h3 className="text-lg font-semibold mb-2">Benefits of Our Virtual Coin Flip</h3>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li><strong>True Randomness:</strong> Uses cryptographically secure random number generation for fair results.</li>
            <li><strong>Convenience:</strong> No need to search for a physical coin whenever you need to make a quick decision.</li>
            <li><strong>Animated Visuals:</strong> Enjoy a satisfying coin flip animation that mimics real physics.</li>
            <li><strong>Statistics Tracking:</strong> Keep track of past flips to observe the distribution over time.</li>
            <li><strong>Always Available:</strong> Access from any device with an internet connection, anytime you need it.</li>
            <li><strong>No Lost Coins:</strong> Never worry about coins rolling under furniture or getting lost.</li>
          </ul>
          
          <h3 className="text-lg font-semibold mb-2">Famous Coin Flips in History</h3>
          <p className="mb-4">
            Some notable moments where coin flips made a difference:
          </p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>The Portland Trail Blazers chose Sam Bowie over Michael Jordan after a coin flip in the 1984 NBA Draft</li>
            <li>The Wright Brothers decided who would make the first powered airplane flight with a coin toss</li>
            <li>The city of Portland, Oregon was named after a coin flip (the alternative was Boston)</li>
            <li>Super Bowl games traditionally begin with a ceremonial coin toss to determine who kicks off</li>
          </ul>
          
          <p className="mb-4">
            Whether you're making a tough decision, starting a game, or just curious about your luck today, our Virtual Coin Flip provides a simple, fair way to introduce chance into your choice-making process. So when you need a quick answer or an impartial judge, let the digital coin decide!
          </p>
        </ChanceGamesLayout>
      </div>
    </Layout>
  );
};

export default FlipACoinPage;
