import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import DateField from '../../../../components/model/resume/form/DateField';

export default {
  title: 'model/resume/form/DateField',
  component: DateField,
} as ComponentMeta<typeof DateField>;

const Template: ComponentStory<typeof DateField> = (args) => <DateField {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: '名前',
  value: '2021-12-24',
  onChange: (value: string) => console.log(value),
};
