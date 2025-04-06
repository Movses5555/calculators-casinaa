'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { magic8BallResponses, getRandomElement } from '@/utils/chanceGamesUtils';
import { motion } from 'framer-motion';

const Magic8Ball = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [recentQuestions, setRecentQuestions] = useState<{question: string; answer: string}[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleShake = () => {
    if (isShaking || !question.trim()) return;
    
    setIsShaking(true);
    
    // Clear previous answer while shaking
    setAnswer(null);
    
    setTimeout(() => {
      const newAnswer = getRandomElement(magic8BallResponses);
      setAnswer(newAnswer);
      
      // Add to recent questions
      if (question.trim()) {
        setRecentQuestions(prev => [
          { question: question.trim(), answer: newAnswer },
          ...prev.slice(0, 4)
        ]);
      }
      
      setIsShaking(false);
      setQuestion('');
      
      // Focus the input field again
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleShake();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-4">
          <p className="text-sm text-gray-500">Ask the Magic 8 Ball any yes/no question</p>
        </div>
        
        <div className="flex space-x-2">
          <Input
            ref={inputRef}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your question here..."
            className="flex-1"
            disabled={isShaking}
          />
          <Button 
            onClick={handleShake} 
            disabled={isShaking || !question.trim()}
          >
            <Wand2 className="w-4 h-4 mr-2" />
            Ask
          </Button>
        </div>
      </div>
      
      <div className="relative w-64 h-64 sm:w-80 sm:h-80">
        {/* Ball shadow */}
        <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-[70%] h-4 bg-black/20 rounded-full blur-md"></div>
        
        <motion.div
          className="w-full h-full rounded-full bg-gradient-to-br from-black to-gray-800 shadow-2xl flex items-center justify-center transform perspective-1000"
          style={{
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3), inset 0 5px 15px rgba(255, 255, 255, 0.2), inset 0 -5px 15px rgba(0, 0, 0, 0.8)'
          }}
          animate={{
            rotate: isShaking ? [0, -5, 5, -5, 5, 0] : 0,
            scale: isShaking ? [1, 1.05, 0.95, 1.05, 0.95, 1] : 1,
            rotateY: isShaking ? [0, 10, -10, 5, -5, 0] : 0,
            rotateX: isShaking ? [0, 5, -5, 3, -3, 0] : 0,
          }}
          transition={{ 
            duration: 1.5,
            ease: "easeInOut",
            times: isShaking ? [0, 0.2, 0.4, 0.6, 0.8, 1] : [0, 1]
          }}
        >
          {/* Shiny effect on the ball */}
          <div className="absolute top-[15%] left-[20%] w-[30%] h-[10%] bg-white/20 rounded-full transform rotate-[-30deg] blur-sm"></div>
          
          {/* Blue triangle "window" */}
          <motion.div
            className="w-1/2 h-1/2 rounded-full flex items-center justify-center transform translate-z-0"
            style={{
              background: 'radial-gradient(circle, rgba(0,40,135,1) 0%, rgba(8,19,89,1) 80%)',
              boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.8)'
            }}
            animate={{
              opacity: isShaking ? [1, 0.7, 1, 0.7, 1] : 1,
              scale: answer ? 1 : 0.9
            }}
            transition={{ duration: 1.5 }}
          >
            <motion.div 
              className="w-full h-full flex items-center justify-center relative overflow-hidden"
              initial={{ opacity: 0, rotateX: 90 }}
              animate={{ 
                opacity: answer ? 1 : 0, 
                rotateX: answer ? 0 : 90
              }}
              transition={{ delay: isShaking ? 1.2 : 0, duration: 0.3 }}
            >
              {/* Triangle that appears to contain the answer */}
              <div 
                className="w-3/4 h-3/4 rounded-full flex items-center justify-center overflow-hidden"
                style={{
                  background: 'radial-gradient(circle, rgba(20,60,180,1) 0%, rgba(8,19,89,1) 100%)',
                  boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.5)'
                }}
              >
                <div className="text-white text-center px-2 text-xs sm:text-sm font-medium animate-pulse-slow">
                  {answer || "..."}
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* The "8" number */}
          <div className="absolute bottom-14 w-full flex justify-center">
            <div 
              className="text-white text-5xl font-bold" 
              style={{ textShadow: '0 2px 5px rgba(0,0,0,0.5)' }}
            >8</div>
          </div>
        </motion.div>
      </div>
      
      {answer && (
        <div className="text-center animate-fade-in max-w-md">
          <p className="font-medium mb-1">Your question:</p>
          <p className="italic mb-3">{recentQuestions[0]?.question}</p>
          <p className="font-medium mb-1">The Magic 8 Ball says:</p>
          <p className="text-xl font-bold">{answer}</p>
        </div>
      )}
      
      {recentQuestions.length > 1 && (
        <div className="w-full max-w-md mt-6">
          <h3 className="text-lg font-medium mb-2">Previous Questions</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {recentQuestions.slice(1).map((item, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg">
                <p className="font-medium text-sm">{item.question}</p>
                <p className="text-sm text-gray-600 mt-1">Answer: {item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Magic8Ball;
