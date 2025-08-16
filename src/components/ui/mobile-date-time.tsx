import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Button } from './button';

interface MobileDateTimeProps {
  date?: string;
  time?: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  className?: string;
}

export const MobileDateTime: React.FC<MobileDateTimeProps> = ({
  date,
  time,
  onDateChange,
  onTimeChange,
  className = ''
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  // Close pickers when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dateInputRef.current && !dateInputRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
      if (timeInputRef.current && !timeInputRef.current.contains(event.target as Node)) {
        setShowTimePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDateClick = () => {
    setShowDatePicker(true);
    setShowTimePicker(false);
    // Smooth scroll to date input
    setTimeout(() => {
      dateInputRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }, 100);
  };

  const handleTimeClick = () => {
    setShowTimePicker(true);
    setShowDatePicker(false);
    // Smooth scroll to time input
    setTimeout(() => {
      timeInputRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }, 100);
  };

  return (
    <div className={`grid grid-cols-2 gap-4 ${className}`}>
      {/* Date Picker */}
      <div className="relative">
        <Button
          variant="outline"
          onClick={handleDateClick}
          className="w-full justify-start text-left font-normal touch-target"
        >
          <Calendar className="mr-2 h-4 w-4" />
          {date ? new Date(date).toLocaleDateString() : 'Select date'}
        </Button>
        
        {showDatePicker && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border rounded-md shadow-lg">
            <input
              ref={dateInputRef}
              type="date"
              value={date || ''}
              onChange={(e) => {
                onDateChange(e.target.value);
                setShowDatePicker(false);
              }}
              className="w-full p-3 border-0 focus:ring-2 focus:ring-primary focus:outline-none rounded-md"
              autoFocus
            />
          </div>
        )}
      </div>

      {/* Time Picker */}
      <div className="relative">
        <Button
          variant="outline"
          onClick={handleTimeClick}
          className="w-full justify-start text-left font-normal touch-target"
        >
          <Clock className="mr-2 h-4 w-4" />
          {time || 'Select time'}
        </Button>
        
        {showTimePicker && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border rounded-md shadow-lg">
            <input
              ref={timeInputRef}
              type="time"
              value={time || ''}
              onChange={(e) => {
                onTimeChange(e.target.value);
                setShowTimePicker(false);
              }}
              className="w-full p-3 border-0 focus:ring-2 focus:ring-primary focus:outline-none rounded-md"
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  );
};


