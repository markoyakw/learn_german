import React, { FC } from 'react'
import classes from "../header.module.css"

type TPageHeaderTitleProps = {
    children: string
}

const PageHeaderTitle: FC<TPageHeaderTitleProps> = ({ children }) => {
    return (
        <h1 className={classes["header__title"]}>{children}</h1>
    )
}

export default PageHeaderTitle