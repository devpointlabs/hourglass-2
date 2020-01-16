import React, { Fragment, } from 'react';
import { Route, Switch, } from 'react-router-dom';
import { Container, } from 'semantic-ui-react';
import Archive from './components/Archive';
import Estimates from './components/Estimates';
import Expenses from './components/Expenses';
import FetchUser from './components/FetchUser';
import Help from './components/Help';
import Home from './components/Home';
import Login from './components/Login';
import Invoices from './components/Invoices';
import Manage from './components/Manage';
import NavBar from './components/NavBar';
import NoMatch from './components/NoMatch';
import PendingApproval from './components/PendingApproval';
import Profile from './components/Profile';
import Project from './components/Project';
import Projects from './components/Projects';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';
import Session from './components/Session';
import Settings from './components/Settings';
import StopWatch from './components/StopWatch';
import TabMenu from './components/TabMenu';
import Task from './components/Task';
import Timesheet from './components/Timesheet';
import TimesheetForm from './components/TimesheetForm';
import Timesheets from './components/Timesheets';
import Unsubmitted from './components/Unsubmitted';

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
          <ProtectedRoute exact path='/profile' component={Profile} />
          <ProtectedRoute exact path='/projects/:id' component={Project} />
          <ProtectedRoute exact path='/pendingapproval' component={PendingApproval} />
          <ProtectedRoute exact path='/timesheetform' component={TimesheetForm} />
          <ProtectedRoute exact path='/timesheet' component={Timesheet} />
          <ProtectedRoute exact path='/StopWatch' component={StopWatch} />
          <ProtectedRoute exact path='/unsubmitted' component={Unsubmitted} />
          <ProtectedRoute exact path='/archive' component={Archive} />
          <ProtectedRoute exact path='/tabmenu' component={TabMenu} />
          <Route component={NoMatch} />
        </Switch>
      </Container>
    </FetchUser>
  </Fragment>
);

export default App;
