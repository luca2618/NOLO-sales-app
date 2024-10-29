import React, { useEffect, useRef, useState } from 'react';

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  icon: React.ReactNode;
  formatValue?: (value: number) => string;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  icon,
  formatValue = (v) => v.toString(),
}) => {
  const rangeRef = useRef<HTMLInputElement>(null);
  const [displayValue, setDisplayValue] = useState<string | number>(value);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setDisplayValue(newValue);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    const numericValue = displayValue === '' ? 0 : parseFloat(displayValue as string);
    
    if (isNaN(numericValue) || numericValue < 0) {
      setDisplayValue(min);
      onChange(min);
    } else {
      onChange(numericValue);
    }
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setDisplayValue(newValue);
    onChange(newValue);
  };

  useEffect(() => {
    if (!isEditing) {
      setDisplayValue(value);
    }
  }, [value, isEditing]);

  useEffect(() => {
    if (rangeRef.current) {
      const progress = ((Math.min(value, max) - min) / (max - min)) * 100;
      rangeRef.current.style.setProperty('--range-progress', `${progress}%`);
    }
  }, [value, min, max]);

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        {icon}
        <label className="text-sm font-medium text-gray-700">{label}</label>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative w-full">
          <div className="absolute top-1/2 left-0 right-0 -mt-1 h-2 bg-gray-200 rounded-full pointer-events-none"></div>
          <div 
            className="absolute top-1/2 left-0 -mt-1 h-2 bg-[#009D86] rounded-full pointer-events-none" 
            style={{ width: `${((Math.min(value, max) - min) / (max - min)) * 100}%` }}
          ></div>
          <input
            ref={rangeRef}
            type="range"
            min={min}
            max={max}
            step={step}
            value={Math.min(value, max)}
            onChange={handleRangeChange}
            className="relative z-10 w-full appearance-none bg-transparent"
          />
        </div>
        <div className="relative w-32">
          {isEditing ? (
            <input
              type="text"
              value={displayValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  (e.target as HTMLInputElement).blur();
                }
              }}
              className="w-full px-2 py-1 text-right border border-[#009D86] rounded focus:outline-none focus:ring-2 focus:ring-[#009D86] focus:ring-opacity-50"
              autoFocus
            />
          ) : (
            <div
              onClick={() => setIsEditing(true)}
              className="w-full px-2 py-1 text-right border border-gray-300 rounded cursor-text hover:border-[#009D86] transition-colors"
            >
              {formatValue(typeof displayValue === 'string' ? 0 : displayValue)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};