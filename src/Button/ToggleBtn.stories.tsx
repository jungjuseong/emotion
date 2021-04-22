import React from 'react';

import { Story } from '@storybook/react';
import { css } from "@emotion/react";

import {ToggleBtn, ToggleBtnProps} from './ToggleBtn'
import Icon from '../Icon/Icon'

export default{
    title: 'visang/ToggleBtn',
    component: ToggleBtn,
};

const Template: Story<ToggleBtnProps> = (args) => <ToggleBtn 
                                                    src={require("../Icon/svg/btn_result_q.png")}
                                                    src_down={require("../Icon/svg/btn_result_q_down.png")}
                                                    src_dis={require("../Icon/svg/btn_result_q_dis.png")}
                                                    src_on={require("../Icon/svg/btn_result_q_dis.png")}
                                                    {...args} />
export const Default = Template.bind({});
Default.args = {
    id: 'test123',
};

export const Disabled = Template.bind({});
Disabled.args = {disabled: true};