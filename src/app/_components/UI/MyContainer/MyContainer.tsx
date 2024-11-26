import { ReactNode, CSSProperties, FC, HTMLAttributes } from 'react';
import getSpacingStyles, { TSpacingProp } from './getMyContainerSpacingStyles';

type TContainerProps = {
    children: ReactNode;
    style?: CSSProperties;
    maxWidth?: string;
    maxHeight?: string;
    width100?: boolean;
    height100?: boolean;
    width?: string;
    height?: string
    margin?: TSpacingProp;
    padding?: TSpacingProp
    addedClassName?: string;
} & HTMLAttributes<HTMLDivElement>;

const MyContainer: FC<TContainerProps> = ({
    children,
    style,
    maxWidth,
    maxHeight,
    width100,
    height100,
    margin,
    padding,
    height,
    width,
    addedClassName,
    ...props
}) => {

    const width100Style = width100 ? { width: "100%" } : {};
    const height100Style = height100 ? { height: "100%" } : {};

    return (
        <div
            style={{
                ...style,
                maxWidth,
                maxHeight,
                width,
                height,
                ...getSpacingStyles("margin", margin),
                ...getSpacingStyles("padding", padding),
                ...width100Style,
                ...height100Style
            }}
            className={`${props.className} ${addedClassName || ""}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default MyContainer;
