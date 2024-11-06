import { SUPPORTED_LANGUAGES } from './app/constants';
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { TAppLanguage } from './app/_types/types';
import { getLanguageCookieFallback } from './app/_serverActions/getLanguageCookie';
import getLanguageFromUrlPathname from './app/_utils/url/getLanguageFromUrl';

export async function middleware(request: NextRequest) {

    const languageCookie = await cookies().get("app-language")?.value as TAppLanguage
    const newCookiesMap: Map<string, string> = new Map()
    let response = NextResponse.next()
    const reqURLpathName = request.nextUrl.pathname
    const URLLanguage = getLanguageFromUrlPathname(reqURLpathName)
    const getLanguageCookieAndHandleFallback = async () => {
        if (!languageCookie) {
            const fallbackLanguage = await getLanguageCookieFallback()
            newCookiesMap.set("app-language", fallbackLanguage)
            return fallbackLanguage
        }
        return languageCookie
    }

    if (URLLanguage !== languageCookie) {
        newCookiesMap.set("app-language", URLLanguage as TAppLanguage)
    }

    if (reqURLpathName.length <= 1) {
        const newLanguageInURL: TAppLanguage = await getLanguageCookieAndHandleFallback()
        const responseWithLanguageURL = NextResponse.redirect(new URL(`/${newLanguageInURL}`, request.url))
        response = responseWithLanguageURL
    }

    newCookiesMap.forEach((value, key) => {
        response.cookies.set(key, value)
    })
    return response
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|images|assets|favicon.ico|sw.js).*)']
};