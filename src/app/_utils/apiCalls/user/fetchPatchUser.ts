import { TUser } from "@/app/api/_models/User"
import getBasicUrl from "../../url/getBasicUrl"

type TMultipleOfFields<Fields> = {
    [Field in keyof Fields]?: Fields[Field]
}

const fetchPatchUser = async (newFields: TMultipleOfFields<TUser>) => {
    const basicUrl = getBasicUrl()
    const url = `${basicUrl}/api/user`
    const body = JSON.stringify(newFields)
    try {
        const res = await fetch(url, {
            body,
            method: "PATCH"
        })
        const parsedRes = await res.json()
        if (!res.ok) {
            console.error(`Error with status ${res.status} occured, message: ${parsedRes.message || "Unknown error"}`);
            return parsedRes
        }
        return parsedRes
    }
    catch (e) {
        console.log(e)
    }
}

export default fetchPatchUser