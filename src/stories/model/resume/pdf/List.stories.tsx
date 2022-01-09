import { ComponentMeta, ComponentStory } from '@storybook/react';

import List from '@/components/model/resume/pdf/List';
import PDFWrapper from '@/stories/utils/PDFWrapper';

export default {
  title: 'model/resume/pdf/List',
  component: List,
} as ComponentMeta<typeof List>;

const Template: ComponentStory<typeof List> = (args) => (
  <PDFWrapper>
    <List {...args} />
  </PDFWrapper>
);

export const Default = Template.bind({});
Default.args = {
  label: '電話',
  value: ['リスト1', 'リスト2', 'リスト3'],
};
