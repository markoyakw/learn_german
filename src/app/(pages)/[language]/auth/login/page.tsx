"use client"
import MyButton from '@/app/_components/UI/MyButton/MyButton'
import MyCard from '@/app/_components/UI/MyCard/MyCard'
import MyInput from '@/app/_components/UI/MyInput/MyInput'
import fetchLogin from '@/app/_utils/apiCalls/auth/login'
import { TLoginReqData } from '@/app/api/(routes)/auth/login/route'
import React from 'react'
import { useForm } from 'react-hook-form'
import classes from "./loginPage.module.css"
import { useRouter } from 'next/navigation'
import { TNextPageWithParams } from '@/app/_types/types'

const Login: TNextPageWithParams<{}, { redirect: string }> = ({ params, searchParams }) => {

    const { register, handleSubmit, watch, control, formState } = useForm<TLoginReqData>()
    const router = useRouter()
    const onSubmit = async (loginData: TLoginReqData) => {
        const res = await fetchLogin(loginData)
        const redirectAfterLogin = searchParams.redirect
        if (redirectAfterLogin) {
            router.replace(redirectAfterLogin)
        }
    }

    return (
        <div className={classes["login-form__container"]}>
            <form onSubmit={handleSubmit(onSubmit)} className={classes["login-form"]}>
                <MyCard backgroundColor='var(--color-primary)'>
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
                </MyCard>
            </form>
        </div>
    )
}

export default Login