import { TLoginReqData, TLoginResData } from "@/app/api/(routes)/auth/login/route";
import getBasicUrl from "../../url/getBasicUrl";

const fetchLogin = async (loginData: TLoginReqData): Promise<TLoginResData> => {
    const basicUrl = getBasicUrl()
    const url = `${basicUrl}/api/auth/login`
    const body = JSON.stringify(loginData)
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
        const typedError = e as TLoginResData
        console.error(e)
        return typedError
    }
}

export default fetchLogin