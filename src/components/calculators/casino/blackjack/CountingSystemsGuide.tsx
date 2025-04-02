
import React from 'react';
import { Lightbulb } from 'lucide-react';
import { countingSystems } from './countingSystemsData';

interface CountingSystemsGuideProps {
  selectedSystem: string;
}

const CountingSystemsGuide: React.FC<CountingSystemsGuideProps> = ({ selectedSystem }) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
        <div className="flex">
          <Lightbulb className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-medium text-amber-800">
              {countingSystems[selectedSystem].name} System
            </h4>
            <p className="text-sm text-amber-700">
              {countingSystems[selectedSystem].description}
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="p-2 bg-gray-50 rounded-md">
          <p className="font-medium">Value: +1</p>
          <p>
            {Object.entries(countingSystems[selectedSystem].values)
              .filter(([_, count]) => count === 1)
              .map(([card]) => card)
              .join(', ')}
          </p>
        </div>
        
        <div className="p-2 bg-gray-50 rounded-md">
          <p className="font-medium">Value: -1</p>
          <p>
            {Object.entries(countingSystems[selectedSystem].values)
              .filter(([_, count]) => count === -1)
              .map(([card]) => card)
              .join(', ')}
          </p>
        </div>
        
        {Object.entries(countingSystems[selectedSystem].values).some(([_, count]) => count === 2) && (
          <div className="p-2 bg-gray-50 rounded-md">
            <p className="font-medium">Value: +2</p>
            <p>
              {Object.entries(countingSystems[selectedSystem].values)
                .filter(([_, count]) => count === 2)
                .map(([card]) => card)
                .join(', ')}
            </p>
          </div>
        )}
        
        {Object.entries(countingSystems[selectedSystem].values).some(([_, count]) => count === -2) && (
          <div className="p-2 bg-gray-50 rounded-md">
            <p className="font-medium">Value: -2</p>
            <p>
              {Object.entries(countingSystems[selectedSystem].values)
                .filter(([_, count]) => count === -2)
                .map(([card]) => card)
                .join(', ')}
            </p>
          </div>
        )}
        
        <div className="p-2 bg-gray-50 rounded-md">
          <p className="font-medium">Value: 0</p>
          <p>
            {Object.entries(countingSystems[selectedSystem].values)
              .filter(([_, count]) => count === 0)
              .map(([card]) => card)
              .join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountingSystemsGuide;
