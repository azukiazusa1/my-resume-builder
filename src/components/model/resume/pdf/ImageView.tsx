import { Image as ImagePdf, Text, View } from '@react-pdf/renderer';
import React from 'react';

type Props = {
  label: string;
  value?: string;
};

const ImageView: React.VFC<Props> = ({ label, value }) => {
  return (
    <View style={{ marginHorizontal: 16, marginVertical: 8 }}>
      {value ? (
        <ImagePdf src={value} style={{ width: 113, height: 150, backgroundColor: '#e0e0e0' }} />
      ) : (
        <View
          style={{
            width: 128,
            height: 160,
            backgroundColor: '#e0e0e0',
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: '#000',
            borderStyle: 'dotted',
          }}
        >
          <Text>{label}</Text>
        </View>
      )}
    </View>
  );
};

export default ImageView;
