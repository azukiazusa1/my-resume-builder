import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';

import AddFieldDialog from '@/components/model/resume/field/AddFieldDialog';
import DeleteConfirmDialog from '@/components/ui/DeleteConfirmDialog';
import { templateActions } from '@/store/templateState';
const { useRemoveField } = templateActions;

type Props = {
  id: string;
  fieldId: string;
};

const FieldMenu: React.VFC<Props> = ({ id, fieldId }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const open = Boolean(anchorEl);

  const removeField = useRemoveField();

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
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <AddFieldDialog id={id} fieldId={fieldId}>
          <MenuItem>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText>編集</ListItemText>
          </MenuItem>
        </AddFieldDialog>
        <MenuItem onClick={() => setDeleteDialogOpen(true)}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText>削除</ListItemText>
        </MenuItem>
      </Menu>
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        title="フィールドを削除しますか？"
        description="削除すると元に戻せません。本当によろしいですか？"
        handleClose={() => setDeleteDialogOpen(false)}
        handleCancel={() => setDeleteDialogOpen(false)}
        handleConfirm={() => {
          setDeleteDialogOpen(false);
          handleClose();
          removeField(id, fieldId);
        }}
      />
    </>
  );
};

export default FieldMenu;
