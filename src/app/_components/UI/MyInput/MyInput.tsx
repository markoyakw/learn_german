import React, { ChangeEvent, forwardRef, ReactNode, useState } from 'react'
import classes from "./MyInput.module.css"
import MyError from '../MyError/MyError'

interface MyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: ReactNode,
    id: string,
    error?: string
}

const MyInput = forwardRef<HTMLInputElement, MyInputProps>(({ id, label, onChange, autoComplete = "off", error, ...props }, ref) => {

    const [inputValue, setInputValue] = useState<string>("")

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        if (onChange) {
            onChange(e)
        }
    }

    return (
        <div className={classes["input__container"]}>
            <input
                ref={ref}
                onChange={handleInputChange}
                value={inputValue}
                className={classes["input"]}
                {...props}
                id={id}
                autoComplete={autoComplete}
                placeholder=""
            />
            <label htmlFor={id} className={classes["input__label"]}>
                {label}
            </label>
            {error && <div className={classes["input__error"]}>
                <MyError>{error}</MyError>
            </div>}
        </div>
    )
})

export default MyInput