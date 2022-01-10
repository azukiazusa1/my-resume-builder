import { Text, View } from '@react-pdf/renderer';
import React from 'react';

import Cell from './atoms/Cell';
import Label from './atoms/Label';

type Props = {
  label: string;
  value?: string[];
};

const List: React.VFC<Props> = ({ label, value }) => {
  return (
    <Cell>
      <View style={{ height: 20, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Label>{label}</Label>
      </View>
      {value?.map((v, i) => (
        <View
          key={i}
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}
        >
          <Label>・</Label>
          <Text>{v}</Text>
        </View>
      ))}
    </Cell>
  );
};

export default List;
