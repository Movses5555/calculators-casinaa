
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, RotateCw, Download, Copy } from 'lucide-react';
import { getRandomInt, shuffleArray } from '@/utils/chanceGamesUtils';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const NamePickerWheel = () => {
  const [names, setNames] = useState<string[]>([]);
  const [newName, setNewName] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [winnerHistory, setWinnerHistory] = useState<{ name: string; time: string }[]>([]);
  const wheelRef = useRef<HTMLDivElement>(null);
  const [wheelColors] = useState([
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', 
    '#FF9F40', '#C9CBCF', '#7FD8BE', '#A1C7E0', '#FFB7B7'
  ]);

  // Add a name to the wheel
  const addName = () => {
    if (!newName.trim()) return;
    
    setNames(prev => [...prev, newName.trim()]);
    setNewName('');
    setWinner(null);
  };

  // Remove a name from the wheel
  const removeName = (index: number) => {
    setNames(prev => prev.filter((_, i) => i !== index));
    setWinner(null);
  };

  // Import names from text
  const importNames = () => {
    const input = prompt("Enter names separated by commas or new lines:");
    if (!input) return;
    
    const importedNames = input
      .split(/[\n,]/)
      .map(name => name.trim())
      .filter(name => name.length > 0);
    
    if (importedNames.length > 0) {
      setNames(prev => [...prev, ...importedNames]);
      toast({
        title: "Names Imported",
        description: `${importedNames.length} names have been added to the wheel.`
      });
    }
  };

  // Clear all names
  const clearNames = () => {
    if (names.length === 0) return;
    if (confirm("Are you sure you want to clear all names?")) {
      setNames([]);
      setWinner(null);
    }
  };

  // Export names to a file
  const exportNames = () => {
    if (names.length === 0) return;
    
    const content = names.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wheel-names.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Copy all names to clipboard
  const copyNames = () => {
    if (names.length === 0) return;
    
    navigator.clipboard.writeText(names.join('\n'))
      .then(() => {
        toast({
          title: "Copied!",
          description: `${names.length} names copied to clipboard.`
        });
      })
      .catch(err => {
        toast({
          title: "Copy failed",
          description: "Could not copy to clipboard.",
          variant: "destructive"
        });
      });
  };

  // Spin the wheel
  const spinWheel = () => {
    if (names.length < 2 || isSpinning) return;
    
    setIsSpinning(true);
    setWinner(null);
    
    // Calculate random rotation (2-5 full rotations + random angle)
    const spinAngle = 720 + getRandomInt(720, 1800) + getRandomInt(0, 359);
    setRotation(prev => prev + spinAngle);
    
    // Determine the winner after spin animation
    setTimeout(() => {
      const normalizedRotation = rotation % 360;
      const degreesPerName = 360 / names.length;
      const winnerIndex = Math.floor(normalizedRotation / degreesPerName);
      const selectedName = names[winnerIndex];
      
      setWinner(selectedName);
      setWinnerHistory(prev => [
        { 
          name: selectedName, 
          time: new Date().toLocaleTimeString() 
        },
        ...prev.slice(0, 9)
      ]);
      
      setIsSpinning(false);
      
      toast({
        title: "We have a winner!",
        description: selectedName
      });
    }, 5000); // Match this with CSS transition duration
  };

  // Handle key presses
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addName();
    }
  };

  // Create random names for testing
  const addRandomNames = () => {
    const exampleNames = [
      "Alex", "Blake", "Casey", "Dana", "Elliott", 
      "Francis", "Gray", "Harper", "Indigo", "Jamie",
      "Kai", "Logan", "Morgan", "Nico", "Parker", 
      "Quinn", "Riley", "Sage", "Taylor", "Vaughn"
    ];
    
    const randomNames = shuffleArray(exampleNames).slice(0, 10);
    setNames(randomNames);
  };

  // Check if we have enough names to spin
  useEffect(() => {
    if (names.length === 0) {
      addRandomNames();
    }
  }, []);

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="w-full max-w-md">
        <div className="flex space-x-2 mb-4">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter a name"
            className="flex-1"
          />
          <Button onClick={addName} disabled={!newName.trim()}>
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Button onClick={spinWheel} disabled={names.length < 2 || isSpinning} size="sm">
            <RotateCw className="w-4 h-4 mr-1" />
            Spin
          </Button>
          <Button onClick={importNames} variant="outline" size="sm">
            Import Names
          </Button>
          <Button onClick={clearNames} variant="outline" size="sm" disabled={names.length === 0}>
            <Trash2 className="w-4 h-4 mr-1" />
            Clear
          </Button>
          <Button onClick={exportNames} variant="outline" size="sm" disabled={names.length === 0}>
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
          <Button onClick={copyNames} variant="outline" size="sm" disabled={names.length === 0}>
            <Copy className="w-4 h-4 mr-1" />
            Copy
          </Button>
        </div>
      </div>
      
      <div className="relative w-72 h-72 sm:w-80 sm:h-80">
        {/* Wheel container */}
        <div className="relative w-full h-full">
          {/* Spinner wheel */}
          <motion.div
            ref={wheelRef}
            className="w-full h-full rounded-full overflow-hidden relative border-8 border-gray-300 shadow-lg"
            animate={{ rotate: rotation }}
            transition={{ duration: 5, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ transformOrigin: 'center center' }}
          >
            {names.length > 0 && (
              <>
                {names.map((name, index) => {
                  const angle = 360 / names.length;
                  const rotation = index * angle;
                  const color = wheelColors[index % wheelColors.length];
                  
                  return (
                    <div
                      key={index}
                      className="absolute origin-bottom-center"
                      style={{
                        width: '50%',
                        height: '50%',
                        left: '50%',
                        top: '0%',
                        transformOrigin: 'bottom left',
                        transform: `rotate(${rotation}deg)`,
                      }}
                    >
                      <div
                        className="w-full h-full flex items-start justify-center pt-5 text-white font-medium text-sm truncate overflow-hidden"
                        style={{
                          background: color,
                          transform: `rotate(${angle / 2}deg)`,
                          paddingLeft: '25%',
                          paddingRight: '25%',
                        }}
                      >
                        <span className="truncate max-w-full transform -rotate-90">
                          {name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </motion.div>
          
          {/* Center hub */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border-4 border-gray-400 z-10"></div>
          
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[24px] border-l-transparent border-r-transparent border-b-red-600"></div>
          </div>
        </div>
        
        {/* Names list */}
        <div className="mt-8 w-full max-w-md">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Names on the Wheel ({names.length})</h3>
                {winner && (
                  <div className="text-green-600 font-bold animate-pulse">
                    Winner: {winner}
                  </div>
                )}
              </div>
              
              <div className="max-h-40 overflow-y-auto">
                {names.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {names.map((name, index) => (
                      <div key={index} className="flex items-center bg-gray-50 rounded p-1 group">
                        <span className="truncate flex-1 text-sm">{name}</span>
                        <button 
                          onClick={() => removeName(index)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-4">
                    Add names to the wheel
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Winner History */}
        {winnerHistory.length > 0 && (
          <div className="mt-4 w-full max-w-md">
            <h3 className="font-medium mb-2">Recent Winners</h3>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {winnerHistory.map((item, index) => (
                <div key={index} className="flex justify-between text-sm bg-gray-50 p-2 rounded">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-gray-500">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NamePickerWheel;
