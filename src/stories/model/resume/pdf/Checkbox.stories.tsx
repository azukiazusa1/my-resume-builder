import { ComponentMeta, ComponentStory } from '@storybook/react';

import Checkbox from '@/components/model/resume/pdf/Checkbox';
import PDFWrapper from '@/stories/utils/PDFWrapper';

export default {
  title: 'model/resume/pdf/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <PDFWrapper>
    <Checkbox {...args} />
  </PDFWrapper>
);

export const Default = Template.bind({});
Default.args = {
  label: '配偶者の有無',
  value: true,
};
