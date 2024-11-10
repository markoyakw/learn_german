const getPathnameWithoutLanguage = (pathname: string): string => {
    const pathnameWithNoLanguage = "/" + pathname.split("/").toSpliced(0, 2).join("/")
    return pathnameWithNoLanguage
}

export default getPathnameWithoutLanguage