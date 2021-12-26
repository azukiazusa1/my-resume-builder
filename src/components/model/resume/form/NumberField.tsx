import React from 'react';
import { FieldProps } from './Form';
import TextField from '@mui/material/TextField';

const NumberField: React.FC<FieldProps<number>> = ({ label, value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <TextField
      type="number"
      label={label}
      value={value}
      onChange={handleChange}
      variant="outlined"
      fullWidth
      inputProps={{ 'data-testid': 'input' }}
    />
  );
};

export default NumberField;
