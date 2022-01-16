import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import React from 'react';

import { fieldValueSelectors } from '@/store/filedValueState';

import { FieldProps } from './Form';
const { useFieldValueItem } = fieldValueSelectors;

const CheckboxField: React.FC<FieldProps<boolean>> = ({ label, templateId, fieldId, onChange }) => {
  const value = useFieldValueItem<boolean>(templateId, fieldId);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(value ? false : true);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={value}
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
