import React, { useCallback } from 'react';
import { DataGrid, GridColumns, GridRowsProp, GridCellEditCommitParams } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { FieldProps } from './Form';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

const TableField: React.FC<FieldProps<GridRowsProp, { columns: GridColumns }>> = ({
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
    <div style={{ height: 300, width: '100%' }}>
      <Typography variant="h5" component="label">
        {label}
      </Typography>
      <DataGrid
        rows={value}
        columns={options.columns}
        onCellEditCommit={handleCellEditCommit}
        sx={{ my: 2 }}
        disableColumnMenu
        hideFooter
      />
      <div style={{ flexGrow: 1 }}></div>
      <Button variant="outlined" startIcon={<AddIcon />} onClick={addRow}>
        行を追加
      </Button>
    </div>
  );
};

export default TableField;
