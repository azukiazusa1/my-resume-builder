import TextField from '@mui/material/TextField';
import React from 'react';

import { FieldProps } from '@/components/model/resume/form/Form';
import { fieldValueSelectors } from '@/store/filedValueState';
import { ShortTextFieldOptions } from '@/store/templateState/types';

const { useFieldValueItem } = fieldValueSelectors;

const ShortTextField: React.VFC<FieldProps<string, ShortTextFieldOptions>> = ({
  label,
  templateId,
  fieldId,
  onChange,
  options = { type: 'text' },
}) => {
  const value = useFieldValueItem(templateId, fieldId);
  const handleChange = (event: React.FocusEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <TextField
      type={options.type}
      label={label}
      defaultValue={value}
      onBlur={handleChange}
      variant="outlined"
      fullWidth
      inputProps={{ 'data-testid': 'shortText' }}
    />
  );
};

export default ShortTextField;
