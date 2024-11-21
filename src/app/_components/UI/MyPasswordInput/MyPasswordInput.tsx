import React, { FC, useState } from 'react'
import MyStack from '../MyStack/MyStack'
import MyInput from '../MyInput/MyInput'
import MyIconButton from '../MyIconButton/MyIconButton'

type TMyPasswordInput = React.ComponentProps<typeof MyInput> & {
    showPassword?: boolean
}

const MyPasswordInput: FC<TMyPasswordInput> = ({ label, id, error }) => {

    const [showPassword, setShowPassword] = useState(false)
    const toggleShowPassword = () => setShowPassword(oldState => !oldState)

    const iconType = showPassword
        ? "closedEye"
        : "openEye"

    const inputType = showPassword
        ? "password-visible"
        : "password"

    return (
        <MyStack direction='row' alignItems='center'>
            <MyInput id={id} error={error} label={label} type={inputType} />
            <MyIconButton onClick={toggleShowPassword} iconType={iconType} type='button' />
        </MyStack>
    )
}

export default MyPasswordInput