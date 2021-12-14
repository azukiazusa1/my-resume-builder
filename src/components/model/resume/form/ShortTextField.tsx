import React from 'react';
import { FieldProps } from './Form';
import TextField from '@mui/material/TextField';

const ShortTextField: React.FC<FieldProps<string>> = ({ label, value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <TextField label={label} value={value} onChange={handleChange} variant="outlined" fullWidth />
  );
};

export default ShortTextField;
