import { Text, View } from '@react-pdf/renderer';
import React from 'react';

import Cell from './atoms/Cell';
import Label from './atoms/Label';

type Props = {
  label: string;
  value?: string;
};

const ShortText: React.VFC<Props> = ({ label, value }) => {
  return (
    <Cell>
      <View style={{ height: 40, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Label>{label}</Label>
        <Text>{value}</Text>
      </View>
    </Cell>
  );
};

export default ShortText;
