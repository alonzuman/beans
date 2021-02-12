import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import UserProvider from "./contexts/UserProvider";
import Event from "./screens/Event";
import Home from "./screens/Home";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#bc6fd8',
      main: '#b154d3',
      dark: '#8d30af'
    }
  },
  typography: {
    h1: {
      fontSize: '2.4rem',
      fontWeight: 600
    },
    h3: {
      fontSize: '1.4rem',
      fontWeight: 600
    }
  },
  shape: {
    borderRadius: 12
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/events/:eventID' component={Event} />
          </Switch>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
