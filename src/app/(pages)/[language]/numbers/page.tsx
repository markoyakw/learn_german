"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react'
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

    const submitButtonRef = useRef<HTMLButtonElement>(null)

    const { pronounceWord, speechSpeed, setSpeechSpeed } = useSpeechSynthesis()

    const getRandomNumberInRange = useCallback(() => {
        const minNumber = numberRangeValues[0]
        const maxNumber = numberRangeValues[1]
        const generatedNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber
        return generatedNumber
    }, [numberRangeValues])


    useEffect(() => {
        const newRandomNumber = getRandomNumberInRange()
        setNumberToGuess(newRandomNumber)
    }, [numberRangeValues, getRandomNumberInRange])

    const nextNumberToGuessHandler = () => {
        setGuessedNumber(null)
        setIsGuessedNumberRight(null)
        const randomNumber = getRandomNumberInRange()
        setNumberToGuess(randomNumber)
        pronounceWord(String(randomNumber))
    }

    const guessedNumberInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGuessedNumber(Number(e.target.value))
    }

    const handleHelpToGuessNumber = () => {
        setGuessedNumber(numberToGuess)
    }

    const sumbitGuessedNumber = () => {
        if (numberToGuess === guessedNumber) {
            setButtonText("Next number")
            setIsGuessedNumberRight(true)
            setGuessedNumber(null)
        }
        else {
            setGuessedNumber(null)
            setButtonText("Try again!")
            setIsGuessedNumberRight(false)
        }
    }

    const keyDownHandler = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            submitButtonHandler()
        }
    }

    const submitButtonHandler = isGuessedNumberRight ? nextNumberToGuessHandler : sumbitGuessedNumber

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

    const getSubmitButtonCenter = () => {
        if (submitButtonRef.current) {
            const rect = submitButtonRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            return { x: centerX, y: centerY }
        }
        return
    };

    const [buttonText, setButtonText] = useState("Guess")

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
                                            <MyIconButton iconType='play' onClick={listenHandler} disabled={Boolean(isGuessedNumberRight)} />
                                            <MyIconButton iconType='skipForward' onClick={nextNumberToGuessHandler} disabled={Boolean(isGuessedNumberRight)} />
                                            <MyContainer width100 margin={["", "", "", "xs"]}>
                                                <MySlider id="learn-numbers-speech-speed-slider" label={`SPEECH SPEED: ${speechSpeed}x`}
                                                    value={speechSpeed} onChange={e => setSpeechSpeed(Number(e.target.value))} min="0.5" max="1.5" step="0.1" />
                                            </MyContainer>
                                        </MyStack>
                                    </MyContainer>
                                    <MyStack direction='row' alignItems='center' gapSize="xs">
                                        <MyInput onChange={guessedNumberInputChangeHandler} value={guessedNumber || ""} type='number' label="Your guess" id="guess-number-input" />
                                        <MyIconButton iconType='help' onClick={handleHelpToGuessNumber} disabled={Boolean(isGuessedNumberRight)} />
                                    </MyStack>
                                    <MyButton onClick={submitButtonHandler}
                                        disabled={!guessedNumber && !isGuessedNumberRight} ref={submitButtonRef}>
                                        {buttonText}
                                    </MyButton>
                                    {isGuessedNumberRight && <MyConfettiAnimation isStarted startingPoint={getSubmitButtonCenter()} />}
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