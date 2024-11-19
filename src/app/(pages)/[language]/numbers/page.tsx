"use client"
import React, { useEffect, useState } from 'react'
import useSpeechSynthesis from '@/app/_hooks/useSpeechSynthesis'
import MyDualSlider from '@/app/_components/UI/MyDualSlider/MyDualSlider'
import PageHeaderTitle from '@/app/_components/Header/PageHeaderTitle/PageHeaderTitle'
import MyCard from '@/app/_components/UI/MyCard/MyCard'
import MyButton from '@/app/_components/UI/MyButton/MyButton'
import MyInput from '@/app/_components/UI/MyInput/MyInput'
import MyIconButton from '@/app/_components/UI/MyIconButton/MyIconButton'
import MyStack from '@/app/_components/UI/MyStack/MyStack'
import MyContainer from '@/app/_components/UI/MyContainer/MyContainer'
import MySlider from '@/app/_components/UI/MySlider/MySlider'
import MyConfettiAnimation from '@/app/_components/UI/MyConfettiAnimation/MyConfettiAnimation'

const Numbers = () => {

    const [numberToGuess, setNumberToGuess] = useState<null | number>(null)
    const [guessedNumber, setGuessedNumber] = useState<null | number>(null)
    const [isGuessedNumberRight, setIsGuessedNumberRight] = useState<boolean | null>(null)
    const [numberRangeValues, setNumberRangeValues] = useState<[number, number]>([0, 100])

    const { pronounceWord, speechSpeed, setSpeechSpeed } = useSpeechSynthesis()

    const getRandomNumber = () => {
        const minNumber = numberRangeValues[0]
        const maxNumber = numberRangeValues[1]
        const generatedNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber
        return generatedNumber
    }

    useEffect(() => {
        const numberInNewRange = getRandomNumber()
        setNumberToGuess(numberInNewRange)
    }, [numberRangeValues])

    const nextNumberButtonClickHandler = () => {
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

    const listenHandler = () => {
        pronounceWord(String(numberToGuess))
    }

    const onSliderChange = (newValue: number, sliderId: number) => {
        setNumberRangeValues(oldValues => {
            if (sliderId == 0) {
                return [newValue, oldValues[1]]
            }
            else {
                return [oldValues[0], newValue]
            }
        })
    }

    return (
        <MyContainer onKeyDown={keyDownHandler}>
            <PageHeaderTitle>Learn numbers:</PageHeaderTitle>
            <MyStack alignItems='center'>
                <MyContainer width='600px'>
                    <MyCard>
                        <label htmlFor="number-range-slider-container">Choose a range of numbers to listen to:</label>
                        <MyContainer height100 margin={["s", ""]}>
                            <MyContainer width100>
                                <MyStack gapSize="s" justifyContent='center' alignItems='flex-start'>
                                    <MyDualSlider id='number-range-slider-container' onSliderChange={onSliderChange} sliderValues={numberRangeValues} minStepsBetweenThumbs={1} step={100} max={1000} />
                                    <MyContainer width100 margin={["", "xxs", "", ""]}>
                                        <MyStack direction='row' alignItems='flex-end' gapSize="xxs">
                                            <MyIconButton iconType='play' onClick={listenHandler} />
                                            <MyIconButton iconType='skipForward' onClick={nextNumberButtonClickHandler} />
                                            <MyContainer width100 margin={["", "", "", "xs"]}>
                                                <MySlider label={`SPEECH SPEED: ${speechSpeed}x`} value={speechSpeed} onChange={e => setSpeechSpeed(Number(e.target.value))} min="0.5" max="1.5" step="0.1" />
                                            </MyContainer>
                                        </MyStack>
                                    </MyContainer>
                                    <MyInput onChange={guessedNumberInputChangeHandler} value={guessedNumber || ""} type='number' label="Your guess" id="guess-number-input" />
                                    <MyButton onClick={sumbitGuessedNumber} disabled={!guessedNumber}>Guess</MyButton>
                                    <div>
                                        {
                                            isGuessedNumberRight !== null &&
                                            (isGuessedNumberRight
                                                ? <div>YOU ARE RIGHT!!!</div>
                                                : <div>WRONG!!! RIGHT NUMBER IS {numberToGuess}</div>
                                            )
                                        }
                                    </div>
                                </MyStack>
                            </MyContainer>
                        </MyContainer>
                    </MyCard >
                </MyContainer>
            </MyStack >
        </MyContainer >
    )
}

export default Numbers