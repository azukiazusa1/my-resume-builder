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
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import { cloneDeep } from 'lodash-es';
import { nanoid } from 'nanoid';
import React from 'react';
import { Control, Controller, useForm } from 'react-hook-form';

import { templateActions, templateSelectors } from '@/store/templateState';
import { Field, fieldTypes } from '@/store/templateState/types';

import ImageFieldOptionsForm from './ImageFieldOptionsForm';
import NumberFieldOptionsForm from './NumberFieldOptionsForm';
import TableFieldOptionsForm from './TableFieldOptionsForm';

const { useAddField, useEditField } = templateActions;
const { useTemplateFieldItem } = templateSelectors;

type Props = {
  id: string;
  fieldId?: string;
};

const optionsForm = (type: Field['type'], control: Control<any>, errors: { [x: string]: any }) => {
  switch (type) {
    case 'number':
      return <NumberFieldOptionsForm control={control} errors={errors} />;
    case 'image':
      return <ImageFieldOptionsForm control={control} errors={errors} />;
    case 'table':
      return <TableFieldOptionsForm control={control} errors={errors} />;
    default:
      return null;
  }
};

export const defaultColmunValue = () => ({
  field: nanoid(),
  width: 100,
  headerName: '',
  editable: true,
  type: 'string',
});

const defaultOptions = () => ({
  columns: [defaultColmunValue()],
  unit: '',
  width: 120,
  height: 150,
});

const AddFieldDialog: React.FC<Props> = ({ id, fieldId, children }) => {
  const fieldItem = useTemplateFieldItem(id, fieldId);
  let defaultValues: any;

  if (fieldItem) {
    defaultValues = cloneDeep(fieldItem);
  } else {
    defaultValues = {
      type: 'shortText' as Field['type'],
      label: '',
      options: defaultOptions(),
    };
  }
  const {
    watch,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ defaultValues });
  const addField = useAddField();
  const editField = useEditField();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: any) => {
    let options: any;

    if (data.type === 'table') {
      options = { columns: cloneDeep(data.options.columns) };
    } else if (data.type === 'image') {
      options = { width: data.options.width, height: data.options.height };
    } else if (data.type === 'number') {
      options = { unit: data.options.unit };
    }

    if (fieldItem) {
      editField(id, data);
    } else {
      addField(id, {
        fieldId: nanoid(),
        type: data.type,
        label: data.label,
        options,
        block: 12,
      });
    }
    setOpen(false);
  };
  return (
    <>
      {React.cloneElement(children as React.ReactElement<any>, { onClick: handleClickOpen })}
      <Dialog fullWidth fullScreen={fullScreen} maxWidth="md" open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>{fieldItem ? 'フィールドを編集' : 'フィールドを追加'}</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ py: { xs: 0, md: 4 } }}>
              <Grid item xs={12} md={8}>
                <Controller
                  name="label"
                  control={control}
                  rules={{
                    required: 'フィールド名を入力してください。',
                    maxLength: { value: 20, message: '20文字以内で入力してください。' },
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
                      inputProps={{ 'data-testid': 'field-name-input' }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Controller
                  name="type"
                  control={control}
                  rules={{
                    required: 'タイプを選択してください。',
                  }}
                  render={({ field }) => (
                    <FormControl fullWidth error={Boolean(errors.type)} disabled={!!fieldItem}>
                      <InputLabel id="demo-simple-select-label">タイプ</InputLabel>
                      <Select {...field} variant="standard" id="type" label="タイプ" required>
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
              {fieldItem ? '編集' : '追加'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default AddFieldDialog;
