"use client"

import MyContainer from '@/app/_components/UI/MyContainer/MyContainer'
import MyStack from '@/app/_components/UI/MyStack/MyStack'
import React, { ReactElement, ReactNode } from 'react'
import { TNextPageWithParams } from '@/app/_types/types'
import MyCard from '@/app/_components/UI/MyCard/MyCard'
import MyPasswordInput from '@/app/_components/UI/MyPasswordInput/MyPasswordInput'

type AuthPageProps = {
    form: ReactNode,
    header: ReactNode,
    linkToOtherAuthPage: ReactElement,
}

const AuthPage: TNextPageWithParams<AuthPageProps> = ({ header, form, linkToOtherAuthPage }) => {

    return (
        <MyStack alignItems='center' justifyContent='center'>
            <MyContainer maxWidth='380px' maxHeight='570px' height100 width100>
                <MyCard>
                    <MyStack justifyContent='space-between' alignItems='center'>

                        <MyContainer>
                            <MyStack alignItems='center' justifyContent='flex-start' gapSize='s'>
                                {header}
                            </MyStack>
                        </MyContainer>

                        <MyContainer width100>
                            {form}
                        </MyContainer>

                        {linkToOtherAuthPage}
                    </MyStack>
                </MyCard>
            </MyContainer>
        </MyStack>
    )
}

export default AuthPage