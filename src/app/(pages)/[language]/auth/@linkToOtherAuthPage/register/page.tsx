"use client"

import MyText from '@/app/_components/UI/MyText/MyText'
import { TNextPageWithParams } from '@/app/_types/types'
import Link from 'next/link'
import React from 'react'

const RegisterPageLinkToOtherAuthPage: TNextPageWithParams = ({ params }) => {

  return (
    <Link href={`/${params.language}/auth/log-in`}>
      <MyText size='small'> Already have an account? <strong>Sign in</strong></MyText>
    </Link>
  )
}

export default RegisterPageLinkToOtherAuthPage