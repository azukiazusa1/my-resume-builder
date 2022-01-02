import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Title from '@/components/model/resume/Title';

export default {
  title: 'model/resume/Title',
  component: Title,
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = (args) => <Title {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: '履歴書',
  onChange: (value: string) => console.log(value),
};
