import { cookies } from 'next/headers';
import { TAppLanguage } from '../../../../_types/types';
import { NextResponse } from "next/server";
import { SUPPORTED_LANGUAGES } from '@/app/constants';

type TSetLanguageReqBody = {
    newLanguage: string
}

export type TSetLanguageRes = {
    message: string,
    newLanguageCookie?: TAppLanguage
}

export async function POST(req: Request): Promise<NextResponse<TSetLanguageRes>> {
    try {
        const body: TSetLanguageReqBody = await req.json()
        if (!body) {
            return NextResponse.json({ message: "Request does not have a body" }, { status: 400 })
        }
        const newLanguage = body.newLanguage.toLowerCase() as TAppLanguage
        if (!SUPPORTED_LANGUAGES.includes(newLanguage)) {
            return NextResponse.json({ message: `Setting ${newLanguage} as language cookie is not possible. Supported languages are ${SUPPORTED_LANGUAGES}` }, { status: 400 })
        }
        await cookies().set("app-language", newLanguage)
        return NextResponse.json({
            message: "Language cookie was set successfully",
            newLanguageCookie: newLanguage
        })
    }
    catch (e) {
        console.log(e)
        return NextResponse.json({ message: `Language cookie setting error: ${e}` }, { status: 500 })
    }
}