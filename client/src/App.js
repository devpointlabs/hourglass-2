import React, { Fragment, } from 'react';
import { Route, Switch, } from 'react-router-dom';
import { Container, } from 'semantic-ui-react';
import NavBar from './components/NavBar';
import NoMatch from './components/NoMatch';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Task from './components/Task';
import Session from './components/Session';
import Project from './components/Project';
import TimesheetForm from './components/TimesheetForm';
import Invoices from './components/Invoices';
import Expenses from './components/Expenses';
import Estimates from './components/Estimates';
import Manage from './components/Manage';
import Help from './components/Help';
import Settings from './components/Settings';
import Projects from './components/Projects';
import ProtectedRoute from './components/ProtectedRoute';
import FetchUser from './components/FetchUser';
import Timesheet from './components/Timesheet';
import Timesheets from './components/Timesheets';
import PendingApproval from './components/PendingApproval';
import Unsubmitted from './components/Unsubmitted';
import Archive from './components/Archive';

const App = () => (
  <Fragment>
    <NavBar />
    <FetchUser>
      <Container>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <ProtectedRoute exact path='/' component={Home} />
          <ProtectedRoute exact path='/session' component={Session} />
          <ProtectedRoute exact path='/projects' component={Projects} />
          <ProtectedRoute exact path='/timesheets' component={Timesheets} />
          <ProtectedRoute exact path='/task' component={Task} />
          <ProtectedRoute exact path='/expenses' component={Expenses} />
          <ProtectedRoute exact path='/invoices' component={Invoices} />
          <ProtectedRoute exact path='/estimates' component={Estimates} />
          <ProtectedRoute exact path='/manage' component={Manage} />
          <ProtectedRoute exact path='/help' component={Help} />
          <ProtectedRoute exact path='/settings' component={Settings} />
          <ProtectedRoute exact path='/projects/:id' component={Project} />
          <ProtectedRoute exact path='/pendingapproval' component={PendingApproval} />
          <ProtectedRoute exact path='/timesheetform' component={TimesheetForm} />
          <ProtectedRoute exact path='/timesheet' component={Timesheet} />
          <ProtectedRoute exact path='/unsubmitted' component={Unsubmitted} />
          <ProtectedRoute exact path='/archive' component={Archive} />
          <Route component={NoMatch} />
        </Switch>
      </Container>
    </FetchUser>
  </Fragment>
);

export default App;
