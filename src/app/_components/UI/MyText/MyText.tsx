import React, { FC, ReactNode } from 'react'
import classes from "./MyText.module.css"

type TMyTextProps = {
    children: ReactNode,
    size: "small" | "large" | "medium"
}

const MyText: FC<TMyTextProps> = ({ children, size }) => {

    return (
        <span className={`${classes["text"]} ${classes["text--" + size]}`}>
            {children}
        </span>
    )
}

export default MyText