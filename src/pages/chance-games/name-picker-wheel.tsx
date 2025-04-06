
import React from 'react';
import Layout from '@/components/layout/Layout';
import ChanceGamesLayout from '@/components/layout/ChanceGamesLayout';
import NamePickerWheel from '@/components/chance-games/NamePickerWheel';
import Head from "next/head";
import { Circle } from 'lucide-react';

const NamePickerWheelPage = () => {
  return (
    <Layout>
      <Head>
        <title>Random Name Picker Wheel | Fair Random Selection Tool</title>
        <meta name="description" content="Use our Random Name Picker Wheel for fair selection and decision making. Great for classrooms, contests, and team selection, with custom color options." />
        <meta name="keywords" content="name picker, random wheel, spin wheel, name selector, random picker, decision wheel, random choice" />
      </Head>
    
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-green-500/10 rounded-full mb-4">
            <Circle className="h-6 w-6 text-green-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Random Name Picker Wheel
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Spin the wheel to randomly select names for fair and unbiased decisions.
          </p>
        </header>
        
        <ChanceGamesLayout
          title="Random Name Picker Wheel"
          description="Spin our colorful wheel to randomly select names for contests, games, classroom activities, and decision making. A fair way to choose someone from a group."
          gameComponent={<NamePickerWheel />}
        >
          <h2 className="text-xl font-bold mb-4">About the Random Name Picker Wheel</h2>
          
          <p className="mb-4">
            Our Random Name Picker Wheel provides a fun, visually engaging, and completely fair way to randomly select a name from a list. Whether you're deciding who goes first in a game, picking a contest winner, assigning tasks, or making any selection that needs to be random and unbiased, our name picker wheel makes the process transparent and exciting.
          </p>
          
          <h3 className="text-lg font-semibold mb-2">How to Use the Name Picker Wheel</h3>
          <ol className="list-decimal pl-5 mb-4 space-y-2">
            <li>Enter names in the input field, pressing Enter after each name</li>
            <li>Each name will appear as a segment on the colorful wheel</li>
            <li>Click the "Spin Wheel" button to start the animation</li>
            <li>Watch as the wheel spins and gradually slows down</li>
            <li>The winner is highlighted when the wheel stops</li>
            <li>Optional: Remove the selected name or keep it for another chance</li>
            <li>Spin again as needed</li>
          </ol>
          
          <h3 className="text-lg font-semibold mb-2">Applications and Use Cases</h3>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li><strong>Classroom Activities:</strong> Select students for participation, presentations, or special privileges.</li>
            <li><strong>Contest Winner Selection:</strong> Choose winners for giveaways, raffles, or competitions.</li>
            <li><strong>Team Formation:</strong> Randomly assign individuals to teams or groups.</li>
            <li><strong>Decision Making:</strong> When faced with multiple equally appealing options, let the wheel decide.</li>
            <li><strong>Chore Assignment:</strong> Allocate household tasks or responsibilities fairly among family members.</li>
            <li><strong>Game Play Order:</strong> Determine who goes first in board games or other activities.</li>
            <li><strong>Random Selection:</strong> Any situation requiring an unbiased, random choice from multiple options.</li>
          </ul>
          
          <h3 className="text-lg font-semibold mb-2">Benefits of Using a Name Picker Wheel</h3>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li><strong>Visual Transparency:</strong> Everyone can see the wheel spinning, ensuring fairness.</li>
            <li><strong>Engagement:</strong> The spinning animation creates anticipation and excitement.</li>
            <li><strong>Elimination of Bias:</strong> Removes human influence from the selection process.</li>
            <li><strong>Time-Saving:</strong> Quick and efficient way to make random selections.</li>
            <li><strong>Conflict Resolution:</strong> Settles disagreements with a fair, chance-based outcome.</li>
            <li><strong>Versatility:</strong> Can be used for selecting people, options, destinations, etc.</li>
            <li><strong>Record-Keeping:</strong> Keeps track of who has been selected in past spins.</li>
          </ul>
          
          <h3 className="text-lg font-semibold mb-2">Psychological Benefits of Random Selection</h3>
          <p className="mb-4">
            Research in psychology has shown that random selection methods like our name picker wheel can have positive effects on group dynamics and individual perception:
          </p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li><strong>Perceived Fairness:</strong> People are more likely to accept outcomes, even unfavorable ones, when they believe the selection process was fair.</li>
            <li><strong>Reduced Favoritism:</strong> Eliminates accusations of preferential treatment in selection processes.</li>
            <li><strong>Anxiety Reduction:</strong> Removes the pressure of making choices that might seem arbitrary or biased.</li>
            <li><strong>Encourages Participation:</strong> In classroom settings, students are more engaged when they know selection is random.</li>
            <li><strong>Teaches Probability:</strong> Provides a practical example of chance and probability concepts.</li>
          </ul>
          
          <h3 className="text-lg font-semibold mb-2">Customization Options</h3>
          <p className="mb-4">
            Our Name Picker Wheel offers several ways to tailor the experience to your needs:
          </p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li><strong>Unlimited Names:</strong> Add as many names or options as you need.</li>
            <li><strong>Automatic Color Assignment:</strong> Each segment gets a distinct color for easy visibility.</li>
            <li><strong>Winner Management:</strong> Choose to keep or remove winners from subsequent spins.</li>
            <li><strong>Spin Speed Control:</strong> Adjust how long the wheel spins before selecting a winner.</li>
            <li><strong>Reset Option:</strong> Start fresh with a new list of names anytime.</li>
          </ul>
          
          <p className="mb-4 italic">
            The Random Name Picker Wheel combines the ancient concept of a spinning wheel of fortune with modern digital technology to create a fair, engaging, and versatile selection tool. Whether in classrooms, workplaces, or social gatherings, our wheel provides a fun way to make random choices that everyone can trust and enjoy.
          </p>
        </ChanceGamesLayout>
      </div>
    </Layout>
  );
};

export default NamePickerWheelPage;
