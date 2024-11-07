"use client"
import MyButton from '@/app/_components/UI/MyButton/MyButton'
import MyInput from '@/app/_components/UI/MyInput/MyInput'
import fetchLogin from '@/app/_utils/apiCalls/auth/login'
import { TLoginReqData } from '@/app/api/(routes)/auth/login/route'
import React from 'react'
import { useForm } from 'react-hook-form'

const Login = () => {

    const { register, handleSubmit, watch, control, formState } = useForm<TLoginReqData>()
    const onSubmit = async (loginData: TLoginReqData) => {
        const res = await fetchLogin(loginData)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <MyInput
                {...register("login")}
                id="login-input"
                label="Login"
            />
            <MyInput
                {...register("password")}
                id="password-input"
                label="Password"
            />
            <MyButton type='submit'>Login</MyButton>
        </form>
    )
}

export default Login