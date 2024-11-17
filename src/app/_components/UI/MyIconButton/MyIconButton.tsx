import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import classes from "./MyIconButton.module.css"

type TIconType = "cross" | "repeat" | "next" | string

interface IMyIconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
    iconType: TIconType
}

const iconDictionary: { [key: TIconType]: ReactNode } = {
    repeat: (
        <div className={classes["repeat-icon"]}>
            <div className={classes["repeat-icon--arrow"]}>
            </div>
        </div>
    ),

}

const MyIconButton: React.FC<IMyIconButtonProps> = ({ iconType, ...props }) => {
    return (
        <button className={classes["icon-button"]} {...props}>
            {iconDictionary[iconType]}
        </button>
    )
}

export default MyIconButton