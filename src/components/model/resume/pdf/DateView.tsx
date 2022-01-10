import { Text, View } from '@react-pdf/renderer';
import dayjs from 'dayjs';
import React from 'react';

import Cell from './atoms/Cell';
import Label from './atoms/Label';

type Props = {
  label: string;
  value?: string;
};

const DateView: React.VFC<Props> = ({ label, value }) => {
  const format = (date: string) => {
    return dayjs(date).format('YYYY年MM月DD日');
  };
  return (
    <Cell>
      <View style={{ height: 40, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Label>{label}</Label>
        <Text>{value ? format(value) : ''}</Text>
      </View>
    </Cell>
  );
};

export default DateView;
