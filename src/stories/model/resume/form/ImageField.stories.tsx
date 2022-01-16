import { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';

import ImageField from '@/components/model/resume/form/ImageField';
import handlers from '@/mokcs/handlers';
import WithStorybook from '@/stories/utils/WithStorybook';

export default {
  title: 'model/resume/form/ImageField',
  component: ImageField,
} as ComponentMeta<typeof ImageField>;

const Template: ComponentStory<typeof ImageField> = WithStorybook(ImageField);

export const Default = Template.bind({});
Default.args = {
  label: '名前',
  onChange: (value: string) => console.log(value),
  options: {
    width: 120,
    height: 150,
  },
};
Default.parameters = {
  msw: {
    handlers,
  },
};

export const FailureBehavior = Template.bind({});
FailureBehavior.args = {
  label: '名前',
  onChange: (value: string) => console.log(value),
  options: {
    width: 120,
    height: 150,
  },
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
