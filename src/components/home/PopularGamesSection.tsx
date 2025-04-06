'use client'

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface GameItemProps {
  id: number;
  title: string;
  image: string;
  playerCount: number;
  provider: string;
  exclusive?: boolean;
}

const gameItems: GameItemProps[] = [
  {
    id: 1,
    title: "DUEL AT DAWN",
    image: "/lovable-uploads/e7f96515-a1d6-48bc-85f0-6263486e671e.png",
    playerCount: 655,
    provider: "HACKSAW GAMING"
  },
  {
    id: 2,
    title: "SWEET BONANZA",
    image: "/lovable-uploads/633dc988-8bba-4c4f-ac94-6df332e7975b.png",
    playerCount: 1191,
    provider: "PRAGMATIC PLAY"
  },
  {
    id: 3,
    title: "STRENGTH OF HERCULES",
    image: "/lovable-uploads/a6f70574-f875-4f66-8d15-1e238b2bedde.png",
    playerCount: 224,
    provider: "HACKSAW GAMING"
  },
  {
    id: 4,
    title: "JOKER JAM",
    image: "/lovable-uploads/a0a3f632-5dee-434b-9f92-919b6dad0fc5.png",
    playerCount: 87,
    provider: "MASSIVE STUDIOS",
    exclusive: true
  },
  {
    id: 5,
    title: "DEAD, DEAD OR DEADER",
    image: "/lovable-uploads/39eb34bc-1bbc-4ab3-abae-d2040818fb48.png",
    playerCount: 105,
    provider: "NOLIMIT CITY"
  }
];

const GameItem = ({ item }: { item: GameItemProps }) => {
  return (
    <div className="relative rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
      {item.exclusive && (
        <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded z-20">
          EXCLUSIVE
        </div>
      )}
      <img 
        src={item.image} 
        alt={item.title} 
        className="w-full h-60 object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <h3 className="text-white text-2xl font-bold">{item.title}</h3>
        <div className="text-gray-300 text-xs uppercase">{item.provider}</div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="flex items-center bg-[#4ad481]/80 p-1 px-2 text-xs w-fit">
          <span className="inline-block w-2 h-2 bg-[#4ad481] rounded-full mr-1"></span>
          <span className="text-white font-medium">{item.playerCount} playing</span>
        </div>
      </div>
    </div>
  );
};

const PopularGamesSection = () => {
  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="text-gray-800">Trending Games</span>
        </h2>
        <div className="flex gap-2">
          <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
            <ChevronLeft size={20} />
          </button>
          <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {gameItems.map(item => (
          <GameItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default PopularGamesSection;
