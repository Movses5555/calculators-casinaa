
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Timer, Flag, Watch, BarChart, Award, Headphones, Clock, Ruler, ArrowUp, ArrowDown } from 'lucide-react';

const PaceEducationalContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-cyan-500" />
            <span>What is Pace in Running and Walking?</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            <strong>Pace</strong> is the time it takes to cover a specific distance. It's typically measured in minutes per kilometer (min/km) or 
            minutes per mile (min/mi). Pace is the inverse of speed - while speed tells you how much distance you cover in a 
            given time, pace tells you how much time it takes to cover a given distance.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="bg-sky-50 p-4 rounded-lg">
              <h4 className="font-medium text-sky-800 mb-2 flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Pace (Time ÷ Distance)
              </h4>
              <p className="text-sm">
                If you run 5 kilometers in 25 minutes, your pace is 5 minutes per kilometer (25 min ÷ 5 km = 5 min/km).
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2 flex items-center">
                <Ruler className="h-4 w-4 mr-2" />
                Speed (Distance ÷ Time)
              </h4>
              <p className="text-sm">
                If your pace is 5 min/km, your speed would be 12 km/hour (60 min ÷ 5 min/km = 12 km/h).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5 text-cyan-500" />
            <span>Common Pace Benchmarks</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              Different activities and fitness levels have different typical pace ranges. Here are some common benchmarks:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Activity</th>
                    <th className="p-2 text-left">Beginner</th>
                    <th className="p-2 text-left">Intermediate</th>
                    <th className="p-2 text-left">Advanced</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Walking</td>
                    <td className="p-2">15:00-20:00 min/km</td>
                    <td className="p-2">12:00-15:00 min/km</td>
                    <td className="p-2">8:00-12:00 min/km</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Jogging</td>
                    <td className="p-2">7:30-10:00 min/km</td>
                    <td className="p-2">6:00-7:30 min/km</td>
                    <td className="p-2">5:00-6:00 min/km</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Running</td>
                    <td className="p-2">6:00-7:00 min/km</td>
                    <td className="p-2">4:30-6:00 min/km</td>
                    <td className="p-2">3:30-4:30 min/km</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">Marathon</td>
                    <td className="p-2">6:30-8:00 min/km</td>
                    <td className="p-2">5:00-6:30 min/km</td>
                    <td className="p-2">3:00-5:00 min/km</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-cyan-500" />
            <span>Common Race Pace Goals</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              When training for a specific race, many runners set pace goals to achieve their desired finish time. 
              Here are some common race distance pace goals:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-indigo-50 p-3">
                  <h4 className="font-medium">5K Race (5 kilometers)</h4>
                </div>
                <div className="p-3 space-y-2">
                  <div className="flex justify-between">
                    <span>Sub-30 min finish:</span>
                    <span className="font-mono">6:00 min/km</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sub-25 min finish:</span>
                    <span className="font-mono">5:00 min/km</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sub-20 min finish:</span>
                    <span className="font-mono">4:00 min/km</span>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-purple-50 p-3">
                  <h4 className="font-medium">10K Race (10 kilometers)</h4>
                </div>
                <div className="p-3 space-y-2">
                  <div className="flex justify-between">
                    <span>Sub-60 min finish:</span>
                    <span className="font-mono">6:00 min/km</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sub-50 min finish:</span>
                    <span className="font-mono">5:00 min/km</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sub-40 min finish:</span>
                    <span className="font-mono">4:00 min/km</span>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-blue-50 p-3">
                  <h4 className="font-medium">Half Marathon (21.1 kilometers)</h4>
                </div>
                <div className="p-3 space-y-2">
                  <div className="flex justify-between">
                    <span>Sub-2:15 finish:</span>
                    <span className="font-mono">6:30 min/km</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sub-2:00 finish:</span>
                    <span className="font-mono">5:45 min/km</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sub-1:45 finish:</span>
                    <span className="font-mono">5:00 min/km</span>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-green-50 p-3">
                  <h4 className="font-medium">Marathon (42.2 kilometers)</h4>
                </div>
                <div className="p-3 space-y-2">
                  <div className="flex justify-between">
                    <span>Sub-4:30 finish:</span>
                    <span className="font-mono">6:25 min/km</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sub-4:00 finish:</span>
                    <span className="font-mono">5:40 min/km</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sub-3:30 finish:</span>
                    <span className="font-mono">5:00 min/km</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-cyan-500" />
            <span>Pace Training Tips</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              Improving your pace requires structured training. Here are some effective training methods:
            </p>
            
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-cyan-500">
                <h4 className="font-medium">Interval Training</h4>
                <p className="text-sm mt-1">
                  Alternate between high-intensity periods and recovery periods. For example, run at a fast pace for 400m, 
                  then jog or walk for 200m, and repeat multiple times.
                </p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-cyan-500">
                <h4 className="font-medium">Tempo Runs</h4>
                <p className="text-sm mt-1">
                  Sustained effort runs at a "comfortably hard" pace, typically lasting 20-40 minutes. These runs help improve 
                  your lactate threshold and teach your body to maintain a faster pace for longer.
                </p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-cyan-500">
                <h4 className="font-medium">Progression Runs</h4>
                <p className="text-sm mt-1">
                  Start at an easy pace and gradually increase your speed throughout the run, finishing at a much faster pace 
                  than you started with.
                </p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-cyan-500">
                <h4 className="font-medium">Fartlek Training</h4>
                <p className="text-sm mt-1">
                  A more unstructured form of interval training where you vary your pace based on feel, such as sprinting to a 
                  lamp post, then jogging to the next one.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Headphones className="h-5 w-5 text-cyan-500" />
            <span>Factors Affecting Pace</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="mr-2 mt-1 bg-red-100 p-1 rounded-full">
                  <ArrowUp className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <h4 className="font-medium">Factors That Slow Pace</h4>
                  <ul className="list-disc pl-5 text-sm space-y-1 mt-1">
                    <li>Uphill terrain</li>
                    <li>Extreme heat and humidity</li>
                    <li>Fatigue and inadequate recovery</li>
                    <li>Headwind</li>
                    <li>Uneven or soft surfaces (sand, trail)</li>
                    <li>Heavy or inappropriate footwear</li>
                    <li>Dehydration</li>
                    <li>Poor nutrition</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="mr-2 mt-1 bg-green-100 p-1 rounded-full">
                  <ArrowDown className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <h4 className="font-medium">Factors That Improve Pace</h4>
                  <ul className="list-disc pl-5 text-sm space-y-1 mt-1">
                    <li>Downhill terrain</li>
                    <li>Moderate temperatures</li>
                    <li>Proper rest and recovery</li>
                    <li>Tailwind</li>
                    <li>Firm, flat surfaces (track, road)</li>
                    <li>Lightweight, responsive shoes</li>
                    <li>Proper hydration</li>
                    <li>Good nutrition and carbohydrate intake</li>
                    <li>Consistent training</li>
                    <li>Improved running form</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaceEducationalContent;
