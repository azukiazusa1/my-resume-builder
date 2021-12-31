import React from 'react';
import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ResumeForm from '@/components/model/resume/form/Form';
import Title from '@/components/model/resume/Title';
import { templateSelectors, templateActions } from '@/store/templateState';

const Edit = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { useTemplateItem } = templateSelectors;
  const { useEditTitle } = templateActions;
  const template = useTemplateItem(id);
  const editTitle = useEditTitle();

  if (!id) {
    return null;
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Title title={template.title} onChange={(value) => editTitle(id, value)} sx={{ mb: 4 }} />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <ResumeForm id={id as string} />
        </Grid>
        <Grid item xs={4}>
          2
        </Grid>
      </Grid>
    </Container>
  );
};

export default Edit;
