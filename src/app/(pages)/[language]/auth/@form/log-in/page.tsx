"use client"
import MyButton from '@/app/_components/UI/MyButton/MyButton'
import MyError from '@/app/_components/UI/MyError/MyError'
import MyInput from '@/app/_components/UI/MyInput/MyInput'
import MyStack from '@/app/_components/UI/MyStack/MyStack'
import { TNextPageWithParams } from '@/app/_types/types'
import fetchLogIn from '@/app/_utils/apiCalls/auth/logIn'
import isErrorResponse from '@/app/_utils/apiCalls/isErrorResponse'
import addErrorsFromResToForm from '@/app/_utils/form/addErrorsFromResToForm'
import { TLoginReqData } from '@/app/api/(routes)/auth/login/route'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const page: TNextPageWithParams = ({ searchParams }) => {

  const requiredFieldMessage = "This field is required"
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [globalLoginEror, setGlobalLoginError] = useState("")

  const { register, handleSubmit, formState: { isValid, isSubmitted, errors }, setError, getValues } = useForm<TLoginReqData>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    disabled: isLoading,
    defaultValues: {
      login: "",
      password: ""
    }
  })

  const onSubmit = async (loginData: TLoginReqData) => {
    setIsLoading(true)
    const res = await fetchLogIn(loginData)
    if (isErrorResponse(res)) {
      addErrorsFromResToForm(res, setError, getValues, setGlobalLoginError)
      setIsLoading(false)
      return
    }
    const redirectAfterLogIn = searchParams.redirect?.toString() || "/"
    router.replace(redirectAfterLogIn)
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MyStack gapSize='small'>
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
        <MyInput
          {...register("password", {
            required: requiredFieldMessage,
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
          Log in
        </MyButton>

        <MyError>{globalLoginEror}</MyError>
      </MyStack>
    </form>
  )
}

export default page