import React, { useState, useRef, useEffect } from 'react';
import './JCSS.css';

interface SliderWithTooltipProps {
  min: number;
  max: number;
  step?: number;
}

const SliderWithTooltip: React.FC<SliderWithTooltipProps> = ({ min, max, step = 1 }) => {
  const [value, setValue] = useState<number>(min);
  const [thumbOffset, setThumbOffset] = useState<number>(0);
  const sliderRef = useRef<HTMLInputElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null); // Reference for the tooltip to adjust positioning

  // Update slider value
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    updateThumbPosition(newValue);
  };

  // Calculate the thumb's position based on the current value
  const updateThumbPosition = (val: number) => {
    if (sliderRef.current && tooltipRef.current) {
      const sliderWidth = sliderRef.current.offsetWidth;
      const thumbWidth = 20; // Assuming the thumb width is 20px
      const tooltipWidth = tooltipRef.current.offsetWidth; // Get the actual width of the tooltip element
      const percentage = (val - min) / (max - min); // Percentage of slider traveled
      const newOffset = percentage * (sliderWidth - thumbWidth); // Calculate thumb's horizontal position
      setThumbOffset(newOffset + thumbWidth / 2 - tooltipWidth / 2); // Adjust for tooltip width to center it above the thumb
    }
  };

  // Update thumb position on component mount and whenever the value changes
  useEffect(() => {
    updateThumbPosition(value);
  }, [value]);

  return (
    <div className="slider-container">
      <div
        ref={tooltipRef} // Attach ref to the tooltip
        className="slider-value"
        style={{ left: `${thumbOffset}px` }}
      >
        {value}
      </div>
      <input
        ref={sliderRef}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="slider"
      />
    </div>
  );
};

export default SliderWithTooltip;
