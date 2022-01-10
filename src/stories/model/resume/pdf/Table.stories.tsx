import { ComponentMeta, ComponentStory } from '@storybook/react';

import Table from '@/components/model/resume/pdf/Table';
import PDFWrapper from '@/stories/utils/PDFWrapper';

export default {
  title: 'model/resume/pdf/Table',
  component: Table,
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => (
  <PDFWrapper>
    <Table {...args} />
  </PDFWrapper>
);

export const Default = Template.bind({});
Default.args = {
  label: '名前',
  value: [
    {
      id: 1,
      yearMonth: '2010/03/01',
      personalHistory: '〇〇高校卒業',
    },
    {
      id: 2,
      yearMonth: '2014/03/01',
      personalHistory: '〇〇大学卒業',
    },
    {
      id: 3,
      yearMonth: '2016/03/01',
      personalHistory: '〇〇大学院卒業',
    },
    {
      id: 4,
      yearMonth: '2016/04/01',
      personalHistory: '△△会社入社',
    },
  ],
  options: {
    columns: [
      {
        field: 'yearMonth',
        headerName: '年月',
        editable: true,
        type: 'date',
        width: 200,
      },
      {
        field: 'personalHistory',
        headerName: '学歴・職歴',
        editable: true,
        width: 700,
      },
    ],
  },
};
