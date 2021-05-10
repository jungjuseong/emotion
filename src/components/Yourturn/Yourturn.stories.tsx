import React from 'react';

import { Story } from '@storybook/react';
import { css } from "@emotion/react";

import {Yourturn,YourturnProps} from './yourturn';

import Icon from '../Icon/Icon';

export default {
  title: 'Components/Yourturn',
  component: Yourturn,
};

const Template: Story<YourturnProps> = (args) => 
  <Yourturn {...args}/>

export const yourTurn = Template.bind({});
yourTurn.args = {
  className:"yourturn",
  view:true,
  start:true
};
