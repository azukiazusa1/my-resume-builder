import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SplitButton from '../../components/ui/SplitButton';

export default {
  title: 'ui/SplitButton',
  component: SplitButton,
} as ComponentMeta<typeof SplitButton>;

const Template: ComponentStory<typeof SplitButton> = (args) => <SplitButton {...args} />;

const options = [
  { key: '1', text: 'One' },
  { key: '2', text: 'Two', disabled: true },
  { key: '3', text: 'Three' },
];

export const Default = Template.bind({});
Default.args = {
  options,
};

export const Outline = Template.bind({});
Outline.args = {
  variant: 'outlined',
  options,
};

export const Secondary = Template.bind({});
Secondary.args = {
  color: 'secondary',
  options,
};
