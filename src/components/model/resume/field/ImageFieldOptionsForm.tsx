import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Control, Controller } from 'react-hook-form';

type Props = {
  control: Control;
  errors: { [x: string]: any };
};

const ImageFieldOptionsForm: React.VFC<Props> = ({ control, errors }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Controller
          name="options.width"
          control={control}
          rules={{
            required: true,
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
              defaultValue={120}
              error={Boolean(errors.options?.width)}
              helperText={errors.options?.width?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="options.height"
          control={control}
          rules={{
            required: true,
            min: { value: 1, message: '1以上の値を入力してください' },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              id="height"
              label="高さ"
              variant="standard"
              required
              defaultValue={150}
              error={Boolean(errors.options?.height)}
              helperText={errors.options?.height?.message}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default ImageFieldOptionsForm;
