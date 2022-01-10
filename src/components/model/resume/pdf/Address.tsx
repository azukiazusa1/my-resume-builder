import { Text, View } from '@react-pdf/renderer';
import React from 'react';

import { AddressFieldValue } from '@/store/templateState/types';

import Cell from './atoms/Cell';
import Label from './atoms/Label';

type Props = {
  label: string;
  value?: AddressFieldValue;
};

const ShortTextWithRuby: React.VFC<Props> = ({ label, value }) => {
  return (
    <Cell>
      <View
        style={{
          borderBottom: '1px solid #000',
          height: 20,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Label>ふりがな</Label>
        <Text style={{ fontSize: 10 }}>{value?.ruby}</Text>
      </View>

      <View style={{ height: 40, display: 'flex' }}>
        <Label>
          {label} （〒{value?.postCodeFirst} - {value?.postCodeLast}）
        </Label>
        <Text style={{ marginLeft: 5 }}>
          {value?.prefecture} {value?.address}
        </Text>
      </View>
    </Cell>
  );
};

export default ShortTextWithRuby;
