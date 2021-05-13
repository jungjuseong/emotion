import React from 'react';
import { Story } from '@storybook/react';
import {ToggleBtn, ToggleBtnProps} from './ToggleBtn';
import {top,audio,popup} from '../../resorce/index';

export default {
  title: 'Components/ToggleBtn',
  component: ToggleBtn,
};

const Template: Story<ToggleBtnProps> = (args) => 
  <div className="t_compre">
    <div className="top" style={{backgroundColor: '#5a6ea8'}}>
		  <ToggleBtn {...args}/>
    </div>
  </div>

export const PassageButton = Template.bind({});
PassageButton.args = {
  class_name: "btn_passage",
  src:top.passage_default,
  srcOn:top.passage_on,
  width:'194px',
  height:'37px',
};

export const CompreshensionButton = Template.bind({});
CompreshensionButton.args = {
  src:top.comprehension_default,
  srcOn:top.comprehension_on,
  width:'194px',
  height:'37px'
};

export const popupBtn = () =>
  <div>
    <ToggleBtn 
      src={popup.strategy_default}
      srcDis={popup.strategy_dis}
      srcDown={popup.strategy_down}
      width='62px'
      height='46px'
    />
    <ToggleBtn 
      src={popup.book_default}
      srcDis={popup.book_dis}
      srcDown={popup.book_down}
      width='62px'
      height='46px'
    />
  </div>


export const audioBtn = () => 
  <ToggleBtn class_name={'btn_audio'}
    src={audio.audio_default}
    srcDis={audio.audio_dis}
    srcDown={audio.audio_down}
    width='48px'
    height='50px'
  />
