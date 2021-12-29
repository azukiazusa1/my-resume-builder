import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const BackdropLoader = () => {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
      <CircularProgress color="inherit" data-testid="loader" />
    </Backdrop>
  );
};

export default BackdropLoader;