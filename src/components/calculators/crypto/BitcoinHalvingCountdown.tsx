
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Clock, Info, TrendingUp, AlertTriangle, Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';

// Historical Bitcoin halving dates and price data
const halvingHistory = [
  { 
    number: 1, 
    date: "November 28, 2012", 
    blockHeight: 210000,
    blockReward: 25,
    priceAtHalving: 12.35,
    priceOneYearAfter: 1037.38,
    percentageGain: 8340
  },
  { 
    number: 2, 
    date: "July 9, 2016", 
    blockHeight: 420000,
    blockReward: 12.5,
    priceAtHalving: 650.63,
    priceOneYearAfter: 2506.47,
    percentageGain: 285
  },
  { 
    number: 3, 
    date: "May 11, 2020", 
    blockHeight: 630000,
    blockReward: 6.25,
    priceAtHalving: 8821.42,
    priceOneYearAfter: 57750.23,
    percentageGain: 554
  },
  { 
    number: 4, 
    date: "April 20, 2024", // This was the most recent halving
    blockHeight: 840000,
    blockReward: 3.125,
    priceAtHalving: 64500, // Approximate price at the time
    priceOneYearAfter: null, // Not known yet
    percentageGain: null
  }
];

// The next halving is estimated for 2028
const nextHalvingEstimate = {
  number: 5,
  estimatedDate: "April 2028",
  blockHeight: 1050000,
  blockReward: 1.5625,
};

// Price data for chart
const priceData = [
  { month: "Nov 2012", price: 12.35, event: "1st Halving" },
  { month: "Nov 2013", price: 1037.38 },
  { month: "Jul 2016", price: 650.63, event: "2nd Halving" },
  { month: "Jul 2017", price: 2506.47 },
  { month: "May 2020", price: 8821.42, event: "3rd Halving" },
  { month: "May 2021", price: 57750.23 },
  { month: "Apr 2024", price: 64500, event: "4th Halving" }
];

const BitcoinHalvingCountdown = () => {
  const [timeToNextHalving, setTimeToNextHalving] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [currentBlockHeight, setCurrentBlockHeight] = useState(840100); // Approximate current block after the April 2024 halving
  const [blocksRemaining, setBlocksRemaining] = useState(0);
  
  // Calculate time to next halving
  useEffect(() => {
    // Next halving will be at block 1,050,000 (approximately April 2028)
    const remainingBlocks = nextHalvingEstimate.blockHeight - currentBlockHeight;
    setBlocksRemaining(remainingBlocks);
    
    // Estimate time based on current date and next halving date (April 2028)
    const now = new Date();
    const nextHalvingDate = new Date('April 15, 2028'); // Approximate date
    
    const updateCountdown = () => {
      const now = new Date();
      const difference = nextHalvingDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        // Halving has occurred
        setTimeToNextHalving({
          years: 0,
          months: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
        return;
      }
      
      // Calculate time units
      const seconds = Math.floor((difference / 1000) % 60);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const days = Math.floor(difference / (1000 * 60 * 60 * 24) % 30.44); // Average days per month
      const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30.44) % 12); // Months
      const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25)); // Years (accounting for leap years)
      
      setTimeToNextHalving({ years, months, days, hours, minutes, seconds });
    };
    
    // Update countdown every second
    const interval = setInterval(updateCountdown, 1000);
    
    // Initial update
    updateCountdown();
    
    // Clean up interval
    return () => clearInterval(interval);
  }, [currentBlockHeight]);
  
  // Simulate block updates
  useEffect(() => {
    // Bitcoin blocks are mined approximately every 10 minutes
    // This is just a simulation for UI purposes
    const blockInterval = setInterval(() => {
      setCurrentBlockHeight(prevHeight => prevHeight + 1);
    }, 600000); // Update every 10 minutes
    
    return () => clearInterval(blockInterval);
  }, []);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Bitcoin Halving Countdown</h2>
        <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
          <Clock size={16} />
          <span>Next Halving: {nextHalvingEstimate.estimatedDate}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="text-blue-600" size={20} />
              Time Until Next Halving
            </h3>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-2xl font-bold text-blue-700">{timeToNextHalving.years}</p>
                <p className="text-xs text-gray-600">Years</p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-2xl font-bold text-blue-700">{timeToNextHalving.months}</p>
                <p className="text-xs text-gray-600">Months</p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-2xl font-bold text-blue-700">{timeToNextHalving.days}</p>
                <p className="text-xs text-gray-600">Days</p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-2xl font-bold text-blue-700">{timeToNextHalving.hours}</p>
                <p className="text-xs text-gray-600">Hours</p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-2xl font-bold text-blue-700">{timeToNextHalving.minutes}</p>
                <p className="text-xs text-gray-600">Minutes</p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-2xl font-bold text-blue-700">{timeToNextHalving.seconds}</p>
                <p className="text-xs text-gray-600">Seconds</p>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600">Current Block Height</p>
                <p className="text-xl font-bold text-gray-900">{currentBlockHeight.toLocaleString()}</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600">Blocks Remaining</p>
                <p className="text-xl font-bold text-gray-900">{blocksRemaining.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Bitcoin Block Reward Schedule</h3>
            <div className="space-y-4">
              {halvingHistory.map((halving) => (
                <div key={halving.number} className="flex items-center">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${halving.number === 4 ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}>
                    {halving.number}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-medium">{halving.date}</p>
                      <p className="font-bold">{halving.blockReward} BTC</p>
                    </div>
                    <div className="text-xs text-gray-500 flex justify-between">
                      <span>Block {halving.blockHeight.toLocaleString()}</span>
                      {halving.percentageGain && (
                        <span className="text-green-600">+{halving.percentageGain}% in 1 year</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Next halving */}
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                  {nextHalvingEstimate.number}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">{nextHalvingEstimate.estimatedDate}</p>
                    <p className="font-bold">{nextHalvingEstimate.blockReward} BTC</p>
                  </div>
                  <div className="text-xs text-gray-500">
                    <span>Estimated Block {nextHalvingEstimate.blockHeight.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="text-green-600" size={20} />
              Historical Price Impact
            </h3>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={priceData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis 
                    scale="log" 
                    domain={['auto', 'auto']} 
                    tickFormatter={(value) => `$${value}`} 
                  />
                  <RechartsTooltip 
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Price']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    dot={{ r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 text-sm text-gray-600">
              <p>The chart above shows Bitcoin's price evolution around halving events (log scale).</p>
              <p className="mt-2 italic">Note: Past performance doesn't guarantee future results.</p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Info className="text-blue-600" size={20} />
              What is Bitcoin Halving?
            </h3>
            
            <div className="space-y-4 text-sm">
              <p>
                Bitcoin halving is a scheduled event where the reward for mining Bitcoin transactions is cut in half. 
                This happens approximately every four years (210,000 blocks) and is a key feature of Bitcoin's monetary policy.
              </p>
              <p>
                Halving reduces the rate at which new bitcoins are created, enforcing Bitcoin's scarcity. 
                The total supply of Bitcoin is capped at 21 million, and each halving brings us closer to that limit.
              </p>
              <div className="flex items-start gap-2 mt-4">
                <AlertTriangle className="text-amber-500 mt-0.5 flex-shrink-0" size={16} />
                <p className="text-amber-700">
                  Historically, Bitcoin has experienced significant price appreciation in the months following 
                  halving events. However, past performance does not guarantee future results, and many factors 
                  beyond halving affect Bitcoin's price.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BitcoinHalvingCountdown;
