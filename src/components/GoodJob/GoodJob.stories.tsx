import React from 'react';

import { Story } from '@storybook/react';
import { css } from "@emotion/react";

import {GoodJob, GoodJobProps} from './goodjob';

import Icon from '../Icon/Icon';

export default {
  title: 'Components/GoodJob',
  component: GoodJob,
};

const Template: Story<GoodJobProps> = (args) => 
  <GoodJob {...args}/>

export const goodJob = Template.bind({});
goodJob.args = {
  view: true,
  onComplete: () => console.log('onComplete'),

};

const buttonWrapper = css`
  .description {
    margin-bottom: 0.5rem;
  }
  & > div + div {
    margin-top: 2rem;
  }
`;
