import React from 'react'
import { AuthConsumer, } from "../providers/AuthProvider";
import { Menu, } from 'semantic-ui-react'
import { Link, withRouter, } from 'react-router-dom'

class Navbar extends React.Component {

  rightNavItems = () => {
    const { auth: { user, handleLogout, }, location, } = this.props;

    if (user) {
      return (
        <Menu color='purple' inverted>
          <Menu.Item>
          <Link to='/'>
              Home
          </Link>
          </Menu.Item>
          <Menu.Item>
          <Link to='/session'>
              Sessions
          </Link>
          </Menu.Item>
          <Menu.Item>
          <Link to='/projects'>
              Projects
          </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/timesheets'>
            Time
            </Link>
          </Menu.Item>
          <Menu.Item>
          <Link to='/task'>
            Task
          </Link>
          </Menu.Item>
          <Menu.Item>
          <Link to='/expenses'>
              Expenses
          </Link>
          </Menu.Item>
          <Menu.Item>
          <Link to='/reports/timesheet'>
              Reports
          </Link>
          </Menu.Item>
          <Menu.Item>
          <Link to='/invoices'>
              Invoices
          </Link>
          </Menu.Item>
          <Menu.Item>
          <Link to='/estimates'>
              Estimates
          </Link>
          </Menu.Item>
          <Menu.Item>
          <Link to='/manage'>
              Manage
          </Link>
          </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Link to='/help'>
            Help
            </Link>
          </Menu.Item>
          <Menu.Item>
          <Link to='/settings'>
            Settings
            </Link>
          </Menu.Item>
          <Menu.Item
            name='logout'
            onClick={() => handleLogout(this.props.history)}>Logout
            </Menu.Item>
        </Menu.Menu>
        </Menu>
      )
    } else {
      return (
        <Menu.Menu position='right'>
          <Link to='/login'>
            <Menu.Item
              id='login'
              name='login'
              active={location.pathname === '/login'}
            />
          </Link>
          <Link to='/register'>
            <Menu.Item
              id='register'
              name='register'
              active={location.pathname === '/register'}
            />
          </Link>
        </Menu.Menu>
      )
    }
  }

  render() {
    return (
      <>
        <Menu color='purple' inverted borderless>
          { this.rightNavItems() }
        </Menu>
        </>
    );
  };
};

export class ConnectedNavbar extends React.Component {
  render() {
    return (
      <AuthConsumer>
        { auth =>
          <Navbar {...this.props} auth={auth} />
        }
      </AuthConsumer>
    );
  };
};

export default withRouter(ConnectedNavbar);

