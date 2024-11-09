import { cookies } from 'next/headers';
import { TAppLanguage, TNextRes } from '../../../../_types/types';
import { NextResponse } from "next/server";
import { SUPPORTED_LANGUAGES } from '@/app/constants';
import handleCaughtErrorInApiRoute from '@/app/_utils/backend/handleCaughtErrorInApiRoute';

type TSetLanguageReqBody = {
    newLanguage: string
}

export type TSetLanguageRes = {
    message: string,
    newLanguageCookie?: TAppLanguage
}

export async function POST(req: Request): Promise<TNextRes<TSetLanguageRes>> {
    try {
        const body: TSetLanguageReqBody = await req.json()
        const newLanguage = body?.newLanguage?.toLowerCase() as TAppLanguage
        if (!SUPPORTED_LANGUAGES.includes(newLanguage)) {
            return NextResponse.json({
                errorArr: [{
                    name: "ValidationError",
                    message: `Setting ${newLanguage} as language cookie is not possible. Supported languages are ${SUPPORTED_LANGUAGES}`
                }]
            }, { status: 500 })
        }
        await cookies().set("app-language", newLanguage)
        return NextResponse.json({
            message: "Language cookie was set successfully",
            newLanguageCookie: newLanguage
        })
    }
    catch (e) {
        return handleCaughtErrorInApiRoute(e)
    }
}