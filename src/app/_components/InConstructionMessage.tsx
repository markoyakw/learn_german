import React, { FC, ReactNode } from 'react';
import classes from "./InConstructionMessage.module.css"

const InConstructionMessage: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className={classes["construction-message"]}>
            {children}
        </div>
    );
};

export default InConstructionMessage;
