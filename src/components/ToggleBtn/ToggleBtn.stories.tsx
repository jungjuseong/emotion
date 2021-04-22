import React from 'react';

import { Story } from '@storybook/react';
import { css } from "@emotion/react";

import {ToggleBtn, ToggleBtnProps} from './ToggleBtn';
import {ButtonGroup} from '../ButtonGroup/ButtonGroup';

import Icon from '../Icon/Icon';

export default {
  title: 'Components/ToggleBtn',
  component: ToggleBtn,
};

const Template: Story<ToggleBtnProps> = (args) => 
  <div className="t_comprehension">
    <div className="top" style={{backgroundColor: 'khaki'}}>
		  <ToggleBtn {...args}/>
    </div>
  </div>

export const visualizingButton = Template.bind({});
visualizingButton.args = {
  class_name: "btn_visualizing",
  on: true,
  disabled: false,
};

// export const secondaryButton = Template.bind({});
// secondaryButton.args = {theme: 'secondary'};

// export const tertiaryButton = Template.bind({});
// tertiaryButton.args = {theme: 'tertiary'};

const buttonWrapper = css`
  .description {
    margin-bottom: 0.5rem;
  }
  & > div + div {
    margin-top: 2rem;
  }
`;
