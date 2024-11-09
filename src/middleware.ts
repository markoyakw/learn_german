import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { TAppLanguage } from './app/_types/types';
import getLanguageFromUrlPathname from './app/_utils/url/getLanguageFromUrl';
import SessionService from './app/api/_services/SessionService';
import getPreferredBrowserLanguage from './app/_serverActions/getPreferredBrowserLanguage';

const middlewarePathnameMatcher = (currentPathname: string, matchingPathnameArr: string[]) => {
    return matchingPathnameArr.some(path => currentPathname.startsWith(path))
}

export async function middleware(request: NextRequest) {
    try {
        const languageCookie = await cookies().get("app-language")?.value as TAppLanguage
        let response = NextResponse.next()

        const reqPathname = request.nextUrl.pathname
        const reqPathnameWithNoLanguage = "/" + reqPathname.split("/").toSpliced(0, 2).join("/")
        const URLLanguage = getLanguageFromUrlPathname(reqPathname)

        // verify session and redirect to login page if it's invalid
        if (!middlewarePathnameMatcher(reqPathnameWithNoLanguage, ["/auth", "/about"])) {
            try {
                const isSessionValid = await SessionService.getSessionData()
                if (!isSessionValid) {
                    throw new Error("No session cookies")
                }
            }
            catch (e) {
                const language = languageCookie || await getPreferredBrowserLanguage()
                const redirectUrl = new URL(`/${language}/auth/login`, request.url)
                
                //set where to redirect user after successfull login
                redirectUrl.searchParams.set("redirect", reqPathname)

                const response = NextResponse.redirect(redirectUrl)
                await SessionService.deleteSessionData(response)
                if (!languageCookie) {
                    await response.cookies.set("app-language", language)
                }
                return response
            }
        }

        //handle no language in URL
        if (reqPathname.length <= 1) {
            const newLanguageInURL: TAppLanguage = languageCookie
            const responseWithLanguageURL = NextResponse.redirect(new URL(`/${newLanguageInURL}`, request.url))
            response = responseWithLanguageURL
        }

        //handle language change through url
        if (URLLanguage && URLLanguage !== languageCookie) {
            response.cookies.set("app-language", URLLanguage)
        }

        return response
    }
    catch (e) {
        console.log(e)
    }
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|images|assets|favicon.ico|sw.js).*)']
};