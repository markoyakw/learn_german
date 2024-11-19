import React, { FC, ReactNode } from 'react';
import classes from "./MySlider.module.css"
import MyText from '../MyText/MyText';

type TMySliderProps = {
    value: number;
    label: ReactNode
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

const MySlider: FC<TMySliderProps> = ({ label, ...props }) => {

    const mySliderId = `my-slider-${Date.now()}`
    return (
        <div className={classes["slider--container"]} id={mySliderId}>
            <label htmlFor={mySliderId} className={classes["slider--label"]}>
                <MyText size='small'>
                    {label}
                </MyText>
            </label>
            <input className={classes["slider"]} type="range" {...props} />
        </div>
    )
};

export default MySlider;
