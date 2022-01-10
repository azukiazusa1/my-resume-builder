import { Text, View } from '@react-pdf/renderer';
import React from 'react';

type Props = {
  width: number;
};

const Th: React.FC<Props> = ({ width, children }) => {
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #000',
        borderBottom: '1px dashed #000',
        width,
      }}
    >
      <Text>{children}</Text>
    </View>
  );
};

export default Th;
