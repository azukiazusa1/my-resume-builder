import React from 'react';
import ShortTextField from './ShortTextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { templateSelectors } from '../../../../store/templateState';
import { Block, Field } from '../../../../store/templateState/types';

const { useTemplateItem } = templateSelectors;

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
  const template = useTemplateItem(id);

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="h4" component="h1">
          {template.title}を作成
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          {template.fields.map((field) => (
            <Grid key={field.order} xs={gridCols[field.block]} sx={{ my: 2 }}>
              {componentMapping(field.type, {
                label: field.label,
                value: '',
                onChange: () => {},
              })}
            </Grid>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ResumeForm;
