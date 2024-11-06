import { TAppLanguage } from "@/app/_types/types"
import { SUPPORTED_LANGUAGES } from "@/app/constants"

const isSupportedLanguage = (language: TAppLanguage) => {
    return SUPPORTED_LANGUAGES.includes(language)
}

export default isSupportedLanguage