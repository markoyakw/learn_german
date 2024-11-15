"use client"
import React, { useRef, useState } from 'react'
import useSpeechSynthesis from '@/app/_hooks/useSpeechSynthesis'
import MyDualSlider from '@/app/_components/UI/MyDualSlider/MyDualSlider'
import PageHeaderTitle from '@/app/_components/Header/PageHeaderTitle/PageHeaderTitle'
import MyCard from '@/app/_components/UI/MyCard/MyCard'

const Numbers = () => {

    const wasStartPressed = useRef<boolean>(false)
    const [numberToGuess, setNumberToGuess] = useState<null | number>(null)
    const [guessedNumber, setGuessedNumber] = useState<null | number>(null)
    const [isGuessedNumberRight, setIsGuessedNumberRight] = useState<boolean | null>(null)

    const { pronounceWord, speechSpeed, setSpeechSpeed } = useSpeechSynthesis()

    const getRandomNumber = () => {
        const minNumber = 0
        const maxNumber = 100
        const generatedNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber
        return generatedNumber
    }

    const nextNumberButtonClickHandler = () => {
        if (!wasStartPressed.current) {
            wasStartPressed.current = true
        }
        setGuessedNumber(null)
        setIsGuessedNumberRight(null)
        const randomNumber = getRandomNumber()
        setNumberToGuess(randomNumber)
        pronounceWord(String(randomNumber))
    }

    const guessedNumberInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGuessedNumber(Number(e.target.value))
    }

    const sumbitGuessedNumber = () => {
        if (numberToGuess === guessedNumber) {
            setIsGuessedNumberRight(true)
        }
        else {
            setIsGuessedNumberRight(false)
        }
        setGuessedNumber(null)
    }

    const keyDownHandler = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            sumbitGuessedNumber()
        }
    }

    const reListenHandler = () => {
        if (!numberToGuess) {
            return
        }
        pronounceWord(String(numberToGuess))
    }

    const [sliderValues, setSliderValues] = useState<[number, number]>([0, 10])
    const onSliderChange = (newValue: number, sliderId: number) => {
        setSliderValues(oldValues => {
            if (sliderId == 0) {
                return [newValue, oldValues[1]]
            }
            else {
                return [oldValues[0], newValue]
            }
        })
    }

    return (
        <div onKeyDown={keyDownHandler}>
            <PageHeaderTitle>Learn numbers:</PageHeaderTitle>
            <MyCard>
                <div>
                    <label htmlFor="number-range-slider-container">Choose a range of numbers to listen to:</label>
                    <div id='number-range-slider-container'>
                        <MyDualSlider onSliderChange={onSliderChange} sliderValues={sliderValues} minStepsBetweenThumbs={1} step={1} max={1000} />
                    </div>
                </div>
                <button onClick={nextNumberButtonClickHandler}>
                    {wasStartPressed.current ? "next number" : "start listening"}
                </button>
                <button onClick={reListenHandler}>RELISTEN</button>
                <input onChange={guessedNumberInputChangeHandler} value={guessedNumber || ""} type='number' />
                <button onClick={sumbitGuessedNumber}>SUBMIT</button>
                <div>
                    <label htmlFor="speech-speed-input">SPEECH SPEED: {speechSpeed}x</label>
                    <input type="range" value={speechSpeed} onChange={e => setSpeechSpeed(Number(e.target.value))} min="0.5" max="1.5" step="0.1" />
                </div>
                <div>
                    {
                        isGuessedNumberRight !== null &&
                        (isGuessedNumberRight
                            ? <div>YOU ARE RIGHT!!!</div>
                            : <div>WRONG!!! RIGHT NUMBER IS {numberToGuess}</div>
                        )

                    }
                </div>
            </MyCard>
        </div>
    )
}

export default Numbers