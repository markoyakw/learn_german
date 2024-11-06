import React, { ChangeEvent, useEffect, useRef } from 'react'
import classes from "./DualSliderWithSetSteps.module.css"

interface DualSliderProps {
    sliderValues: [number, number],
    onSliderChange: (newValue: number, sliderId: 0 | 1) => void,
    min?: number,
    max?: number,
    step?: number,
    minStepsBetweenThumbs?: number
}

const DualSliderWithSetSteps: React.FC<DualSliderProps> = ({
    sliderValues,
    min = 0,
    max = 100,
    step = 1,
    minStepsBetweenThumbs = 0,
    ...props
}) => {

    const setSliderValues = props.onSliderChange
    const sliderContainerRef = useRef<HTMLDivElement | null>(null)

    const updateHighlightedAreaParameters = () => {
        const valueToPercentMultiplier = 1 / max * 100
        const [firstSliderValue, secondSliderValue] = sliderValues

        const percentOfHighlightedArea = (Math.abs(firstSliderValue - secondSliderValue)) * valueToPercentMultiplier
        const firstSliderPercent = firstSliderValue * valueToPercentMultiplier
        const secondSliderPercent = secondSliderValue * valueToPercentMultiplier

        if (sliderContainerRef.current && sliderContainerRef.current.style) {
            sliderContainerRef.current.style.setProperty("--highlighted-area-width-percent", String(percentOfHighlightedArea))
            sliderContainerRef.current.style.setProperty("--first-slider-percent", String(firstSliderPercent))
            sliderContainerRef.current.style.setProperty("--second-slider-percent", String(secondSliderPercent))
        }
    }

    const onSliderChange = (e: ChangeEvent<HTMLInputElement>, sliderId: 0 | 1) => {
        const prevValue = sliderValues[sliderId]
        const givenValue = Number(e.target.value)
        const otherThumbValue = sliderValues[1 - sliderId]

        const isCursorCloserToNextStep = (valueWithOffset: number): boolean => {
            return valueWithOffset % step > step / 2
        }

        const getValueConsideringOrderOfThumbs = (givenValue: number): number => {
            const isFirstThumbValueBigger = (givenValue > otherThumbValue && sliderId === 0) || (givenValue < otherThumbValue && sliderId === 1)
            return isFirstThumbValueBigger ? prevValue : givenValue
        }

        const getClosestStepValue = (valueWithOffset: number) => {
            if (valueWithOffset === max) {
                return max
            }
            else {
                return valueWithOffset - (valueWithOffset % step) + (isCursorCloserToNextStep(valueWithOffset) ? step : 0)
            }
        }

        const getCalculatedSliderValueWithOffset = (givenValue: number) => {
            if (Math.abs(otherThumbValue - givenValue) >= minStepsBetweenThumbs * step) {
                return givenValue
            }
            else return prevValue
        }

        const calculatedSliderValue = getValueConsideringOrderOfThumbs(getClosestStepValue(getCalculatedSliderValueWithOffset(givenValue)))

        setSliderValues(calculatedSliderValue, sliderId)
    }

    useEffect(() => {
        updateHighlightedAreaParameters()
        updateThumbPosition(sliderValues[1])
    }, [sliderValues])

    const test: { [type: number]: string } = {
        1: "one",
        2: "two"
    }

    const sliderRef = useRef<HTMLInputElement>(null)
    const updateThumbPosition = (val: number) => {
        if (sliderContainerRef.current) {
            const sliderWidth = sliderContainerRef.current.offsetWidth;
            const thumbPosition = ((val - min) / (max - min)) * sliderWidth;
            sliderContainerRef.current.style.setProperty("--thumb-position", String(thumbPosition) + "px")
        }
    };

    useEffect(() => {
        const areSliderValuesDivisibleByStep = sliderValues.every(value => value % step === 0)
        const everyValueIsLessThanMax = sliderValues.every(value => value < max)
        if (!areSliderValuesDivisibleByStep) {
            console.error('In dual slider "value" prop, one or both of elements are not divisible by slider step')
        }
        if (!everyValueIsLessThanMax) {
            console.error("Value of one or more sliders is bigger then max value")
        }
        if (min >= max) {
            console.error("Dual slider max value should be bigger then min value")
        }
        if (step > max) {
            console.error("Dual slider max value should be bigger then step value")
        }
    }, [])

    return (
        <div className={classes["slider__master-container"]}>
            <div className={classes["slider__container"]} ref={sliderContainerRef}>
                <label htmlFor="slider-1" className={`${classes["slider__value-label"]} ${classes["slider__value-label--first"]}`}>
                    {test[sliderValues[0]] || sliderValues[0]}
                </label>
                <div className={classes["slider__value-label-container"]}>
                    <label htmlFor="slider-2" className={`${classes["slider__value-label"]} ${classes["slider__value-label--second"]}`}>
                        {sliderValues[1]}
                    </label>
                </div>

                <input type="range" className={classes["slider"]} id="slider-1"
                    value={sliderValues[0]} onChange={e => onSliderChange(e, 0)} min={min} max={max} />
                <input type="range" className={classes["slider"]} id="slider-2" ref={sliderRef}
                    value={sliderValues[1]} onChange={e => onSliderChange(e, 1)} min={min} max={max} />

                <div className={classes["slider__highlighted-between-thumbs-area"]}></div>
            </div>
        </div>
    )
}

export default DualSliderWithSetSteps