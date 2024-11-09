import React, { FC, ReactNode } from 'react'
import classes from "./MyGrid.module.css"

type TMyGridProps = {
    children: ReactNode
}

const MyGrid: FC<TMyGridProps> = ({ children }) => {
    return (
        <div className={classes["grid"]}>
            {children}
        </div>
    )
}

export default MyGrid