
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SideBannerProps {
  onClose?: () => void;
  variant?: "primary" | "secondary" | "dark";
  bannerPosition?: "left" | "right";
}

const SideBanner = ({ 
  onClose, 
  variant = "primary", 
  bannerPosition = "right" 
}: SideBannerProps) => {
  // Define styles based on variant
  const bgClasses = {
    primary: "bg-white border-l border-gray-200",
    secondary: "bg-gray-50 border-r border-gray-200",
    dark: "bg-gray-900 text-white border-gray-800",
  };

  // Select different content based on position
  const isLeftSide = bannerPosition === "left";
  
  return (
    <div className={`h-full p-4 ${bgClasses[variant]}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Featured Tools</h3>
        {onClose && (
          <button 
            onClick={onClose} 
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        {isLeftSide ? (
          <>
            {/* Left side content */}
            <div className="rounded-lg bg-white p-4 border border-gray-200 hover:shadow-hover transition-all duration-300">
              <div className="aspect-video bg-gradient-to-br from-theme-primary to-theme-secondary rounded-md mb-3 flex items-center justify-center text-white font-bold">
                Investment
              </div>
              <h4 className="font-medium mb-1">Investment Calculator</h4>
              <p className="text-sm text-gray-600 mb-3">
                Plan your future with our investment calculator.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full bg-theme-dark text-white hover:bg-theme-neutral border-none font-medium hover:font-bold transition-all"
              >
                Try now →
              </Button>
            </div>

            <div className="rounded-lg bg-white p-4 border border-gray-200 hover:shadow-hover transition-all duration-300">
              <div className="aspect-video bg-gradient-to-br from-theme-primary to-theme-secondary rounded-md mb-3 flex items-center justify-center text-white font-bold">
                Crypto
              </div>
              <h4 className="font-medium mb-1">Crypto Calculator</h4>
              <p className="text-sm text-gray-600 mb-3">
                Calculate cryptocurrency conversions and mining profits.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full bg-theme-dark text-white hover:bg-theme-neutral border-none font-medium hover:font-bold transition-all"
              >
                Try now →
              </Button>
            </div>

            {/* Longer banner ad */}
            <div className="mt-6 bg-white border border-gray-200 rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/75c5c9f4-f685-43d1-b2cd-bade1b56b887.png" 
                alt="Ad Banner" 
                className="w-full h-auto"
              />
            </div>
          </>
        ) : (
          <>
            {/* Right side content (updated styling) */}
            <div className="rounded-lg bg-white p-4 border border-gray-200 hover:shadow-hover transition-all duration-300">
              <div className="aspect-video bg-gradient-to-br from-theme-primary to-theme-secondary rounded-md mb-3 flex items-center justify-center text-white font-bold">
                Mortgage
              </div>
              <h4 className="font-medium mb-1">Mortgage Calculator</h4>
              <p className="text-sm text-gray-600 mb-3">
                Calculate your monthly payments and total interest.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full bg-theme-dark text-white hover:bg-theme-neutral border-none font-medium hover:font-bold transition-all"
              >
                Try now →
              </Button>
            </div>

            <div className="rounded-lg bg-white p-4 border border-gray-200 hover:shadow-hover transition-all duration-300">
              <div className="aspect-video bg-gradient-to-br from-theme-primary to-theme-secondary rounded-md mb-3 flex items-center justify-center text-white font-bold">
                Loan
              </div>
              <h4 className="font-medium mb-1">Loan Calculator</h4>
              <p className="text-sm text-gray-600 mb-3">
                Determine your loan payments and interest costs.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full bg-theme-dark text-white hover:bg-theme-neutral border-none font-medium hover:font-bold transition-all"
              >
                Try now →
              </Button>
            </div>

            {/* Longer banner ad */}
            <div className="mt-6 bg-white border border-gray-200 rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/262b4d58-af14-4747-ac4c-c8f0afd85a9f.png" 
                alt="Ad Banner" 
                className="w-full h-auto"
              />
            </div>
          </>
        )}

        {/* Updated sponsored section - taller with image */}
        <div className="mt-6 p-4 rounded-lg border border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-500 mb-2">Sponsored</p>
          <div className="flex flex-col">
            <div className="mb-3 rounded-md overflow-hidden">
              <img 
                src="/lovable-uploads/a0a3f632-5dee-434b-9f92-919b6dad0fc5.png" 
                alt="Financial advisor" 
                className="w-full h-auto object-cover"
              />
            </div>
            <h4 className="font-medium text-sm mb-2">
              Get expert financial advice
            </h4>
            <p className="text-xs text-gray-600 mb-3">
              Connect with certified advisors to optimize your financial planning and secure your future.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full bg-theme-dark text-white hover:bg-theme-neutral border-none font-medium hover:font-bold transition-all"
            >
              Learn more →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBanner;
