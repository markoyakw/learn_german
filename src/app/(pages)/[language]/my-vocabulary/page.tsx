"use client"
import React, { useState } from 'react'
import AddWordForm from './AddWordForm/AddWordForm'
import MyButton from '@/app/_components/UI/MyButton/MyButton'
import MyModalWindow from '@/app/_components/UI/MyModalWindow/MyModalWindow'
import { AppLanguageProvider } from '@/app/_hooks/useAppLanguageContext'
import { NextPage } from 'next'
import { TAppLanguage, TPageSearchParams } from '@/app/_types/types'

type TMyVocabularyProps = {
    params: { language: TAppLanguage },
    searchParams?: TPageSearchParams
}

const MyVocabulary: NextPage<TMyVocabularyProps> = (props) => {

    const AddWordFormHeader = () => {
        return <>Add new word to </>
    }
    const [isAddWordWindowOpen, setIsAddWordWindowOpen] = useState(false)

    const handleAddWordWindowToggle = () => {
        setIsAddWordWindowOpen(prevValue => !prevValue)
    }

    return (
        <AppLanguageProvider initialValue={props.params.language}>
            <div>
                <MyButton onClick={handleAddWordWindowToggle}>Add word</MyButton>
                <MyModalWindow isOpen={isAddWordWindowOpen} toggleWindow={handleAddWordWindowToggle} header={"Add new word"}>
                    <AddWordForm />
                </MyModalWindow>
                {/* <MyVocabularyCollection /> */}
            </div>
        </AppLanguageProvider>
    )
}

export default MyVocabulary