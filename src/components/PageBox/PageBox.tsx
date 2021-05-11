import React from 'react'
import {NItem,NItemProps} from '../NItem/NItem'

export const PageBox = (props:NItemProps[]) =>{
    const index = Object.keys(props)
    return(
    <div className="btn_page_box">
        {index.map((index)=>{return<NItem key={index} {...props[Number(index)]}/>})}
    </div>
    )
}