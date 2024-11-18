import { NextResponse } from 'next/server';
import { NextPage } from "next";
import { SUPPORTED_LANGUAGES } from "../constants";
import { ReactNode } from 'react';

export type TAppLanguage = typeof SUPPORTED_LANGUAGES[number]

export type TPageSearchParams = { [key: string]: string | string[] | undefined }

type TDefaultPageSearchParams = {
    language: TAppLanguage
}

export type TNextPageWithParams<Props = {
    [key: string]: ReactNode
}> = NextPage<{
    params: { [key: string]: string },
    searchParams: TPageSearchParams & TDefaultPageSearchParams
} & Props>

export type TErrorNames = "ValidationError" | "AuthenticationError" | "AuthorizationError" | "NotFoundError" | "InternalServerError"

export type TError = {
    name: TErrorNames,
    message: string,
    path?: string,
}

export type TErrorResponse = { errorArr: TError[] }

export type TValidationError = {
    errors: {
        [key: string]: TError
    }
}

export type TNextRes<ResData> = NextResponse<ResData | TErrorResponse>

export type TCssSizes = "xxs" | "xs" | "s" | "m" | "l"