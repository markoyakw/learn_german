const getBasicUrl = (): string => {
    // const isInDev = process.env.NEXT_PUBLIC_DEV
    // const basicDevUrl = process.env.NEXT_PUBLIC_BASE_URL_DEV
    // const basicProductionUrl = process.env.NEXT_PUBLIC_BASE_URL_PRODUCTION

    // const basicUrl = isInDev ? basicDevUrl : basicProductionUrl

    const basicUrl = window.location.origin || process.env.NEXT_PUBLIC_BASE_URL_PRODUCTION
    if (!basicUrl) throw new Error("Can't read basic URL from .env file")
    return basicUrl
}

export default getBasicUrl