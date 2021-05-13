import React, { useState } from 'react';

import { Story } from '@storybook/react';

import {ToggleBtn, ToggleBtnProps} from '../ToggleBtn/ToggleBtn';
import {TopBtn} from '../TopBtn/BtnGroup'
import {PopupBox} from '../PopupBox/PopupBox'
import {AudioBox} from '../AudioBox/AudioBox'
import {PageBox} from '../PageBox/PageBox'
import {BottomBox} from '../BottomBox/BottomBox'

import {top} from '../../resorce/index'

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
 
  
  const topProps = [
      {class_name:"btn_passage",on:title==='btn_passage',onClick:_onClick,
      src:top.passage_default,
      srcOn:top.passage_on,
      width:'207px',height:'45px'},
      {class_name:"btn_comprehension",on:title==='btn_comprehension',onClick:_onClick,
      src:top.comprehension_default,
      srcOn:top.comprehension_on,
      width:'207px',height:'45px'},
  ]
  const popupProps = [
    {class_name:"btn_strategy"},
    {class_name:"btn_book"}
  ]
  const audioProps = [
    {class_name:'btn_audio',view:!audio,onClick:_onAudio},
    {class_name:'btn_play',view:!play&&audio,onClick:_onPlay},
    {class_name:'btn_pause',view:play&&audio,onClick:_onPlay},
    {class_name:'btn_stop',view:audio,onClick:_onAudio},
  ]
  const pageProps = [
    {idx:0,on:onNum===0,onClick:_pageClick},
    {idx:1,on:onNum===1,onClick:_pageClick},
    {idx:2,on:onNum===2,onClick:_pageClick},
  ]
  const bottomProps = [
    {class_name:'btn_listen', on:onBottom1, onClick:_bottomClick1},
    {class_name:'btn_readAlong', on:onBottom2, onClick:_bottomClick2},
    {class_name:'btn_qna', on:onBottom3, onClick:_bottomClick3},
  ]

  return(
    <div className={"t_compre Compreshension"} >
      <TopBtn {...topProps} />
      <PopupBox {...popupProps} />
      <AudioBox {...audioProps} />
      <PageBox {...pageProps} />
      <BottomBox {...bottomProps} />
    </div>
  )
}