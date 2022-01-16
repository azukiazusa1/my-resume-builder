import { Image as ImagePdf, Text, View } from '@react-pdf/renderer';
import React from 'react';

import { ImageFieldOptions } from '@/store/templateState/types';

type Props = {
  label: string;
  value?: string;
  options: ImageFieldOptions;
};

const ImageView: React.VFC<Props> = ({ label, value, options }) => {
  return (
    <View style={{ marginHorizontal: 16, marginVertical: 8 }}>
      {value ? (
        <ImagePdf
          src={value}
          style={{ width: options.width, height: options.height, backgroundColor: '#e0e0e0' }}
        />
      ) : (
        <View
          style={{
            width: options.width,
            height: options.height,
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
