import { NextResponse } from 'next/server';
import connectDB from '@/app/api/_utils/connectDB';
import Word from '@/app/api/_models/Word';

export interface IDeleteWordReqBody {
    wordToDeleteId: string
}

export async function POST(
    req: Request
) {
    try {
        connectDB()
        const { wordToDeleteId }: IDeleteWordReqBody = await req.json()
        await Word.findByIdAndDelete(wordToDeleteId)
        return NextResponse.json({ message: "Word has been deleted successfully" })
    } catch (e) {
        console.log(e);
        if (e instanceof Error && e.name === "ValidationError") {
            return NextResponse.json({ message: e.message }, { status: 500 });
        }
        return NextResponse.json({ message: "Error occurred" }, { status: 500 });
    }
}