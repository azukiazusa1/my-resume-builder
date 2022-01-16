import 'dayjs/locale/ja';

import DateAdapter from '@mui/lab/AdapterDayjs';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import type { Dayjs } from 'dayjs';
import React from 'react';

import { fieldValueSelectors } from '@/store/filedValueState';

import { FieldProps } from './Form';

const { useFieldValueItem } = fieldValueSelectors;

const DateField: React.FC<FieldProps<string>> = ({ label, templateId, fieldId, onChange }) => {
  const value = useFieldValueItem<string>(templateId, fieldId);
  const handleChange = (date: Dayjs | null) => {
    if (date) {
      onChange(date.format('YYYY-MM-DD'));
    } else {
      onChange('');
    }
  };

  return (
    <LocalizationProvider dateAdapter={DateAdapter} locale="ja">
      <DatePicker
        mask="____/__/__"
        label={label}
        value={value}
        clearable
        onChange={handleChange}
        renderInput={(params) => {
          const { inputProps, ...other } = params;
          return (
            <TextField
              fullWidth
              error={false}
              inputProps={{ 'data-testid': 'input', ...inputProps }}
              {...other}
            />
          );
        }}
      />
    </LocalizationProvider>
  );
};

export default DateField;
