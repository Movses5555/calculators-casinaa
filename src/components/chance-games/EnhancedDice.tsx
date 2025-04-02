
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface EnhancedDiceProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  isRolling?: boolean;
}

const EnhancedDice: React.FC<EnhancedDiceProps> = ({ 
  value, 
  size = 'md',
  isRolling = false
}) => {
  // Size mapping for dice and dots
  const diceSize = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-24 h-24',
  };
  
  const dotSize = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  // Generate dots based on dice value
  const renderDots = () => {
    const dots = [];
    
    // Different dot patterns based on dice value
    switch (value) {
      case 1:
        dots.push(<span key="center" className={cn("absolute inset-0 m-auto", dotSize[size])}></span>);
        break;
      case 2:
        dots.push(
          <span key="top-left" className={cn("absolute top-[25%] left-[25%]", dotSize[size])}></span>,
          <span key="bottom-right" className={cn("absolute bottom-[25%] right-[25%]", dotSize[size])}></span>
        );
        break;
      case 3:
        dots.push(
          <span key="top-left" className={cn("absolute top-[25%] left-[25%]", dotSize[size])}></span>,
          <span key="center" className={cn("absolute inset-0 m-auto", dotSize[size])}></span>,
          <span key="bottom-right" className={cn("absolute bottom-[25%] right-[25%]", dotSize[size])}></span>
        );
        break;
      case 4:
        dots.push(
          <span key="top-left" className={cn("absolute top-[25%] left-[25%]", dotSize[size])}></span>,
          <span key="top-right" className={cn("absolute top-[25%] right-[25%]", dotSize[size])}></span>,
          <span key="bottom-left" className={cn("absolute bottom-[25%] left-[25%]", dotSize[size])}></span>,
          <span key="bottom-right" className={cn("absolute bottom-[25%] right-[25%]", dotSize[size])}></span>
        );
        break;
      case 5:
        dots.push(
          <span key="top-left" className={cn("absolute top-[25%] left-[25%]", dotSize[size])}></span>,
          <span key="top-right" className={cn("absolute top-[25%] right-[25%]", dotSize[size])}></span>,
          <span key="center" className={cn("absolute inset-0 m-auto", dotSize[size])}></span>,
          <span key="bottom-left" className={cn("absolute bottom-[25%] left-[25%]", dotSize[size])}></span>,
          <span key="bottom-right" className={cn("absolute bottom-[25%] right-[25%]", dotSize[size])}></span>
        );
        break;
      case 6:
        dots.push(
          <span key="top-left" className={cn("absolute top-[25%] left-[25%]", dotSize[size])}></span>,
          <span key="top-right" className={cn("absolute top-[25%] right-[25%]", dotSize[size])}></span>,
          <span key="middle-left" className={cn("absolute top-[50%] left-[25%] -translate-y-1/2", dotSize[size])}></span>,
          <span key="middle-right" className={cn("absolute top-[50%] right-[25%] -translate-y-1/2", dotSize[size])}></span>,
          <span key="bottom-left" className={cn("absolute bottom-[25%] left-[25%]", dotSize[size])}></span>,
          <span key="bottom-right" className={cn("absolute bottom-[25%] right-[25%]", dotSize[size])}></span>
        );
        break;
      default:
        dots.push(<span key="center" className={cn("absolute inset-0 m-auto", dotSize[size])}></span>);
    }
    
    return dots;
  };

  return (
    <motion.div
      className={cn(
        "relative rounded-lg bg-white shadow-lg transform-gpu perspective-500",
        diceSize[size]
      )}
      animate={{
        rotateX: isRolling ? [0, 360, 720, 1080] : 0,
        rotateY: isRolling ? [0, 360, 720, 1080] : 0,
        rotateZ: isRolling ? [0, 180, 360, 540] : 0,
      }}
      transition={{
        duration: isRolling ? 1.5 : 0.5,
        ease: "easeOut"
      }}
      style={{
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1), inset 0 5px 20px rgba(255, 255, 255, 0.6), inset 0 -5px 15px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Main dice surfaces */}
      <div className="absolute inset-0 rounded-lg border border-gray-300"></div>
      
      {/* Dots container */}
      <div className="absolute inset-0 flex items-center justify-center">
        {renderDots().map(dot => React.cloneElement(dot, {
          className: cn(dot.props.className, "rounded-full bg-[#1e2630]")
        }))}
      </div>
    </motion.div>
  );
};

export default EnhancedDice;
