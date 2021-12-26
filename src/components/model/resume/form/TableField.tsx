import React, { useCallback } from 'react';
import { DataGrid, GridCellEditCommitParams } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import type { FieldProps } from './Form';
import type { TableFieldValue, TableFieldOptions } from '@/store/templateState/types';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

const TableField: React.FC<FieldProps<TableFieldValue, TableFieldOptions>> = ({
  label,
  value = [],
  onChange,
  options,
}) => {
  if (!options) {
    throw new Error('TableField requires options');
  }
  const handleCellEditCommit = useCallback(
    (params: GridCellEditCommitParams) => {
      const newValue = value.map((row) => {
        if (row.id === params.id) {
          return { ...row, [params.field]: params.value };
        } else {
          return row;
        }
      });

      onChange(newValue);
    },
    [onChange, value],
  );

  const addRow = () => {
    onChange([
      ...value,
      options.columns.reduce((row, column) => {
        row[column.field] = null;
        row.id = value.length + 1;
        return row;
      }, {} as any),
    ]);
  };

  return (
    <>
      <Typography variant="h5" component="label">
        {label}
      </Typography>
      <DataGrid
        autoHeight
        rows={value}
        columns={options.columns}
        onCellEditCommit={handleCellEditCommit}
        sx={{ my: 2 }}
        disableColumnMenu
        hideFooter
      />
      <Button variant="outlined" startIcon={<AddIcon />} onClick={addRow}>
        行を追加
      </Button>
    </>
  );
};

export default TableField;
