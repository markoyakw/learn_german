import { CSSProperties } from "react";
import { TCssSize } from "../../../types/cssVariables";

type TSpacingValue = TCssSize | "" | null;
export type TSpacingProp = TCssSize | [TSpacingValue, TSpacingValue] | [TSpacingValue, TSpacingValue] | [TSpacingValue, TSpacingValue, TSpacingValue, TSpacingValue]

const getSpacingStyleValue = (margin: TSpacingValue | undefined) => {
    return margin || margin !== "" ? `var(--spacing-${margin})` : "";
}

const getSpacingStyles = (
    property: "margin" | "padding",
    spacingValue: TSpacingProp | undefined
): CSSProperties | undefined => {
    if (typeof spacingValue === "string") {
        return {
            [property]: getSpacingStyleValue(spacingValue)
        };
    }

    if (Array.isArray(spacingValue)) {
        const [top, right, bottom, left] = spacingValue;

        if (spacingValue.length === 2) {
            return {
                [`${property}Top`]: getSpacingStyleValue(top),
                [`${property}Bottom`]: getSpacingStyleValue(top),
                [`${property}Left`]: getSpacingStyleValue(right),
                [`${property}Right`]: getSpacingStyleValue(right)
            };
        }

        if (spacingValue.length === 4) {
            return {
                [`${property}Top`]: getSpacingStyleValue(top),
                [`${property}Bottom`]: getSpacingStyleValue(right),
                [`${property}Left`]: getSpacingStyleValue(bottom),
                [`${property}Right`]: getSpacingStyleValue(left)
            };
        }
    }
    return undefined;
};

export default getSpacingStyles