import { NextResponse } from "next/server"
import User, { TUser } from "../../_models/User"
import SessionService from '../../_services/SessionService';

export const GET = async (request: Request) => {
    const session = await SessionService.getSessionData()
}

export type TPatchUserRequestBody = TUser

export const PATCH = async (req: Request) => {
    try {
        const newUserData: TPatchUserRequestBody = await req.json()
        const session = await SessionService.getSessionData()
        const userId = session?.id
        const user = await User.findByIdAndUpdate(userId, newUserData)
        await user.save()
        return NextResponse.json({ message: "User information was successfully updated", newUserData })
    }
    catch (e) {
        console.log(e)
        return NextResponse.json({ message: e }, { status: 500 })
    }
}