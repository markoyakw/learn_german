import { TCssSizes } from '@/app/_types/types';
import React, { ReactNode, CSSProperties, FC, HTMLAttributes } from 'react';

type TMarginValue = TCssSizes | "" | null;

type TMargin = TCssSizes | [TMarginValue, TMarginValue] | [TMarginValue, TMarginValue] | [TMarginValue, TMarginValue, TMarginValue, TMarginValue]

type TContainerProps = {
    children: ReactNode;
    style?: CSSProperties;
    maxWidth?: string;
    maxHeight?: string;
    width100?: boolean;
    height100?: boolean;
    margin?: TMargin;
} & HTMLAttributes<HTMLDivElement>;

const MyContainer: FC<TContainerProps> = ({
    children,
    style,
    maxWidth,
    maxHeight,
    width100,
    height100,
    margin,
    ...props
}) => {

    const width100Style = width100 ? { width: "100%" } : {};
    const height100Style = height100 ? { height: "100%" } : {};

    const getMarginStyleValue = (margin: TMarginValue | undefined) => {
        return margin || margin !== "" ? `var(--spacing-${margin})` : "";
    }

    const getMarginStyles = (): CSSProperties | undefined => {
        if (typeof margin === "string") {
            return {
                margin: getMarginStyleValue(margin)
            };
        }

        if (Array.isArray(margin)) {
            const [top, right, bottom, left] = margin;

            if (margin.length === 2) {
                return {
                    marginTop: getMarginStyleValue(top),
                    marginBottom: getMarginStyleValue(top),
                    marginLeft: getMarginStyleValue(right),
                    marginRight: getMarginStyleValue(right)
                };
            }

            if (margin.length === 4) {
                return {
                    marginTop: getMarginStyleValue(top),
                    marginRight: getMarginStyleValue(right),
                    marginBottom: getMarginStyleValue(bottom),
                    marginLeft: getMarginStyleValue(left)
                };
            }
        }
        return undefined;
    };

    return (
        <div
            style={{
                ...style,
                maxWidth,
                maxHeight,
                ...getMarginStyles(),
                ...width100Style,
                ...height100Style
            }}
            {...props}
        >
            {children}
        </div>
    );
};

export default MyContainer;
