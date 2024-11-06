import { SUPPORTED_LANGUAGES } from "@/app/constants"

const getNotSupportedLanguageError = (wrongLanguage: string): string => {
    return `${wrongLanguage} is not supported language. Supported languages are: ${SUPPORTED_LANGUAGES}`
}

export default getNotSupportedLanguageError