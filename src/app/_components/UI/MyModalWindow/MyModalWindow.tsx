import React, { MouseEvent, useEffect, useRef } from 'react'
import classes from "./MyModalWindow.module.css"
import MyIconButton from '../MyIconButton'

interface IMyModalWindowProps {
    isOpen: boolean,
    children: React.ReactNode,
    toggleWindow: () => void,
    title?: string
}

const MyModalWindow: React.FC<IMyModalWindowProps> = ({ isOpen, children, toggleWindow, title }) => {

    const areaAroundModalRef = useRef<HTMLDivElement | null>(null)
    const handleEscKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isOpen) {
            toggleWindow()
        }
    }

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
    }, [isOpen])

    const modalAreaAround = classes["modal__area-around"] + (isOpen ? " " + classes["modal__area-around--visible"] : "")

    return (
        <div className={modalAreaAround} onClick={handleClickOutsideOfModalWindow} ref={areaAroundModalRef}>
            <div className={classes["modal__window"]}>
                <div className={classes["modal__header"]}>
                    <h2>{title}</h2>
                    <MyIconButton iconType='cross' onClick={toggleWindow} />
                </div>
                <div className={classes["modal__body"]}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default MyModalWindow