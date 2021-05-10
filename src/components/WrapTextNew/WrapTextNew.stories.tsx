import React from 'react';

import { Story } from '@storybook/react';
import { css } from "@emotion/react";

import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';

import {WrapTextNew, WrapTextProps} from './WrapTextNew';


export default {
  title: 'Components/WrapText',
  component: WrapTextNew,
};

const Template: Story<WrapTextProps> = (args) =>
    <div>
        <WrapTextNew  {...args}>
          <>
										<div>1111111111111111</div>
                    <div>2222222222222222</div>
                    <div>3333333333333333</div>
                    <div>4444444444444444</div>
                    <div>5555555555555555</div>
                    <div>6666666666666666</div>
            </>
				</WrapTextNew>
    </div>

export const WrapText = Template.bind({});
WrapText.args={
  view:true,
  rcalcNum: 1,
  viewWhenInit:true,
  textAlign:"left"
}