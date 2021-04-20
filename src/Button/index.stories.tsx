import React from 'react';

import { Story } from '@storybook/react';
import { css } from "@emotion/react";

import {Button, ButtonProps} from '.';
import {ButtonGroup} from '../ButtonGroup/ButtonGroup';

import Icon from '../Icon/Icon';

export default {
  title: 'Components/Button',
  component: Button
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
  
const buttonWrapper = css`
  .description {
    margin-bottom: 0.5rem;
  }
  & > div + div {
    margin-top: 2rem;
  }
`;

const TemplateSize: Story<ButtonProps> = (args) => 
  <div css={buttonWrapper}>
    <div>
      <div className="description">Size</div>
      <Button {...args}>Button</Button>
    </div>
  </div>

export const sizeButton = TemplateSize.bind({});
sizeButton.args = { size: "small"}

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
          <Icon icon="heart" /> LIKE
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