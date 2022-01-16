import { ComponentMeta, ComponentStory } from '@storybook/react';

import TableField from '@/components/model/resume/form/TableField';
import WithStorybook from '@/stories/utils/WithStorybook';

export default {
  title: 'model/resume/form/TableField',
  component: TableField,
} as ComponentMeta<typeof TableField>;

const Template: ComponentStory<typeof TableField> = WithStorybook(TableField);

export const Default = Template.bind({});
Default.args = {
  label: '名前',
  onChange: (value: any) => console.log(value),
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
