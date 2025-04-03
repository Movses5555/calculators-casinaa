import React from 'react';
import Layout from '@/components/layout/Layout';
import ChanceGamesLayout from '@/components/layout/ChanceGamesLayout';
import LovesMeNotGame from '@/components/chance-games/LovesMeNotGame';

const LovesMeNotPage = () => {
  return (
    <Layout>
      <ChanceGamesLayout
        title="He Loves Me, He Loves Me Not"
        description="Play the classic flower petal-picking game online - find out if they love you or not with this digital version of the traditional fortune-telling game."
        gameComponent={<LovesMeNotGame />}
      >
        <h2 className="text-xl font-bold mb-4">About the He Loves Me, He Loves Me Not Game</h2>
        
        <p className="mb-4">
          "He Loves Me, He Loves Me Not" (also known as "She Loves Me, She Loves Me Not") is a classic flower petal-picking game that has been played for generations to playfully predict romantic outcomes. Our digital version recreates this charming tradition without having to find and pick apart actual flowers, allowing you to enjoy this timeless game of chance and romance anytime.
        </p>
        
        <h3 className="text-lg font-semibold mb-2">The History and Tradition</h3>
        <p className="mb-4">
          The origins of this game trace back to France in the Middle Ages with the phrase "effeuiller la marguerite" (plucking the daisy). It spread across cultures as a whimsical way for people, especially young romantics, to "divine" whether their love interest returned their affection. Traditionally played with daisies or other flowers with many petals, players would pluck one petal at a time, alternating between "loves me" and "loves me not" phrases, with the last petal determining the answer.
        </p>
        
        <h3 className="text-lg font-semibold mb-2">How to Play the Digital Version</h3>
        <ol className="list-decimal pl-5 mb-4 space-y-2">
          <li>Enter your name and your crush's name in the provided fields</li>
          <li>Click the "Start Game" button to begin with a fresh digital flower</li>
          <li>Click on each petal to "pluck" it and reveal the next phrase</li>
          <li>Watch as the petals disappear one by one, alternating between "loves me" and "loves me not"</li>
          <li>The final petal will reveal your answer - will it be love or not?</li>
          <li>Play again for a different flower with a different number of petals for a new outcome</li>
        </ol>
        
        <h3 className="text-lg font-semibold mb-2">Applications and Use Cases</h3>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Romantic Entertainment:</strong> A fun way to ponder romantic possibilities without taking things too seriously.</li>
          <li><strong>Nostalgic Play:</strong> Reconnect with childhood games and traditions in a modern digital format.</li>
          <li><strong>Party Games:</strong> Include in slumber parties, girls' nights, or casual social gatherings for lighthearted fun.</li>
          <li><strong>Decision Making:</strong> Use as a playful way to make yes/no decisions when you're truly undecided.</li>
          <li><strong>Cultural Education:</strong> Introduce younger generations to traditional fortune-telling games.</li>
          <li><strong>Icebreakers:</strong> Use in social settings to spark conversations about relationships and romance.</li>
        </ul>
        
        <h3 className="text-lg font-semibold mb-2">Variations Around the World</h3>
        <p className="mb-4">
          This game appears in many cultures with slight variations:
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li><strong>France:</strong> "Il/Elle m'aime un peu, beaucoup, passionnément, à la folie, pas du tout" (He/She loves me a little, a lot, passionately, madly, not at all)</li>
          <li><strong>Germany:</strong> "Er/Sie liebt mich, er/sie liebt mich nicht" (He/She loves me, he/she loves me not)</li>
          <li><strong>Russia:</strong> "Любит, не любит" (Loves, loves not) with additional phrases like "плюнет" (will spit) or "к сердцу прижмет" (will press to heart)</li>
          <li><strong>Italy:</strong> "M'ama, non m'ama" (He/She loves me, he/she doesn't love me)</li>
        </ul>
        
        <h3 className="text-lg font-semibold mb-2">Benefits of Our Digital Version</h3>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Eco-Friendly:</strong> No real flowers harmed in the process of playing!</li>
          <li><strong>Always Available:</strong> Play anytime without needing to find a suitable flower.</li>
          <li><strong>Beautiful Visuals:</strong> Enjoy high-quality flower animations and effects.</li>
          <li><strong>Personalization:</strong> Enter real names to make the experience more meaningful.</li>
          <li><strong>Variety:</strong> Each game generates a different number of petals for varied outcomes.</li>
          <li><strong>History Keeping:</strong> Save past results to see patterns in your romantic fortune-telling.</li>
        </ul>
        
        <h3 className="text-lg font-semibold mb-2">Remember...</h3>
        <p className="mb-4 italic">
          This game is meant for entertainment purposes only. While it's fun to play with romantic possibilities, real relationships are built on communication, mutual respect, and genuine connection - not the random chance of flower petals! Enjoy the game for what it is: a charming tradition that brings a moment of whimsy to matters of the heart.
        </p>
      </ChanceGamesLayout>
    </Layout>
  );
};

export default LovesMeNotPage;
