import React from 'react';
import { Story } from '@storybook/react';

import { css } from "@emotion/react";

import {Button, ButtonProps} from '.';

export default {
  title: 'Components/Button',
  component: Button
};

export const button = () => <Button>BUTTON</Button>;
  
button.story = {
  name: 'Default'
};

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

// export const sizes = () =>
//   <div css={buttonWrapper}>
//     <div>
//       <div className="description">Small</div>
//       { sizeButton }
//     </div>
//     <div>
//       <div className="description">Medium</div>
//       { mediumButton }
//     </div>
//     <div>
//       <div className="description">Big</div>
//       { bigButton }
//     </div>
//   </div>;

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

