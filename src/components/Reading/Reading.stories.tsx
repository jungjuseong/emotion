import React from 'react';

import { Story } from '@storybook/react';

import {ToggleBtn, ToggleBtnProps} from '../ToggleBtn/ToggleBtn';
import {TopBtn} from '../TopBtn/TopBtn'
import {PopupBox} from '../PopupBox/PopupBox'
import {AudioBox} from '../AudioBox/AudioBox'
import {NItem} from '../NItem/NItem'

export default {
  title: 'Visang/Reading',
};

export const ReadingViewTest = () => {
  const [title,setTitle] = React.useState('Passage');
  const [play,setPlay] = React.useState(false);
  const [onNum,setOn] = React.useState(0);
    
  const _onClick1=()=>{setTitle('Passage');}
  const _onClick2=()=>{setTitle('Compreshension');}
  const _onPlay=()=>{setPlay(!play);}
  const _onClick=(idx: number)=>{setOn(idx);}
  
  const TopProps = [
      {class_name:"btn_passage",on:title==='Passage',onClick:_onClick1},
      {class_name:"btn_comprehension",on:title==='Compreshension',onClick:_onClick2}
  ]
  const PopupProps = [
    {class_name:"btn_strategy"},
    {class_name:"btn_book"}
  ]
  const audioProps = [
    {class_name:'btn_audio',view:false},
    {class_name:'btn_play',view:!play,onClick:_onPlay},
    {class_name:'btn_pause',view:play,onClick:_onPlay},
    {class_name:'btn_stop'},
  ]
    return(
      <div className={"t_compre Compreshension"} >
        <TopBtn {...TopProps} />
        <PopupBox {...PopupProps} />
        <AudioBox {...audioProps} />
        <div className="btn_page_box">
              <NItem idx={0} on={onNum===0} onClick={_onClick}/>
              <NItem idx={1} on={onNum===1} onClick={_onClick} />
              <NItem idx={2} on={onNum===2} onClick={_onClick} />
        </div>
      </div>
      )
  }