import React, { ButtonHTMLAttributes } from 'react'
import classes from "./MyButton.module.css"

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    color?: "primary" | "secondary" | "accent"
}

const MyButton: React.FC<MyButtonProps> = ({ children, color = "secondary", ...props }) => {
    return (
        <button {...props} className={classes["button"]}>
            {children}
        </button>
    )
}

export default MyButton