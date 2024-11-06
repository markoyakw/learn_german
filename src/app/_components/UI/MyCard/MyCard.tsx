import React from 'react'
import classes from "./MyCard.module.css"


interface IMyCardProps {
    children: React.ReactNode;
}

const MyCard: React.FC<IMyCardProps> = ({ children, ...props }) => {

    return (
        <div className={classes["card"]}>
            {children}
        </div>
    )
}

export default MyCard