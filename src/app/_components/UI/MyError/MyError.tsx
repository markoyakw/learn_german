import React, { forwardRef, ReactNode, RefObject, useRef } from 'react'

export interface IMyError {
    children: string,
    errorFor: RefObject<HTMLInputElement>
}

const MyError = forwardRef<HTMLDivElement, IMyError>(({ children, errorFor }, ref) => {

    return (
        <div data-component-name='my-error' ref={ref}>
            {children}
        </div>
    )
})

export default MyError