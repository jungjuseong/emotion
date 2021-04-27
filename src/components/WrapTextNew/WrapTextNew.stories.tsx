import React from 'react';

import { Story } from '@storybook/react';
import { css } from "@emotion/react";

import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';

import {WrapTextNew, IWrapText} from './WrapTextNew';


export default {
  title: 'Components/WrapText',
  component: WrapTextNew,
};

const Template: Story<IWrapText> = (args) =>
    <div>
        <WrapTextNew  {...args}>
										sadf
				</WrapTextNew>
    </div>

export const WrapText = Template.bind({});
WrapText.args={
  view:true,
  rcalcNum: 1,
  viewWhenInit:true,
  textAlign:"left"
}