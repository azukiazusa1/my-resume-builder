import { View } from '@react-pdf/renderer';
import React from 'react';

const Cell: React.FC = ({ children }) => {
  return (
    <View
      style={{
        display: 'flex',
        border: '1px solid #000',
        marginBottom: '-1px',
        marginRight: '-1px',
      }}
    >
      {children}
    </View>
  );
};

export default Cell;
