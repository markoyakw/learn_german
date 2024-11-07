import { NextResponse } from 'next/server';
import connectDB from '@/app/api/_utils/connectDB';
import SessionService from '@/app/api/_services/SessionService';

export type TLogoutResData = {
    message: string
}

export async function GET(): Promise<NextResponse<TLogoutResData>> {
    try {
        connectDB()
        const response = NextResponse.json({ message: "User logged out successfully" })
        SessionService.deleteSessionData(response)
        return response
    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: 'Error occurred' }, { status: 500 });
    }
}