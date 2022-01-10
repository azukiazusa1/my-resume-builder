import DownloadIcon from '@mui/icons-material/Download';
import Fab from '@mui/material/Fab';
import { PDFDownloadLink } from '@react-pdf/renderer';
import React from 'react';
import debounceRender from 'react-debounce-render';

import Document from '@/components/model/resume/pdf/Document';
import usePDFValue from '@/hooks/usePdfValue';

const DebounceDocument = debounceRender(Document, 3000);

type Props = {
  id: string;
};
const DownloadButton: React.VFC<Props> = ({ id }) => {
  const fieldWithValues = usePDFValue(id);

  return (
    <PDFDownloadLink
      document={<DebounceDocument fieldWithValues={fieldWithValues} />}
      fileName="resume.pdf"
    >
      <Fab color="secondary">
        <DownloadIcon />
      </Fab>
    </PDFDownloadLink>
  );
};

export default DownloadButton;
