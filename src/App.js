import './App.css';
import Routers from './route/routers';
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './utils/theme/theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routers />
    </ThemeProvider>
  );
}

export default App;
