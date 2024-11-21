"use client"
import React, { FC } from 'react'
import classes from "../header.module.css"
import MyIconButton from '../../UI/MyIconButton/MyIconButton'
import MyStack from '../../UI/MyStack/MyStack'
import { useRouter } from 'next/navigation'

type TPageHeaderTitleProps = {
    children: string
}

const PageHeaderTitle: FC<TPageHeaderTitleProps> = ({ children }) => {

    const router = useRouter()

    return (
        <h1 className={classes["header__title"]}>
            <MyStack direction='row' alignItems='center' gapSize="xs">
                <div className={classes["header__back-link"]}>
                    <MyIconButton iconType='backArrow' iconSize="40px" onClick={() => router.back()} />
                </div>
                {children}
            </MyStack>
        </h1>
    )
}

export default PageHeaderTitle