import { TWord } from "@/app/api/_models/Word"
import getBasicUrl from "../../url/getBasicUrl"

export const fetchAddWord = (newWord: TWord) => {
    const basicURL = getBasicUrl()
    const url = `${basicURL}/api/my-vocabulary/word`
    const body = JSON.stringify(newWord)
    try {
        const response = fetch(url, {
            body,
            method: "POST"
        })
        console.log(response)
    }
    catch (e) {
        console.error(e)
    }
}