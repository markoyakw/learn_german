import React, { ButtonHTMLAttributes } from 'react'

const iconTypes = {
    cross: "cross"
}

interface IMyIconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
    iconType: keyof typeof iconTypes
}

const MyIconButton: React.FC<IMyIconButtonProps> = ({ iconType, ...props }) => {
    return (
        <button {...props}>X</button>
    )
}

export default MyIconButton