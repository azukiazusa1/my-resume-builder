import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import UserAvatar from '@/components/model/user/UserAvatar';

export default {
  title: 'model/user/UserAvatar',
  component: UserAvatar,
} as ComponentMeta<typeof UserAvatar>;

const Template: ComponentStory<typeof UserAvatar> = (args) => <UserAvatar {...args} />;

export const Default = Template.bind({});

Default.args = {
  username: 'Jhon',
  image: 'https://cdn.vuetifyjs.com/images/john.jpg',
};

export const WithSxProp = Template.bind({});

WithSxProp.args = {
  username: 'Jhon',
  image: 'https://cdn.vuetifyjs.com/images/john.jpg',
  sx: {
    mt: 5,
    ml: 5,
  },
};
