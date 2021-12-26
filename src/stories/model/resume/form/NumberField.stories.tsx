import { ComponentStory, ComponentMeta } from '@storybook/react';
import NumberField from '../../../../components/model/resume/form/NumberField';
import WithStorybook from '@/stories/utils/WithStorybook';

export default {
  title: 'model/resume/form/NumberField',
  component: NumberField,
} as ComponentMeta<typeof NumberField>;

const Template: ComponentStory<typeof NumberField> = WithStorybook(NumberField);

export const Default = Template.bind({});
Default.args = {
  label: '年齢',
  value: 25,
  onChange: (value: number) => console.log(value),
};
