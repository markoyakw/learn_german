import PageHeaderTitle from '@/app/_components/Header/PageHeaderTitle/PageHeaderTitle'
import MyCard from '@/app/_components/UI/MyCard/MyCard'
import MyContainer from '@/app/_components/UI/MyContainer/MyContainer'
import MySkeletonLoader from '@/app/_components/UI/MySkeletonLoader/MySkeletonLoader'
import MyStack from '@/app/_components/UI/MyStack/MyStack'
import React from 'react'

const NumbersPageLoading = () => {

    return (
        <MyContainer>
            <PageHeaderTitle>Learn numbers:</PageHeaderTitle>
            <MyStack alignItems='center'>
                <MyContainer height='400px' width="700px">
                    <MyCard>
                        <MySkeletonLoader />
                    </MyCard>
                </MyContainer>
            </MyStack>
        </MyContainer >
    )
}

export default NumbersPageLoading