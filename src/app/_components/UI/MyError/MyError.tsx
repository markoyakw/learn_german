import React, { FC } from 'react'
import classes from "./MyError.module.css"

export type TMyErrorProps = {
    children: string,
}

const MyError: FC<TMyErrorProps> = ({ children }) => {

    return (
        <div className={classes["error"]}>
            {children && <>⚠ {children}</>}
        </div>
    )
}

export default MyError