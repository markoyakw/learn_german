import { TLoginReqData, TLoginResData } from "@/app/api/(routes)/auth/login/route";
import getBasicUrl from "../../url/getBasicUrl";
import { TErrorResponse } from "@/app/_types/types";

const fetchLogIn = async (loginData: TLoginReqData): Promise<TLoginResData | TErrorResponse> => {
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
            const errorRes = parsedRes as TErrorResponse
            throw errorRes
        }
        return parsedRes
    }
    catch (e) {
        const typedError = e as unknown as TErrorResponse
        return typedError
    }
}

export default fetchLogIn