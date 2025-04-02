
import React from 'react';
import CoinFlipper from '@/components/chance-games/CoinFlipper';

const FlipACoin = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Flip a Coin</h2>
      <CoinFlipper />
    </div>
  );
};

export default FlipACoin;
