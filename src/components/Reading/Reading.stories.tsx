import React, { useState } from 'react';

import { Story } from '@storybook/react';
import {css} from '@emotion/react';

import {ToggleBtn, ToggleBtnProps} from '../ToggleBtn/ToggleBtn';
import {BtnGroup} from '../BtnGroup/BtnGroup'
import {PageBox} from '../PageBox/PageBox'

import {imgTop,imgPopup,imgAudio,imgBottom,bg} from '../../resorce/index'

export default {
  title: 'Visang/Reading',
};

export const ReadingViewTest = () => {
  const [title,setTitle] = useState('btn_passage');
  const [play,setPlay] = useState(false);
  const [audio,setAudio] = useState(false);
  const [onNum,setOn] = useState(0);
  const [onBottom1,setBottom1] = useState(false);
  const [onBottom2,setBottom2] = useState(false);
  const [onBottom3,setBottom3] = useState(false);
    
  const _onClick=(e)=>{setTitle(e.target.className.split(' ')[0]);}
  const _onPlay=()=>{setPlay(!play);}
  const _onAudio=()=>{
    setAudio(!audio);
    if(!audio)setPlay(true);
    else setPlay(false);
  }
  const _pageClick=(idx: number)=>{setOn(idx);}
  const _bottomClick1 = () => {setBottom1(!onBottom1)}
  const _bottomClick2 = () => {setBottom2(!onBottom2)}
  const _bottomClick3 = () => {setBottom3(!onBottom3)}
 
  
  const topProps = {
    btnProps:[{
      class_name:'btn_passage',
      src:imgTop.passage_default,
      srcOn:imgTop.passage_on,
      width:imgTop.width,
      height:imgTop.height,
      on:title==='btn_passage',
      onClick:_onClick,
      style:css`
        &.on{
          pointer-events:none
        }  
      `
    },{
      class_name:'btn_compreshension',
      src:imgTop.comprehension_default,
      srcOn:imgTop.comprehension_on,
      width:imgTop.width,
      height:imgTop.height,
      on:title==='btn_compreshension',
      onClick:_onClick,
      style:css`
        &.on{
          pointer-events:none
        } 
      `
    }],
    style:css`
      position:absolute;
      top: 30px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1;
    `
}
  const popupProps = {
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
  const audioProps = {
    btnProps:[{
        src:imgAudio.audio_default,
        srcDown:imgAudio.audio_down,
        srcDis:imgAudio.audio_dis,
        width:imgAudio.width,
        height:imgAudio.height,
        view:!audio,
        onClick:_onAudio,
    },{
        src:imgAudio.play_default,
        srcDown:imgAudio.play_down,
        srcDis:imgAudio.play_dis,
        width:imgAudio.width,
        height:imgAudio.height,
        view:!play&&audio,
        onClick:_onPlay,
        style:css`
          margin-right:14px;
        `
    },{
        src:imgAudio.pause_default,
        srcDown:imgAudio.pause_down,
        srcDis:imgAudio.pause_dis,
        width:imgAudio.width,
        height:imgAudio.height,
        view:play&&audio,
        onClick:_onPlay,
        style:css`
          margin-right:14px;
        `
    },{
        src:imgAudio.stop_default,
        srcDown:imgAudio.stop_down,
        srcDis:imgAudio.stop_dis,
        width:imgAudio.width,
        height:imgAudio.height,
        view:audio,
        onClick:_onAudio
      },],
    style:css`
            position: absolute;
            top: 130px;
            right: 80px;
            z-index: 1;  
        `
}
  const pageProps = [
    {idx:0,on:onNum===0,onClick:_pageClick},
    {idx:1,on:onNum===1,onClick:_pageClick},
    {idx:2,on:onNum===2,onClick:_pageClick},
  ]
  const bottomProps = {
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
    `
}

  return(
    <div css={css`
      position: relative;
      background-image: url(${bg.comprehension_bg});
      background-repeat: no-repeat;
      width: 1280px;
      height: 800px;
    `} >
      <BtnGroup {...topProps} />
      <BtnGroup {...popupProps} />
      <BtnGroup {...audioProps} />
      <PageBox {...pageProps} />
      <BtnGroup {...bottomProps} />
    </div>
  )
}