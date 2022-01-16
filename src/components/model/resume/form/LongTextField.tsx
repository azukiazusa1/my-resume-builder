import TextField from '@mui/material/TextField';
import React from 'react';

import { fieldValueSelectors } from '@/store/filedValueState';

import { FieldProps } from './Form';

const { useFieldValueItem } = fieldValueSelectors;

const ShortTextField: React.FC<FieldProps<string>> = ({ label, templateId, fieldId, onChange }) => {
  const value = useFieldValueItem<string>(templateId, fieldId);
  const handleChange = (event: React.FocusEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <TextField
      label={label}
      defaultValue={value}
      onBlur={handleChange}
      variant="outlined"
      multiline
      fullWidth
      rows={4}
      inputProps={{ 'data-testid': 'longText' }}
    />
  );
};

export default ShortTextField;
