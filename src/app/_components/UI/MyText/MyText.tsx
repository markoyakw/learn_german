import React, { FC, HTMLAttributes, ReactNode } from 'react'
import classes from "./MyText.module.css"

type TMyTextProps = {
    children: ReactNode,
    size: "small" | "large" | "medium",
    color?: keyof typeof textColorMap
} & HTMLAttributes<HTMLSpanElement>

const textColorMap = {
    primary: "var(--color-text-primary)",
    secondary: "var(--color-text-secondary)"
} as const

const MyText: FC<TMyTextProps> = ({ children, size, color, ...props }) => {

    const colorStyle = color ? { color: textColorMap[color] } : {}

    return (
        <span className={`${classes["text"]} ${classes["text--" + size]}`} style={colorStyle} {...props}>
            {children}
        </span>
    )
}

export default MyText