"use client"
import MyButton from '@/app/_components/UI/MyButton/MyButton'
import MyCard from '@/app/_components/UI/MyCard/MyCard'
import MyInput from '@/app/_components/UI/MyInput/MyInput'
import fetchLogin from '@/app/_utils/apiCalls/auth/login'
import { TLoginReqData } from '@/app/api/(routes)/auth/login/route'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import classes from "./loginPage.module.css"
import { useRouter } from 'next/navigation'
import { TNextPageWithParams } from '@/app/_types/types'
import isErrorResponse from '@/app/_utils/apiCalls/isErrorResponse'
import addErrorsFromResToForm from '@/app/_utils/form/addErrorsFromResToForm'

const Login: TNextPageWithParams<{}, { redirect: string }> = ({ params, searchParams }) => {

    const { register, handleSubmit, watch, control, formState, setError, getValues } = useForm<TLoginReqData>()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [logInButtonText, setLogInButtonText] = useState("Log in")

    const changeButtonTextTimer = useRef<NodeJS.Timeout | null>(null)

    const onSubmit = async (loginData: TLoginReqData) => {
        setIsLoading(true)
        const res = await fetchLogin(loginData)
        if (isErrorResponse(res)) {
            addErrorsFromResToForm(res, setError, getValues)
            setIsLoading(false)

            setLogInButtonText("Try again")
            changeButtonTextTimer.current = setTimeout(() => {
                setLogInButtonText("Log in")
            }, 3000);
            return
        }
        const redirectAfterLogin = searchParams.redirect || "/"
        router.replace(redirectAfterLogin)
        setLogInButtonText("Successfully logged in ✅")
        setIsLoading(false)
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
                    <>{formState.errors.login?.message}</>
                    <MyInput
                        {...register("password")}
                        id="password-input"
                        label="Password"
                    />
                    <>{formState.errors.password?.message}</>
                    <MyButton type='submit' loading={isLoading}>
                        {logInButtonText}
                    </MyButton>
                </MyCard>
            </form>
        </div>
    )
}

export default Login