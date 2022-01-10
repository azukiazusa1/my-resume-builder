import React from 'react';

jest.mock('@react-pdf/renderer', () => ({
  Document: () => <div>Document </div>,
  Image: () => <div>Image </div>,
  Page: () => <div>Page </div>,
  PDFViewer: () => <div>PDFViewer</div>,
  PDFDownloadLink: () => <div>PDFDownloadLink</div>,
  BlobProvider: () => <div>BlobProvider</div>,
  StyleSheet: { create: () => {} },
  Text: () => <div>Text </div>,
  View: () => <div>View </div>,
  Font: { register: jest.fn() },
}));
