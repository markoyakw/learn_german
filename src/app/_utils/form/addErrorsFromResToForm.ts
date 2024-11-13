import { TErrorResponse } from "@/app/_types/types"
import { Dispatch, SetStateAction } from "react"
import { UseFormGetValues, UseFormSetError } from "react-hook-form"

const addErrorsFromResToForm = (
    errorRes: TErrorResponse,
    setError: UseFormSetError<any>,
    getValues: UseFormGetValues<any>,
    setGlobalError: Dispatch<SetStateAction<string>>
) => {
    errorRes.errorArr.forEach(error => {
        const fieldNames = Object.keys(getValues())
        if (error.path && fieldNames.includes(error.path)) {
            const errorFieldName = error.path as `root.${string}`
            setError(errorFieldName, { message: error.message })
        }
        else {
            setGlobalError(error.message)
        }
    })
}

export default addErrorsFromResToForm