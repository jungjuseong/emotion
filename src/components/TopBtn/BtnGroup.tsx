import React from 'react'
import {ToggleBtn,ToggleBtnProps} from '../ToggleBtn/ToggleBtn'

import {css} from '@emotion/react';
import '../../styles/share/button.scss'

export type BtnGroupProps = {
    props: ToggleBtnProps[]
    style?: React.CSSProperties;
}

export const BtnGroup = (props:BtnGroupProps) => {
    const index = Object.keys(props.props)
    return(
        <div className='top' style={props.style}>
            {index.map((index)=>{return<ToggleBtn key={index} {...props.props[Number(index)]} />})}
        </div>
    )  
}

export const TopBtn = (props:ToggleBtnProps[]) => {
    const index = Object.keys(props)
    return(
        <div className='top' css={[style]}>
            {index.map((index)=>{return<ToggleBtn key={index} {...props[Number(index)]} />})}
        </div>
    )  
}


const style = css`
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;            
`