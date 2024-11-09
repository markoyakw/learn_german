import { NextResponse } from "next/server"
import User, { TUser } from "../../_models/User"
import SessionService from '../../_services/SessionService';
import handleCaughtErrorInApiRoute from "@/app/_utils/backend/handleCaughtErrorInApiRoute";
import { TNextRes } from "@/app/_types/types";

export const GET = async (request: Request) => {
    const session = await SessionService.getSessionData()
}

export type TPatchUserReqData = TUser

export type TPatchUserResData = {
    message: string
}

export const PATCH = async (req: Request): Promise<TNextRes<TPatchUserResData>> => {
    try {
        const newUserData: TPatchUserReqData = await req.json()
        const session = await SessionService.getSessionData()
        const userId = session?.id
        const user = await User.findByIdAndUpdate(userId, newUserData)
        await user.save()
        return NextResponse.json({ message: "User information was successfully updated", newUserData })
    }
    catch (e) {
        return handleCaughtErrorInApiRoute(e)
    }
}