import React from 'react'
import {BtnGroup,BtnGroupProps} from './BtnGroup'

import {ToggleBtnProps} from '../ToggleBtn/ToggleBtn'
import { Story } from '@storybook/react';
import {css} from '@emotion/react';

import {imgTop,imgPopup,imgAudio,imgBottom} from '../../resorce/index'

export default {
    title: 'components/BtnGroup',
    component: BtnGroup
}

const Template: Story<BtnGroupProps> = (args) =>{
    return(<BtnGroup {...args} />)
}
   
export const Default = Template.bind({});
Default.args={
    btnProps:[{
    src:imgTop.passage_default,
    srcOn:imgTop.passage_on,
    width:imgTop.width,
    height:imgTop.height,
},{
    src:imgTop.comprehension_default,
    srcOn:imgTop.comprehension_on,
    width:imgTop.width,
    height:imgTop.height,
}],
    style:css`
        position:absolute;
        top:30px;
        left:50%;
        transform:translateX(-50%);
        z-index:1;  
        background-color:#5a6ea8;
    `
}

export const TopBox = () => {
    const [title,setTitle] = React.useState('Passage');
    const _onClick1=()=>{setTitle('Passage');}
    const _onClick2=()=>{setTitle('Compreshension');}
    
    const TopProps = {
        btnProps:[{
        src:imgTop.passage_default,
        srcOn:imgTop.passage_on,
        width:imgTop.width,
        height:imgTop.height,
        on:title==='Passage',
        onClick:_onClick1,
        style:css`
            &.on{
                pointer-events:none;
            }
        `
    },{
        src:imgTop.comprehension_default,
        srcOn:imgTop.comprehension_on,
        width:imgTop.width,
        height:imgTop.height,
        on:title==='Compreshension',
        onClick:_onClick2,
        style:css`
            &.on{
                pointer-events:none;
            }  
        `
    }],
        style:css`
            position:absolute;
            top: 30px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1;
            background-color:#5a6ea8;
        `
    }
    return(
        <BtnGroup {...TopProps} />
    )
}

export const PopupBox = () => {
    const PopupProps = {
        btnProps:[{
            src:imgPopup.strategy_default,
            srcDis:imgPopup.strategy_dis,
            srcDown:imgPopup.strategy_down,
            width:imgPopup.width,
            height:imgPopup.height,
        },{
            src:imgPopup.book_default,
            srcDis:imgPopup.book_dis,
            srcDown:imgPopup.book_down,
            width:imgPopup.width,
            height:imgPopup.height,
        }],
        style:css`
            position:absolute;
            top: 58px;
            right: 66px;
            z-index: 1;
        `
    }
    return(
        <BtnGroup {...PopupProps} />
    )
}

export const AudioBox = () => {
    const [play,setPlay] = React.useState(false);
    const [audio,setAudio] = React.useState(false);

    const _onPlay=()=>{setPlay(!play);}
    const _onAudio=()=>{setAudio(!audio);}

    const AudioProps = {
        btnProps:[{
            src:imgAudio.audio_default,
            srcDown:imgAudio.audio_down,
            srcDis:imgAudio.audio_dis,
            width:imgAudio.width,
            height:imgAudio.height,
            view:!audio,
            onClick:_onAudio
        },{
            src:imgAudio.play_default,
            srcDown:imgAudio.play_down,
            srcDis:imgAudio.play_dis,
            width:imgAudio.width,
            height:imgAudio.height,
            view:!play&&audio,
            onClick:_onPlay,
        },{
            src:imgAudio.pause_default,
            srcDown:imgAudio.pause_down,
            srcDis:imgAudio.pause_dis,
            width:imgAudio.width,
            height:imgAudio.height,
            view:play&&audio,
            onClick:_onPlay
        },{
            src:imgAudio.stop_default,
            srcDown:imgAudio.stop_down,
            srcDis:imgAudio.stop_dis,
            width:imgAudio.width,
            height:imgAudio.height,
            view:audio,
            onClick:_onAudio},
        ],
        style:css`
            position: absolute;
            top: 130px;
            right: 80px;
            z-index: 1;  
        `
    }

    return(
        <BtnGroup {...AudioProps} />
    )
}

export const BottomBox = () => {
    const [onBottom1,setBottom1] = React.useState(false);
    const [onBottom2,setBottom2] = React.useState(false);
    const [onBottom3,setBottom3] = React.useState(false);

    const _bottomClick1 = () => {setBottom1(!onBottom1)}
    const _bottomClick2 = () => {setBottom2(!onBottom2)}
    const _bottomClick3 = () => {setBottom3(!onBottom3)}

    const BottomProps = {
        btnProps:[{
            src:imgBottom.listen_default,
            srcDis:imgBottom.listen_dis,
            srcOn:imgBottom.listen_on,
            width:imgBottom.width,
            height:imgBottom.height,
            on:onBottom1,
            onClick:_bottomClick1,
        },{
            src:imgBottom.readAlong_default,
            srcDis:imgBottom.readAlong_dis,
            srcOn:imgBottom.readAlong_on,
            width:imgBottom.width,
            height:imgBottom.height,
            on:onBottom2,
            onClick:_bottomClick2
        },{
            src:imgBottom.qna_default,
            srcDis:imgBottom.qna_dis,
            srcOn:imgBottom.qna_on,
            width:imgBottom.width,
            height:imgBottom.height,
            on:onBottom3,
            onClick:_bottomClick3
        }],
        style:css`
            position: absolute;
            bottom: 1px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1;
            background-color:#5a6ea8;
        `
    }
    return(
        <BtnGroup {...BottomProps} />
    )

}