import React from 'react'
import classes from "../header.module.css"
import Link from 'next/link'

const UserAvatar = () => {
    return (
        <Link href={"/account"} className={classes["header__user-avatar"]}>
            🧟‍♂️
        </Link>
    )
}

export default UserAvatar