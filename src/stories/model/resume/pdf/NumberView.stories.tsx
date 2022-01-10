import { ComponentMeta, ComponentStory } from '@storybook/react';

import NumberView from '@/components/model/resume/pdf/NumberView';
import PDFWrapper from '@/stories/utils/PDFWrapper';

export default {
  title: 'model/resume/pdf/NumberView',
  component: NumberView,
} as ComponentMeta<typeof NumberView>;

const Template: ComponentStory<typeof NumberView> = (args) => (
  <PDFWrapper>
    <NumberView {...args} />
  </PDFWrapper>
);

export const Default = Template.bind({});
Default.args = {
  label: '年齢',
  value: 25,
  options: {
    unit: '歳',
  },
};
