import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import DeleteConfirmDialog from '@/components/ui/DeleteConfirmDialog';

export default {
  title: 'ui/DeleteConfirmDialog',
  component: DeleteConfirmDialog,
} as ComponentMeta<typeof DeleteConfirmDialog>;

const Template: ComponentStory<typeof DeleteConfirmDialog> = (args) => (
  <DeleteConfirmDialog {...args} />
);

export const Default = Template.bind({});
Default.args = {
  open: true,
  title: 'フィールドを削除しますか？',
  description: '削除すると元に戻せません。本当によろしいですか？',
  handleClose: () => console.log('close'),
  handleCancel: () => console.log('cancel'),
  handleConfirm: () => console.log('confirm'),
};
