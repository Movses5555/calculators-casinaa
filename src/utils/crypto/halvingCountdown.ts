
/**
 * Bitcoin halving countdown utility functions
 */

// Estimated Bitcoin block time in seconds
const AVERAGE_BLOCK_TIME = 600; // 10 minutes

// Bitcoin halves approximately every 210,000 blocks
const BLOCKS_PER_HALVING = 210000;

export const estimateNextHalvingDate = (
  currentBlockHeight: number
): { 
  blocksRemaining: number; 
  estimatedDays: number; 
  estimatedDate: Date;
  halvingNumber: number;
} => {
  // Calculate which halving is next
  const halvingNumber = Math.floor(currentBlockHeight / BLOCKS_PER_HALVING) + 1;
  
  // Calculate the block height at which the next halving will occur
  const nextHalvingBlock = halvingNumber * BLOCKS_PER_HALVING;
  
  // Calculate blocks remaining until the next halving
  const blocksRemaining = nextHalvingBlock - currentBlockHeight;
  
  // Estimate time in seconds until next halving
  const secondsRemaining = blocksRemaining * AVERAGE_BLOCK_TIME;
  
  // Calculate estimated days remaining
  const estimatedDays = Math.ceil(secondsRemaining / (60 * 60 * 24));
  
  // Calculate estimated date
  const now = new Date();
  const estimatedDate = new Date(now.getTime() + (secondsRemaining * 1000));
  
  return {
    blocksRemaining,
    estimatedDays,
    estimatedDate,
    halvingNumber
  };
};

export const calculateBlockRewardAfterHalving = (
  currentReward: number,
  halvingsAway: number = 1
): number => {
  return currentReward / Math.pow(2, halvingsAway);
};
