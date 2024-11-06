"use client"
import { ReactNode, useContext, useState } from 'react'
import { createContext } from 'react'
import { TAppLanguage } from '../_types/types'

export interface IGlobalContext {
    appLanguage: TAppLanguage,
    changeAppLanguage: (newLanguage: TAppLanguage) => void
}

const GlobalContext = createContext<IGlobalContext | undefined>(undefined)

export const GlobalContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [appLanguage, setAppLanguage] = useState<TAppLanguage>("en")
    const changeAppLanguage = (newLanguage: TAppLanguage) => {
        setAppLanguage(newLanguage)
    }
    return (
        <GlobalContext.Provider value={{ changeAppLanguage, appLanguage }} >
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    const context = useContext(GlobalContext)
    if (!context) throw new Error("To use 'useGlobalContext', 'GlobalContextProvider' must be provided higher in a component tree")
    else return context
}