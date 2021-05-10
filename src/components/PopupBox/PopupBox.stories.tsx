import React from 'react'
import {PopupBox} from './PopupBox'

export default {
    title: 'components/PopupBox',
    component: PopupBox
}

export const reading = () => {
    const PopupProps = [
        {class_name:"btn_strategy"},
        {class_name:"btn_book"}
      ]

    return(
        <div className={"t_compre"}>
        <PopupBox {...PopupProps} />
        </div>
    )
}