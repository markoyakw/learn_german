import { headers } from "next/headers"
import { TAppLanguage } from "../_types/types"
import { SUPPORTED_LANGUAGES } from "../constants"

const getPreferredBrowserLanguage = async (): Promise<TAppLanguage> => {
    "use server"
    const browserLanguagesString = await headers().get("Accept-Language")
    if (!browserLanguagesString) {
        return SUPPORTED_LANGUAGES[0]
    }
    const preferredLanguage = browserLanguagesString.split(";")[0].split(",")[0].split("-")[0] as TAppLanguage
    if (!SUPPORTED_LANGUAGES.includes(preferredLanguage)) {
        return SUPPORTED_LANGUAGES[0]
    }
    return preferredLanguage
}

export default getPreferredBrowserLanguage