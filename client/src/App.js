import React, { Fragment, } from 'react';
import { Route, Switch, } from 'react-router-dom';
import { Container, } from 'semantic-ui-react';
import NavBar from './components/NavBar';
import NoMatch from './components/NoMatch';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Tasks from './components/Tasks';
import Session from './components/Session';
import Project from './components/Project';
import ProtectedRoute from './components/ProtectedRoute';
import FetchUser from './components/FetchUser';

const App = () => (
  <Fragment>
    <NavBar />
    <FetchUser>
      <Container>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <ProtectedRoute exact path='/' component={Home} />
          <ProtectedRoute exact path='/tasks' component={Tasks} />
          <ProtectedRoute exact path='/project' component={Project} />
          <ProtectedRoute exact path='/session' component={Session} />
          <Route component={NoMatch} />
        </Switch>
      </Container>
    </FetchUser>
  </Fragment>
);

export default App;
