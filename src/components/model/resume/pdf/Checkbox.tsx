import { StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';

import Cell from './atoms/Cell';
import Label from './atoms/Label';

const styles = StyleSheet.create({
  circle: {
    borderRadius: '50%',
    border: '1px solid #000',
    width: 25,
    height: 25,
    textAlign: 'center',
  },
});
type Props = {
  label: string;
  value?: boolean;
};

const Checkbox: React.VFC<Props> = ({ label, value }) => {
  return (
    <Cell>
      <View style={{ height: 15, display: 'flex', flexDirection: 'row' }}>
        <Label>{label}</Label>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <Text style={value === true ? styles.circle : {}}>有</Text>
        <Text style={{ marginHorizontal: 12, fontSize: 8, marginTop: 4 }}>●</Text>
        <Text style={value === false ? styles.circle : {}}>無</Text>
      </View>
    </Cell>
  );
};

export default Checkbox;
