import React, { FC, HTMLAttributes, ReactNode } from 'react'
import classes from "./MyText.module.css"

type TMyTextProps = {
    children: ReactNode,
    size: "small" | "large" | "medium"
} & HTMLAttributes<HTMLSpanElement>

const MyText: FC<TMyTextProps> = ({ children, size, ...props }) => {

    return (
        <span className={`${classes["text"]} ${classes["text--" + size]}`} {...props}>
            {children}
        </span>
    )
}

export default MyText