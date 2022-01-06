import { Text, View } from '@react-pdf/renderer';
import React from 'react';

import Cell from './Cell';

type Props = {
  label: string;
  value: string;
};

const LongText: React.VFC<Props> = ({ label, value }) => {
  return (
    <Cell>
      <View style={{ height: 160, display: 'flex', padding: 8 }}>
        <Text style={{ fontSize: 10, marginBottom: 4 }}>{label}</Text>
        <Text style={{ fontSize: 10 }}>{value}</Text>
      </View>
    </Cell>
  );
};

export default LongText;
