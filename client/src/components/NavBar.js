//NEED
//logo from DPL to replace 'home'
//fix alignment, 

import React from 'react'
import { AuthConsumer, } from "../providers/AuthProvider";
import { Menu, Dropdown, DropdownItem, Image, Modal } from 'semantic-ui-react'
import { Link, withRouter, } from 'react-router-dom'
import StopWatch from './StopWatch';
import hourglass from './Images/hourglass_icon.png'
import Profile from './Profile';

class Navbar extends React.Component {

  
  

  rightNavItems = () => {
    const { auth: { user, handleLogout, }, location, } = this.props;

    if (user) {
      return (
        <Menu stackable color='violet' inverted>
          <Menu.Item> 
          <Modal trigger={<Image src={hourglass}/>}>
              <Modal.Content>
                <StopWatch/>
              </Modal.Content>
            </Modal>
          </Menu.Item>
          <Menu.Item>
            <Link to='/timesheet'>
              Time
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/projects'>
                Projects
            </Link>
          </Menu.Item>
          <Menu.Item>
          <Link to='/'>
                Team
            </Link>
          </Menu.Item>
          <Menu.Item>
            {/* <Link to='/reports/timesheet'>
                Reports
            </Link> */}
          </Menu.Item>
          <Menu.Item style={{ width: 850 }}>
          </Menu.Item >
          <Menu.Menu position='right' >
            <Dropdown item text={user.email}>
              <Dropdown.Menu color='violet ' inverted>
                <Modal size="tiny" trigger={<DropdownItem><Profile /></DropdownItem>} centered={false}>
                  </Modal>
                <Dropdown.Item text='Settings' a href='/settings' />
                <Dropdown.Item text='Help' a href='/help' />
                <Dropdown.Item
                  name='logout'
                  onClick={() => handleLogout(this.props.history)}>
                    Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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
      <div>
        <Menu color='violet' inverted borderless>
          { this.rightNavItems() }
        </Menu>
      </div>
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

