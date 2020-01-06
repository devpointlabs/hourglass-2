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

const App = () => (
  <Fragment>
    <NavBar />
    <Container>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path='/' component={Home} />
        <Route exact path='/tasks' component={Tasks} />
        <Route exact path='/project' component={Project} />
        <Route exact path='/session' component={Session} />
        <Route component={NoMatch} />
      </Switch>
    </Container>
  </Fragment>
);

export default App;
