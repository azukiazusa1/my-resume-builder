import { ComponentMeta,ComponentStory } from '@storybook/react';
import { rest } from 'msw';

import WithStorybook from '@/stories/utils/WithStorybook';

import ImageField from '../../../../components/model/resume/form/ImageField';
import handlers from '../../../../mokcs/handlers';

export default {
  title: 'model/resume/form/ImageField',
  component: ImageField,
} as ComponentMeta<typeof ImageField>;

const Template: ComponentStory<typeof ImageField> = WithStorybook(ImageField);

export const Default = Template.bind({});
Default.args = {
  label: '名前',
  value: '',
  onChange: (value: string) => console.log(value),
};
Default.parameters = {
  msw: {
    handlers,
  },
};

export const withValue = Template.bind({});
withValue.args = {
  label: '名前',
  value: '/images/sample.png',
  onChange: (value: string) => console.log(value),
};
withValue.parameters = {
  msw: {
    handlers,
  },
};

export const FailureBehavior = Template.bind({});
FailureBehavior.args = {
  label: '名前',
  value: '',
  onChange: (value: string) => console.log(value),
};
FailureBehavior.parameters = {
  msw: {
    handlers: [
      rest.post('/api/upload', (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    ],
  },
};
