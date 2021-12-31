import TextField from '@mui/material/TextField';
import React from 'react';

import { FieldProps } from './Form';

const ShortTextField: React.FC<FieldProps<string>> = ({ label, value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
      variant="outlined"
      multiline
      fullWidth
      rows={4}
      inputProps={{ 'data-testid': 'longText' }}
    />
  );
};

export default ShortTextField;
