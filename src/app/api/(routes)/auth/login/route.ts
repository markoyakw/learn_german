import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import User from '@/app/api/_models/User';
import connectDB from '@/app/api/_utils/connectDB';
import SessionService from '@/app/api/_services/SessionService';
import { TNextRes } from '@/app/_types/types';
import handleCaughtErrorInApiRoute from '@/app/_utils/backend/handleCaughtErrorInApiRoute';

export type TJWTPayload = {
    id: string,
}

export type TLoginReqData = {
    login: string,
    password: string
}

export type TLoginResData = {
    message: string
}

export async function POST(req: Request): Promise<TNextRes<TLoginResData>> {
    try {
        connectDB()
        const data = await req.json()
        const { login, password } = data
        const user = await User.findOne({ login })

        if (!user) {
            return NextResponse.json({
                errorArr: [{ name: "ValidationError", message: `User with login "${login}" does not exist`, path: "login" }]
            }, { status: 400 })
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return NextResponse.json({
                errorArr: [{ name: "ValidationError", message: "Wrong password", path: "password" }]
            }, { status: 400 })
        }

        const JWTPayload: TJWTPayload = {
            id: user._id,
        }
        const response = NextResponse.json({ message: "User logged in successfully" })
        SessionService.setSessionData(response, JWTPayload)
        return response
    } catch (e) {
        return handleCaughtErrorInApiRoute(e)
    }
}