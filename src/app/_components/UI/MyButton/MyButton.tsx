import React, { ButtonHTMLAttributes, FC, ReactNode, useEffect, useRef } from 'react'
import classes from "./MyButton.module.css"

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    loading?: boolean
}

const MyLoadingSpinner: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className={classes["spinner__container"]}>
            <div className={classes["spinner"]}>
                <div className={classes["spinner__center"]}></div>
                <div className={classes["spinner__cover"]}></div>
                <div className={classes["spinner__old-content"]}>
                    {children}
                </div>
            </div>
        </div>
    )
}

const MyButton: React.FC<MyButtonProps> = ({ children, loading, ...props }) => {

    // const [wasSubmitted, setWasSubmitted] = () =>{

    // }

    return (
        <div className={classes["button__container"]}>
            <button {...props} className={`${classes["button"]} ${loading && classes["button--loading"]}`} disabled={props.disabled || loading}>
                {loading
                    ? <MyLoadingSpinner>{children}</MyLoadingSpinner>
                    : <span>{children}</span>
                }
            </button >
        </div>
    )
}

export default MyButton