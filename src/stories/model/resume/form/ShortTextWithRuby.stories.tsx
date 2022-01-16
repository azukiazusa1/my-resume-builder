import { ComponentMeta, ComponentStory } from '@storybook/react';

import ShortTextWithRubyField from '@/components/model/resume/form/ShortTextWithRubyField';
import { ShortTextWithRubyValue } from '@/store/templateState/types';
import WithStorybook from '@/stories/utils/WithStorybook';

export default {
  title: 'model/resume/form/ShortTextWithRubyField',
  component: ShortTextWithRubyField,
} as ComponentMeta<typeof ShortTextWithRubyField>;

const Template: ComponentStory<typeof ShortTextWithRubyField> =
  WithStorybook(ShortTextWithRubyField);

export const Default = Template.bind({});
Default.args = {
  label: '名前',
  onChange: (value: ShortTextWithRubyValue) => console.log(value),
};
