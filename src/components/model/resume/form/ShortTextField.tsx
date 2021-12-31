import TextField from '@mui/material/TextField';
import React from 'react';

import { ShortTextFieldOptions } from '@/store/templateState/types';

import { FieldProps } from './Form';

const ShortTextField: React.FC<FieldProps<string, ShortTextFieldOptions>> = ({
  label,
  value,
  onChange,
  options = { type: 'text' },
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <TextField
      type={options.type}
      label={label}
      value={value}
      onChange={handleChange}
      variant="outlined"
      fullWidth
      inputProps={{ 'data-testid': 'shortText' }}
    />
  );
};

export default ShortTextField;
