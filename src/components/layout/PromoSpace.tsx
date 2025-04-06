
import React from "react";
import Link from 'next/link';
import { ArrowRight, Gift, Sparkles } from "lucide-react";

interface PromoSpaceProps {
  variant?: "primary" | "secondary" | "dark";
  title?: string;
  description?: string;
  linkText?: string;
  linkUrl?: string;
  showCoins?: boolean;
}

const PromoSpace = ({
  variant = "primary",
  title = "Get Premium Calculators",
  description = "Advanced features and unlimited calculations",
  linkText = "Try Premium",
  linkUrl = "/premium",
  showCoins = true,
}: PromoSpaceProps) => {
  // Define styles based on variant
  const bgClasses = {
    primary: "bg-gradient-to-r from-[#1E2630] to-[#0F1923]",
    secondary: "bg-gradient-to-r from-[#0F1923] to-[#253545]",
    dark: "bg-gradient-to-r from-[#0F1923] to-[#1E2630]",
  };

  const textClasses = {
    primary: "text-white",
    secondary: "text-white",
    dark: "text-white",
  };

  return (
    <div className={`${bgClasses[variant]} ${textClasses[variant]} w-full py-6 px-6 relative overflow-hidden`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
        <div className="flex items-center mb-4 md:mb-0">
          {/* Logo/brand section */}
          <div className="mr-6 hidden md:block">
            <div className="bg-white bg-opacity-10 rounded-full p-3">
              <Sparkles size={24} className="text-[#4ad481]" />
            </div>
          </div>
          
          {/* Text content */}
          <div>
            <div className="flex items-center">
              <h3 className="font-bold text-xl md:text-2xl uppercase">{title}</h3>
              {showCoins && (
                <div className="ml-3">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-yellow-300 border-2 border-[#1E2630]"></div>
                    <div className="w-6 h-6 rounded-full bg-yellow-400 border-2 border-[#1E2630]"></div>
                    <div className="w-6 h-6 rounded-full bg-yellow-500 border-2 border-[#1E2630]"></div>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-1">
              <div className="text-white text-opacity-90">{description}</div>
              <div className="text-lg md:text-3xl font-bold mt-1">
                <span className="text-sm md:text-lg">UP TO</span> $20 <span className="text-sm md:text-lg">value</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href={linkUrl}
          className="bg-[#4ad481] text-[#0F1923] font-bold px-6 py-3 rounded-lg transition-all duration-200 hover:bg-opacity-90 hover:shadow-md text-center"
        >
          {linkText}
        </Link>
      </div>
      
      {/* Background decoration */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white bg-opacity-5 transform skew-x-12 -mr-20 hidden lg:block"></div>
      
      {/* Disclaimer text if needed */}
      <div className="absolute bottom-1 left-0 right-0 text-center text-xs text-white text-opacity-70 hidden md:block">
        Limited time offer. Terms and conditions apply.
      </div>
    </div>
  );
};

export default PromoSpace;
