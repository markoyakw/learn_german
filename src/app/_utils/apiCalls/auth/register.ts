import getBasicUrl from "../../url/getBasicUrl";
import { TErrorResponse } from "@/app/_types/types";
import { TRegisterReqData, TRegisterResData } from "@/app/api/(routes)/auth/register/route";

const fetchRegister = async (registerData: TRegisterReqData): Promise<TRegisterResData | TErrorResponse> => {
    const basicUrl = getBasicUrl()
    const url = `${basicUrl}/api/auth/register`
    const body = JSON.stringify(registerData)
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

export default fetchRegister