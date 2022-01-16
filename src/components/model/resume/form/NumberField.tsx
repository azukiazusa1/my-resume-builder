import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import React from 'react';

import { fieldValueSelectors } from '@/store/filedValueState';
import { NumberFieldOptions } from '@/store/templateState/types';

const { useFieldValueItem } = fieldValueSelectors;

import { FieldProps } from './Form';

const NumberField: React.FC<FieldProps<number, NumberFieldOptions>> = ({
  label,
  templateId,
  fieldId,
  onChange,
  options,
}) => {
  const value = useFieldValueItem<number>(templateId, fieldId);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <TextField
      type="number"
      label={label}
      InputProps={{
        endAdornment: <InputAdornment position="end">{options?.unit}</InputAdornment>,
      }}
      inputProps={{
        'data-testid': 'input',
      }}
      value={value}
      onChange={handleChange}
      variant="outlined"
      fullWidth
    />
  );
};

export default NumberField;
