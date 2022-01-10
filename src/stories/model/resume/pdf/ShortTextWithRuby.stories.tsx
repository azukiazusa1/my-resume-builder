import { ComponentMeta, ComponentStory } from '@storybook/react';

import ShortTextWithRuby from '@/components/model/resume/pdf/ShortTextWithRuby';
import PDFWrapper from '@/stories/utils/PDFWrapper';

export default {
  title: 'model/resume/pdf/ShortTextWithRuby',
  component: ShortTextWithRuby,
} as ComponentMeta<typeof ShortTextWithRuby>;

const Template: ComponentStory<typeof ShortTextWithRuby> = (args) => (
  <PDFWrapper>
    <ShortTextWithRuby {...args} />
  </PDFWrapper>
);

export const Default = Template.bind({});
Default.args = {
  label: '氏名',
  value: { ruby: 'やまだたろう', value: '山田太郎' },
};
