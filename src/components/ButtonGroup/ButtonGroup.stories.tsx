import React from 'react';
import { Story } from '@storybook/react';

import {ButtonGroup, ButtonGroupProps} from './ButtonGroup';
import {Button} from '../Button/Button';

export default {
  title: 'Tutorial/ButtonGroup',
  component: ButtonGroup,
};

const Template: Story<ButtonGroupProps> = (args) => 
    <ButtonGroup {...args}>
        <Button theme="tertiary">취소</Button>
        <Button>확인</Button>
    </ButtonGroup>;

export const buttonGroup = Template.bind({});
buttonGroup.args = {
  direction: 'row',
    gap: '0.5rem'
};


export const rightAlign = Template.bind({});
rightAlign.args = {
  direction: 'row',
  align: 'right',
  gap: '0.5rem'
}

export const column = () => {
  return (
    <ButtonGroup direction="column">
      <Button>CLICK ME</Button>
      <Button>CLICK ME</Button>
    </ButtonGroup>
  );
};

export const customGap = () => {
  return (
    <ButtonGroup gap="1rem">
      <Button theme="tertiary">취소</Button>
      <Button>확인</Button>
    </ButtonGroup>
  );
};

export const customGapColumn = () => {
  return (
    <ButtonGroup direction="column" gap="1rem">
      <Button>CLICK ME</Button>
      <Button>CLICK ME</Button>
    </ButtonGroup>
  );
};