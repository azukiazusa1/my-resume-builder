import React from 'react';
import { FieldProps } from './Form';
import TextField from '@mui/material/TextField';
import { ShortTextWithRubyValue } from '../../../../store/templateState/types';

const ShortTextField: React.FC<FieldProps<ShortTextWithRubyValue>> = ({
  label,
  value,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // onChange(event.target.value);
  };

  return (
    <>
      <TextField
        sx={{ '& input': { paddingTop: '4px', paddingBottom: '4px' } }}
        InputLabelProps={{ sx: { fontSize: '0.75rem' } }}
        label="ふりがな"
        value={value?.ruby}
        onChange={handleChange}
        variant="outlined"
        size="small"
        fullWidth
      />
      <TextField
        sx={{ mt: 1 }}
        label={label}
        value={value?.value}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      />
    </>
  );
};

export default ShortTextField;
