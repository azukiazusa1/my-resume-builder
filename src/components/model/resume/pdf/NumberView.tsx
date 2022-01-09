import { Text, View } from '@react-pdf/renderer';
import React from 'react';

import { NumberFieldOptions } from '@/store/templateState/types';

import Cell from './atoms/Cell';
import Label from './atoms/Label';

type Props = {
  label: string;
  value: number;
  options: NumberFieldOptions;
};

const NumberView: React.VFC<Props> = ({ label, value, options }) => {
  return (
    <Cell>
      <View style={{ height: 40, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Label>{label}</Label>
        <Text>{value}</Text>
        <Label>{options.unit}</Label>
      </View>
    </Cell>
  );
};

export default NumberView;
