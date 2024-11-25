import PageHeaderTitle from '@/app/_components/Header/PageHeaderTitle/PageHeaderTitle'
import MyCard from '@/app/_components/UI/MyCard/MyCard'
import MyContainer from '@/app/_components/UI/MyContainer/MyContainer'
import MyGrid from '@/app/_components/UI/MyGrid/MyGrid'
import MySkeletonLoader from '@/app/_components/UI/MySkeletonLoader/MySkeletonLoader'
import React from 'react'

const MainPageLoading = () => {

    const skeletonInGridCount = 8
    const skeletonsCountArray = Array(skeletonInGridCount).fill(null)

    return (
        <MyContainer>
            <PageHeaderTitle>Pump your skills!</PageHeaderTitle>
            <MyGrid>
                {skeletonsCountArray.fill(null).map((item, id) => (
                    <MyContainer height='300px' key={id}>
                        <MyCard>
                            <MySkeletonLoader />
                        </MyCard>
                    </MyContainer>
                ))}
            </MyGrid>
        </MyContainer >
    )
}

export default MainPageLoading