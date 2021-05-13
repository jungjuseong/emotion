import React from 'react';
import { Story } from '@storybook/react';
import {ToggleBtn, ToggleBtnProps} from './ToggleBtn';
import {imgTop,imgAudio,imgPopup} from '../../resorce/index';

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
  src:imgTop.passage_default,
  srcOn:imgTop.passage_on,
  width:'194px',
  height:'37px',
};

export const CompreshensionButton = Template.bind({});
CompreshensionButton.args = {
  src:imgTop.comprehension_default,
  srcOn:imgTop.comprehension_on,
  width:'194px',
  height:'37px'
};

export const popupBtn = () =>
  <div>
    <ToggleBtn 
      src={imgPopup.strategy_default}
      srcDis={imgPopup.strategy_dis}
      srcDown={imgPopup.strategy_down}
      width='62px'
      height='46px'
    />
    <ToggleBtn 
      src={imgPopup.book_default}
      srcDis={imgPopup.book_dis}
      srcDown={imgPopup.book_down}
      width='62px'
      height='46px'
    />
  </div>


export const audioBtn = () => 
  <ToggleBtn class_name={'btn_audio'}
    src={imgAudio.audio_default}
    srcDis={imgAudio.audio_dis}
    srcDown={imgAudio.audio_down}
    width='48px'
    height='50px'
  />
