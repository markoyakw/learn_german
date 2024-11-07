import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import User from '@/app/api/_models/User';
import connectDB from '@/app/api/_utils/connectDB';
import JWT, { JwtPayload } from "jsonwebtoken"

export type TJWTPayload = {
    id: string
}

export type TLoginReqData = {
    login: string,
    password: string
}

export type TLoginResData = {
    message: string
}

export async function POST(req: Request): Promise<NextResponse<TLoginResData>> {
    try {
        connectDB()
        const data = await req.json()
        const { login, password } = data
        const user = await User.findOne({ login })

        if (!user) {
            return NextResponse.json({ message: `User with login "${login}" does not exist` }, { status: 400 })
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return NextResponse.json({ message: "Wrong password" }, { status: 400 })
        }

        const JWTSecret = process.env.JWT_SECRET as string
        const JWTPayload: JwtPayload = { id: user._id }
        const token = JWT.sign(JWTPayload, JWTSecret, { expiresIn: '1h' })

        const response = NextResponse.json({ message: "User logged in successfully" })
        response.cookies.set("Authorization", `Bearer ${token}`, {
            httpOnly: true,
        })
        return response

    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: 'Error occurred' }, { status: 500 });
    }
}