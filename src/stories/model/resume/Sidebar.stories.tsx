import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { RecoilRoot } from 'recoil';

import Sidebar from '@/components/model/resume/sidebar/Sidebar';

export default {
  title: 'model/resume/sidebar/Sidebar',
  component: Sidebar,
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => {
  const [preview, setPreview] = React.useState(false);
  return (
    <RecoilRoot>
      <Sidebar id="resume" preview={preview} onClickPreview={() => setPreview((prev) => !prev)} />
    </RecoilRoot>
  );
};

export const Default = Template.bind({});
Default.args = {};
