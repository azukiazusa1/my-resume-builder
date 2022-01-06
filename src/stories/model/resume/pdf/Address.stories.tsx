import { ComponentMeta, ComponentStory } from '@storybook/react';

import Address from '@/components/model/resume/pdf/Address';
import PDFWrapper from '@/stories/utils/PDFWrapper';

export default {
  title: 'model/resume/pdf/Address',
  component: Address,
} as ComponentMeta<typeof Address>;

const Template: ComponentStory<typeof Address> = (args) => (
  <PDFWrapper>
    <Address {...args} />
  </PDFWrapper>
);

export const Default = Template.bind({});
Default.args = {
  label: '現住所',
  value: {
    ruby: 'とうきょうとしぶやくしぶや',
    prefecture: '東京都',
    address: '渋谷区渋谷1-1-1',
    postCodeFirst: '123',
    postCodeLast: '4567',
  },
};
