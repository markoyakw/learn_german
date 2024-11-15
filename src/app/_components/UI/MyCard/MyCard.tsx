import React, { HTMLAttributes } from 'react'
import classes from "./MyCard.module.css"

interface IMyCardProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    backgroundColor?: string;
}

const MyCard: React.FC<IMyCardProps> = ({ children, backgroundColor, ...props }) => {

    return (
        <div className={classes["card"]} {...props} style={{ "backgroundColor": backgroundColor }}>
            {children}
        </div>
    )
}

export default MyCard