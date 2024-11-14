"use client"

import MyCard from '@/app/_components/UI/MyCard/MyCard'
import MyContainer from '@/app/_components/UI/MyContainer/MyContainer'
import MyStack from '@/app/_components/UI/MyStack/MyStack'
import React, { FC, ReactNode } from 'react'

type AuthPageProps = {
    form: ReactNode,
    header: ReactNode,
    linkToOtherAuthPage: ReactNode,
}

const AuthPage: FC<AuthPageProps> = ({ header, form, linkToOtherAuthPage }) => {

    return (
        <MyStack alignItems='center' justifyContent='center'>
            <MyContainer maxWidth='380px' maxHeight='550px' height100 width100>
                <MyCard>
                    <MyStack justifyContent='space-between' alignItems='center'>

                        <MyContainer>
                            <MyStack alignItems='center' justifyContent='flex-start' gapSize='small'>
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