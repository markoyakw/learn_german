import { TErrorResponse } from "@/app/_types/types"
import { UseFormGetValues, UseFormSetError } from "react-hook-form"

const addErrorsFromResToForm = (errorRes: TErrorResponse, setError: UseFormSetError<any>, getValues: UseFormGetValues<any>) => {
    errorRes.errorArr.forEach(error => {
        const fieldNames = Object.keys(getValues())
        if (error.path && fieldNames.includes(error.path)) {
            const errorFieldName = error.path as `root.${string}`
            setError(errorFieldName, { message: error.message })
        }
    })
}

export default addErrorsFromResToForm