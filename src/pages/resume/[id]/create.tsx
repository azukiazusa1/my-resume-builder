import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ResumeForm from '../../../components/model/resume/form/Form';
import { Template } from '../../../store/templateState/types';

const Create = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!id) {
    return null;
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
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

export default Create;
