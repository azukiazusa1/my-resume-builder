import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ImageField from '../../../../components/model/resume/form/ImageField';

export default {
  title: 'model/resume/form/ImageField',
  component: ImageField,
} as ComponentMeta<typeof ImageField>;

const Template: ComponentStory<typeof ImageField> = (args) => <ImageField {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: '名前',
  value: '',
  onChange: (value: string) => console.log(value),
};
