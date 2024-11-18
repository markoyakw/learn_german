import React, { FC, ReactNode } from 'react'
import classes from "./MyStack.module.css"
import { TCssSizes } from '@/app/_types/types'

type TMyStackProps = {
    children: ReactNode,
    direction?: "row" | "column",
    gapSize?: null | TCssSizes,
    alignItems?: "center" | "flex-start" | "flex-end",
    justifyContent?: "center" | "flex-start" | "flex-end" | "space-around" | "space-between"
}

const MyStack: FC<TMyStackProps> = ({
    children,
    gapSize,
    direction = "column",
    alignItems = "flex-start",
    justifyContent = "flex-start"
}) => {

    const directionClassname = classes[`stack--direction-${direction}`]
    const myStackClassName = `${classes["stack"]} ${directionClassname}`

    const gapSizeStyle = gapSize && { gap: `var(--spacing-${gapSize})` }

    return (
        <div className={myStackClassName} style={{ alignItems, justifyContent, ...gapSizeStyle }}>
            {children}
        </div>
    )
}

export default MyStack