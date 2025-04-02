
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timer, Pause, Play, RotateCcw, Flag } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

const OnlineStopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<{ number: number; time: string }[]>([]);
  const intervalRef = useRef<number | null>(null);

  // Format time to display as hh:mm:ss.ms
  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms
      .toString()
      .padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startStopwatch = () => {
    if (!isRunning) {
      const startTime = Date.now() - time;
      intervalRef.current = window.setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
      setIsRunning(true);
    }
  };

  const pauseStopwatch = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsRunning(false);
    }
  };

  const resetStopwatch = () => {
    pauseStopwatch();
    setTime(0);
    setLaps([]);
  };

  const addLap = () => {
    if (isRunning) {
      setLaps((prevLaps) => [
        ...prevLaps,
        { number: prevLaps.length + 1, time: formatTime(time) },
      ]);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <Card className="border-t-4 border-t-blue-500 shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Timer className="h-8 w-8 text-blue-500" />
          </div>
          <CardTitle className="text-2xl md:text-3xl">Online Stopwatch</CardTitle>
          <CardDescription>
            Use this stopwatch to measure elapsed time with precision
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6">
            <div className="text-5xl md:text-7xl font-mono bg-gray-100 dark:bg-gray-800 py-8 px-4 rounded-lg w-full text-center shadow-inner">
              {formatTime(time)}
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {!isRunning ? (
                <Button onClick={startStopwatch} size="lg" className="bg-green-500 hover:bg-green-600">
                  <Play className="mr-2 h-5 w-5" /> Start
                </Button>
              ) : (
                <Button onClick={pauseStopwatch} size="lg" className="bg-amber-500 hover:bg-amber-600">
                  <Pause className="mr-2 h-5 w-5" /> Pause
                </Button>
              )}
              <Button onClick={resetStopwatch} variant="outline" size="lg">
                <RotateCcw className="mr-2 h-5 w-5" /> Reset
              </Button>
              <Button 
                onClick={addLap} 
                disabled={!isRunning} 
                variant={isRunning ? "default" : "secondary"} 
                size="lg"
                className={isRunning ? "bg-blue-500 hover:bg-blue-600" : ""}
              >
                <Flag className="mr-2 h-5 w-5" /> Lap
              </Button>
            </div>
            
            {laps.length > 0 && (
              <>
                <Separator className="my-4" />
                <div className="w-full">
                  <h3 className="font-medium text-lg mb-2">Lap Times</h3>
                  <ScrollArea className="h-[200px] w-full rounded border p-4">
                    <div className="space-y-2">
                      {laps.map((lap, index) => (
                        <div 
                          key={index} 
                          className="flex justify-between py-2 px-4 rounded bg-gray-50 dark:bg-gray-800"
                        >
                          <span className="font-medium">Lap {lap.number}</span>
                          <span className="font-mono">{lap.time}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnlineStopwatch;
