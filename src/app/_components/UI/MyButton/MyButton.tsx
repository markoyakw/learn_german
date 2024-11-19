import React, { ButtonHTMLAttributes, FC, forwardRef, MouseEvent, ReactNode, useEffect, useRef, useState } from 'react'
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

const MyButton = forwardRef<HTMLButtonElement, MyButtonProps>(({ children, loading, onClick, ...props }, ref) => {

    const [wasClicked, setWasClicked] = useState(false)
    const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(e)
        }
        setWasClicked(true)
    }
    const buttonClasses = `${classes["button"]} ${loading && classes["button--loading"]} ${(wasClicked && props.type === "submit") && classes["button--was-clicked"]}`

    return (
        <div className={classes["button__container"]}>
            <button {...props} onClick={handleButtonClick} className={buttonClasses} disabled={props.disabled || loading} ref={ref}>
                {loading
                    ? <MyLoadingSpinner>{children}</MyLoadingSpinner>
                    : <span>{children}</span>
                }
            </button >
        </div>
    )
})

export default MyButton