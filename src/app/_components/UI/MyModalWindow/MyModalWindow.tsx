import React, { MouseEvent, ReactNode, useCallback, useEffect, useRef } from 'react'
import classes from "./MyModalWindow.module.css"
import MyIconButton from '../MyIconButton/MyIconButton'
import MyCard from '../MyCard/MyCard'

interface IMyModalWindowProps {
    isOpen: boolean,
    children: React.ReactNode,
    toggleWindow: () => void,
    header?: ReactNode
}

const MyModalWindow: React.FC<IMyModalWindowProps> = ({ isOpen, children, toggleWindow, header }) => {

    const areaAroundModalRef = useRef<HTMLDivElement | null>(null)
    const handleEscKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape" && isOpen) {
            toggleWindow()
        }
    }, [isOpen, toggleWindow])

    const handleClickOutsideOfModalWindow = (e: MouseEvent<HTMLElement>) => {
        if (e.target === areaAroundModalRef.current) {
            toggleWindow()
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleEscKeyDown)
        return () => {
            document.removeEventListener("keydown", handleEscKeyDown)
        }
    }, [isOpen, handleEscKeyDown])

    const modalAreaAround = classes["modal__area-around"] + (isOpen ? " " + classes["modal__area-around--visible"] : "")

    return (
        <div className={modalAreaAround} onClick={handleClickOutsideOfModalWindow} ref={areaAroundModalRef}>
            <MyCard backgroundColor='white'>
                <div className={classes["modal__header"]}>
                    <h3>{header}</h3>
                    <MyIconButton iconType='close' onClick={toggleWindow} />
                </div>
                <div className={classes["modal__body"]}>
                    {children}
                </div>
            </MyCard>
        </div>
    )
}

export default MyModalWindow