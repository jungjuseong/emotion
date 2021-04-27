import React from 'react';

import { Story } from '@storybook/react';
import { css } from "@emotion/react";
import { action, makeObservable, observable, observe } from 'mobx'; 

import { NItem, INItem } from './NItem';
import { number } from '@storybook/addon-knobs';
import { observer } from 'mobx-react';


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

const onObjetc = observable({
    onNum: 0,
    _onClick(idx: number){
        this.onNum=idx;
        console.log(this.onNum)
      }
})


export const btnPageBoxGroup = () => 
        <div className="btn_page_box">
            <NItem idx={0} on={onObjetc.onNum===0} onClick={onObjetc._onClick}/>
            <NItem idx={1} on={onObjetc.onNum===1} onClick={onObjetc._onClick} />
            <NItem idx={2} on={onObjetc.onNum===2} onClick={onObjetc._onClick} />
        </div>
