import React from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import Button from '@mui/material/Button';

const GoogleButton: React.FC<any> = ({ children, sx, onClick }) => {
  return (
    <Button
      sx={{
        backgroundColor: '#DD5144',
        '&:hover': {
          backgroundColor: '#C63124',
        },
        color: '#fff',
        ...sx,
      }}
      size="large"
      startIcon={<GoogleIcon />}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default GoogleButton;
