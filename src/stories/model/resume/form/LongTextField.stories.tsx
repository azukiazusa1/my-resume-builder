import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import LongTextField from '../../../../components/model/resume/form/LongTextField';

export default {
  title: 'model/resume/form/LongTextField',
  component: LongTextField,
} as ComponentMeta<typeof LongTextField>;

const Template: ComponentStory<typeof LongTextField> = (args) => <LongTextField {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: '名前',
  value: '',
  onChange: (value: string) => console.log(value),
};
