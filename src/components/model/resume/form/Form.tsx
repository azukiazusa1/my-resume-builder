import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';

import { fieldValueActions } from '@/store/filedValueState';
import { templateSelectors } from '@/store/templateState';
import { Field } from '@/store/templateState/types';

import FieldMenu from '../field/FieldMenu';
import AddressField from './AddressField';
import CheckboxField from './CheckboxField';
import DateField from './DateField';
import ImageField from './ImageField';
import ListField from './ListField';
import LongTextField from './LongTextField';
import NumberField from './NumberField';
import ShortTextField from './ShortTextField';
import ShortTextWithRubyField from './ShortTextWithRubyField';
import TableField from './TableField';

type Props = {
  /** テンプレートのID */
  id: string;
};

export type FieldProps<T, U = {}> = {
  /** フォームのラベル */
  label: string;
  /** テンプレートのID */
  templateId: string;
  /** フィールドのID */
  fieldId: string;
  /** フィールドの更新をハンドリングする */
  onChange: (value: T) => void;
  /** フィールドのオプション */
  options?: U;
};

/**
 * フィールドのタイプに対応するコンポーネント
 */
function componentMapping(field: Field, templateId: string, onChange: (value: any) => void) {
  switch (field.type) {
    case 'shortText':
      return (
        <ShortTextField
          label={field.label}
          templateId={templateId}
          fieldId={field.fieldId}
          options={field.options}
          onChange={onChange}
        />
      );
    case 'shortTextWithRuby':
      return (
        <ShortTextWithRubyField
          label={field.label}
          templateId={templateId}
          fieldId={field.fieldId}
          onChange={onChange}
        />
      );
    case 'longText':
      return (
        <LongTextField
          label={field.label}
          templateId={templateId}
          fieldId={field.fieldId}
          onChange={onChange}
        />
      );
    case 'image':
      return (
        <ImageField
          label={field.label}
          templateId={templateId}
          fieldId={field.fieldId}
          onChange={onChange}
          options={field.options}
        />
      );
    case 'checkbox':
      return (
        <CheckboxField
          label={field.label}
          templateId={templateId}
          fieldId={field.fieldId}
          onChange={onChange}
        />
      );
    case 'address':
      return (
        <AddressField
          label={field.label}
          templateId={templateId}
          fieldId={field.fieldId}
          onChange={onChange}
        />
      );
    case 'number':
      return (
        <NumberField
          label={field.label}
          options={field.options}
          templateId={templateId}
          fieldId={field.fieldId}
          onChange={onChange}
        />
      );
    case 'date':
      return (
        <DateField
          label={field.label}
          templateId={templateId}
          fieldId={field.fieldId}
          onChange={onChange}
        />
      );
    case 'list':
      return (
        <ListField
          label={field.label}
          templateId={templateId}
          fieldId={field.fieldId}
          onChange={onChange}
        />
      );
    case 'table':
      return (
        <TableField
          label={field.label}
          options={field.options}
          templateId={templateId}
          fieldId={field.fieldId}
          onChange={onChange}
        />
      );
  }
}

const ResumeForm: React.FC<Props> = ({ id }) => {
  const [hover, setHover] = useState<string | null>(null);
  const { useTemplateItem } = templateSelectors;
  const { useSetFieldValue } = fieldValueActions;
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
                sx={{ my: 2, display: 'flex', alignItems: 'start' }}
                data-testid="field"
                onMouseEnter={() => setHover(field.fieldId)}
                onMouseLeave={() => setHover(null)}
              >
                <div style={{ width: '90%' }}>
                  {componentMapping(field, id, (value) => setFieldValue(id, field.fieldId, value))}
                </div>
                <div style={{ visibility: hover === field.fieldId ? 'visible' : 'hidden' }}>
                  <FieldMenu id={id} fieldId={field.fieldId} />
                </div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ResumeForm;
