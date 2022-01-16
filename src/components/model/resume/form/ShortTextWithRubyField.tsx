import TextField from '@mui/material/TextField';
import React from 'react';

import { FieldProps } from '@/components/model/resume/form/Form';
import { fieldValueSelectors } from '@/store/filedValueState';
import { ShortTextWithRubyValue } from '@/store/templateState/types';

const { useFieldValueItem } = fieldValueSelectors;

const ShortTextField: React.VFC<FieldProps<ShortTextWithRubyValue>> = ({
  label,
  templateId,
  fieldId,
  onChange,
}) => {
  const value = useFieldValueItem<ShortTextWithRubyValue>(templateId, fieldId);
  console.log({ value });
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    onChange({
      ruby: value ? value.ruby : '',
      value: value ? value.value : '',
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <TextField
        sx={{ '& input': { paddingTop: '4px', paddingBottom: '4px' } }}
        name="ruby"
        InputLabelProps={{ sx: { fontSize: '0.75rem' } }}
        label="ふりがな"
        defaultValue={value?.ruby}
        onBlur={handleBlur}
        variant="outlined"
        size="small"
        fullWidth
        inputProps={{ 'data-testid': 'ruby' }}
      />
      <TextField
        sx={{ mt: 1 }}
        name="value"
        label={label}
        defaultValue={value?.value}
        onBlur={handleBlur}
        variant="outlined"
        fullWidth
        inputProps={{ 'data-testid': 'shortText' }}
      />
    </>
  );
};

export default ShortTextField;
