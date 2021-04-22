import React from 'react';

import { Story } from '@storybook/react';
import { css } from "@emotion/react";

import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import {Button, ButtonProps} from './Button';
import {ButtonGroup} from '../ButtonGroup/ButtonGroup';

import Icon from '../Icon/Icon';

export default {
  title: 'Components/Button',
  component: Button,
  //decorators: [withKnobs]
};

// export const button = () => <Button>BUTTON</Button>;
  
// button.story = {
//   name: 'Default'
// };

const Template: Story<ButtonProps> = (args) => 
  <Button {...args}>Button</Button>

export const primaryButton = Template.bind({});
primaryButton.args = {theme: 'primary'};

export const secondaryButton = Template.bind({});
secondaryButton.args = {theme: 'secondary'};

export const tertiaryButton = Template.bind({});
tertiaryButton.args = {theme: 'tertiary'};

export const viewButton = Template.bind({});
viewButton.args = {theme: 'view'};

export const audioPlayer = () =>
<div>
  <Button theme= 'player' iconOnly= {true} ><Icon icon="exit" color="white" /></Button>
  <Button theme= 'player' iconOnly= {true} ><Icon icon="heart" color="white" /></Button>
  <Button theme= 'player' iconOnly= {true} ><Icon icon="pencil" color="white" /></Button>
</div>


  
const buttonWrapper = css`
  .description {
    margin-bottom: 0.5rem;
  }
  & > div + div {
    margin-top: 2rem;
  }
`;



export const size = () => 
    <div css={buttonWrapper}>
      <div>
        <Button size="small">Button</Button>
      </div>
      <div>
        <Button size="medium">
        Button
        </Button>
      </div>
      <div>
        <Button size="big">
        Button
        </Button>
      </div>
    </div>


export const disabled = () => 
    <div css={buttonWrapper}>
      <div>
        <Button disabled>PRIMARY</Button>
      </div>
      <div>
        <Button disabled theme="secondary">
          SECONDARY
        </Button>
      </div>
      <div>
        <Button disabled theme="tertiary">
          TERTIARY
        </Button>
      </div>
      <div>
        <Button disabled theme="view">
          VIEW
        </Button>
      </div>
    </div>

export const customSized = () =>
    <div css={buttonWrapper}>
      <div>
        <Button width="20rem">CUSTOM WIDTH</Button>
      </div>
      <div>
        <Button width="100%">FULL WIDTH</Button>
      </div>
    </div>


export const withIcon = () => 
    <div>
      <ButtonGroup>
        <Button size="small">
          <Icon icon="heart" /> LIKE
        </Button>
        <Button>
          <Icon icon="exit" /> LIKE
        </Button>
        <Button size="big">
          <Icon icon="heart" /> LIKE
        </Button>
      </ButtonGroup>
    </div>

export const iconOnly = () => 
    <div>
      <ButtonGroup>
        <Button iconOnly size="small">
          <Icon icon="heart" />
        </Button>
        <Button iconOnly>
          <Icon icon="heart" />
        </Button>
        <Button iconOnly size="big">
          <Icon icon="heart" />
        </Button>
      </ButtonGroup>
    </div>

