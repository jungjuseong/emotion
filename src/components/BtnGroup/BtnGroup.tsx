import React from 'react'
import {ToggleBtn,ToggleBtnProps} from '../ToggleBtn/ToggleBtn'
import {css} from '@emotion/react'

import '../../styles/share/button.scss'

export type BtnGroupProps = {
    /**생성할 버튼 배열 */
    btnProps: ToggleBtnProps[]
    /**버튼 그룹 스타일 */
    style?: any;
}

export const BtnGroup = (props:BtnGroupProps) => {
    const index = Object.keys(props.btnProps)
    return(
        <div className='top' css={[props.style]}>
            {index.map((index)=>{return<ToggleBtn key={index} {...props.btnProps[Number(index)]} />})}
        </div>
    )  
}