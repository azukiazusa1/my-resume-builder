import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';

type Props = {
  open: boolean;
  title: string;
  description: string;
  cancelText?: string;
  confirmText?: string;
  handleClose: () => void;
  handleCancel: () => void;
  handleConfirm: () => void;
};
const DeleteConfirmDialog: React.VFC<Props> = ({
  open,
  title,
  description,
  cancelText = 'キャンセル',
  confirmText = 'OK',
  handleCancel,
  handleClose,
  handleConfirm,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText data-testid="dialog-description">{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button data-testid="cancel-button" onClick={handleCancel}>
          {cancelText}
        </Button>
        <Button data-testid="confirm-button" onClick={handleConfirm} color="error">
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
