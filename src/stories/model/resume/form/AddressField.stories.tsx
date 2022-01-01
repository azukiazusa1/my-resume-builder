import { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';

import AddressField from '@/components/model/resume/form/AddressField';
import handlers from '@/mokcs/handlers';
import WithStorybook from '@/stories/utils/WithStorybook';

export default {
  title: 'model/resume/form/AddressField',
  component: AddressField,
} as ComponentMeta<typeof AddressField>;

const Template: ComponentStory<typeof AddressField> = WithStorybook(AddressField);

export const Default = Template.bind({});
Default.args = {
  label: '現住所',
  value: undefined,
  onChange: (value: any) => console.log(value),
};
Default.parameters = {
  msw: {
    handlers,
  },
};

export const withValue = Template.bind({});
withValue.args = {
  label: '現住所',
  value: {
    postCodeFirst: '111',
    postCodeLast: '2222',
    ruby: 'とうきょうとしぶやく',
    prefecture: '東京都',
    address: '渋谷区',
  },
  onChange: (value: any) => console.log(value),
};
withValue.parameters = {
  msw: {
    handlers,
  },
};

export const FailureBehavior = Template.bind({});
FailureBehavior.args = {
  label: '現住所',
  value: undefined,
  onChange: (value: any) => console.log(value),
};
FailureBehavior.parameters = {
  msw: {
    handlers: [
      rest.get('/api/postcodes', (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    ],
  },
};
