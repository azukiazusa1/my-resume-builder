import React from 'react';
import { FieldProps } from './Form';
import TextField from '@mui/material/TextField';
import { ShortTextFieldOptions } from '@/store/templateState/types';

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
