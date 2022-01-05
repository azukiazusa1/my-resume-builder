import { View } from '@react-pdf/renderer';
import React from 'react';

const Cell: React.FC = ({ children }) => {
  return <View style={{ display: 'flex', border: '1.5px solid #000' }}>{children}</View>;
};

export default Cell;
