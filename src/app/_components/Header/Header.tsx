"use client"

import { ReactNode } from 'react'
import classes from "./header.module.css"
import { AppLanguageProvider } from '@/app/_hooks/useAppLanguageContext'
import { TAppLanguage } from '@/app/_types/types'

interface IHeaderProps {
    children: ReactNode,
    appLanguageCookie: TAppLanguage,
    wrapClassName: string | null
}

const Header: React.FC<IHeaderProps> = ({ children, appLanguageCookie, wrapClassName }) => {
    return (
        <AppLanguageProvider initialValue={appLanguageCookie}>
            <div className={classes["header-container"]}>
                <div className={`${classes["header"]} ${wrapClassName}`}>
                    {children}
                </div>
            </div>
        </AppLanguageProvider >
    )
}

export default Header