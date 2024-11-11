import React, { ChangeEvent, forwardRef, ReactNode, useState } from 'react'
import classes from "./MyInput.module.css"

interface MyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: ReactNode,
    id: string,
}

const MyInput = forwardRef<HTMLInputElement, MyInputProps>(({ id, label, onChange, autoComplete = "off", ...props }, ref) => {

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
            />
            <label htmlFor={id} className={classes["label"]}>
                {label}
            </label>
        </div>
    )
})

export default MyInput