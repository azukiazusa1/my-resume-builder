import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import React from 'react';

import { FieldProps } from './Form';

const CheckboxField: React.FC<FieldProps<boolean>> = ({ label, value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(value ? false : true);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          value={value}
          onChange={handleChange}
          inputProps={{
            'aria-label': label,
          }}
        />
      }
      label={label}
    />
  );
};

export default CheckboxField;
