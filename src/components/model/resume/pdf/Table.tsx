import { View } from '@react-pdf/renderer';
import React from 'react';

import { TableFieldOptions, TableFieldValue } from '@/store/templateState/types';

import Cell from './atoms/Cell';
import Td from './atoms/Td';
import Th from './atoms/Th';

type Props = {
  label: string;
  value?: TableFieldValue;
  options: TableFieldOptions;
};

const TableHead: React.VFC<{ columns: TableFieldOptions['columns'] }> = ({ columns }) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'row' }}>
      {columns.map((column) => (
        <Th key={column.field} width={column.width ?? 100}>
          {column.headerName}
        </Th>
      ))}
    </View>
  );
};

const TableBody: React.VFC<{ columns: TableFieldOptions['columns']; value?: TableFieldValue }> = ({
  columns,
  value,
}) => {
  return (
    <>
      {value?.map((row) => (
        <View key={row.id} style={{ display: 'flex', flexDirection: 'row' }}>
          {Object.entries(row).map(([k, v]) => {
            if (k === 'id' || !v) return null;

            const option = columns.find((column) => column.field === k);
            if (!option) return null;

            return (
              <Td key={v.id} width={option.width ?? 100}>
                {v}
              </Td>
            );
          })}
        </View>
      ))}
    </>
  );
};

const Table: React.VFC<Props> = ({ value, options }) => {
  return (
    <Cell>
      <TableHead columns={options.columns} />
      <TableBody columns={options.columns} value={value} />
    </Cell>
  );
};

export default Table;
