import { ComponentMeta,ComponentStory } from '@storybook/react';
import React from 'react';

import BackdropLoader from '@/components/ui/BackdropLoader';

export default {
  title: 'ui/BackdropLoader',
  component: BackdropLoader,
} as ComponentMeta<typeof BackdropLoader>;

const Template: ComponentStory<typeof BackdropLoader> = (args) => <BackdropLoader />;

export const Default = Template.bind({});
