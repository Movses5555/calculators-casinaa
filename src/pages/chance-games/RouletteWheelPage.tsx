import React from 'react';
import Layout from '@/components/layout/Layout';
import ChanceGamesLayout from '@/components/layout/ChanceGamesLayout';
import RouletteWheel from '@/components/chance-games/RouletteWheel';

const RouletteWheelPage = () => {
  return (
    <Layout>
      <ChanceGamesLayout
        title="Roulette Wheel"
        description="Spin a virtual roulette wheel and see where the ball lands - a realistic simulation of the classic casino game."
        gameComponent={<RouletteWheel />}
      >
        <h2 className="text-xl font-bold mb-4">About the Roulette Wheel</h2>
        
        <p className="mb-4">
          Our Online Roulette Wheel provides an authentic simulation of the classic casino game without any financial risk. Watch as the wheel spins and the ball bounces before settling on a random number, giving you the excitement of roulette from anywhere.
        </p>
        
        <h3 className="text-lg font-semibold mb-2">How to Use the Roulette Wheel</h3>
        <ol className="list-decimal pl-5 mb-4 space-y-2">
          <li>Click the "Spin Wheel" button to start the animation</li>
          <li>Watch as the wheel spins and gradually slows down</li>
          <li>The ball will land on a random number and color</li>
          <li>Results are displayed clearly, showing the number and color</li>
          <li>Statistics update automatically to track results over time</li>
        </ol>
        
        <h3 className="text-lg font-semibold mb-2">Applications and Use Cases</h3>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Practice and Learning:</strong> Understand roulette dynamics and patterns without risking money.</li>
          <li><strong>Entertainment:</strong> Enjoy the suspense and excitement of roulette as a casual game.</li>
          <li><strong>Random Selection:</strong> Use for unbiased selection between up to 37 options (numbers 0-36).</li>
          <li><strong>Party Games:</strong> Incorporate into drinking games or party activities with customized rules.</li>
          <li><strong>Probability Education:</strong> Demonstrate randomness and probability concepts in an engaging way.</li>
          <li><strong>Decision Making:</strong> Assign options to numbers and let the wheel decide for complex choices.</li>
        </ul>
        
        <h3 className="text-lg font-semibold mb-2">Understanding Roulette Numbers and Colors</h3>
        <p className="mb-4">
          The standard European roulette wheel contains:
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li><strong>37 Pockets:</strong> Numbers 0-36</li>
          <li><strong>Green:</strong> Number 0</li>
          <li><strong>Red:</strong> Numbers 1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36</li>
          <li><strong>Black:</strong> Numbers 2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35</li>
        </ul>
        
        <h3 className="text-lg font-semibold mb-2">Statistics Tracking</h3>
        <p className="mb-4">
          Our roulette wheel tracks several statistics to help you analyze the results:
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li><strong>Color Distribution:</strong> Count of red, black, and green results</li>
          <li><strong>Even/Odd Distribution:</strong> Balance between even and odd numbers</li>
          <li><strong>High/Low Distribution:</strong> Numbers 1-18 vs. numbers 19-36</li>
          <li><strong>Recent Results:</strong> Visual history of recent spins</li>
          <li><strong>Total Spins:</strong> Overall count of wheel spins</li>
        </ul>
        
        <h3 className="text-lg font-semibold mb-2">Benefits of Our Roulette Wheel</h3>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Risk-Free:</strong> Experience roulette excitement without financial stakes.</li>
          <li><strong>Realistic Animation:</strong> Authentic wheel spinning and ball movement physics.</li>
          <li><strong>Statistical Insights:</strong> Track results and patterns over many spins.</li>
          <li><strong>Accessibility:</strong> Play anytime without visiting a casino.</li>
          <li><strong>Educational Value:</strong> Learn about probability and randomness in an engaging format.</li>
        </ul>
        
        <p className="text-sm italic mt-6">
          This simulator is designed for entertainment and educational purposes only. It's not intended to encourage gambling and doesn't provide real money gaming.
        </p>
      </ChanceGamesLayout>
    </Layout>
  );
};

export default RouletteWheelPage;
