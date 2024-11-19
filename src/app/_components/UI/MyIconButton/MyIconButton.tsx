import React, { ButtonHTMLAttributes } from 'react'
import classes from "./MyIconButton.module.css"
import { FaPlay } from 'react-icons/fa'
import { IoClose, IoPlaySkipForward } from 'react-icons/io5'
import { FaRepeat } from 'react-icons/fa6'

const iconDictionary = {
    repeat: <FaRepeat />,
    play: <FaPlay fontSize="70%" />,
    close: <IoClose />,
    skipForward: <IoPlaySkipForward />
} as const

interface IMyIconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
    iconType: keyof typeof iconDictionary,
    iconSize?: string
}

const MyIconButton: React.FC<IMyIconButtonProps> = ({ iconType, iconSize, ...props }) => {

    const buttonStyle: React.CSSProperties = {
        '--icon-button-size': iconSize,
    } as React.CSSProperties;

    return (
        <div className={classes["icon-button__container"]}>
            <button className={classes["icon-button"]} style={buttonStyle} {...props}>
                {iconDictionary[iconType]}
            </button>
        </div>
    )
}

export default MyIconButton