import { TAppLanguage } from "@/app/_types/types"
import { SUPPORTED_LANGUAGES } from "@/app/constants"
import getLanguageFromUrlPathname from "./getLanguageFromUrl"

const getUrlPathnameWithChangedLanguage = (URL: string, newLanguage: TAppLanguage): string => {
    const appLanguage = getLanguageFromUrlPathname(URL) as TAppLanguage | undefined
    if (!appLanguage || !SUPPORTED_LANGUAGES.includes(appLanguage)) {
        return URL
    }
    const splitURL = URL.split("/")
    const urlWithChangedLanguagePathArr = splitURL.toSpliced(1, 1, newLanguage)
    const urlPathnameWithChangedLanguage = urlWithChangedLanguagePathArr.join("/")
    return urlPathnameWithChangedLanguage
}

export default getUrlPathnameWithChangedLanguage