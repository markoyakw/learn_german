import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import User from '@/app/api/_models/User';
import connectDB from '@/app/api/_utils/connectDB';
import handleUnknownError from '@/app/_utils/backend/handleUnknownError';
import { TNextRes, TErrorRes } from '@/app/_types/types';

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
        const { login, password, language } = data
        const existingUser = await User.findOne({ login })
        if (existingUser) {
            return NextResponse.json({ name: "ValidationError", message: `User with login ${login} already exists` }, { status: 400 })
        }
        const hashPassword = bcrypt.hashSync(password, 7);
        const user = new User({ login, password: hashPassword, language })
        await user.save()
        return NextResponse.json({ message: "Client was registered successfully" })

    } catch (e) {
        console.log(e);
        if (e instanceof Error && e.name === "ValidationError") {
            // Object.keys(e.errors).map((e) => {
            //     const error = e as unknown as TErrorRes
            //     return { path: error.path, message: error.message, name: error.name }
            // })
            return NextResponse.json(e, { status: 400 });
        }
        return handleUnknownError(e)
    }
}