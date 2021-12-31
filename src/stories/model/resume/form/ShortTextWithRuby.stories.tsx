import { ComponentMeta,ComponentStory } from '@storybook/react';

import WithStorybook from '@/stories/utils/WithStorybook';

import ShortTextWithRubyField from '../../../../components/model/resume/form/ShortTextWithRubyField';
import { ShortTextWithRubyValue } from '../../../../store/templateState/types';

export default {
  title: 'model/resume/form/ShortTextWithRubyField',
  component: ShortTextWithRubyField,
} as ComponentMeta<typeof ShortTextWithRubyField>;

const Template: ComponentStory<typeof ShortTextWithRubyField> =
  WithStorybook(ShortTextWithRubyField);

export const Default = Template.bind({});
Default.args = {
  label: '名前',
  value: { ruby: '', value: '' },
  onChange: (value: ShortTextWithRubyValue) => console.log(value),
};
