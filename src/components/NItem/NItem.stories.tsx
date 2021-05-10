import React from 'react';

import { Story } from '@storybook/react';
import { css } from "@emotion/react";
import { action, makeObservable, observable, observe } from 'mobx'; 

import { NItem, NItemProps } from './NItem';
import { number } from '@storybook/addon-knobs';
import { observer } from 'mobx-react';


export default{
    title: 'Components/NItem',
    component: NItem,
};

const Template: Story<NItemProps> = (args) =>
<div className="btn_page_box">
    <NItem {...args}/>
</div>
    

export const btnPageBoxOn = Template.bind({});
export const btnPageBoxOff = Template.bind({});
btnPageBoxOn.args = {
    idx:0,
    on: true, 
};

btnPageBoxOff.args = {
    idx:0,
    on: false, 
};

export const btnPageBoxGroup = () =>{
    const [onNum,setOn] = React.useState(0);
    const _onClick=(idx: number)=>{setOn(idx);}
    return(
        <div className="btn_page_box">
            <NItem idx={0} on={onNum===0} onClick={_onClick}/>
            <NItem idx={1} on={onNum===1} onClick={_onClick} />
            <NItem idx={2} on={onNum===2} onClick={_onClick} />
        </div>
    )
}
