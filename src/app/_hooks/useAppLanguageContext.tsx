import { createContext, FC, useContext, useEffect, useState } from "react";
import { TAppLanguage } from "../_types/types";
import { ReactNode } from "react";

type TAppLanguageContext = {
    appLanguage: TAppLanguage,
    setAppLanguage: (newLanguage: TAppLanguage) => void,
}

const AppLanguageContext = createContext<TAppLanguageContext | undefined>(undefined)

export const AppLanguageProvider: FC<{ children: ReactNode, initialValue: TAppLanguage }> = ({ children, initialValue }) => {

    const [appLanguage, setAppLanguageContext] = useState<TAppLanguage>(initialValue)

    const setAppLanguage = (newLanguage: TAppLanguage) => {
        setAppLanguageContext(newLanguage)
    }

    return (
        <AppLanguageContext.Provider value={{ appLanguage, setAppLanguage }}>
            {children}
        </AppLanguageContext.Provider>
    )
}

export const useAppLanguageContext = () => {
    const appLanguageContext = useContext(AppLanguageContext)
    if (!appLanguageContext) {
        throw new Error("To use 'useAppLanguageContext', 'AppLanguageContextProvider' must be provided higher in a component tree")
    }
    return appLanguageContext
}