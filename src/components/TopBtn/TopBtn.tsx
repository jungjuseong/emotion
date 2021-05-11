import React from 'react'
import {ToggleBtn,ToggleBtnProps} from '../ToggleBtn/ToggleBtn'

export type TopBtnProps = {
    props: ToggleBtnProps[]
    setState: React.Dispatch<React.SetStateAction<string>>
}

export const TopBtn = (props:ToggleBtnProps[]) => {
    const index = Object.keys(props)
    return(
        <div className='top'>
            {index.map((index)=>{return<ToggleBtn key={index} {...props[Number(index)]} />})}
        </div>
    )  
}