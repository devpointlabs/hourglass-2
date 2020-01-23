//Need:
//content adjusted to wireframes when we receive them
//data pulled in from whatever user is logged in

import React, { useReducer } from 'react';
import { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Header, Image, Icon, Grid, Card, Button, DropdownItem, ModalContent } from 'semantic-ui-react';
import {AuthContext} from '../providers/AuthProvider';
import AccountForm from './AccountForm'



const Profile = () => {
  const { user } = useContext(AuthContext);
  
    return (
      <Modal size="tiny" trigger={<DropdownItem>Profile</DropdownItem>} centered={false}>
        <Modal.Content image>
          <Modal.Description>
            <Grid>
              <Grid.Column width={8}>
                <Card>
                  <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
                </Card>
                <Card.Content extra>
                  {/* <a>
                  <Icon name='pencil'
                  />
                  6 Active Projects
                  </a> */}
                </Card.Content>
              </Grid.Column>
              <Grid.Column width={8}>                        
                <Header>
                { user.first_name } {user.last_name}
                </Header>

                  {/* <p>
                    User Bio
                  </p> */}
                {/* we have not made the bio yet, so when we do use this ^ p tag to do so */}
                  <p>
                    { user.email }
                  </p>
                  <p>
                    { user.phone }
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
    )
}

  export default Profile;
