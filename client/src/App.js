import React, { Fragment, } from 'react';
import { Route, Switch, } from 'react-router-dom';
import { Container, } from 'semantic-ui-react';
import SideBar from './components/SideBar';
import Home from './components/Home';
import Tasks from './components/Tasks';
import Session from './components/Session';
import Project from './components/Project';

const App = () => (
  <Fragment>
    <SideBar />
    <Container>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/tasks' component={Tasks} />
        <Route exact path='/project' component={Project} />
        <Route exact path='/session' component={Session} />
      </Switch>
    </Container>
  </Fragment>
);

export default App;
