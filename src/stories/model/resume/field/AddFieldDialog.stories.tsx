import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import AddFieldDialog from '@/components/model/resume/field/AddFieldDialog';

export default {
  title: 'model/resume/field/AddFieldDialog',
  component: AddFieldDialog,
} as ComponentMeta<typeof AddFieldDialog>;

const Template: ComponentStory<typeof AddFieldDialog> = (args) => (
  <AddFieldDialog {...args}>
    <button>open</button>
  </AddFieldDialog>
);

export const Default = Template.bind({});
Default.args = {
  id: 'id',
};
