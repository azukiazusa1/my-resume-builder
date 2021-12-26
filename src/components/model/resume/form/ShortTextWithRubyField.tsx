import React from 'react';
import { FieldProps } from './Form';
import TextField from '@mui/material/TextField';
import { ShortTextWithRubyValue } from '../../../../store/templateState/types';

const ShortTextField: React.FC<FieldProps<ShortTextWithRubyValue>> = ({
  label,
  value,
  onChange,
}) => {
  const handleChangeRuby = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (value) {
      onChange({
        ...value,
        ruby: event.target.value,
      });
    } else {
      onChange({
        ruby: event.target.value,
        value: '',
      });
    }
  };

  const handleChangeShortText = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (value) {
      onChange({
        ...value,
        value: event.target.value,
      });
    } else {
      onChange({
        ruby: '',
        value: event.target.value,
      });
    }
  };

  return (
    <>
      <TextField
        sx={{ '& input': { paddingTop: '4px', paddingBottom: '4px' } }}
        InputLabelProps={{ sx: { fontSize: '0.75rem' } }}
        label="ふりがな"
        value={value?.ruby}
        onChange={handleChangeRuby}
        variant="outlined"
        size="small"
        fullWidth
        inputProps={{ 'data-testid': 'ruby' }}
      />
      <TextField
        sx={{ mt: 1 }}
        label={label}
        value={value?.value}
        onChange={handleChangeShortText}
        variant="outlined"
        fullWidth
        inputProps={{ 'data-testid': 'shortText' }}
      />
    </>
  );
};

export default ShortTextField;
