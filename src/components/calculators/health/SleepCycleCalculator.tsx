
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Info, Clock, Moon, Sun, AlertCircle } from 'lucide-react';
import { calculatorColors } from '@/utils/calculatorColors';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { format, addMinutes, set, addHours } from 'date-fns';

interface SleepCycle {
  bedtime: Date;
  wakeupTimes: Date[];
  cyclesCompleted: number[];
}

const SleepCycleCalculator = () => {
  const [calculationType, setCalculationType] = useState<'bedtime' | 'wakeup'>('bedtime');
  const [wakeupTime, setWakeupTime] = useState<Date>(new Date());
  const [bedTime, setBedTime] = useState<Date>(new Date());
  const [sleepCycles, setSleepCycles] = useState<SleepCycle | null>(null);
  const [fallAsleepTime, setFallAsleepTime] = useState<number>(14); // minutes to fall asleep
  
  const CYCLE_LENGTH = 90; // minutes per sleep cycle
  
  const handleTimeChange = (type: 'hour' | 'minute' | 'ampm', value: string, timeType: 'wakeup' | 'bedtime') => {
    const currentDate = timeType === 'wakeup' ? wakeupTime : bedTime;
    let newDate = new Date(currentDate);
    
    if (type === 'hour') {
      let hourValue = parseInt(value);
      // Convert 12-hour format to 24-hour format
      const isPM = newDate.getHours() >= 12;
      if (isPM && hourValue < 12) hourValue += 12;
      if (!isPM && hourValue === 12) hourValue = 0;
      
      newDate.setHours(hourValue);
    } else if (type === 'minute') {
      newDate.setMinutes(parseInt(value));
    } else if (type === 'ampm') {
      const currentHour = newDate.getHours();
      const isPM = value === 'PM';
      
      if (isPM && currentHour < 12) {
        newDate.setHours(currentHour + 12);
      } else if (!isPM && currentHour >= 12) {
        newDate.setHours(currentHour - 12);
      }
    }
    
    if (timeType === 'wakeup') {
      setWakeupTime(newDate);
    } else {
      setBedTime(newDate);
    }
  };
  
  const calculateSleepCycles = () => {
    try {
      if (calculationType === 'wakeup') {
        // Calculate bedtime based on wake-up time
        const wakeupTimes: Date[] = [];
        const cyclesCompleted: number[] = [];
        
        // Calculate bedtime for 4, 5, 6 sleep cycles (6, 7.5, 9 hours)
        for (let cycles = 4; cycles <= 6; cycles++) {
          const totalSleepMinutes = cycles * CYCLE_LENGTH;
          const totalMinutesNeeded = totalSleepMinutes + fallAsleepTime;
          
          const bedtime = new Date(wakeupTime);
          bedtime.setMinutes(bedtime.getMinutes() - totalMinutesNeeded);
          
          wakeupTimes.push(new Date(wakeupTime));
          cyclesCompleted.push(cycles);
        }
        
        setSleepCycles({
          bedtime: new Date(bedTime),
          wakeupTimes,
          cyclesCompleted
        });
        
        toast.success("Sleep cycle calculations complete!");
      } else {
        // Calculate wake-up time based on bedtime
        const wakeupTimes: Date[] = [];
        const cyclesCompleted: number[] = [];
        
        // Calculate wake-up times for 4, 5, 6 sleep cycles
        for (let cycles = 4; cycles <= 6; cycles++) {
          const totalSleepMinutes = cycles * CYCLE_LENGTH;
          const totalMinutesNeeded = totalSleepMinutes + fallAsleepTime;
          
          const wakeupTime = new Date(bedTime);
          wakeupTime.setMinutes(wakeupTime.getMinutes() + totalMinutesNeeded);
          
          wakeupTimes.push(wakeupTime);
          cyclesCompleted.push(cycles);
        }
        
        setSleepCycles({
          bedtime: new Date(bedTime),
          wakeupTimes,
          cyclesCompleted
        });
        
        toast.success("Sleep cycle calculations complete!");
      }
    } catch (error) {
      console.error("Error calculating sleep cycles:", error);
      toast.error("There was an error calculating your sleep cycles.");
    }
  };
  
  const formatTimeDisplay = (date: Date): string => {
    return format(date, 'h:mm a');
  };
  
  const getSleepDuration = (bedtime: Date, wakeupTime: Date): string => {
    const diffMs = Math.abs(wakeupTime.getTime() - bedtime.getTime());
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.round((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${diffHrs} hr ${diffMins} min`;
  };
  
  const getCycleQuality = (cycles: number): string => {
    if (cycles < 4) return "Poor";
    if (cycles === 4) return "Okay";
    if (cycles === 5) return "Good";
    return "Excellent";
  };
  
  const getTimeOptions = (type: 'hour' | 'minute' | 'ampm') => {
    if (type === 'hour') {
      return Array.from({ length: 12 }, (_, i) => i + 1).map(hour => (
        <SelectItem key={hour} value={hour.toString()}>
          {hour}
        </SelectItem>
      ));
    } else if (type === 'minute') {
      return Array.from({ length: 12 }, (_, i) => i * 5).map(minute => (
        <SelectItem key={minute} value={minute.toString()}>
          {minute.toString().padStart(2, '0')}
        </SelectItem>
      ));
    } else {
      return ['AM', 'PM'].map(period => (
        <SelectItem key={period} value={period}>
          {period}
        </SelectItem>
      ));
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <h2 className="text-2xl font-semibold">Sleep Cycle Calculator</h2>
        <p className="text-indigo-100">Plan your sleep for optimal rest and improved energy</p>
      </div>
      
      <Tabs value={calculationType} onValueChange={(value) => setCalculationType(value as 'bedtime' | 'wakeup')} className="p-6">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="bedtime" className="flex items-center justify-center gap-2">
            <Moon size={18} />
            <span>I want to wake up at...</span>
          </TabsTrigger>
          <TabsTrigger value="wakeup" className="flex items-center justify-center gap-2">
            <Sun size={18} />
            <span>I want to go to bed at...</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="bedtime" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label className="block mb-2">What time do you want to wake up?</Label>
                  <div className="flex space-x-2">
                    <div className="w-1/3">
                      <Select
                        value={format(wakeupTime, 'h')}
                        onValueChange={(value) => handleTimeChange('hour', value, 'wakeup')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Hour" />
                        </SelectTrigger>
                        <SelectContent>
                          {getTimeOptions('hour')}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-1/3">
                      <Select
                        value={format(wakeupTime, 'mm')}
                        onValueChange={(value) => handleTimeChange('minute', value, 'wakeup')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Minute" />
                        </SelectTrigger>
                        <SelectContent>
                          {getTimeOptions('minute')}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-1/3">
                      <Select
                        value={format(wakeupTime, 'a')}
                        onValueChange={(value) => handleTimeChange('ampm', value, 'wakeup')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="AM/PM" />
                        </SelectTrigger>
                        <SelectContent>
                          {getTimeOptions('ampm')}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="block mb-2">Minutes to fall asleep (average)</Label>
                  <Select 
                    value={fallAsleepTime.toString()} 
                    onValueChange={(value) => setFallAsleepTime(parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Minutes" />
                    </SelectTrigger>
                    <SelectContent>
                      {[5, 10, 14, 15, 20, 25, 30, 45, 60].map(minutes => (
                        <SelectItem key={minutes} value={minutes.toString()}>
                          {minutes} minutes
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button onClick={calculateSleepCycles} className="w-full mt-4">
                  Calculate Bedtime
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {sleepCycles && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Recommended Bedtimes</h3>
                <p className="text-sm text-gray-500 mb-4">
                  For optimal rest, you should go to bed at one of these times:
                </p>
                
                <div className="space-y-4">
                  {sleepCycles.cyclesCompleted.map((cycles, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-gray-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-xl font-bold text-indigo-700">
                            {formatTimeDisplay(new Date(bedTime))}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {cycles} sleep cycles ({(cycles * 1.5).toFixed(1)} hours)
                          </div>
                        </div>
                        <Badge className={`
                          ${cycles === 6 ? 'bg-green-100 text-green-800' : 
                            cycles === 5 ? 'bg-blue-100 text-blue-800' : 
                            'bg-yellow-100 text-yellow-800'}
                        `}>
                          {getCycleQuality(cycles)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg flex items-start">
                  <Info className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium mb-1">About Sleep Cycles</p>
                    <p>Each sleep cycle takes approximately 90 minutes and consists of both REM and non-REM sleep. Waking up at the end of a cycle can help you feel more refreshed.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="wakeup" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label className="block mb-2">What time do you plan to go to bed?</Label>
                  <div className="flex space-x-2">
                    <div className="w-1/3">
                      <Select
                        value={format(bedTime, 'h')}
                        onValueChange={(value) => handleTimeChange('hour', value, 'bedtime')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Hour" />
                        </SelectTrigger>
                        <SelectContent>
                          {getTimeOptions('hour')}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-1/3">
                      <Select
                        value={format(bedTime, 'mm')}
                        onValueChange={(value) => handleTimeChange('minute', value, 'bedtime')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Minute" />
                        </SelectTrigger>
                        <SelectContent>
                          {getTimeOptions('minute')}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-1/3">
                      <Select
                        value={format(bedTime, 'a')}
                        onValueChange={(value) => handleTimeChange('ampm', value, 'bedtime')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="AM/PM" />
                        </SelectTrigger>
                        <SelectContent>
                          {getTimeOptions('ampm')}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="block mb-2">Minutes to fall asleep (average)</Label>
                  <Select 
                    value={fallAsleepTime.toString()} 
                    onValueChange={(value) => setFallAsleepTime(parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Minutes" />
                    </SelectTrigger>
                    <SelectContent>
                      {[5, 10, 14, 15, 20, 25, 30, 45, 60].map(minutes => (
                        <SelectItem key={minutes} value={minutes.toString()}>
                          {minutes} minutes
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button onClick={calculateSleepCycles} className="w-full mt-4">
                  Calculate Wake-up Times
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {sleepCycles && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Recommended Wake-up Times</h3>
                <p className="text-sm text-gray-500 mb-4">
                  For optimal rest, you should wake up at one of these times:
                </p>
                
                <div className="space-y-4">
                  {sleepCycles.wakeupTimes.map((wakeTime, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-gray-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-xl font-bold text-indigo-700">
                            {formatTimeDisplay(wakeTime)}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {sleepCycles.cyclesCompleted[index]} sleep cycles ({(sleepCycles.cyclesCompleted[index] * 1.5).toFixed(1)} hours)
                          </div>
                        </div>
                        <Badge className={`
                          ${sleepCycles.cyclesCompleted[index] === 6 ? 'bg-green-100 text-green-800' : 
                            sleepCycles.cyclesCompleted[index] === 5 ? 'bg-blue-100 text-blue-800' : 
                            'bg-yellow-100 text-yellow-800'}
                        `}>
                          {getCycleQuality(sleepCycles.cyclesCompleted[index])}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg flex items-start">
                  <Info className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium mb-1">About Sleep Cycles</p>
                    <p>Each sleep cycle takes approximately 90 minutes and consists of both REM and non-REM sleep. Waking up at the end of a cycle can help you feel more refreshed.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SleepCycleCalculator;
