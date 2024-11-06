import { NextPage } from "next";
import { SUPPORTED_LANGUAGES } from "../constants";

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
