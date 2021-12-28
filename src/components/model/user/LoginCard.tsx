import GoogleButton from '@/components/ui/GoogleButton';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const LoginCard = () => {
  return (
    <Card
      sx={{
        width: {
          xs: '90%',
          md: '40%',
          lg: '30%',
        },
        height: '40vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" component="h2" sx={{ mt: 4 }}>
        ログイン
      </Typography>
      <Divider sx={{ width: '90%', mt: { xs: 2, md: 4 }, mb: { xs: 4, md: 6 } }} />
      <GoogleButton sx={{ width: '90%' }}>Google でログイン</GoogleButton>
    </Card>
  );
};
export default LoginCard;
