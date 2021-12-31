import { ComponentMeta,ComponentStory } from '@storybook/react';

import WithStorybook from '@/stories/utils/WithStorybook';

import ShortTextField from '../../../../components/model/resume/form/ShortTextField';

export default {
  title: 'model/resume/form/ShortTextField',
  component: ShortTextField,
} as ComponentMeta<typeof ShortTextField>;

const Template: ComponentStory<typeof ShortTextField> = WithStorybook(ShortTextField);

export const Default = Template.bind({});
Default.args = {
  label: '名前',
  value: '',
  onChange: (value: string) => console.log(value),
};
