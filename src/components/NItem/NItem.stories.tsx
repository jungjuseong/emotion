import React from 'react';

import { Story } from '@storybook/react';
import { css } from "@emotion/react";
import { action, makeObservable, observable } from 'mobx'; 

import { NItem, INItem } from './NItem';
import { number } from '@storybook/addon-knobs';


export default{
    title: 'Components/NItem',
    component: NItem,
};

const Template: Story<INItem> = (args) =>
<div className="btn_page_box">
    <NItem {...args}/>
</div>
    

export const btnPageBox = Template.bind({});
btnPageBox.args = {
    idx:0,
    on: true, 
};


export const btnPageBoxGroup = () =>{
    let onNum = 0;

    const _onClick = (idx: number) => {
        onNum=idx;
    }
    return(
        <div className="btn_page_box">
            <NItem idx={0} on={onNum===0} onClick={_onClick}/>
            <NItem idx={1} on={onNum===1} onClick={_onClick} />
            <NItem idx={2} on={onNum===2} onClick={_onClick} />
        </div>
    )   
}