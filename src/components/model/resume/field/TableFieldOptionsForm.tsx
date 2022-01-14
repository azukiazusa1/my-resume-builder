import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { GridNativeColTypes } from '@mui/x-data-grid';
import { Control, Controller, useFieldArray } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  control: Control;
  errors: { [x: string]: any };
};

const columnTypes: { type: GridNativeColTypes; label: string }[] = [
  { type: 'string', label: 'テキスト' },
  { type: 'number', label: '数値' },
  { type: 'date', label: '日付' },
  { type: 'dateTime', label: '日時' },
  { type: 'boolean', label: 'チェックボックス' },
  { type: 'singleSelect', label: '単一選択' },
];

const TableFieldOptionsForm: React.VFC<Props> = ({ control, errors }) => {
  const { fields, append, remove } = useFieldArray({
    name: 'options.columns',
    control,
  });

  const defaultValue = {
    field: uuidv4(),
    width: 100,
    headerName: '',
    editable: true,
    type: 'string',
  };

  return (
    <Grid container spacing={2} sx={{ px: 2, my: 2 }}>
      <Typography variant="subtitle1">カラム設定</Typography>
      {fields.map((field, index) => (
        <Grid container spacing={2} key={field.id}>
          <Grid item xs={11}>
            <Controller
              name={`options.columns.${index}.headerName`}
              control={control}
              rules={{
                required: 'カラム名を入力してください',
                maxLength: { value: 20, message: '20文字以内で入力してください' },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="headerName"
                  label="カラム名"
                  variant="standard"
                  required
                  fullWidth
                  error={Boolean(errors.options?.columns?.[index]?.headerName)}
                  helperText={errors.options?.columns?.[index]?.width?.headerName}
                />
              )}
            />
          </Grid>
          <Grid item xs={1}>
            {fields.length > 1 && (
              <IconButton aria-label="delete" color="error" onClick={() => remove(index)}>
                <DeleteIcon />
              </IconButton>
            )}
          </Grid>
          <Grid item xs={12} md={3}>
            <Controller
              name={`options.columns.${index}.width`}
              control={control}
              rules={{
                required: '1以上の値を入力してください',
                min: { value: 1, message: '1以上の値を入力してください' },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="width"
                  type="number"
                  label="横幅"
                  variant="standard"
                  required
                  error={Boolean(errors.options?.columns?.[index]?.width)}
                  helperText={errors.options?.columns?.[index]?.width?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <Controller
              name={`options.columns.${index}.type`}
              control={control}
              rules={{
                required: 'タイプを選択してください。',
              }}
              render={({ field }) => (
                <FormControl error={Boolean(errors.options?.columns?.[index]?.type)}>
                  <InputLabel id="demo-simple-select-label">タイプ</InputLabel>
                  <Select {...field} variant="standard" id="type" label="タイプ" required>
                    {columnTypes.map(({ type, label }) => (
                      <MenuItem key={type} value={type}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.options?.columns?.[index]?.type?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
          <Divider sx={{ width: '100%', my: 2 }} />
        </Grid>
      ))}
      <Button variant="contained" onClick={() => append(defaultValue)}>
        カラムを追加
      </Button>
    </Grid>
  );
};

export default TableFieldOptionsForm;
