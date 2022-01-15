import DownloadIcon from '@mui/icons-material/Download';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import { PDFDownloadLink } from '@react-pdf/renderer';
import React from 'react';
import debounceRender from 'react-debounce-render';

import Document from '@/components/model/resume/pdf/Document';
import usePDFValue from '@/hooks/usePDFValue';

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
      <Tooltip title="ダウンロード" placement="right">
        <Fab color="secondary">
          <DownloadIcon />
        </Fab>
      </Tooltip>
    </PDFDownloadLink>
  );
};

export default DownloadButton;
