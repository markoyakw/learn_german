import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import classes from "./MyIconButton.module.css"

type TIconType = "cross" | "repeat" | "next" | "play" | string

interface IMyIconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
    iconType: TIconType
}

const iconDictionary: { [key: TIconType]: ReactNode } = {
    repeat: (
        <div className={classes["repeat-icon"]}>
            <div className={classes["repeat-icon--arrow"]}></div>
        </div>
    ),
    play: (
        <div className={classes["play-icon"]}></div>
    ),
    cross: (
        <div className={classes["cross-icon"]}>
            <div className={classes["cross-line"]}></div>
            <div className={classes["cross-line"]}></div>
        </div>
    ),
}

const MyIconButton: React.FC<IMyIconButtonProps> = ({ iconType, ...props }) => {
    return (
        <button className={classes["icon"]} {...props}>
            {iconDictionary[iconType]}
        </button>
    )
}

export default MyIconButton