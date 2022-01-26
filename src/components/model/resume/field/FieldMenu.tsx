import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';

import DeleteConfirmDialog from '@/components/ui/DeleteConfirmDialog';

type Props = {
  id: string;
  fieldId: string;
};

const FieldMenu: React.VFC<Props> = ({ id, fieldId }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>編集</MenuItem>
        <MenuItem onClick={() => setDeleteDialogOpen(true)}>削除</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        title="フィールドを削除しますか？"
        description="削除すると元に戻せません。本当によろしいですか？"
        handleClose={() => setDeleteDialogOpen(false)}
        handleCancel={() => setDeleteDialogOpen(false)}
        handleConfirm={() => {
          setDeleteDialogOpen(false);
          console.log('delete', id, fieldId);
        }}
      />
    </>
  );
};

export default FieldMenu;
