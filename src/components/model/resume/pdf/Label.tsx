import { Text } from '@react-pdf/renderer';
import React from 'react';

const Label: React.FC = ({ children }) => {
  return <Text style={{ fontSize: 10, marginLeft: 5, marginRight: 10 }}>{children}</Text>;
};

export default Label;
