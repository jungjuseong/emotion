import React from 'react';
import { Story } from '@storybook/react';
import { css } from "@emotion/react";

import {Dialog, DialogProps} from './Dialog';

export default {
    title: 'components/Dialog',
    component: Dialog,
    parameters: {
        docs: {
          inlineStories: false
        }
      },
  };

const Template: Story<DialogProps> = (args) => 
  <Dialog {...args}/>


export const dialog = Template.bind({});
dialog.args = {
    visible: true,
    title: '결재 성공',
    description: '결제가 성공적으로 이루어졌습니다.',
    confirmText: '확인',
    cancelText: '취소',
    cancellable: false,
};

export const cancellable = Template.bind({});
cancellable.args = {
    visible: true,
    title: '포스트 삭제',
    description: '포스트를 정말로 삭제하시겠습니까?',
    confirmText: '삭제',
    cancelText: '취소',
    cancellable: true,
};

export const customContent = () => 
    <Dialog visible={true} hideButtons>
        Custom Content
    </Dialog>

