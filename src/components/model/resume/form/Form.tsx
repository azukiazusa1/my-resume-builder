import React from 'react';
import ShortTextField from './ShortTextField';
import Title from '@/components/model/resume/Title';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import { templateSelectors, templateActions } from '@/store/templateState';
import { fieldValueSelectors, fieldValueActions } from '@/store/filedValueState';
import { Block, Field } from '@/store/templateState/types';

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
 * ブロックのサイズに対応するgridのサイズ
 */
const gridCols: Record<Block, number> = {
  1: 4,
  2: 6,
  3: 12,
} as const;

/**
 * フィールドのタイプに対応するコンポーネント
 */
function componentMapping(type: Field['type'], props: FieldProps<any>) {
  switch (type) {
    case 'shortText':
      return <ShortTextField {...props} />;
    default:
      return null;
  }
}

const ResumeForm: React.FC<Props> = ({ id }) => {
  const { useTemplateItem } = templateSelectors;
  const { useEditTitle } = templateActions;
  const { useFieldValueItem } = fieldValueSelectors;
  const { useSetFieldValue } = fieldValueActions;
  const fieldValue = useFieldValueItem(id);
  const setFieldValue = useSetFieldValue();
  const template = useTemplateItem(id);
  const editTitle = useEditTitle();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Title title={template.title} onChange={(value) => edititle(id, value)} />
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
          {template.fields.map((field) => (
            <Grid key={field.order} xs={gridCols[field.block]} sx={{ my: 2 }}>
              {componentMapping(field.type, {
                label: field.label,
                value: fieldValue[field.fieldId],
                onChange: (value) => setFieldValue(id, field.fieldId, value),
              })}
            </Grid>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ResumeForm;
