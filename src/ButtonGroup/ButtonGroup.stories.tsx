import React from 'react';
import { Story } from '@storybook/react';

import {ButtonGroup, ButtonGroupProps} from './ButtonGroup';
import {Button} from '../Button';

export default {
  title: 'Components|ButtonGroup',
  component: ButtonGroup,
};

export const buttonGroup = () => <ButtonGroup>Group</ButtonGroup>;
  
buttonGroup.story = {
  name: 'Default'
};

const Template: Story<ButtonGroupProps> = (args) => 
    <ButtonGroup {...args}>
        <Button theme="tertiary">취소</Button>
        <Button>확인</Button>
    </ButtonGroup>;

export const buttonGroup = Template.bind({});
buttonGroup.args = {
    direction: 'row',
    rightAlign: false,
    gap: '0.5rem'
};


export const rightAlign = Template.bind({});
rightAlign.args = {
    direction: 'row',
    rightAlign: true,
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