import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/api/_utils/connectDB';
import Word, { TWord } from '@/app/api/_models/Word';
import User from '@/app/api/_models/User';
import SessionService from '@/app/api/_services/SessionService';
import handleUnknownError from '@/app/_utils/backend/handleUnknownError';
import { TNextRes } from '@/app/_types/types';

export type TAddWordReqData = {
    newWord: TWord,
    collectionName: string
}
export type TAddWordResData = { message: string, newWord?: TWord }

export async function POST(req: Request): Promise<TNextRes<TAddWordResData>> {
    try {
        connectDB()
        const { newWord, collectionName }: TAddWordReqData = await req.json()
        if (!collectionName) {
            return NextResponse.json({ message: "No word collection name was provided" }, { status: 400 })
        }
        if (!newWord) {
            return NextResponse.json({ message: "New word was not provided" }, { status: 400 })
        }
        const newWordMongooseObj = await new Word(newWord)
        await newWordMongooseObj.save()
        const session = await SessionService.getSessionData()
        const newWordUser = await User.findById(session?.id)
        await newWordUser.myVocabularyCollections.set(collectionName, newWordMongooseObj)
        await newWordMongooseObj.save()
        return NextResponse.json({ message: "New word has been added successfully", newWord: newWordMongooseObj })

    } catch (e) {
        console.log(e);
        if (e instanceof Error && e.name === "ValidationError") {
            return NextResponse.json({ message: e.message, name: e.name }, { status: 400 });
        }
        return handleUnknownError(e)
    }
}

// export async function GET(request: NextRequest) {
//     try {
//         connectDB()
//         const searchParams = request.nextUrl.searchParams
//         const userId = searchParams.get("userId")
//         const targetUser = User.findById(userId)
//         if (!targetUser) {
//             return NextResponse.json({ message: "User with provided id was not found" })
//         }
//     }
//     catch (e) {
//         console.log(e)
//         return NextResponse.json({ message: `Language cookie setting error: ${e}` }, { status: 500 })
//     }
// }