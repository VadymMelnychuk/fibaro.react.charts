import './App.css';
import Layout from './Components/Layout';
import CssBaseline from "@material-ui/core/CssBaseline";

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
    palette: {
        primary: blue,
        background: {
            default: "#f5f5f5"
        }
    },
});

function App() {
  return (
      <ThemeProvider theme={theme}>
          <CssBaseline/>
      <Layout />
    </ThemeProvider>
  );
}

export default App;
