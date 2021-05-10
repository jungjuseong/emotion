import React from 'react';

import { Story } from '@storybook/react';

import {Card, CardProps} from './Card';

import Icon from '../Icon/Icon';

export default {
  title: 'Tutorial/Card',
  component: Card,
};

const Template: Story<{}> = (args) => 
  <Card {...args}/>

export const primaryCard = Template.bind({});
primaryCard.args = {className: 'smart_body'};