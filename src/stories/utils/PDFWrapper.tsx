import Box from '@mui/material/Box';
import { Document, Font, Page, PDFViewer, StyleSheet, View } from '@react-pdf/renderer';
import React from 'react';

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
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: '10px',
    fontSize: '16px',
  },
  'col-12': {
    flex: '0 0 auto',
    flexBasis: '100%',
    width: '100%',
  },
});

// Create Document Component
const PDFWrapper: React.FC = ({ children }) => {
  return (
    <Box sx={{ '& iframe': { width: '100%', height: '100vh' } }}>
      <PDFViewer>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles['col-12']}>{children}</View>
          </Page>
        </Document>
      </PDFViewer>
    </Box>
  );
};

export default PDFWrapper;
