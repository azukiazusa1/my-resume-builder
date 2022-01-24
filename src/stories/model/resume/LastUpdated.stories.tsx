import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import LastUpdated from '@/components/model/resume/LastUpdated';

export default {
  title: 'model/resume/LastUpdated',
  component: LastUpdated,
} as ComponentMeta<typeof LastUpdated>;

const Template: ComponentStory<typeof LastUpdated> = (args) => <LastUpdated {...args} />;

export const Default = Template.bind({});
Default.args = {
  datetime: '2001-05-15T19:00',
};
export const Empty = Template.bind({});
Empty.args = {};
