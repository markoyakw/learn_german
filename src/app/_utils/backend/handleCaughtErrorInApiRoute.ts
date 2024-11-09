import { TErrorResponse, TValidationError } from "@/app/_types/types";
import { NextResponse } from "next/server";

const handleValidationError = (validationError: TValidationError) => {
    const errorsObj = validationError.errors
    const errorArr = Object.keys(errorsObj).map((errorKey) => {
        const error = errorsObj[errorKey]
        return { path: error.path, message: error.message, name: error.name }
    })
    return NextResponse.json(errorArr, { status: 400 });
}

const handleUnknownError = (e: unknown) => {
    console.error("Login error: ", e)
    const response = NextResponse.json({ name: "InternalServerError", message: "Unknown error, try again later or contact app support" }, { status: 500 })
    return response as NextResponse<TErrorResponse>
}

const handleCaughtErrorInApiRoute = (e: unknown): NextResponse<TErrorResponse> => {
    if (e instanceof Error && e.name === "ValidationError") {
        const validationError = e as unknown as TValidationError
        return handleValidationError(validationError)
    }
    return handleUnknownError(e)
}

export default handleCaughtErrorInApiRoute