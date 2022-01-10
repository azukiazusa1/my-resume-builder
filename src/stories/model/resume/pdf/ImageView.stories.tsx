import { ComponentMeta, ComponentStory } from '@storybook/react';

import ImageView from '@/components/model/resume/pdf/ImageView';
import PDFWrapper from '@/stories/utils/PDFWrapper';

export default {
  title: 'model/resume/pdf/ImageView',
  component: ImageView,
} as ComponentMeta<typeof ImageView>;

const Template: ComponentStory<typeof ImageView> = (args) => (
  <PDFWrapper>
    <ImageView {...args} />
  </PDFWrapper>
);

export const Default = Template.bind({});
Default.args = {
  label: '写真',
  value: 'https://picsum.photos/200/300',
};

export const NoImage = Template.bind({});
NoImage.args = {
  label: '写真',
  value: '',
};
