import Link from 'next/link'
import React, { FC } from 'react'
import MyCard from '../UI/MyCard/MyCard'
import classes from "./HomepageLinkCard.module.css"

type THomePageLinkCardProps = {
    href: string,
    backgroundColor: string,
    icon: string,
    children: string
}

const HomepageLinkCard: FC<THomePageLinkCardProps> = ({ href, backgroundColor = "white", icon, children }) => {
    return (
        <Link href={href}>
            <MyCard backgroundColor={backgroundColor}>
                <div className={classes["link-card__icon"]}>{icon}</div>
                <h2 className={classes["link-card__label"]}>{children}</h2>
            </MyCard>
        </Link>
    )
}

export default HomepageLinkCard