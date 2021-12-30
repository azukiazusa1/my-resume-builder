import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Title from '@/components/model/resume/Title';
import WithStorybook from '@/stories/utils/WithStorybook';

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
