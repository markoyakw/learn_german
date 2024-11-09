import { TErrorResponse } from "@/app/_types/types"

const isErrorResponse = (res: any): res is TErrorResponse => {
    return res && "errorArr" in res
}

export default isErrorResponse