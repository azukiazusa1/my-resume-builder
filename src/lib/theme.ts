import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3F9877',
      dark: '#005133',
    },
    secondary: {
      main: '#fb8c00',
      contrastText: '#fafafa',
    },
    background: {
      default: '#eeeeee',
    },
  },
});

export default theme;
