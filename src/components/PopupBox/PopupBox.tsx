import React from 'react'
import {ToggleBtn,ToggleBtnProps} from '../ToggleBtn/ToggleBtn'

export const PopupBox = (props:ToggleBtnProps[]) => {
    const index = Object.keys(props)
    return(
        <div className='popup_box'>
            {index.map((index)=>{return<ToggleBtn key={index} {...props[Number(index)]}/>})}
        </div>
    )
}