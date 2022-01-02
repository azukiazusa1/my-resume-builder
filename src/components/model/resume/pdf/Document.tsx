import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';

import { FieldWithValue } from '@/store/templateState/types';

Font.register({
  family: 'Nasu-Regular',
  src: '/fonts/Nasu-Regular.ttf',
});
Font.register({
  family: 'Nasu-Bold',
  src: '/fonts/Nasu-Bold.ttf',
});

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Nasu-Regular',
    flexDirection: 'row',
    backgroundColor: '#FFF',
    width: '100%',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

type Props = {
  fieldWithValues: FieldWithValue[];
};

// Create Document Component
const MyDocument: React.VFC<Props> = ({ fieldWithValues }) => {
  console.log(fieldWithValues[0]);
  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={styles.section}>
          <Text>{fieldWithValues[0]?.label}</Text>
          <Text>{fieldWithValues[0]?.value?.ruby}</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
