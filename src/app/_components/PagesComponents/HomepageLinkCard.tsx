import Link from 'next/link'
import React, { FC, ReactNode } from 'react'
import MyCard from '../UI/MyCard/MyCard'
import classes from "./HomepageLinkCard.module.css"
import MyStack from '../UI/MyStack/MyStack'

type THomePageLinkCardProps = {
    href: string,
    backgroundColor: string,
    icon: string,
    children: ReactNode
}

const HomepageLinkCard: FC<THomePageLinkCardProps> = ({ href, backgroundColor = "white", icon, children }) => {
    return (
        <Link href={href} className={classes["link-card"]}>
            <MyCard backgroundColor={backgroundColor}>
                <MyStack >
                    <div className={classes["link-card__icon"]}>{icon}</div>
                    <h2 className={classes["link-card__label"]}>{children}</h2>
                </MyStack>
            </MyCard>
        </Link>
    )
}

export default HomepageLinkCard