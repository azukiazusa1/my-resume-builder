import { ComponentMeta, ComponentStory } from '@storybook/react';

import DateView from '@/components/model/resume/pdf/DateView';
import PDFWrapper from '@/stories/utils/PDFWrapper';

export default {
  title: 'model/resume/pdf/DateView',
  component: DateView,
} as ComponentMeta<typeof DateView>;

const Template: ComponentStory<typeof DateView> = (args) => (
  <PDFWrapper>
    <DateView {...args} />
  </PDFWrapper>
);

export const Default = Template.bind({});
Default.args = {
  label: '生年月日',
  value: '1996-11-11',
};
