import React from 'react';

import { Story } from '@storybook/react';
import { css } from "@emotion/react";

import {Yourturn,IYourturn} from './yourturn';

import Icon from '../Icon/Icon';

export default {
  title: 'Components/Yourturn',
  component: Yourturn,
};

const Template: Story<IYourturn> = (args) => 
  <Yourturn {...args}/>

export const yourTurn = Template.bind({});
yourTurn.args = {
  className:"yourturn",
  view:true,
  start:true
};
