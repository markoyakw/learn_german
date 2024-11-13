import React, { FC, ReactNode } from 'react'
import classes from "./MyStack.module.css"

type TMyStackProps = {
    children: ReactNode,
    direction?: "row" | "column",
    gapSize?: "small" | "medium" | "large",
    alignVertical?: "center" | "start" | "end",
    alignHorisontal?: "center" | "start" | "end"
}

const MyStack: FC<TMyStackProps> = ({
    children,
    gapSize = "medium",
    direction = "column",
    alignVertical = "start",
    alignHorisontal = "start"
}) => {

    const directionClassname = classes[`stack--direction-${direction}`]
    const gapSizeClassname = classes[`stack--gapsize-${gapSize}`]

    const alignVerticalClassname = direction === "row"
        ? classes[`stack--align-items-${alignVertical}`]
        : classes[`stack--justify-content-${alignVertical}`]
    const alignHorisontalClassname = direction === "row"
        ? classes[`stack--justify-content-${alignHorisontal}`]
        : classes[`stack--align-items-${alignHorisontal}`]

    const myStackClassName = `${classes["stack"]} ${directionClassname} ${gapSizeClassname} ${alignVerticalClassname} ${alignHorisontalClassname}`

    return (
        <div className={myStackClassName}>
            {children}
        </div>
    )
}

export default MyStack