import { JWTPayload, jwtVerify, SignJWT } from "jose"
import { TJWTPayload } from "../(routes)/auth/login/route"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { getMaxAge } from "next/dist/server/image-optimizer"
import { MAX_TIME_IN_MS } from "@/app/constants"

class SessionService {
    getEncodedSecretJWTKey = () => {
        const secretKey = process.env.JWT_SECRET
        if (!secretKey) {
            throw new Error("Error reading JWT key from .env")
        }
        const encodedJWTSecretKey = new TextEncoder().encode(secretKey)
        return encodedJWTSecretKey
    }
    decryptSession = async (JWTString: string): Promise<JWTPayload> => {
        const verifiedJWT = await jwtVerify(JWTString, this.getEncodedSecretJWTKey())
        const JWTPayload = verifiedJWT.payload as TJWTPayload
        return JWTPayload
    }
    getEncryptedSession = async (): Promise<string | undefined> => {
        const sessionCookie = await cookies().get("session")
        return sessionCookie?.value
    }
    getSessionData = async (): Promise<JWTPayload | undefined> => {
        const JWTSession = await this.getEncryptedSession()
        if (!JWTSession) return undefined
        const JWTSessionData = await this.decryptSession(JWTSession)
        return JWTSessionData
    }
    setSessionData = async (res: NextResponse, payload: TJWTPayload) => {
        const token = await new SignJWT(payload)
            .setExpirationTime("1h")
            .setProtectedHeader({ alg: "HS256" })
            .sign(this.getEncodedSecretJWTKey())

        await res.cookies.set("session", token, {
            httpOnly: true,
            secure: !process.env.NEXT_PUBLIC_DEV,
            sameSite: "strict",
            maxAge: MAX_TIME_IN_MS
        })
    }
    deleteSessionData = async (res: NextResponse) => {
        await res.cookies.delete("session")
    }
}

const sessionService = new SessionService()

export default sessionService