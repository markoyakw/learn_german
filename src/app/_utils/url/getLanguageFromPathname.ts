import { TAppLanguage } from "@/app/_types/types"
import isSupportedLanguage from "../language/isSupportedLanguage"

const getLanguageFromUrlPathname = (URL: string): TAppLanguage | undefined => {
    const URLPathArr = URL.split("/")
    const LanguageFromURL = URLPathArr[1].toLowerCase() as TAppLanguage
    if (!isSupportedLanguage(LanguageFromURL)){
        return undefined
    }
    return LanguageFromURL
}

export default getLanguageFromUrlPathname