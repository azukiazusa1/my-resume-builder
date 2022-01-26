import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import FieldMenu from '@/components/model/resume/field/FieldMenu';

export default {
  title: 'model/resume/field/FieldMenu',
  component: FieldMenu,
} as ComponentMeta<typeof FieldMenu>;

const Template: ComponentStory<typeof FieldMenu> = (args) => <FieldMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: 'id',
};
