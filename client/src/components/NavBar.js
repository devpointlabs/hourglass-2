//NEED
//logo from DPL to replace 'home'
//fix alignment, 

import React from 'react'
import { AuthConsumer, } from "../providers/AuthProvider";
import { Menu, Dropdown, DropdownItem, Grid, Card, Header, Image, Button, Modal } from 'semantic-ui-react'
import { Link, withRouter, } from 'react-router-dom'
import StopWatch from './StopWatch';
import hourglass from './Images/hourglass_icon.png'
import AccountForm from './AccountForm'

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
            <Link to='/timesheets'>
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
          <Menu.Item style={{ width: 1000 }}>
          </Menu.Item >
          <Menu.Menu position='right' >
            <Dropdown item text={user.email}>
              <Dropdown.Menu color='violet ' inverted>
                {/* <Dropdown.Item text='Your Profile' a href='/profile' /> */}


                {/* This is the current work area */}
                <Modal size="tiny" trigger={<DropdownItem>Profile</DropdownItem>} centered={false}>
                  <Modal.Content image>
                    <Modal.Description>
                      <Grid>
                        <Grid.Column width={8}>
                          <Card>
                            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
                            {/* <Card.Content extra>
                            possibly keep this 
                            <a>
                            <Icon name='pencil' />
                            6 Active Projects
                            </a>
                          </Card.Content> */}
                          </Card>
                        </Grid.Column>
                        <Grid.Column width={8}>                        
                          <Header>
                            Put Name here
                          </Header>

                          <p>
                            Put bio Here
                          </p>
                          <p>

                            {/* second modal */}
                              <Modal 
                                trigger={<Button>Account Settings</Button>} 
                                centered={false}
                                size="small"
                              >
                                <Modal.Content image>
                                  <Modal.Description>
                                    
                                    <AccountForm />



                                    {/* put text below it for there motto or something */}
                                    {/* put an account settings button here */}
                                  </Modal.Description>
                                </Modal.Content>
                              </Modal>
                            {/* end of second modal */}

                          </p>
                        </Grid.Column>
                      </Grid>
                    </Modal.Description>
                  </Modal.Content>
                </Modal>
                {/* This ends the current work area */}


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



// //<div class="ui right dropdown item">
// // More
// {/* <i class="dropdown icon"></i>
// <div class="menu">
//   <div class="item">Applications</div>
//   <div class="item">International Students</div>
//   <div class="item">Scholarships</div>
// </div>
// </div>
// </div>
// <div class="ui flowing basic admission popup">
// <div class="ui three column relaxed divided grid">
// <div class="column">
//   <h4 class="ui header">Business</h4>
//   <div class="ui link list">
//     <a class="item">Design &amp; Urban Ecologies</a>
//     <a class="item">Fashion Design</a>
//     <a class="item">Fine Art</a>
//     <a class="item">Strategic Design</a>
//   </div>
// </div>
// <div class="column">
//   <h4 class="ui header">Liberal Arts</h4>
//   <div class="ui link list">
//     <a class="item">Anthropology</a>
//     <a class="item">Economics</a>
//     <a class="item">Media Studies</a>
//     <a class="item">Philosophy</a>
//   </div>
// </div>
// <div class="column">
//   <h4 class="ui header">Social Sciences</h4>
//   <div class="ui link list">
//     <a class="item">Food Studies</a>
//     <a class="item">Journalism</a>
//     <a class="item">Non Profit Management</a>
//   </div>
// </div>
// </div>
// </div> */}