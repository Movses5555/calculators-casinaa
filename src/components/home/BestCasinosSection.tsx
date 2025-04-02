
import React from "react";
import { ChevronLeft, ChevronRight, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CasinoItemProps {
  id: number;
  name: string;
  logo: string;
  safetyIndex: "HIGH" | "VERY HIGH" | "MEDIUM" | "LOW";
}

const casinoItems: CasinoItemProps[] = [
  {
    id: 1,
    name: "Legzo Casino",
    logo: "/lovable-uploads/75c5c9f4-f685-43d1-b2cd-bade1b56b887.png",
    safetyIndex: "HIGH"
  },
  {
    id: 2,
    name: "DelOro Casino",
    logo: "/lovable-uploads/09c3c164-34f2-44c2-b8b0-cc16eddd88b1.png",
    safetyIndex: "HIGH"
  },
  {
    id: 3,
    name: "Lemon Casino",
    logo: "/lovable-uploads/75c5c9f4-f685-43d1-b2cd-bade1b56b887.png",
    safetyIndex: "VERY HIGH"
  },
  {
    id: 4,
    name: "Rolling Slots Casino",
    logo: "/lovable-uploads/09c3c164-34f2-44c2-b8b0-cc16eddd88b1.png",
    safetyIndex: "VERY HIGH"
  },
  {
    id: 5,
    name: "Betunlim Casino",
    logo: "/lovable-uploads/75c5c9f4-f685-43d1-b2cd-bade1b56b887.png",
    safetyIndex: "HIGH"
  },
  {
    id: 6,
    name: "Boomerang Casino",
    logo: "/lovable-uploads/09c3c164-34f2-44c2-b8b0-cc16eddd88b1.png",
    safetyIndex: "VERY HIGH"
  }
];

const getSafetyColor = (safety: string) => {
  switch (safety) {
    case "VERY HIGH":
      return "text-green-500";
    case "HIGH":
      return "text-green-400";
    case "MEDIUM":
      return "text-yellow-500";
    case "LOW":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};

const CasinoItem = ({ item }: { item: CasinoItemProps }) => {
  return (
    <div className="bg-[#1E2630] rounded-lg overflow-hidden transition-transform duration-200 hover:transform hover:scale-105 group">
      <div className="p-4 flex items-center justify-between">
        <div className="w-20 h-20 bg-white rounded-md flex items-center justify-center overflow-hidden">
          <img 
            src={item.logo} 
            alt={item.name} 
            className="w-16 h-16 object-contain"
          />
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-white text-lg font-medium">{item.name}</h3>
          <div className="flex items-center mt-1">
            <div className="text-xs font-medium uppercase text-gray-400">SAFETY INDEX:</div>
            <div className={`ml-2 text-sm font-bold ${getSafetyColor(item.safetyIndex)}`}>
              {item.safetyIndex}
            </div>
          </div>
        </div>
        <div className="hidden group-hover:flex">
          <Button size="sm" className="bg-[#4ad481] hover:bg-[#3bc270] text-black">
            <ExternalLink size={16} className="mr-1" />
            Visit
          </Button>
        </div>
      </div>
    </div>
  );
};

const BestCasinosSection = () => {
  return (
    <section className="py-10 bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Best Casinos</h2>
            <p className="text-gray-600">Top rated casinos with best bonuses</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
              <ChevronLeft size={20} />
            </button>
            <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {casinoItems.map(item => (
            <CasinoItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestCasinosSection;
