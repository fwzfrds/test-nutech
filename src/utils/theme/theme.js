import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { green, purple, red, blue } from '@mui/material/colors';

const base = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: purple[500],
    },
    tertiary: {
        main: '#DEDEDE'
    },
    error: {
        main: red[400]
    },
    success: {
        main: green[500]
    }
  },
});

const theme = responsiveFontSizes(base)

export default theme