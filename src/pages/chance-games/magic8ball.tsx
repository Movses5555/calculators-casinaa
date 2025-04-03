import React from 'react';
import Layout from '@/components/layout/Layout';
import ChanceGamesLayout from '@/components/layout/ChanceGamesLayout';
import Magic8Ball from '@/components/chance-games/Magic8Ball';

const Magic8BallPage = () => {
  return (
    <Layout>
      <ChanceGamesLayout
        title="Magic 8 Ball"
        description="Ask a question and shake the Magic 8 Ball for mystical answers and predictions - a digital version of the classic fortune-telling toy."
        gameComponent={<Magic8Ball />}
      >
        <h2 className="text-xl font-bold mb-4">About the Magic 8 Ball</h2>
        
        <p className="mb-4">
          Our Online Magic 8 Ball recreates the mysterious experience of the classic fortune-telling toy in digital form. Ask it a yes-or-no question, shake the virtual ball, and receive a mystical answer from beyond. Perfect for making decisions or simply for entertainment, this digital version captures all the fun of the physical toy without needing to own one.
        </p>
        
        <h3 className="text-lg font-semibold mb-2">How to Use the Magic 8 Ball</h3>
        <ol className="list-decimal pl-5 mb-4 space-y-2">
          <li>Type your yes-or-no question in the input field</li>
          <li>Click the "Ask" button or press Enter to shake the Magic 8 Ball</li>
          <li>Watch as the ball shakes and reveals your answer</li>
          <li>Your question and the answer will be displayed below the ball</li>
          <li>Previous questions and answers are saved in the history section</li>
        </ol>
        
        <h3 className="text-lg font-semibold mb-2">Applications and Use Cases</h3>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Decision Making:</strong> When faced with simple yes/no decisions and you're completely undecided.</li>
          <li><strong>Party Games:</strong> Use during get-togethers for entertainment and ice-breaking activities.</li>
          <li><strong>Team Building:</strong> As a fun activity in workplace settings to lighten the mood.</li>
          <li><strong>Classroom Activities:</strong> To teach probability and discuss the psychology of seeking external validation for decisions.</li>
          <li><strong>Creative Prompts:</strong> Writers and artists can use random answers to inspire new creative directions.</li>
          <li><strong>Fortune Telling:</strong> For lighthearted mystical predictions and fortune-telling experiences.</li>
        </ul>
        
        <h3 className="text-lg font-semibold mb-2">The Magic 8 Ball's Answers</h3>
        <p className="mb-4">
          The classic Magic 8 Ball has 20 possible answers that fall into three categories:
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Affirmative Answers:</strong> "It is certain," "Without a doubt," "Yes definitely," "You may rely on it," etc.</li>
          <li><strong>Non-committal Answers:</strong> "Reply hazy, try again," "Ask again later," "Better not tell you now," etc.</li>
          <li><strong>Negative Answers:</strong> "Don't count on it," "My sources say no," "Outlook not so good," "Very doubtful," etc.</li>
        </ul>
        
        <h3 className="text-lg font-semibold mb-2">Benefits of Our Online Magic 8 Ball</h3>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Always Available:</strong> Access mystical guidance anytime without needing the physical toy.</li>
          <li><strong>Question History:</strong> Keep track of previous questions and answers, unlike the physical version.</li>
          <li><strong>Realistic Animation:</strong> Enjoy a visually satisfying shaking animation that mimics the real experience.</li>
          <li><strong>Accessibility:</strong> No need to flip the ball over or read tiny text in a window.</li>
          <li><strong>Shareability:</strong> Easily share answers with friends through screenshots or during video calls.</li>
        </ul>
        
        <h3 className="text-lg font-semibold mb-2">Tips for Using the Magic 8 Ball</h3>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li>Ask clear yes/no questions for the most meaningful answers</li>
          <li>For best results, focus your mind on the question while the ball is shaking</li>
          <li>Don't ask the same question repeatedly hoping for a different answer</li>
          <li>Remember that the Magic 8 Ball is for entertainment purposes only</li>
          <li>Share the experience with friends for more fun and discussion</li>
        </ul>
        
        <p className="mb-4 italic">
          The Magic 8 Ball is designed for entertainment purposes only. Life decisions should be made using rational thought, not random chance. But for lighthearted fun and to add a touch of mystery to your day, our Online Magic 8 Ball provides an engaging digital experience of this classic toy.
        </p>
      </ChanceGamesLayout>
    </Layout>
  );
};

export default Magic8BallPage;
