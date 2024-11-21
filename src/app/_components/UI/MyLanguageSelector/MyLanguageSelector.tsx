import { TAppLanguage } from '@/app/_types/types'
import { SUPPORTED_LANGUAGES } from '@/app/constants'
import React, { ChangeEvent, FC } from 'react'
import classes from "./MyLanguageSelector.module.css"

type TMyLanguageSelectorProps = {
    language: TAppLanguage,
    handleLanguageChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

const MyLanguageSelector: FC<TMyLanguageSelectorProps> = ({ language, handleLanguageChange }) => {
    return (
        <select className={classes["select"]} value={language} onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map((language) => {
                return (
                    <option key={language} value={language} >
                        {language.toUpperCase()}
                    </option>
                )
            })}
        </select>
    )
}

export default MyLanguageSelector