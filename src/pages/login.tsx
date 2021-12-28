import Box from '@mui/material/Box';
import LoginCard from '@/components/model/user/LoginCard';
import type { NextPage } from 'next';

const Login: NextPage = () => {
  return (
    <Box
      sx={{
        mt: {
          xs: 4,
          md: 8,
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <LoginCard />
    </Box>
  );
};

export default Login;
