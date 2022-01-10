import { Document, Font, Page, StyleSheet, View } from '@react-pdf/renderer';
import React from 'react';

import { FieldWithValue } from '@/store/templateState/types';

import Address from './Address';
import Checkbox from './Checkbox';
import DateView from './DateView';
import ImageView from './ImageView';
import List from './List';
import LongText from './LongText';
import NumberView from './NumberView';
import ShortText from './ShortText';
import ShortTextWithRuby from './ShortTextWithRuby';
import Table from './Table';

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
    display: 'flex',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: '10px',
    fontSize: '16px',
  },
  'col-1': {
    flex: '0 0 auto',
    flexBasis: '8.3333333333%',
    width: '8.3333333333%',
  },
  'col-2': {
    flex: '0 0 auto',
    flexBasis: '16.6666666667%',
    width: '16.6666666667%',
  },
  'col-3': {
    flex: '0 0 auto',
    flexBasis: '25%',
    width: '25%',
  },
  'col-4': {
    flex: '0 0 auto',
    flexBasis: '33.3333333333%',
    width: '33.3333333333%',
  },
  'col-5': {
    flex: '0 0 auto',
    flexBasis: '41.6666666667%',
    width: '41.6666666667%',
  },
  'col-6': {
    flex: '0 0 auto',
    flexBasis: '50%',
    width: '50%',
  },
  'col-7': {
    flex: '0 0 auto',
    flexBasis: '58.3333333333%',
    width: '58.3333333333%',
  },
  'col-8': {
    flex: '0 0 auto',
    flexBasis: '66.6666666667%',
    width: '66.6666666667%',
  },
  'col-9': {
    flex: '0 0 auto',
    flexBasis: '75%',
    width: '75%',
  },
  'col-10': {
    flex: '0 0 auto',
    flexBasis: '83.3333333333%',
    width: '83.3333333333%',
  },
  'col-11': {
    flex: '0 0 auto',
    flexBasis: '91.6666666667%',
    width: '91.6666666667%',
  },
  'col-12': {
    flex: '0 0 auto',
    flexBasis: '100%',
    width: '100%',
  },
});

type Props = {
  fieldWithValues: FieldWithValue[];
};

const FieldWithValueToPdf = (fieldWithValue: FieldWithValue): JSX.Element => {
  switch (fieldWithValue.type) {
    case 'shortText':
      return <ShortText label={fieldWithValue.label} value={fieldWithValue.value} />;
    case 'shortTextWithRuby':
      return <ShortTextWithRuby label={fieldWithValue.label} value={fieldWithValue.value} />;
    case 'longText':
      return <LongText label={fieldWithValue.label} value={fieldWithValue.value} />;
    case 'table':
      return (
        <Table
          label={fieldWithValue.label}
          value={fieldWithValue.value}
          options={fieldWithValue.options!}
        />
      );
    case 'address':
      return <Address label={fieldWithValue.label} value={fieldWithValue.value} />;
    case 'date':
      return <DateView label={fieldWithValue.label} value={fieldWithValue.value} />;
    case 'number':
      return (
        <NumberView
          label={fieldWithValue.label}
          value={fieldWithValue.value}
          options={fieldWithValue.options!}
        />
      );
    case 'checkbox':
      return <Checkbox label={fieldWithValue.label} value={fieldWithValue.value} />;
    case 'list':
      return <List label={fieldWithValue.label} value={fieldWithValue.value} />;
    case 'image':
      return <ImageView label={fieldWithValue.label} value={fieldWithValue.value} />;
  }
};

// Create Document Component
const MyDocument: React.VFC<Props> = ({ fieldWithValues }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {fieldWithValues.map((fieldWithValue) => (
          <View key={fieldWithValue.fieldId} style={{ ...styles[`col-${fieldWithValue.block}`] }}>
            {FieldWithValueToPdf(fieldWithValue)}
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default MyDocument;
