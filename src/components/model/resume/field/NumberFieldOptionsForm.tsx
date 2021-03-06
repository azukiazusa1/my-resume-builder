import TextField from '@mui/material/TextField';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
type Props = {
  control: Control;
  errors: { [x: string]: any };
};

const NumberFieldOptionsForm: React.VFC<Props> = ({ control, errors }) => {
  return (
    <Controller
      name="options.unit"
      control={control}
      rules={{
        maxLength: { value: 5, message: '5文字以内で入力してください。' },
      }}
      render={({ field }) => (
        <TextField
          {...field}
          id="unit"
          label="単位"
          variant="standard"
          error={Boolean(errors.options?.unit)}
          helperText={errors.options?.unit?.message}
          inputProps={{ 'data-testid': 'field-unit-input' }}
        />
      )}
    />
  );
};

export default NumberFieldOptionsForm;
