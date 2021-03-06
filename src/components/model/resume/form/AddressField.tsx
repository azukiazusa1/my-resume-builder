import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';

import { FieldProps } from '@/components/model/resume/form/Form';
import useAddressAutocomplete from '@/hooks/useAddressAutocomplete';
import { PrefectureOption, prefectureOptions } from '@/lib/prefectures';
import { fieldValueSelectors } from '@/store/filedValueState';
import { AddressFieldValue } from '@/store/templateState/types';

const { useFieldValueItem } = fieldValueSelectors;
const AddressField: React.VFC<FieldProps<AddressFieldValue>> = ({
  label,
  templateId,
  fieldId,
  onChange,
}) => {
  const value = useFieldValueItem<AddressFieldValue>(templateId, fieldId);

  const [autoFillEnabled, setAutoFillEnabled] = useState(false);

  useEffect(() => {
    if (value?.postCodeFirst?.length === 3 && value?.postCodeLast?.length === 4) {
      setAutoFillEnabled(true);
    } else {
      setAutoFillEnabled(false);
    }
  }, [value]);

  const { data, loading, error } = useAddressAutocomplete(
    `${value?.postCodeFirst}${value?.postCodeLast}`,
    autoFillEnabled,
  );

  const handleChange = (event: React.FocusEvent<HTMLInputElement>) => {
    onChange({
      ruby: value?.ruby ?? '',
      postCodeFirst: value?.postCodeFirst ?? '',
      postCodeLast: value?.postCodeLast ?? '',
      prefecture: value?.prefecture ?? '',
      address: value?.address ?? '',
      [event.target.name as string]: event.target.value,
    });
  };

  const handleAutoFill = () => {
    if (data) {
      onChange({
        ...value,
        ruby: data.hiragana,
        prefecture: data.prefecture,
        address: data.address,
      });
    }
  };

  const handleAutocompleteChange = (
    event: React.SyntheticEvent,
    prefectureOption: PrefectureOption | null,
  ) => {
    if (prefectureOption) {
      onChange({
        ...value,
        prefecture: prefectureOption.value,
      });
    } else {
      onChange({
        ...value,
        prefecture: '',
      });
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" component="label">
          {label}
        </Typography>
      </Grid>
      <Grid item xs={12} alignItems="center">
        ???
        <TextField
          sx={{ '& input': { paddingTop: '4px', paddingBottom: '4px' }, mx: 1, width: 60 }}
          InputLabelProps={{ sx: { fontSize: '0.75rem' } }}
          defaultValue={value?.postCodeFirst}
          onBlur={handleChange}
          variant="outlined"
          size="small"
          inputProps={{
            'data-testid': 'postCodeFirst',
            maxLength: 3,
            name: 'postCodeFirst',
            type: 'tel',
          }}
        />
        ???
        <TextField
          sx={{ '& input': { paddingTop: '4px', paddingBottom: '4px' }, mx: 1, width: 70 }}
          InputLabelProps={{ sx: { fontSize: '0.75rem' } }}
          defaultValue={value?.postCodeLast}
          onBlur={handleChange}
          variant="outlined"
          size="small"
          inputProps={{
            'data-testid': 'postCodeLast',
            maxLength: 4,
            name: 'postCodeLast',
            type: 'tel',
          }}
        />
        <Button onClick={handleAutoFill} variant="contained" disabled={!autoFillEnabled}>
          {loading && autoFillEnabled ? 'Loading...' : '????????????'}
        </Button>
        {error && (
          <Typography variant="body2" color="error">
            ??????????????????????????????????????????????????????
          </Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <TextField
          sx={{ '& input': { paddingTop: '4px', paddingBottom: '4px' } }}
          InputLabelProps={{ sx: { fontSize: '0.75rem' } }}
          label="????????????"
          defaultValue={value?.ruby}
          onBlur={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          inputProps={{ 'data-testid': 'ruby', name: 'ruby' }}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Autocomplete
          value={prefectureOptions.find((option) => option.value === value?.prefecture)}
          data-testid="autocomplete"
          onChange={handleAutocompleteChange}
          options={prefectureOptions}
          groupBy={(option) => option.region}
          renderInput={({ inputProps, ...params }) => (
            <TextField
              {...params}
              value={value?.prefecture}
              variant="outlined"
              label="????????????"
              inputProps={{ ...inputProps, 'data-testid': 'prefecture', name: 'prefecture' }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={9}>
        <TextField
          defaultValue={value?.address}
          onBlur={handleChange}
          variant="outlined"
          fullWidth
          inputProps={{ 'data-testid': 'address', name: 'address' }}
        />
      </Grid>
    </Grid>
  );
};

export default AddressField;
