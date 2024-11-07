import { TWord } from "@/app/api/_models/Word"
import getBasicUrl from "../../url/getBasicUrl"
import { TAddWordResData } from "@/app/api/(routes)/my-vocabulary/word/route"

export const fetchAddWord = async (newWord: TWord): Promise<TAddWordResData> => {
    const basicURL = getBasicUrl()
    const url = `${basicURL}/api/my-vocabulary/word`
    const body = JSON.stringify(newWord)
    try {
        const response = await fetch(url, {
            body,
            method: "POST"
        })
        const parsedRes = response.json()
        return parsedRes
    }
    catch (e) {
        const typedError = e as TAddWordResData
        console.log(e)
        return typedError
    }
}