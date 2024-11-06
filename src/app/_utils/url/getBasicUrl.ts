const getBasicUrl = (): string => {
    const basicUrl = process.env.NEXT_PUBLIC_BASE_URL
    if (!basicUrl) throw new Error("Can't read basic URL from .env file")
    return basicUrl
}

export default getBasicUrl