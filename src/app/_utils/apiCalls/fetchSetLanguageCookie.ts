import { TSetLanguageRes } from "@/app/api/(routes)/cookies/languageCookie/route"
import { TAppLanguage } from "../../_types/types"
import getBasicUrl from "../url/getBasicUrl"

const fetchSetLanguageCookie = async (newLanguage: TAppLanguage): Promise<TSetLanguageRes> => {
    const basicUrl = getBasicUrl()
    const url = `${basicUrl}/api/cookies/languageCookie`
    const body = JSON.stringify({
        newLanguage
    })
    try {
        const res = await fetch(url, {
            body,
            method: "POST",
            headers: { "Content-Type": "application/json" },
        })
        const parsedRes = await res.json()
        if (!res.ok) {
            console.error(`Error with status ${res.status} occured, message: ${parsedRes.message || "Unknown error"}`);
            return parsedRes
        }
        return parsedRes
    }
    catch (e) {
        const typedError = e as TSetLanguageRes
        console.error(e)
        return typedError
    }
}

export default fetchSetLanguageCookie