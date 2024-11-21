/* eslint-disable */

import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import classes from './MyDualSlider.module.css';

interface DualSliderProps {
  sliderValues: [number, number];
  onSliderChange: (newValue: number, sliderId: 0 | 1) => void;
  min?: number;
  max?: number;
  step?: number;
  minStepsBetweenThumbs?: number;
  id?: string
}

const MyDualSlider: React.FC<DualSliderProps> = ({
  sliderValues,
  min = 0,
  max = 100,
  step = 1,
  minStepsBetweenThumbs = 0,
  id,
  ...props
}) => {
  const setSliderValues = props.onSliderChange;
  const sliderContainerRef = useRef<HTMLDivElement | null>(null);
  const sliderRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  const tooltipRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const [thumbOffsets, setThumbOffsets] = useState<[number, number]>([0, 0])

  const updateThumbPosition = useCallback((sliderId: 0 | 1, value: number) => {
    if (sliderRefs[sliderId].current && tooltipRefs[sliderId].current) {
      const slider = sliderRefs[sliderId].current
      const tooltip = tooltipRefs[sliderId].current
      const sliderWidth = slider.offsetWidth
      const thumbWidth = 20
      const tooltipWidth = tooltip.offsetWidth
      const percentage = (value - min) / (max - min)
      const newOffset = percentage * (sliderWidth - thumbWidth)
      const centeredOffset = newOffset + thumbWidth / 2 - tooltipWidth / 2

      setThumbOffsets((prevOffsets) => {
        const updatedOffsets = [...prevOffsets] as [number, number]
        updatedOffsets[sliderId] = centeredOffset
        return updatedOffsets
      });
    }
  }, [min, max])

  const updateHighlightedAreaParameters = useCallback(() => {
    const valueToPercentMultiplier = 1 / max * 100
    const [firstSliderValue, secondSliderValue] = sliderValues

    const percentOfHighlightedArea = Math.abs(firstSliderValue - secondSliderValue) * valueToPercentMultiplier
    const firstSliderPercent = firstSliderValue * valueToPercentMultiplier
    const secondSliderPercent = secondSliderValue * valueToPercentMultiplier

    if (sliderContainerRef.current && sliderContainerRef.current.style) {
      sliderContainerRef.current.style.setProperty('--highlighted-area-width-percent', String(percentOfHighlightedArea))
      sliderContainerRef.current.style.setProperty('--first-slider-percent', String(firstSliderPercent))
      sliderContainerRef.current.style.setProperty('--second-slider-percent', String(secondSliderPercent))
    }
  }, [max, sliderValues])

  const onSliderChange = (e: ChangeEvent<HTMLInputElement>, sliderId: 0 | 1) => {
    const prevValue = sliderValues[sliderId]
    const givenValue = Number(e.target.value)
    const otherThumbValue = sliderValues[1 - sliderId]

    const isCursorCloserToNextStep = (valueWithOffset: number): boolean =>
      valueWithOffset % step > step / 2

    const getValueConsideringOrderOfThumbs = (givenValue: number): number => {
      const isFirstThumbValueBigger =
        (givenValue > otherThumbValue && sliderId === 0) ||
        (givenValue < otherThumbValue && sliderId === 1);
      return isFirstThumbValueBigger ? prevValue : givenValue
    };

    const getClosestStepValue = (valueWithOffset: number) => {
      if (valueWithOffset === max) {
        return max;
      } else {
        return (
          valueWithOffset -
          (valueWithOffset % step) +
          (isCursorCloserToNextStep(valueWithOffset) ? step : 0)
        );
      }
    };

    const getCalculatedSliderValueWithOffset = (givenValue: number) => {
      if (Math.abs(otherThumbValue - givenValue) >= minStepsBetweenThumbs * step) {
        return givenValue;
      } else return prevValue;
    }

    const calculatedSliderValue = getValueConsideringOrderOfThumbs(
      getClosestStepValue(getCalculatedSliderValueWithOffset(givenValue))
    )

    setSliderValues(calculatedSliderValue, sliderId)
    updateThumbPosition(sliderId, calculatedSliderValue)
  };

  useEffect(() => {
    updateHighlightedAreaParameters();
    sliderValues.forEach((value, index) => updateThumbPosition(index as 0 | 1, value))
  }, [sliderValues, updateHighlightedAreaParameters, updateThumbPosition])

  return (
    <div className={classes['slider__master-container']} id={id}>
      <div className={classes['slider__container']} ref={sliderContainerRef}>
        {sliderValues.map((value, index) => (
          <div
            key={index}
            ref={tooltipRefs[index]}
            className={classes['slider__value-label']}
            style={{ left: `${thumbOffsets[index]}px` }}
          >
            {value}
          </div>
        ))}

        {sliderValues.map((value, index) => (
          <input
            key={index}
            type="range"
            className={classes['slider']}
            ref={sliderRefs[index]}
            value={value}
            onChange={(e) => onSliderChange(e, index as 0 | 1)}
            min={min}
            max={max}
            step={step}
          />
        ))}

        <div className={classes['slider__highlighted-between-thumbs-area']}></div>
      </div>
    </div>
  );
};

export default MyDualSlider
