import MyGrid from '@/app/_components/UI/MyGrid/MyGrid'
import { TNextPageWithParams } from '@/app/_types/types'
import isSupportedLanguage from '@/app/_utils/language/isSupportedLanguage'
import { notFound } from 'next/navigation'
import React from 'react'
import classes from "./Homepage.module.css"
import HomepageLinkCard from '@/app/_components/PagesComponents/HomepageLinkCard'
import PageHeaderTitle from '@/app/_components/Header/PageHeaderTitle/PageHeaderTitle'

const page: TNextPageWithParams = ({ params, searchParams }) => {

    const appLanguage = params.language
    if (!isSupportedLanguage(appLanguage)) {
        notFound()
    }

    return (
        <div className={classes["home-page__container"]}>
            <PageHeaderTitle>Pump your skills!</PageHeaderTitle>
            <MyGrid>
                <HomepageLinkCard href={`/${appLanguage}/numbers`} backgroundColor='#5D61C0' icon='🔢'>
                    Learn numbers
                </HomepageLinkCard>
                <HomepageLinkCard href={`/${appLanguage}/learn-words`} backgroundColor='#FB410E' icon='🔢'>
                    Learn words
                </HomepageLinkCard>
                <HomepageLinkCard href={`/${appLanguage}/my-vocabulary`} backgroundColor='#A84D7A' icon='🔢'>
                    My vocabulary
                </HomepageLinkCard>
                <HomepageLinkCard href={`/${appLanguage}/earn-by-listening`} backgroundColor='#429E73' icon='🔢'>
                    Learn by listening
                </HomepageLinkCard>
                <HomepageLinkCard href={`/${appLanguage}/exercises`} backgroundColor='#004E64' icon='🔢'>
                    Excersizes
                </HomepageLinkCard>
            </MyGrid>
        </div>
    )
}

export default page