"use client"
import MyButton from '@/app/_components/UI/MyButton/MyButton'
import MyError from '@/app/_components/UI/MyError/MyError'
import MyInput from '@/app/_components/UI/MyInput/MyInput'
import MyPasswordInput from '@/app/_components/UI/MyPasswordInput/MyPasswordInput'
import MyStack from '@/app/_components/UI/MyStack/MyStack'
import { TNextPageWithParams } from '@/app/_types/types'
import fetchRegister from '@/app/_utils/apiCalls/auth/register'
import isErrorResponse from '@/app/_utils/apiCalls/isErrorResponse'
import addErrorsFromResToForm from '@/app/_utils/form/addErrorsFromResToForm'
import { TRegisterReqData } from '@/app/api/(routes)/auth/register/route'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const RegisterPageForm: TNextPageWithParams = ({ searchParams }) => {

    const requiredFieldMessage = "This field is required"
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [globalLoginEror, setGlobalLoginError] = useState("")

    const { register, handleSubmit, formState: { isValid, isSubmitted, errors }, setError, getValues } = useForm<TRegisterReqData & { repeatPassword: string }>({
        mode: "onSubmit",
        reValidateMode: "onChange",
        disabled: isLoading,
        defaultValues: {
            login: "",
            password: ""
        }
    })

    const onSubmit = async (registerData: TRegisterReqData) => {
        setIsLoading(true)
        const res = await fetchRegister(registerData)
        if (isErrorResponse(res)) {
            addErrorsFromResToForm(res, setError, getValues, setGlobalLoginError)
            setIsLoading(false)
            return
        }
        const redirectAfterRegister = searchParams.redirect?.toString() || "/"
        router.replace(redirectAfterRegister)
        setIsLoading(false)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <MyStack gapSize='s'>
                <MyInput
                    {...register("login", {
                        required: requiredFieldMessage,
                        minLength: {
                            value: 3,
                            message: "Minimal length is 3 characters"
                        }
                    })}
                    id="login-input"
                    label="Login"
                    error={errors.login?.message}
                />
                <MyPasswordInput
                    {...register("password", {
                        required: requiredFieldMessage,
                        minLength: {
                            value: 4,
                            message: "Minimal length is 4 characters"
                        },
                        validate: (value) => {
                            if (value !== getValues("repeatPassword")) {
                                return "Passwords don't match"
                            }
                        }
                    })}
                    id="password-input"
                    label="Password"
                    error={errors.password?.message}
                />
                <MyPasswordInput
                    {...register("repeatPassword", {
                        required: requiredFieldMessage,
                        validate: (value) => {
                            if (value !== getValues("password")) {
                                return "Passwords don't match"
                            }
                        }
                    })}
                    id="repeat-password-input"
                    label="Repeat password"
                    error={errors.repeatPassword?.message}
                />
                <MyButton type='submit' loading={isLoading} disabled={isSubmitted && !isValid}>
                    Create account
                </MyButton>

                <MyError>{globalLoginEror}</MyError>
            </MyStack>
        </form>
    )
}

export default RegisterPageForm