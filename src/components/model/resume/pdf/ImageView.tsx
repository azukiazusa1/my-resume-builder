import { Image as ImagePdf, Text, View } from '@react-pdf/renderer';
import React from 'react';

type Props = {
  label: string;
  value: string;
};

const ImageView: React.VFC<Props> = ({ label, value }) => {
  return value ? (
    <ImagePdf src={value} style={{ width: 128, height: 160, backgroundColor: '#e0e0e0' }} />
  ) : (
    <View
      style={{
        width: 128,
        height: 160,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>{label}</Text>
    </View>
  );
};

export default ImageView;
