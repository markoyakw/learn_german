import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/api/_utils/connectDB';
import Word, { TWord } from '@/app/api/_models/Word';
import User from '@/app/api/_models/User';

type TAddWordReqData = TWord
type TAddWordResData = { message: string, newWord?: TWord }

export async function POST(req: Request): Promise<NextResponse<TAddWordResData>> {
    try {
        connectDB()
        const data: TAddWordReqData = await req.json()
        const word = await new Word(data)
        await word.save()
        return NextResponse.json({ message: "New word has been added successfully", newWord: word })
    } catch (e) {
        console.log(e);
        if (e instanceof Error && e.name === "ValidationError") {
            return NextResponse.json({ message: e.message }, { status: 500 });
        }
        return NextResponse.json({ message: "Error occurred" }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        connectDB()
        const searchParams = request.nextUrl.searchParams
        const userId = searchParams.get("userId")
        const targetUser = User.findById(userId)
        if (!targetUser) {
            return NextResponse.json({ message: "User with provided id was not found" })
        }
    }
    catch (e) {

    }
}