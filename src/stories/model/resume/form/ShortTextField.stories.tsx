import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ShortTextField from '../../../../components/model/resume/form/ShortTextField';

export default {
  title: 'model/resume/form/ShortTextField',
  component: ShortTextField,
} as ComponentMeta<typeof ShortTextField>;

const Template: ComponentStory<typeof ShortTextField> = (args) => <ShortTextField {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: '名前',
  value: '',
  onChange: (value: string) => console.log(value),
};
