import LaunchIcon from '@mui/icons-material/Launch';
import Fab from '@mui/material/Fab';
import { BlobProvider } from '@react-pdf/renderer';
import React from 'react';
import debounceRender from 'react-debounce-render';

import Document from '@/components/model/resume/pdf/Document';
import usePDFValue from '@/hooks/usePDFValue';

const DebounceDocument = debounceRender(Document, 3000);

type Props = {
  id: string;
};
const OpenPreviewButton: React.VFC<Props> = ({ id }) => {
  const fieldWithValues = usePDFValue(id);

  const handleClieck = (url: string | null) => {
    if (url) {
      window.open(url);
    }
  };

  return (
    <BlobProvider document={<DebounceDocument fieldWithValues={fieldWithValues} />}>
      {({ url }) => {
        return (
          <Fab color="secondary" onClick={() => handleClick(url)}>
            <LaunchIcon />
          </Fab>
        );
      }}
    </BlobProvider>
  );
};

export default OpenPreviewButton;
