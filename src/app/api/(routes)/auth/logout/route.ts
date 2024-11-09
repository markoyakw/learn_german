import { NextResponse } from 'next/server';
import connectDB from '@/app/api/_utils/connectDB';
import SessionService from '@/app/api/_services/SessionService';
import handleCaughtErrorInApiRoute from '@/app/_utils/backend/handleCaughtErrorInApiRoute';
import { TNextRes } from '@/app/_types/types';

export type TLogoutResData = {
    message: string
}

export async function GET(): Promise<TNextRes<TLogoutResData>> {
    try {
        connectDB()
        const response = NextResponse.json({ message: "User logged out successfully" })
        SessionService.deleteSessionData(response)
        return response
    } catch (e) {
        return handleCaughtErrorInApiRoute(e)
    }
}