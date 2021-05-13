import React from 'react'
import {BottomBox} from './BottomBox'

import {ToggleBtnProps} from '../ToggleBtn/ToggleBtn'
import { Story } from '@storybook/react';

export default{
    title:'Components/BottomBox',
    component:BottomBox
};

const Template: Story<ToggleBtnProps[]> = (args) =>
    <div className='t_compre' style={{height:100,backgroundColor: '#5a6ea8'}}>
        <BottomBox {...args} />
    </div>

export const test = Template.bind({});

 test.args=[
        {class_name:'btn_listen'},
        {class_name:'btn_readAlong'},
        {class_name:'btn_qna'},
      ]

export const Reading = () =>{

    const [onBottom1,setBottom1] = React.useState(false);
    const [onBottom2,setBottom2] = React.useState(false);
    const [onBottom3,setBottom3] = React.useState(false);

    const _bottomClick1 = () => {setBottom1(!onBottom1)}
    const _bottomClick2 = () => {setBottom2(!onBottom2)}
    const _bottomClick3 = () => {setBottom3(!onBottom3)}

    const bottomProps = [
        {class_name:'btn_listen', on:onBottom1, onClick:_bottomClick1},
        {class_name:'btn_readAlong', on:onBottom2, onClick:_bottomClick2},
        {class_name:'btn_qna', on:onBottom3, onClick:_bottomClick3},
      ]
    return(
        <div className='t_compre' style={{height:100,backgroundColor: '#5a6ea8'}}>
            <BottomBox {...bottomProps} />
        </div>
    )
}