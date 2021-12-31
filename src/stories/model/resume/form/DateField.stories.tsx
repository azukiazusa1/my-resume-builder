import { ComponentMeta,ComponentStory } from '@storybook/react';

import WithStorybook from '@/stories/utils/WithStorybook';

import DateField from '../../../../components/model/resume/form/DateField';

export default {
  title: 'model/resume/form/DateField',
  component: DateField,
} as ComponentMeta<typeof DateField>;

const Template: ComponentStory<typeof DateField> = WithStorybook(DateField);

export const Default = Template.bind({});
Default.args = {
  label: '名前',
  value: '2021-12-24',
  onChange: (value: string) => console.log(value),
};
