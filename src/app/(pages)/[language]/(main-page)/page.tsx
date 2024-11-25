import MyGrid from '@/app/_components/UI/MyGrid/MyGrid'
import { TNextPageWithParams } from '@/app/_types/types'
import isSupportedLanguage from '@/app/_utils/language/isSupportedLanguage'
import { notFound } from 'next/navigation'
import React from 'react'
import HomepageLinkCard from '@/app/_components/PagesComponents/HomepageLinkCard'
import PageHeaderTitle from '@/app/_components/Header/PageHeaderTitle/PageHeaderTitle'
import MyContainer from '@/app/_components/UI/MyContainer/MyContainer'

const page: TNextPageWithParams = ({ params, searchParams }) => {

    const appLanguage = params.language
    if (!isSupportedLanguage(appLanguage)) {
        notFound()
    }

    return (
        <MyContainer>
            <PageHeaderTitle>Pump your skills!</PageHeaderTitle>
            <MyGrid>
                <HomepageLinkCard href={`/${appLanguage}/numbers`} backgroundColor='#5D61C0' icon='🔢'>
                    Learn numbers
                </HomepageLinkCard>
                <HomepageLinkCard href={`/${appLanguage}/my-vocabulary`} backgroundColor='#A84D7A' icon='🚧'>
                    My vocabulary <br /> (In progress...)
                </HomepageLinkCard>
                <HomepageLinkCard href={`/${appLanguage}/learn-words`} backgroundColor='#FB410E' icon='🚧'>
                    Learn words <br /> (In progress...)
                </HomepageLinkCard>
                <HomepageLinkCard href={`/${appLanguage}/earn-by-listening`} backgroundColor='#429E73' icon='🚧'>
                    Learn by listening <br /> (In progress...)
                </HomepageLinkCard>
                <HomepageLinkCard href={`/${appLanguage}/exercises`} backgroundColor='#004E64' icon='🚧'>
                    Excersizes <br /> (In progress...)
                </HomepageLinkCard>
            </MyGrid>
        </MyContainer>
    )
}

export default page