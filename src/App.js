import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import UserProvider from "./contexts/UserProvider";
import ProtectedRoute from "./navigation/ProtectedRoute";
import Event from "./screens/Event";
import Home from "./screens/Home";
import Profile from "./screens/Profile";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#a157da',
      main: '#7d44a9',
      dark: '#592680'
    }
  },
  typography: {
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
      fontFamily: `'Poppins', sans-serif`
    },
    h2: {
      fontFamily: `'Poppins', sans-serif`
    },
    h3: {
      fontSize: '1.4rem',
      fontWeight: 600,
      fontFamily: `'Poppins', sans-serif`
    },
    h4: {
      fontSize: '1.2rem',
      fontFamily: `'Poppins', sans-serif`
    },
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
            <ProtectedRoute path='/me' component={Profile} />
          </Switch>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
