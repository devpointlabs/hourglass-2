import React, { useState, useContext } from 'react';
import { Modal, Header, Image, Grid, Card, Button, DropdownItem,} from 'semantic-ui-react';
import {AuthContext} from '../providers/AuthProvider';
import AccountForm from './AccountForm'


 
const Profile = () => {
  const { user } = useContext(AuthContext);
  
  const defaultImage = 'https://react.semantic-ui.com/images/avatar/large/matthew.png'

  const [showAccountForm, setShowAccountForm ] = useState(false);
  
  const toggle = () => { setShowAccountForm(!showAccountForm);
  } 

    return (
      <Modal size="tiny" trigger={<DropdownItem>Profile</DropdownItem>} centered={false}>
        <Modal.Content image>
          <Modal.Description>
            <Grid>
                  {showAccountForm ? <AccountForm first_name={user.first_name} image={user.image} last_name={user.last_name} bio={user.bio} email={user.email} phone={user.phone} toggle={toggle} isEditing={true}/> 
                    :
                    <>
              <Grid.Column width={8}>
                <Card>
                <Image src={user.image || defaultImage} />
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
                <Header as='h2'>
                {user.first_name} {user.last_name}
                </Header>
                  <strong>
                    Bio
                  </strong>
                  <p>
                    {user.bio}
                  </p>
                  <strong>Email</strong>
                  <p>
                    {user.email}
                  </p>
                  <strong>Phone</strong>
                  <p>
                    {user.phone}
                  </p>
                  <Button color='purple' onClick={toggle}>Account Settings</Button>
                  </Grid.Column>
                  </>
                 }
                </Grid>
              </Modal.Description>
            </Modal.Content>
          </Modal>
    )
}

  export default Profile;
