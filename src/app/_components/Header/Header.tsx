"use client"

import { ReactNode, useEffect } from 'react'
import classes from "./header.module.css"
import { AppLanguageProvider } from '@/app/_hooks/useAppLanguageContext'
import { TAppLanguage } from '@/app/_types/types'

interface IHeaderProps {
    children: ReactNode,
    appLanguageCookie: TAppLanguage
}

const Header: React.FC<IHeaderProps> = ({ children, appLanguageCookie }) => {
    return (
        <AppLanguageProvider initialValue={appLanguageCookie}>
            <div className={classes["header"]}>
                {children}
            </div>
        </AppLanguageProvider >
    )
}

export default Header