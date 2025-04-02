
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Globe, 
  ArrowRightLeft, 
  Clock, 
  PlusCircle, 
  GripVertical, 
  Calendar, 
  Search,
  Share,
  Link as LinkIcon,
  X,
  MapPin,
  Settings,
} from 'lucide-react';
import { format } from 'date-fns';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';

interface TimeZone {
  id: string;
  value: string;
  label: string;
  offset: string;
  flag?: string;
  region?: string;
}

const timeZones: TimeZone[] = [
  { id: "1", value: 'UTC', label: 'UTC (Coordinated Universal Time)', offset: '+00:00', flag: '🌐', region: 'International' },
  { id: "2", value: 'EST', label: 'EST (Eastern Standard Time)', offset: '-05:00', flag: '🇺🇸', region: 'North America' },
  { id: "3", value: 'CST', label: 'CST (Central Standard Time)', offset: '-06:00', flag: '🇺🇸', region: 'North America' },
  { id: "4", value: 'MST', label: 'MST (Mountain Standard Time)', offset: '-07:00', flag: '🇺🇸', region: 'North America' },
  { id: "5", value: 'PST', label: 'PST (Pacific Standard Time)', offset: '-08:00', flag: '🇺🇸', region: 'North America' },
  { id: "6", value: 'GMT', label: 'GMT (Greenwich Mean Time)', offset: '+00:00', flag: '🇬🇧', region: 'Europe' },
  { id: "7", value: 'BST', label: 'BST (British Summer Time)', offset: '+01:00', flag: '🇬🇧', region: 'Europe' },
  { id: "8", value: 'CET', label: 'CET (Central European Time)', offset: '+01:00', flag: '🇪🇺', region: 'Europe' },
  { id: "9", value: 'EET', label: 'EET (Eastern European Time)', offset: '+02:00', flag: '🇪🇺', region: 'Europe' },
  { id: "10", value: 'IST', label: 'IST (India Standard Time)', offset: '+05:30', flag: '🇮🇳', region: 'Asia' },
  { id: "11", value: 'CST-China', label: 'CST (China Standard Time)', offset: '+08:00', flag: '🇨🇳', region: 'Asia' },
  { id: "12", value: 'JST', label: 'JST (Japan Standard Time)', offset: '+09:00', flag: '🇯🇵', region: 'Asia' },
  { id: "13", value: 'AEST', label: 'AEST (Australian Eastern Standard Time)', offset: '+10:00', flag: '🇦🇺', region: 'Australia/Pacific' },
  { id: "14", value: 'NZST', label: 'NZST (New Zealand Standard Time)', offset: '+12:00', flag: '🇳🇿', region: 'Australia/Pacific' },
];

interface TimeZoneWithDate extends TimeZone {
  date: Date;
  isHome?: boolean;
}

interface SortableItemProps {
  id: string;
  location: TimeZoneWithDate;
  onRemove: (id: string) => void;
  onToggleHome: (id: string) => void;
  onUpdateTime: (id: string, date: Date) => void;
  isSource?: boolean;
}

const SortableItem = ({ id, location, onRemove, onToggleHome, onUpdateTime, isSource }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const timeFormat = "h:mm a";
  const dateFormat = "EEE, MMMM d, yyyy";

  const [isEditing, setIsEditing] = useState(false);
  const [editTime, setEditTime] = useState(
    format(location.date, "yyyy-MM-dd'T'HH:mm")
  );

  const handleEditTime = () => {
    setIsEditing(true);
  };

  const handleTimeUpdate = () => {
    onUpdateTime(id, new Date(editTime));
    setIsEditing(false);
  };

  return (
    <div ref={setNodeRef} style={style} className={`mb-4 ${location.isHome ? 'border-l-4 border-l-green-500' : ''}`}>
      <Card className={`relative hover:shadow-md transition-shadow ${isSource ? 'bg-blue-50 dark:bg-blue-950' : ''}`}>
        <div className="absolute right-2 top-2 flex space-x-1">
          {!location.isHome && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-gray-400 hover:text-gray-900"
              onClick={() => onToggleHome(id)}
            >
              <MapPin className="h-4 w-4" />
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-gray-400 hover:text-red-600"
            onClick={() => onRemove(id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center">
            <div className="cursor-move flex items-center justify-center p-2" {...attributes} {...listeners}>
              <GripVertical className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <span className="text-2xl mr-2">{location.flag}</span>
                <div>
                  <h3 className="font-medium text-lg">{location.label.split(' ')[0]}</h3>
                  <p className="text-sm text-gray-500">
                    {location.region} ({location.offset})
                  </p>
                </div>
              </div>
            </div>
            <div className="text-right">
              {isEditing ? (
                <div className="flex flex-col space-y-2">
                  <Input
                    type="datetime-local"
                    value={editTime}
                    onChange={(e) => setEditTime(e.target.value)}
                    className="text-right"
                  />
                  <Button size="sm" onClick={handleTimeUpdate}>Update</Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-1" onClick={handleEditTime}>
                  <span className="text-2xl font-mono cursor-pointer">
                    {format(location.date, timeFormat)}
                  </span>
                  <span className="text-sm text-gray-500 cursor-pointer">
                    {format(location.date, dateFormat)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const TimeZoneConverter = () => {
  const [sourceDate, setSourceDate] = useState<Date>(new Date());
  const [locations, setLocations] = useState<TimeZoneWithDate[]>([
    { ...timeZones[0], date: new Date(), isHome: true },
    { ...timeZones[1], date: new Date() }
  ]);
  const [newTimezone, setNewTimezone] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getOffset = (tzCode: string): number => {
    const timeZone = timeZones.find(tz => tz.value === tzCode);
    if (!timeZone) return 0;
    
    const offsetString = timeZone.offset;
    const sign = offsetString.charAt(0) === '-' ? -1 : 1;
    const hours = parseInt(offsetString.substring(1, 3));
    const minutes = parseInt(offsetString.substring(4, 6));
    
    return sign * (hours * 60 + minutes) * 60 * 1000;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      setLocations((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over?.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addLocation = () => {
    if (!newTimezone) return;
    
    const timeZone = timeZones.find(tz => tz.value === newTimezone);
    if (!timeZone) return;

    // Convert time from home timezone to new timezone
    const homeLocation = locations.find(loc => loc.isHome);
    let newDate = new Date(sourceDate);
    
    if (homeLocation) {
      const homeOffset = getOffset(homeLocation.value);
      const newOffset = getOffset(timeZone.value);
      const offsetDiff = newOffset - homeOffset;
      newDate = new Date(sourceDate.getTime() + offsetDiff);
    }
    
    setLocations([...locations, { ...timeZone, date: newDate }]);
    setNewTimezone('');
  };

  const removeLocation = (id: string) => {
    // Don't remove if it's the last location
    if (locations.length <= 1) return;
    
    // If removing home, set the first remaining location as home
    const removingHome = locations.find(loc => loc.id === id)?.isHome;
    let newLocations = locations.filter(loc => loc.id !== id);
    
    if (removingHome && newLocations.length > 0) {
      newLocations[0].isHome = true;
    }
    
    setLocations(newLocations);
  };

  const setHomeLocation = (id: string) => {
    setLocations(locations.map(loc => ({
      ...loc,
      isHome: loc.id === id
    })));
  };

  const updateLocationTime = (id: string, date: Date) => {
    // Find which location is being updated
    const locationIndex = locations.findIndex(loc => loc.id === id);
    if (locationIndex === -1) return;

    // Calculate offset between the locations
    const updatedLocation = locations[locationIndex];
    const homeLocation = locations.find(loc => loc.isHome) || updatedLocation;
    
    // Get the time difference between the old and new time
    const timeDiff = date.getTime() - updatedLocation.date.getTime();
    
    // Update all locations with the new time
    setLocations(locations.map(loc => ({
      ...loc,
      date: new Date(loc.date.getTime() + timeDiff)
    })));
    
    // Update the source date if we're changing the home location
    if (updatedLocation.isHome) {
      setSourceDate(date);
    }
  };

  const filteredTimeZones = timeZones.filter(tz => 
    !locations.some(loc => loc.value === tz.value) && 
    (searchQuery === '' || 
      tz.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
      tz.region?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const currentTimeNow = () => {
    const now = new Date();
    
    // Update the source date
    setSourceDate(now);
    
    // Update all locations with the current time
    const homeLocation = locations.find(loc => loc.isHome);
    if (!homeLocation) return;
    
    const homeOffset = getOffset(homeLocation.value);
    
    setLocations(locations.map(loc => {
      const locOffset = getOffset(loc.value);
      const offsetDiff = locOffset - homeOffset;
      return {
        ...loc,
        date: new Date(now.getTime() + offsetDiff)
      };
    }));
  };

  // Initialize or update times when locations change
  useEffect(() => {
    // Skip if no home location is set
    const homeLocation = locations.find(loc => loc.isHome);
    if (!homeLocation) return;

    const homeOffset = getOffset(homeLocation.value);
    
    setLocations(locations.map(loc => {
      if (loc.isHome) return { ...loc, date: sourceDate };
      
      const locOffset = getOffset(loc.value);
      const offsetDiff = locOffset - homeOffset;
      return {
        ...loc,
        date: new Date(sourceDate.getTime() + offsetDiff)
      };
    }));
  }, [sourceDate, locations.length]);

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card className="border-t-4 border-t-teal-500 shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex justify-center mb-2">
            <Globe className="h-8 w-8 text-teal-500" />
          </div>
          <CardTitle className="text-2xl md:text-3xl text-center">World Time Converter</CardTitle>
          <CardDescription className="text-center">
            Compare times across different time zones around the world
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Control Bar */}
          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg mb-6 flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <div className="absolute left-3 top-3 text-gray-400">
                  <Search className="h-4 w-4" />
                </div>
                <Input
                  placeholder="Search for a time zone to add..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 min-w-[220px]">
              <Select value={newTimezone} onValueChange={setNewTimezone}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a time zone" />
                </SelectTrigger>
                <SelectContent>
                  {filteredTimeZones.length === 0 ? (
                    <div className="p-2 text-center text-gray-500">No matching time zones</div>
                  ) : (
                    filteredTimeZones.map((tz) => (
                      <SelectItem key={tz.id} value={tz.value}>
                        <span className="mr-2">{tz.flag}</span>
                        {tz.label} ({tz.offset})
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={addLocation} disabled={!newTimezone}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add
            </Button>
            <Button variant="outline" onClick={currentTimeNow}>
              <Clock className="mr-2 h-4 w-4" /> Now
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mb-6">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" /> Settings
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" /> Date
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Share className="mr-2 h-4 w-4" /> Share
              </Button>
              <Button variant="outline" size="sm">
                <LinkIcon className="mr-2 h-4 w-4" /> Link
              </Button>
            </div>
          </div>

          {/* Locations List */}
          <div className="relative min-h-[200px]">
            <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext 
                items={locations.map(loc => loc.id)} 
                strategy={verticalListSortingStrategy}
              >
                {locations.map((location) => (
                  <SortableItem
                    key={location.id}
                    id={location.id}
                    location={location}
                    onRemove={removeLocation}
                    onToggleHome={setHomeLocation}
                    onUpdateTime={updateLocationTime}
                    isSource={location.isHome}
                  />
                ))}
              </SortableContext>
            </DndContext>
            
            {locations.length === 0 && (
              <div className="text-center p-10 text-gray-500">
                Please add time zones to compare
              </div>
            )}
          </div>

          {/* Time Difference Information */}
          {locations.length > 1 && (
            <div className="mt-6 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Time Differences</h3>
              {locations.slice(1).map((location) => {
                const homeLocation = locations.find(loc => loc.isHome);
                if (!homeLocation) return null;
                
                const homeOffset = getOffset(homeLocation.value);
                const locationOffset = getOffset(location.value);
                const diffHours = Math.abs((locationOffset - homeOffset) / (60 * 60 * 1000));
                
                return (
                  <div key={location.id} className="flex justify-between mb-1 text-sm">
                    <span>
                      {homeLocation.label.split(' ')[0]} → {location.label.split(' ')[0]}:
                    </span>
                    <span className="font-semibold">
                      {diffHours} hours {locationOffset > homeOffset ? 'ahead' : 'behind'}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeZoneConverter;
