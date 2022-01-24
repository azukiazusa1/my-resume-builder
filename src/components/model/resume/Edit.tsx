import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import ResumeForm from '@/components/model/resume/form/Form';
import LastUpdated from '@/components/model/resume/LastUpdated';
import Viewer from '@/components/model/resume/pdf/Viewer';
import Sidebar from '@/components/model/resume/sidebar/Sidebar';
import Title from '@/components/model/resume/Title';
import { fieldValueSelectors } from '@/store/filedValueState';
import { templateActions, templateSelectors } from '@/store/templateState';

const Edit = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('lg'));

  const [preview, setPreview] = useState(false);

  const { useTemplateItem } = templateSelectors;
  const { useEditTitle } = templateActions;
  const { useTemplateLastUpdate } = fieldValueSelectors;
  const template = useTemplateItem(id);
  const editTitle = useEditTitle();
  const lastUpdate = useTemplateLastUpdate(id);

  if (!id) {
    return null;
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Title title={template.title} onChange={(value) => editTitle(id, value)} sx={{ mb: 2 }} />
      <LastUpdated datetime={lastUpdate} />
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} lg={preview ? 5 : 8}>
          {matches && preview ? null : (
            <div data-testid="resume-form">
              <ResumeForm id={id} />
            </div>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          lg={preview ? 6 : 3}
          sx={{
            position: 'sticky',
            top: 0,
            maxHeight: '90vh',
            '& iframe': {
              height: '90vh',
            },
          }}
        >
          {preview && (
            <div data-testid="pdf-viewer">
              <Viewer id={id} />
            </div>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          lg={1}
          sx={{
            top: { xs: 'auto', lg: 0 },
            right: { xs: 0, lg: 'auto' },
            bottom: { xs: 16, lg: 'auto' },
            maxHeight: { lg: '90vh' },
            position: {
              xs: 'fixed',
              lg: 'sticky',
            },
          }}
        >
          <Sidebar id={id} preview={preview} onClickPreview={() => setPreview((prev) => !prev)} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Edit;
