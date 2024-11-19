import React, { FC, ReactNode } from 'react';
import classes from "./MySlider.module.css"
import MyText from '../MyText/MyText';

type TMySliderProps = {
    value: number
    label: ReactNode
    id: string
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

const MySlider: FC<TMySliderProps> = ({ label, id, ...props }) => {

    return (
        <div className={classes["slider--container"]} id={id}>
            <label htmlFor={id} className={classes["slider--label"]}>
                <MyText size='small'>
                    {label}
                </MyText>
            </label>
            <input className={classes["slider"]} type="range" {...props} />
        </div>
    )
};

export default MySlider;
