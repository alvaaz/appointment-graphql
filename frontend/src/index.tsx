import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Admin } from './components/Admin';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyles';
import { ThemeProvider } from './components/Modal/ModalContext';

ReactDOM.render(
  <ThemeProvider>
    <Router>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
      </ul>
      <GlobalStyle />
      <Route path="/" exact component={App} />
      <Route path="/admin" component={Admin} />
    </Router>
  </ThemeProvider>,
  document.getElementById('root')
);
