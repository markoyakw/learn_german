import React, { FC, ReactNode } from 'react'
import classes from "./MyStack.module.css"

type TMyStackProps = {
    children: ReactNode,
    direction?: "row" | "column",
    gapSize?: null | "small" | "medium" | "large",
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
    const gapSizeClassname = gapSize && classes[`stack--gapsize-${gapSize}`]

    const myStackClassName = `${classes["stack"]} ${directionClassname} ${gapSizeClassname}`

    return (
        <div className={myStackClassName} style={{ alignItems, justifyContent }}>
            {children}
        </div>
    )
}

export default MyStack