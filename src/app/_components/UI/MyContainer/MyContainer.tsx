import React, { ReactNode, CSSProperties, FC } from 'react';

interface ContainerProps {
    children: ReactNode;
    style?: CSSProperties;
    maxWidth?: string;
    maxHeight?: string;
    width100?: boolean;
    height100?: boolean
}

const MyContainer: FC<ContainerProps> = ({
    children,
    style,
    maxWidth = '1200px',
    maxHeight,
    width100,
    height100
}) => {

    const width100Style = width100 && { width: "100%" }
    const height100Style = height100 && { height: "100%" }

    return (
        <div style={{ ...style, maxWidth, maxHeight, ...width100Style, ...height100Style }}>
            {children}
        </div >
    );
};

export default MyContainer;