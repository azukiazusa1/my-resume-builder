import { ComponentStory, ComponentMeta } from '@storybook/react';
import ListField from '../../../../components/model/resume/form/ListField';
import WithStorybook from '@/stories/utils/WithStorybook';

export default {
  title: 'model/resume/form/ListField',
  component: ListField,
} as ComponentMeta<typeof ListField>;

const Template: ComponentStory<typeof ListField> = WithStorybook(ListField);

export const Default = Template.bind({});
Default.args = {
  label: '名前',
  value: [],
  onChange: (value: string[]) => console.log(value),
};

export const withValue = Template.bind({});
withValue.args = {
  label: '名前',
  value: ['リスト1', 'リスト2', 'リスト3'],
  onChange: (value: string[]) => console.log(value),
};
