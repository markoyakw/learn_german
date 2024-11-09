import { NextResponse } from 'next/server';
import { NextPage } from "next";
import { SUPPORTED_LANGUAGES } from "../constants";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export type TAppLanguage = typeof SUPPORTED_LANGUAGES[number]

export type TPageSearchParams = { [key: string]: string | string[] | undefined }

type TDefaultPageSearchParams = {
    language: TAppLanguage
}

export type TNextPageWithParams<
    Params extends { [key: string]: string } = {},
    SearchParams extends TPageSearchParams = {}
> = NextPage<
    {
        params: Params & TDefaultPageSearchParams,
        searchParams: SearchParams
    }
>

// export type TNewCookiesMap = Map<string, { value: string, options?: Partial<ResponseCookie> }>

export type TErrorNames = "ValidationError" | "AuthenticationError" | "AuthorizationError" | "NotFoundError" | "InternalServerError"

export type TErrorRes = {
    name: TErrorNames,
    message: string,
    status: number
}

export type TNextRes<ResData> = NextResponse<ResData | TErrorRes>