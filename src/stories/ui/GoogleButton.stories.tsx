import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GoogleButton from '@/components/ui/GoogleButton';

export default {
  title: 'ui/GoogleButton',
  component: GoogleButton,
} as ComponentMeta<typeof GoogleButton>;

const Template: ComponentStory<typeof GoogleButton> = (args) => (
  <GoogleButton>Google でログイン</GoogleButton>
);

export const Default = Template.bind({});
