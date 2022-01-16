import { ComponentMeta, ComponentStory } from '@storybook/react';

import CheckboxField from '@/components/model/resume/form/CheckboxField';
import WithStorybook from '@/stories/utils/WithStorybook';

export default {
  title: 'model/resume/form/CheckboxField',
  component: CheckboxField,
} as ComponentMeta<typeof CheckboxField>;

const Template: ComponentStory<typeof CheckboxField> = WithStorybook(CheckboxField);

export const Default = Template.bind({});
Default.args = {
  label: '扶養家族の有無',
  onChange: (value: boolean) => console.log(value),
};
