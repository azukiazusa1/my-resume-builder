import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import React from 'react';
import { Control, Controller, useForm } from 'react-hook-form';

import { Field, fieldTypes } from '@/store/templateState/types';

import NumberFieldOptionsForm from './NumberFieldOptionsForm';

type Props = {
  id: string;
};

const optionsForm = (type: Field['type'], control: Control, errors: { [x: string]: any }) => {
  switch (type) {
    case 'number':
      return <NumberFieldOptionsForm control={control} errors={errors} />;
    default:
      return null;
  }
};

const AddFieldDialog: React.FC<Props> = ({ children }) => {
  const {
    watch,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: any) => console.log(data);
  return (
    <>
      {React.cloneElement(children as React.ReactElement<any>, { onClick: handleClickOpen })}
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>フィールドを追加</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ py: 4 }}>
              <Grid item xs={8}>
                <Controller
                  name="label"
                  control={control}
                  rules={{
                    required: 'フィールド名を入力してください。',
                    maxLength: { value: 20, message: '20文字以内で入力してください' },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="label"
                      label="フィールド名"
                      fullWidth
                      variant="standard"
                      required
                      error={Boolean(errors.label)}
                      helperText={errors.label && errors.label.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="type"
                  control={control}
                  rules={{
                    required: 'タイプを選択してください。',
                  }}
                  render={({ field }) => (
                    <FormControl fullWidth error={Boolean(errors.type)}>
                      <InputLabel id="demo-simple-select-label">タイプ</InputLabel>
                      <Select
                        {...field}
                        variant="standard"
                        id="type"
                        label="タイプ"
                        required
                        error={Boolean(errors.label)}
                      >
                        {fieldTypes.map(({ type, label }) => (
                          <MenuItem key={type} value={type}>
                            {label}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>{errors.type && errors.type.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                {optionsForm(watch('type'), control, errors)}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>キャンセル</Button>
            <Button type="submit" onClick={handleSubmit(onSubmit)}>
              追加
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default AddFieldDialog;
