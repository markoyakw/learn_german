import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import User from '@/app/api/_models/User';
import connectDB from '@/app/api/_utils/connectDB';

export async function POST(
    req: Request
) {
    try {
        connectDB()
        const data = await req.json()
        const { login, password } = data
        const existingUser = await User.findOne({ login })
        if (!login || !password) {
            return NextResponse.json({ message: "Login and password fields were not provided" }, { status: 400 })
        }
        if (existingUser) {
            return NextResponse.json({ message: `User with login ${login} already exists` }, { status: 400 })
        }

        const hashPassword = bcrypt.hashSync(password, 7);
        const user = new User({ login, password: hashPassword })
        await user.save()
        return NextResponse.json({ message: "Client was registered successfully" })

    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: 'Error occurred' }, { status: 500 });
    }
}