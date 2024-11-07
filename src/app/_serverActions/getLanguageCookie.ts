"use server"
import { TAppLanguage } from "../_types/types"
import getPreferredBrowserLanguage from "../_serverActions/getPreferredBrowserLanguage"
import { cookies } from "next/headers"

export const getLanguageCookieFallback = async () => {
    const fallbackLanguageCookie = await getPreferredBrowserLanguage()
    return fallbackLanguageCookie
}

export const getLanguageCookie = async (): Promise<TAppLanguage | undefined> => {
    const languageCookieValue = await cookies().get("app-language")?.value as TAppLanguage | undefined
    return languageCookieValue
}