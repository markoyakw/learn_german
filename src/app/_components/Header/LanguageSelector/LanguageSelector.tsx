"use client"
import { useAppLanguageContext } from '@/app/_hooks/useAppLanguageContext'
import { TAppLanguage } from '@/app/_types/types'
import fetchSetLanguageCookie from '@/app/_utils/apiCalls/fetchSetLanguageCookie'
import getUrlPathnameWithChangedLanguage from '@/app/_utils/url/getPathnameWithChangedLanguage'
import { useRouter } from 'next/navigation'
import { ChangeEvent } from 'react'
import MyLanguageSelector from '../../UI/MyLanguageSelector/MyLanguageSelector'

const LanguageSelector: React.FC = () => {
    const { appLanguage, setAppLanguage } = useAppLanguageContext()
    const router = useRouter()

    const handleLanguageChange = async (e: ChangeEvent<HTMLSelectElement>) => {
        const newLanguage = e.currentTarget.value as TAppLanguage
        const setLanguageCookieParsedResponse = await fetchSetLanguageCookie(newLanguage as TAppLanguage)
        const newLanguageCookieValue = setLanguageCookieParsedResponse.newLanguageCookie

        if (!newLanguageCookieValue) {
            return
        }
        setAppLanguage(newLanguageCookieValue)

        const newLanguageUrlPathname = getUrlPathnameWithChangedLanguage(window.location.pathname, newLanguageCookieValue)
        router.push(newLanguageUrlPathname)
    }

    return (
        <MyLanguageSelector language={appLanguage} handleLanguageChange={handleLanguageChange} />
    )
}

export default LanguageSelector