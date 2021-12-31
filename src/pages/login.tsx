import Box from '@mui/material/Box';
import type { NextPage } from 'next';

import LoginCard from '@/components/model/user/LoginCard';
import Guest from '@/lib/auth/Guest';

const Login: NextPage = () => {
  return (
    <Guest>
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
    </Guest>
  );
};

export default Login;
