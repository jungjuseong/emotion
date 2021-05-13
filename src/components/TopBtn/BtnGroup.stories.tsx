import React from 'react'
import {TopBtn,BtnGroup,BtnGroupProps} from './BtnGroup'

import {ToggleBtnProps} from '../ToggleBtn/ToggleBtn'
import { Story } from '@storybook/react';
import {css} from '@emotion/react';

import {top} from '../../resorce/index'

export default {
    title: 'components/BtnGroup',
    component: BtnGroup
}

const Template: Story<BtnGroupProps> = (args) =>
    <BtnGroup {...args} />

export const TopButton = Template.bind({});

TopButton.args={
    props:[{
    src:top.passage_default,
    srcOn:top.passage_on,
    width:top.width,height:top.height,
},{
    src:top.comprehension_default,
    srcOn:top.comprehension_on,
    width:top.width,height:top.height,
}],
    style:{
        position: 'absolute',
        top: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1,  
        backgroundColor:'#5a6ea8',
    }
}

export const reading = () => {
    const [title,setTitle] = React.useState('Passage');
    const _onClick1=()=>{setTitle('Passage');}
    const _onClick2=()=>{setTitle('Compreshension');}
    const TopProps = [
        {
            src:top.passage_default,
            srcOn:top.passage_on,
            width:top.width,height:top.height,
            on:title==='Passage',
            onClick:_onClick1
        },{
            src:top.comprehension_default,
            srcOn:top.comprehension_on,
            width:top.width,height:top.height,
            on:title==='Compreshension',
            onClick:_onClick2}
    ]

    return(
        <div className={"t_compre"} style={{height:100,backgroundColor: '#5a6ea8'}}>
        <TopBtn {...TopProps} />
        </div>
    )
}