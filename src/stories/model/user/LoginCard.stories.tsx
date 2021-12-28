import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import LoginCard from '@/components/model/user/LoginCard';

export default {
  title: 'model/user/LoginCard',
  component: LoginCard,
} as ComponentMeta<typeof LoginCard>;

const Template: ComponentStory<typeof LoginCard> = (args) => <LoginCard />;

export const Default = Template.bind({});
