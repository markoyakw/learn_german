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
import MyText from '@/app/_components/UI/MyText/MyText'
import MyStack from '@/app/_components/UI/MyStack/MyStack'
import Link from 'next/link'

const Login: TNextPageWithParams<{}, { redirect: string }> = ({ params, searchParams }) => {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [logInButtonText, setLogInButtonText] = useState("Log in")
    const [globalLoginEror, setGlobalLoginError] = useState("")

    const { register, handleSubmit, formState: { isDirty, isValid, isSubmitted, errors }, setError, getValues } = useForm<TLoginReqData>({
        mode: "onSubmit",
        reValidateMode: "onChange",
        disabled: isLoading,
        defaultValues: {
            login: "",
            password: ""
        }
    })

    const changeButtonTextTimer = useRef<NodeJS.Timeout | null>(null)

    const onSubmit = async (loginData: TLoginReqData) => {
        setIsLoading(true)
        const res = await fetchLogin(loginData)
        if (isErrorResponse(res)) {
            addErrorsFromResToForm(res, setError, getValues, setGlobalLoginError)
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

    console.log(params.language)

    return (
        <div className={classes["login-form__container"]}>
            <form onSubmit={handleSubmit(onSubmit)} className={classes["login-form"]}>
                <MyCard backgroundColor='var(--color-surface)'>
                    <MyStack gapSize='large' direction='column' alignHorisontal='center'>
                        <MyStack alignHorisontal='center' gapSize='small'>
                            <h1>
                                Welcome back :)
                            </h1>
                            <MyText size='small'>
                                Please enter your details:
                            </MyText>
                        </MyStack>

                        <MyStack gapSize='small'>
                            <MyInput
                                {...register("login", {
                                    required: "Login is required",
                                    minLength: {
                                        value: 3,
                                        message: "Minimal length is 3 characters"
                                    }
                                })}
                                id="login-input"
                                label="Login"
                                error={errors.login?.message}
                            />
                            <MyInput
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 4,
                                        message: "Minimal length is 4 characters"
                                    }
                                })}
                                id="password-input"
                                label="Password"
                                error={errors.password?.message}
                            />
                            <MyButton type='submit' loading={isLoading} disabled={isSubmitted && !isValid}>
                                {logInButtonText}
                            </MyButton>

                            <div>{globalLoginEror}</div>
                        </MyStack>

                        <Link href={`/${params.language}/auth/register`}>
                            <MyText size='small'> Do not have an account? <strong>Sign in</strong></MyText>
                        </Link>
                    </MyStack>
                </MyCard>
            </form>
        </div>
    )
}

export default Login