import React from 'react'
import {ToggleBtnProps,ToggleBtn} from '../ToggleBtn/ToggleBtn'

export const BottomBox = (props:ToggleBtnProps[]) => {
    const index = Object.keys(props)
    return(
        <div className="bottom_box">
            {index.map((index)=>{return<ToggleBtn key={index} {...props[Number(index)]}/>})}
        </div>
    )
}