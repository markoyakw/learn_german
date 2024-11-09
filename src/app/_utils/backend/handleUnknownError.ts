import { TErrorRes } from "@/app/_types/types";
import { NextResponse } from "next/server";

const handleUnknownError = (e: unknown): NextResponse<TErrorRes> => {
    console.error("Login error: ", e)
    const response = NextResponse.json({ name: "InternalServerError", message: "Unknown error, try again later or contact app support" }, { status: 500 })
    return response as NextResponse<TErrorRes>
}

export default handleUnknownError