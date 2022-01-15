import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

import { transform } from '@/lib/form';

type Props = {
  control: Control;
  errors: { [x: string]: any };
};

const ImageFieldOptionsForm: React.VFC<Props> = ({ control, errors }) => {
  return (
    <Grid container spacing={2} sx={{ px: 2, mt: 2 }}>
      <Typography variant="subtitle1">画像のサイズを設定</Typography>
      <Grid item xs={12}>
        <Controller
          name="options.width"
          control={control}
          rules={{
            required: '1以上の値を入力してください。',
            min: { value: 1, message: '1以上の値を入力してください。' },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              id="width"
              type="number"
              label="横幅"
              variant="standard"
              required
              error={Boolean(errors.options?.width)}
              helperText={errors.options?.width?.message}
              onChange={(e) => field.onChange(transform.output(e))}
              value={transform.input(field.value)}
              inputProps={{ 'data-testid': 'field-width-input' }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="options.height"
          control={control}
          rules={{
            required: '1以上の値を入力してください。',
            min: { value: 1, message: '1以上の値を入力してください。' },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              id="height"
              label="高さ"
              type="number"
              variant="standard"
              required
              error={Boolean(errors.options?.height)}
              helperText={errors.options?.height?.message}
              onChange={(e) => field.onChange(transform.output(e))}
              value={transform.input(field.value)}
              inputProps={{ 'data-testid': 'field-height-input' }}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default ImageFieldOptionsForm;
