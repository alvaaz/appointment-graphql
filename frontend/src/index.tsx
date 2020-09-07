import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { offers } from './views/offers';
import { Admin } from './components/Admin';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyles';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
);
