import { ComponentMeta,ComponentStory } from '@storybook/react';

import WithStorybook from '@/stories/utils/WithStorybook';

import LongTextField from '../../../../components/model/resume/form/LongTextField';

export default {
  title: 'model/resume/form/LongTextField',
  component: LongTextField,
} as ComponentMeta<typeof LongTextField>;

const Template: ComponentStory<typeof LongTextField> = WithStorybook(LongTextField);

export const Default = Template.bind({});
Default.args = {
  label: '名前',
  value: '',
  onChange: (value: string) => console.log(value),
};
