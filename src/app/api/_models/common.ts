import { SUPPORTED_LANGUAGES } from "@/app/constants";

export const supportedLanguagesEnum = {
    values: SUPPORTED_LANGUAGES,
    message: `{VALUE} is not a valid language in shis version of app. Supported languages are ${SUPPORTED_LANGUAGES}`
}