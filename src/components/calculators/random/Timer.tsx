
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Clock, Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const Timer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isPreset, setIsPreset] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg');
    audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTotalSeconds((prevSeconds) => {
          if (prevSeconds <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  useEffect(() => {
    if (!isPreset) {
      const newTotalSeconds = hours * 3600 + minutes * 60 + seconds;
      setTotalSeconds(newTotalSeconds);
    }
  }, [hours, minutes, seconds, isPreset]);

  useEffect(() => {
    if (!isRunning || isPreset) {
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;
      
      setHours(h);
      setMinutes(m);
      setSeconds(s);
    }
  }, [totalSeconds, isRunning, isPreset]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    if (isSoundEnabled && audioRef.current) {
      audioRef.current.play();
    }
    
    toast.success("Timer complete!", {
      description: "Your countdown timer has finished.",
      action: {
        label: "Stop Sound",
        onClick: stopSound,
      },
    });
  };

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const startTimer = () => {
    if (totalSeconds > 0) {
      setIsRunning(true);
      setIsPreset(false);
    } else {
      toast.error("Please set a time first");
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsPreset(false);
    setTotalSeconds(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    stopSound();
  };

  const toggleSound = () => {
    setIsSoundEnabled(!isSoundEnabled);
    if (!isSoundEnabled && audioRef.current && audioRef.current.currentTime > 0) {
      audioRef.current.play();
    } else if (isSoundEnabled && audioRef.current) {
      stopSound();
    }
  };

  const handleInputChange = (
    value: string, 
    setter: React.Dispatch<React.SetStateAction<number>>,
    max: number
  ) => {
    const numValue = parseInt(value) || 0;
    setter(Math.min(Math.max(0, numValue), max));
    setIsPreset(false);
  };

  const formatTimeDisplay = () => {
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const presets = [
    { name: "1 min", seconds: 60 },
    { name: "5 min", seconds: 300 },
    { name: "15 min", seconds: 900 },
    { name: "30 min", seconds: 1800 },
    { name: "1 hour", seconds: 3600 },
  ];

  const setPreset = (presetSeconds: number) => {
    setTotalSeconds(presetSeconds);
    setIsPreset(true);
  };

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <Card className="border-t-4 border-t-purple-500 shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Clock className="h-8 w-8 text-purple-500" />
          </div>
          <CardTitle className="text-2xl md:text-3xl">Countdown Timer</CardTitle>
          <CardDescription>
            Set a countdown timer and get notified when time is up
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6">
            <div className="text-5xl md:text-7xl font-mono bg-gray-100 dark:bg-gray-800 py-8 px-4 rounded-lg w-full text-center shadow-inner">
              {formatTimeDisplay()}
            </div>
            
            {!isRunning && (
              <>
                <div className="grid grid-cols-3 gap-4 w-full">
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="hours">Hours</Label>
                    <Input
                      id="hours"
                      type="number"
                      min="0"
                      max="23"
                      value={hours}
                      onChange={(e) => handleInputChange(e.target.value, setHours, 23)}
                      className="text-center"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="minutes">Minutes</Label>
                    <Input
                      id="minutes"
                      type="number"
                      min="0"
                      max="59"
                      value={minutes}
                      onChange={(e) => handleInputChange(e.target.value, setMinutes, 59)}
                      className="text-center"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="seconds">Seconds</Label>
                    <Input
                      id="seconds"
                      type="number"
                      min="0"
                      max="59"
                      value={seconds}
                      onChange={(e) => handleInputChange(e.target.value, setSeconds, 59)}
                      className="text-center"
                    />
                  </div>
                </div>
                
                <div className="w-full">
                  <Label className="mb-2 block">Quick presets</Label>
                  <div className="flex flex-wrap gap-2">
                    {presets.map((preset, index) => (
                      <Button 
                        key={index}
                        variant="outline" 
                        onClick={() => setPreset(preset.seconds)}
                        className="flex-1 min-w-[80px]"
                      >
                        {preset.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">
                <Button onClick={toggleSound} variant="outline" size="sm">
                  {isSoundEnabled ? (
                    <><Volume2 className="h-4 w-4 mr-2" /> Sound On</>
                  ) : (
                    <><VolumeX className="h-4 w-4 mr-2" /> Sound Off</>
                  )}
                </Button>
              </div>
              <div className="flex gap-3">
                {!isRunning ? (
                  <Button onClick={startTimer} size="lg" className="bg-green-500 hover:bg-green-600">
                    <Play className="mr-2 h-5 w-5" /> Start
                  </Button>
                ) : (
                  <Button onClick={pauseTimer} size="lg" className="bg-amber-500 hover:bg-amber-600">
                    <Pause className="mr-2 h-5 w-5" /> Pause
                  </Button>
                )}
                <Button onClick={resetTimer} variant="outline" size="lg">
                  <RotateCcw className="mr-2 h-5 w-5" /> Reset
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Timer;
