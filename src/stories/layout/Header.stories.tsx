import { ComponentMeta,ComponentStory } from '@storybook/react';
import React from 'react';

import Header from '../../components/layout/Header';

export default {
  title: 'layout/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => <Header />;

export const Default = Template.bind({});
