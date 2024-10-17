import React, { useEffect, useRef } from 'react';

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  icon: React.ReactNode;
}

export const Slider: React.FC<SliderProps> = ({ label, value, onChange, min, max, step, icon }) => {
  const rangeRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value === '' ? min : parseFloat(e.target.value);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  useEffect(() => {
    if (rangeRef.current) {
      const progress = ((value - min) / (max - min)) * 100;
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
        <input
          ref={rangeRef}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleInputChange}
          className="w-full"
        />
        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          onBlur={() => {
            if (value < min) onChange(min);
            if (value > max) onChange(max);
          }}
          min={min}
          max={max}
          step={step}
          className="w-20 px-2 py-1 text-right border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
        />
      </div>
    </div>
  );
};