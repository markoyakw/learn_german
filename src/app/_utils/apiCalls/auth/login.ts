import { TLoginReqData, TLoginResData } from "@/app/api/(routes)/auth/login/route";
import getBasicUrl from "../../url/getBasicUrl";
import { TErrorResponse } from "@/app/_types/types";

const fetchLogin = async (loginData: TLoginReqData): Promise<TLoginResData | TErrorResponse> => {
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
            throw new Error(parsedRes.message).name()
        }
        return parsedRes
    }
    catch (e) {
        return { error: "Login error, try later of contact support" }
    }
}

export default fetchLogin