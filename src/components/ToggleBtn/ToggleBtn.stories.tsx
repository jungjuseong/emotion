import React from 'react';
import { Story } from '@storybook/react';
import {ToggleBtn, ToggleBtnProps} from './ToggleBtn';

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
  on: false,
  disabled: false,
};

export const CompreshensionButton = Template.bind({});
CompreshensionButton.args = {
  class_name: "btn_comprehension",
  on: false,
  disabled: false,
};

export const Book = () => 
  <div className={"t_compre "}>
    <div className='popup_box'>
    <ToggleBtn class_name={'btn_book'} />
    </div>
  </div>

export const audio = () => 
<div className={"t_compre "}>
  <div className={'audio_box'} >
    <ToggleBtn class_name={'btn_audio'} />
  </div>
</div>
