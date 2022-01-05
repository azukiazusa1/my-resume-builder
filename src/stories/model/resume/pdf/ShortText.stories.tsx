import { ComponentMeta, ComponentStory } from '@storybook/react';

import ShortText from '@/components/model/resume/pdf/ShortText';
import PDFWrapper from '@/stories/utils/PDFWrapper';

export default {
  title: 'model/resume/pdf/ShortText',
  component: ShortText,
} as ComponentMeta<typeof ShortText>;

const Template: ComponentStory<typeof ShortText> = (args) => (
  <PDFWrapper>
    <ShortText {...args} />
  </PDFWrapper>
);

export const Default = Template.bind({});
Default.args = {
  label: '電話',
  value: '000-0000-0000',
};
