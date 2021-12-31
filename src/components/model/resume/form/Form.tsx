import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import React from 'react';

import { fieldValueActions,fieldValueSelectors } from '@/store/filedValueState';
import {templateSelectors } from '@/store/templateState';
import { Field } from '@/store/templateState/types';

import DateField from './DateField';
import ImageField from './ImageField';
import ListField from './ListField';
import LongTextField from './LongTextField';
import NumberField from './NumberField';
import ShortTextField from './ShortTextField';
import ShortTextWithRubyField from './ShortTextWithRubyField';
import TableField from './TableField';

type Props = {
  id: string;
};

export type FieldProps<T, U = {}> = {
  label: string;
  value: T | undefined;
  onChange: (value: T) => void;
  options?: U;
};

/**
 * フィールドのタイプに対応するコンポーネント
 */
function componentMapping(field: Field, value: any, onChange: (value: any) => void) {
  switch (field.type) {
    case 'shortText':
      return (
        <ShortTextField
          label={field.label}
          options={field.options}
          value={value}
          onChange={onChange}
        />
      );
    case 'shortTextWithRuby':
      return <ShortTextWithRubyField label={field.label} value={value} onChange={onChange} />;
    case 'longText':
      return <LongTextField label={field.label} value={value} onChange={onChange} />;
    case 'image':
      return <ImageField label={field.label} value={value} onChange={onChange} />;
    case 'number':
      return (
        <NumberField
          label={field.label}
          options={field.options}
          value={value}
          onChange={onChange}
        />
      );
    case 'date':
      return <DateField label={field.label} value={value} onChange={onChange} />;
    case 'list':
      return <ListField label={field.label} value={value} onChange={onChange} />;
    case 'table':
      return (
        <TableField label={field.label} options={field.options} value={value} onChange={onChange} />
      );
  }
}

const ResumeForm: React.FC<Props> = ({ id }) => {
  const { useTemplateItem } = templateSelectors;
  const { useFieldValueItem } = fieldValueSelectors;
  const { useSetFieldValue } = fieldValueActions;
  const fieldValue = useFieldValueItem(id);
  const setFieldValue = useSetFieldValue();
  const template = useTemplateItem(id);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="flex-end">
            {template.fields.map((field) => (
              <Grid
                item
                key={field.fieldId}
                xs={12}
                md={field.block}
                sx={{ my: 2 }}
                data-testid="field"
              >
                {componentMapping(field, fieldValue[field.fieldId], (value) =>
                  setFieldValue(id, field.fieldId, value),
                )}
              </Grid>
            ))}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ResumeForm;
