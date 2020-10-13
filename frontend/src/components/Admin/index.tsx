import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Wrapper, Sidebar, Main } from './style';

import { DoctorsView } from '../../views/doctors';

const routes = [
  {
    path: '/doctors',
    exact: true,
    main: () => <DoctorsView />,
  }
];

export const Admin = () => {
  return (
    <Router>
      <Wrapper>
        <Sidebar>
          <Link to="/doctors">Médicos</Link>
          <Link to="/specialties">Especialidades</Link>
          <Link to="/offers">Ofertas</Link>
        </Sidebar>
        <Main>
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
          </Switch>
        </Main>
      </Wrapper>
    </Router>
  );
};
