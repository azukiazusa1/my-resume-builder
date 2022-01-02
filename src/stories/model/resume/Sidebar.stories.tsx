import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Sidebar from '@/components/model/resume/Sidebar';

export default {
  sidebar: 'model/resume/Sidebar',
  component: Sidebar,
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => {
  const [preview, setPreview] = React.useState(false);
  return <Sidebar id="id" preview={preview} onClickPreview={() => setPreview((prev) => !prev)} />;
};

export const Default = Template.bind({});
Default.args = {};
