"use client"

import MyText from '@/app/_components/UI/MyText/MyText'
import { TNextPageWithParams } from '@/app/_types/types'
import Link from 'next/link'
import React from 'react'

const page: TNextPageWithParams = ({ params }) => {


  return (
    <Link href={`/${params.language}/auth/register`}>
      <MyText size='small'> Do not have an account? <strong>Create one</strong></MyText>
    </Link>
  )
}

export default page