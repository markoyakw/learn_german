const getPathnameFromUrl = (url: string | null) => {
    if (!url) {
        return ""
    }
    const pathname = "/" + url.split("/").splice(3).join("/")
    return pathname
}

export default getPathnameFromUrl