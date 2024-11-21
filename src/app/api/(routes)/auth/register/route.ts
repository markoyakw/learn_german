import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import User from '@/app/api/_models/User';
import connectDB from '@/app/api/_utils/connectDB';
import handleCaughtErrorInApiRoute from '@/app/_utils/backend/handleCaughtErrorInApiRoute';
import { TNextRes } from '@/app/_types/types';
import { cookies } from 'next/headers';
import { SUPPORTED_LANGUAGES } from '@/app/constants';

export type TRegisterReqData = {
    login: string,
    password: string
    language: string
}

export type TRegisterResData = {
    message: string
}

export async function POST(req: Request): Promise<TNextRes<TRegisterResData>> {
    try {
        connectDB()
        const data: TRegisterReqData = await req.json()
        const { login, password } = data
        const language = cookies().get("app-language")?.value || SUPPORTED_LANGUAGES[0]
        const existingUser = await User.findOne({ login })
        if (existingUser) {
            return NextResponse.json({
                errorArr: [{ name: "ValidationError", message: `User with login "${login}" already exists` }]
            }, { status: 400 })
        }
        const hashPassword = bcrypt.hashSync(password, 7);
        const user = new User({ login, password: hashPassword, language })
        await user.save()
        return NextResponse.json({ message: "Client was registered successfully" })

    } catch (e) {
        return handleCaughtErrorInApiRoute(e)
    }
}