import { ComponentMeta, ComponentStory } from '@storybook/react';

import ShortTextField from '@/components/model/resume/form/ShortTextField';
import WithStorybook from '@/stories/utils/WithStorybook';

export default {
  title: 'model/resume/form/ShortTextField',
  component: ShortTextField,
} as ComponentMeta<typeof ShortTextField>;

const Template: ComponentStory<typeof ShortTextField> = WithStorybook(ShortTextField);

export const Default = Template.bind({});
Default.args = {
  label: '名前',
  onChange: (value: string) => console.log(value),
};
